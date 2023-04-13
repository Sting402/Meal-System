<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from "vue";
import FlatPickr from "vue-flatpickr-component"
import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { $workDay } from '../../../api/personal/getWorkday'
import { $addVisitors } from '../../../api/personal/addVisitors'
import { usePersonaleStore } from '../../../stores/personal/personal';
import { storeToRefs } from "pinia";
const store = usePersonaleStore()
store.visitorsData = storeToRefs(store)
const stateVisitors = reactive({
    site_ID: '',
    default_MealOrder: '',
    default_MealType: '',
    meal_Number: 0,  //葷食數量
    meal_Number2: 0,   //素食數量
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
        //     minLength: maxLength(0),
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
    configCustom: { dateFormat: "d-m-Y", },
    configFriendly: { dateFormat: "F j, Y", },
    configRange: {
        mode: "single", minDate: "today",
        enable: []
    },
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
//等到有不行的再測試
function swalErrorEdit() {
    toast.fire("新增失敗", `${message}`, "error");
}
function swalEditSuccess() {
    toast.fire("新增成功", "訪客訂餐成功", "success");
}
//
let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
const getNoworkDates = async () => {
    try {
        //console.log(y);
        let res = await $workDay({ year: `${y}` })
        //console.log(res);
        let dates = res
        //console.log(list);
        const targetMonth = m; // 這裡指的是3月
        //console.log(targetMonth);
        // 過濾出符合條件的日期 dates
        const filteredDates = dates.filter((dateString) => {
            const date = new Date(dateString);
            //console.log(date.getMonth());//可以過濾出所有的月份
            return date.getMonth() === targetMonth; //從0開始 所有有落差
        });

        //console.log(filteredDates); // ["2023-03-07", "2023-03-19"]
        flatPickrState.configRange.enable = filteredDates
        //console.log(flatPickrState.configRange.enable);
    } catch (err) {
        console.log(err);
    }
}
//
let message = ''
const handleConfirm = async () => {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    let default_MealOrder = ''
    switch (stateVisitors.default_MealOrder) {
        case '午餐':
            default_MealOrder = '午'
            break;
        case '晚餐':
            default_MealOrder = '晚'
            break;
        case '宵夜':
            default_MealOrder = '宵'
            break;
        case '早餐':
            default_MealOrder = '早'
            break;
    }
    //console.log(default_MealOrder);
    //console.log(flatPickrState.dateRange);
    let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    try {
        let res = await $addVisitors({
            worker_ID: loginInfo.worker_ID,//ok
            dept_ID: loginInfo.dept_ID,//ok
            Site_ID: stateVisitors.site_ID,//ok
            order_Date: flatPickrState.dateRange,//ok
            meal_OrderCust: 1, //0：自己訂; 1：代客戶訂；
            meal_Order: default_MealOrder,//午 晚 ok
            meal_Type: '葷',//代客戶訂必填:第一種餐別
            "meal_Sort": 9,//1.第一餐 2.第二餐 3.第三餐 9.訪客
            meal_Number: stateVisitors.meal_Number,//代客戶訂必填:第一種餐別數量 ok
            meal_Type2: '素',//代客戶訂必填:第二種餐別
            meal_Number2: stateVisitors.meal_Number2, //代客戶訂必填:第二種餐別數量 ok
            meal_OrderCustComp: stateVisitors.meal_OrderCustComp,//公司名稱，必須填寫客戶[公司名稱],[訪客姓名]，[來訪事由]
            meal_OrderCustMember: stateVisitors.meal_OrderCustMember,//訪客姓名 //ok //可以多人
            order_Desc: stateVisitors.order_Desc,//ok 來訪事由
            Active: true,
            "op": loginInfo.worker_ID
        })
        console.log(res);
        let data = res
        //
        if (data) {
            console.log(data);
            message = data.success
            console.log(message);
            swalEditSuccess()
            store.isVisitorsAdd.click()
            handleClose()//彈窗關閉
        } else {
            message = data.message
            //console.log(message);
            swalErrorEdit()
        }

    } catch (err) {
        console.log(err);
    }
}
//彈窗關閉
const handleClose = () => {
    store.isOffcanvasRef.click()
}
watch(() => store.visitorsData,
    (newVal, oldVal) => {
        store.visitorsData = newVal
        console.log(store.visitorsData);
        switch (store.visitorsData.default_MealOrder) {
            case '午':
                stateVisitors.default_MealOrder = '晚餐'
                break;
            case '晚':
                stateVisitors.default_MealOrder = '宵夜'
                break;
            case '宵':
                stateVisitors.default_MealOrder = '早餐'
                break;
            case '早':
                stateVisitors.default_MealOrder = '午餐'
                break;
        }
        stateVisitors.site_ID = store.visitorsData.site_ID
    }
);
getNoworkDates()

onMounted(() => {

})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-1">
        <div class="col-sm-10 col-md-8">
            <h4 class="fw-normal">訪客代訂</h4>
            <div class="mb-4">
                <div class="mb-4">
                    <label class="form-label" for="block-form1-password">選擇餐別</label>
                    <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別.."
                        v-model="stateVisitors.default_MealOrder">
                        <option value="午餐">午餐</option>
                        <option value="晚餐">晚餐</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">選擇廠別</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別.."
                    v-model="stateVisitors.site_ID">
                    <option value="CY">CY</option>
                    <option value="JK8">JK8</option>
                    <option value="JKS">JKS</option>
                    <option value="TC">TC</option>
                    <option value="TRI">TRI</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">葷食數量</label>
                <input type="number" class="form-control" placeholder="" min="0" v-model="stateVisitors.meal_Number" />
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">素食數量</label>
                <input type="number" class="form-control" placeholder="" min="0" v-model="stateVisitors.meal_Number2" />
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">廠商名稱<span class="text-danger">*</span></label>
                <input type="text" class="form-control " placeholder="公司名稱" :class="{
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
                <!-- <div v-if="v$.meal_OrderCustMember.$errors.length" class="invalid-feedback animated fadeIn">
                                                                                                                                                                                                                                        請輸入訪客姓名
                                                                                                                                                                                                                                    </div> -->
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">來訪事由<span class="text-danger">*</span></label>
                <!-- <textarea class="form-control" id="example-textarea-input" name="example-textarea-input" rows="2"
                                                                                                                                                                                                                                                                                    placeholder="事由" style="resize:none;" v-model="stateVisitors.order_Desc"></textarea> -->
                <textarea class="form-control" id="example-textarea-input" name="example-textarea-input" rows="2"
                    placeholder="事由" style="resize:none;" :class="{
                        'is-invalid': v$.order_Desc.$errors.length,
                    }" v-model="stateVisitors.order_Desc" @blur="v$.order_Desc.$touch"></textarea>
                <div v-if="v$.order_Desc.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入來訪事由
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="example-flatpickr-default">選擇日期</label>
                <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="請選擇日期..."
                    v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
            </div>
            <div class="d-flex justify-content-start py-md-3">
                <div class="mb-4">
                    <button type="button" class="btn btn-primary leftovers-confirm" @click="handleConfirm">
                        確認
                    </button>
                </div>
            </div>
        </div>
    </div>
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