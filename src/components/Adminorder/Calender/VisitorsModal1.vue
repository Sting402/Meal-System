<script setup>
import { ref, reactive, onMounted, computed, watchEffect } from "vue";
import FlatPickr from "vue-flatpickr-component"
import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { $addVisitors } from '../../../api/personal/addVisitors'
import { $cancelVisitors } from '../../../api/personal/cancelVisitors'
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const store = useAdminOrderStore()
const stateVisitors = reactive({
    site_ID: '',
    default_MealOrder: '',
    default_MealType: '',
    meal_Number: '',  //葷食數量
    meal_Number2: '',   //素食數量
    meal_OrderCustComp: '',//廠商名稱
    meal_OrderCustMember: '', //訪客姓名
    order_Desc: '', // //事由
    select: '',
})
const rules = computed(() => {
    return {
        meal_OrderCustComp: {
            required,
            minLength: minLength(1),
        },
        // meal_OrderCustMember: {
        //     required,
        //     minLength: minLength(1),
        // },
        order_Desc: {
            required,
            minLength: minLength(1),
        },
    };
});
const v$ = useVuelidate(rules, stateVisitors);
//
const flatPickrState = reactive({
    // Initial values
    dateDefault: null,
    dateCustom: null,
    dateFriendly: null,
    dateRange: null,
    timeStandalone: null,
    timeStandalone24: null,
    timeDateTime: null,
    timeDateTime24: null,
    inlineDefault: null,
    inlineTime: null,

    // Configuration, get more form https://chmln.github.io/flatpickr/options/
    configCustom: { dateFormat: "d-m-Y" },
    configFriendly: { dateFormat: "F j, Y" },
    configRange: { mode: "single", minDate: "today", clickOpens: false, },
    configTimeStandalone: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    },
    configTimeStandalone24: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
    },
    configDateTime: { enableTime: true },
    configDateTime24: { enableTime: true, time_24hr: true },
    configInlineDefault: { inline: true },
    configInlineTime: { inline: true, enableTime: true },
});
//
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
function swalErrorEdit() {
    toast.fire("編輯失敗", "請重新編輯", "error");
}
function swalEditSuccess() {
    toast.fire("編輯成功", "編輯餐點成功", "success");
}
function swalEditDeleteSuccess() {
    toast.fire("刪除成功", "刪除餐點成功", "success");
}
//
const isShowButton = ref(true)
const isVisitorsEdit = ref('')
const handleChange = () => {
    //console.log(store.visitorsData);
    // selectedValue.value = store.secondEditData.default_MealType
    let selectedDay = store.visitorsData.selectedDay
    flatPickrState.dateRange = selectedDay.substring(0, 10)
    stateVisitors.order_Desc = store.visitorsData.order_Desc
    stateVisitors.meal_OrderCustMember = store.visitorsData.meal_OrderCustMember
    stateVisitors.meal_OrderCustComp = store.visitorsData.meal_OrderCustComp
    stateVisitors.meal_Number2 = store.visitorsData.meal_Number2
    stateVisitors.meal_Number = store.visitorsData.meal_Number
    stateVisitors.site_ID = store.visitorsData.site_ID
    let meal_Order = ''
    switch (store.visitorsData.meal_Order) {
        case '午':
            meal_Order = '午餐'
            break;
        case '晚':
            meal_Order = '晚餐'
            break;
        case '宵':
            meal_Order = '宵夜'
            break;
        case '早':
            meal_Order = '早餐'
            break;
    }
    console.log(meal_Order);
    stateVisitors.default_MealOrder = meal_Order
    isShowButton.value = store.visitorsData.enable
}
//編輯餐點
const handleEdit = async () => {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    let loginInfo = store.loginInfo[0]
    let meal_Order = ''
    switch (stateVisitors.default_MealOrder) {
        case '午餐':
            meal_Order = '午'
            break;
        case '晚餐':
            meal_Order = '晚'
            break;
        case '宵夜':
            meal_Order = '宵'
            break;
        case '早餐':
            meal_Order = '早'
            break;
    }
    //console.log(meal_Order);
    try {
        let res = await $addVisitors({
            worker_ID: loginInfo.worker_ID,//ok
            dept_ID: loginInfo.dept_ID,//ok
            Site_ID: stateVisitors.site_ID,//ok
            order_Date: flatPickrState.dateRange,//ok
            meal_OrderCust: 1, //0：自己訂; 1：代客戶訂；
            meal_Order: meal_Order,//午 晚 ok
            meal_Type: '葷',//代客戶訂必填:第一種餐別
            "meal_Sort": 9,//1.第一餐 2.第二餐 3.第三餐 9.訪客
            meal_Number: stateVisitors.meal_Number,//代客戶訂必填:第一種餐別數量 ok
            meal_Type2: '素',//代客戶訂必填:第二種餐別
            meal_Number2: stateVisitors.meal_Number2, //代客戶訂必填:第二種餐別數量 ok
            meal_OrderCustComp: stateVisitors.meal_OrderCustComp,//訂單客戶補償 應該是公司名稱，必須填寫客戶[公司名稱],[訪客姓名]，[來訪事由]
            meal_OrderCustMember: stateVisitors.meal_OrderCustMember,//訪客姓名 //ok //可以多人
            order_Desc: stateVisitors.order_Desc,//ok 來訪事由
            Active: true,
            "op": loginInfo.worker_ID
        })
        //console.log(res);
        let data = res.success
        if (data) {
            swalEditSuccess()
            store.isVisitorsAdd.click()
            handleClose()//彈窗關閉
        } else {
            swalErrorEdit()
        }

    } catch (err) {
        console.log(err);
    }
}
//刪除餐點
const hanldeDelete = async () => {
    let loginInfo = store.loginInfo[0]
    let meal_Order = ''
    switch (stateVisitors.default_MealOrder) {
        case '午餐':
            meal_Order = '午'
            break;
        case '晚餐':
            meal_Order = '晚'
            break;
        case '宵夜':
            meal_Order = '宵'
            break;
        case '早餐':
            meal_Order = '早'
            break;
    }
    //console.log(flatPickrState.dateRange);
    try {
        let res = await $cancelVisitors({
            worker_ID: loginInfo.worker_ID,
            order_Date: flatPickrState.dateRange,
            meal_Order: meal_Order,
            meal_OrderCust: 1,        //0：自己訂; 1：代客戶訂；
            active: false,            //false:取消; true:恢復
            "op": loginInfo.worker_ID
        }
        )
        //console.log(res);
        let data = res.success
        if (data) {
            swalEditDeleteSuccess()
            store.isVisitorsAdd.click()
            handleClose()//彈窗關閉
        } else {
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }
}
//彈窗關閉
const handleClose = () => {
    store.isVisitorsPopEdit.click()
}
onMounted(() => {
    store.isVisitorsEdit = isVisitorsEdit.value
})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5 ">
        <div class="col-sm-10 col-md-8">
            <h4 class="fw-normal">訪客訂餐編輯</h4>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇餐別</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別.."
                    v-model="stateVisitors.default_MealOrder" :disabled="!isShowButton">
                    <option value="午餐">午餐</option>
                    <option value="晚餐">晚餐</option>
                    <option value="宵夜">宵夜</option>
                    <option value="早餐">早餐</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label">選擇廠別</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別.."
                    v-model="stateVisitors.site_ID" :disabled="!isShowButton">
                    <option value="CY">CY</option>
                    <option value="JK8">JK8</option>
                    <option value="JKS">JKS</option>
                    <option value="TC">TC</option>
                    <option value="TRI">TRI</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">葷食數量</label>
                <input type="number" class="form-control" placeholder="" min="0" v-model="stateVisitors.meal_Number"
                    :disabled="!isShowButton" />
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">素食數量</label>
                <input type="number" class="form-control" placeholder="" min="0" v-model="stateVisitors.meal_Number2"
                    :disabled="!isShowButton" />
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">廠商名稱<span class="text-danger">*</span></label>
                <input type="text" class="form-control " placeholder="公司名稱" :disabled="!isShowButton" :class="{
                    'is-invalid': v$.meal_OrderCustComp.$errors.length,
                }" v-model="stateVisitors.meal_OrderCustComp" @blur="v$.meal_OrderCustComp.$touch" />
                <div v-if="v$.meal_OrderCustComp.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入公司名稱
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">訪客姓名</label>
                <input type="text" class="form-control " placeholder="可以填多個姓名或不填"
                    v-model="stateVisitors.meal_OrderCustMember" />
                <!-- <input type="text" class="form-control " placeholder="可以填多個姓名" :disabled="!isShowButton" :class="{
                                                                'is-invalid': v$.meal_OrderCustMember.$errors.length,
                                                            }" v-model="stateVisitors.meal_OrderCustMember" @blur="v$.meal_OrderCustMember.$touch" />
                                                            <div v-if="v$.meal_OrderCustMember.$errors.length" class="invalid-feedback animated fadeIn">
                                                                請輸入訪客姓名
                                                            </div> -->
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">來訪事由<span class="text-danger">*</span></label>
                <textarea class="form-control" id="example-textarea-input" :disabled="!isShowButton"
                    name="example-textarea-input" rows="2" placeholder="事由" style="resize:none;" :class="{
                        'is-invalid': v$.order_Desc.$errors.length,
                    }" v-model="stateVisitors.order_Desc" @blur="v$.order_Desc.$touch"></textarea>
                <div v-if="v$.order_Desc.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入來訪事由
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="example-flatpickr-default">選擇日期</label>
                <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="日期已過訂單無法修改"
                    v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
            </div>
            <div class="d-flex justify-content-start" v-if="isShowButton">
                <button type="button" class="btn btn-primary ms-1" @click="handleEdit">
                    編輯訂餐
                </button>
                <button type="button" class="btn  btn-danger ms-4" @click="hanldeDelete">
                    刪除訂餐
                </button>
            </div>
        </div>
    </div>
    <button type="button" ref="isVisitorsEdit" @click="handleChange" v-show="false"></button>
    <div class="col-md-6">
        <button type="button" @click="handleClose" v-show="false">關閉</button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalEditSuccess" v-show="false">
            <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEdit" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";
</style>