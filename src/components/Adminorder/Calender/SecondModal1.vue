<script setup>
import { ref, reactive, onMounted, computed, watchEffect } from "vue";
import FlatPickr from "vue-flatpickr-component"
import Swal from "sweetalert2";
import { $selectSite } from '../../../api/defaultmeal/selectSite'
import { $addSecond } from '../../../api/personal/addSecond'
import { $cancelSecond } from '../../../api/personal/cancelSecond'
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const store = useAdminOrderStore()
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
const isSecondEdit = ref('')
const state = reactive({
    site_ID: '',
    Second_MealOrder: '',
    default_MealType: '',
    select: [],
    rest_ID: [],
    shift: ''
})
const stateSecond_MealOrder = ([
    { value: '午餐' },
    { value: '晚餐' },
    { value: '宵夜' },
    { value: '早餐' },
])
const selectedValue = ref('');
const initSiteChange = async () => {
    try {
        let loginInfo = store.loginInfo[0]
        console.log(loginInfo.default_MealType)
        let meal_Order = ''
        switch (loginInfo.default_MealOrder) {
            case '午':
                meal_Order = '晚餐'
                break;
            case '晚':
                meal_Order = '宵夜'
                break;
            case '宵':
                meal_Order = '早餐'
                break;
            case '早':
                meal_Order = '午餐'
                break;
        }
        let res = await $selectSite({
            dept_ID: loginInfo.dept_ID,
            site_ID: loginInfo.site_ID,
            meal_Order: meal_Order
        })
        let data = res
        console.log(data);
        //console.log(data.payload)
        state.rest_ID = data.payload
        //console.log(state.rest_ID);
        if (state.rest_ID.length === 1) {
            state.default_MealType = ['葷食', '素食'] //新增第二餐應該沒有輕食
        } //else {
        //     state.default_MealType = ['葷食', '素食', '輕食']
        // }
        // console.log(state.default_MealType);
        //console.log(state.site_ID);
        //console.log(selectedValue.value);
        // console.log(loginInfo.default_MealType)
        let meal_MealType = ''
        switch (loginInfo.default_MealType) {
            case '葷':
                meal_MealType = '葷食'
                break;
            case '素':
                meal_MealType = '素食'
                break;
            case '輕':
                meal_MealType = '輕食'
                break;
        }
        selectedValue.value = meal_MealType
        state.site_ID = loginInfo.site_ID
    } catch (err) {
        console.log(err);
    }
}
//
const initSecond_MealOrder = async () => {
    let loginInfo = store.loginInfo[0]
    let meal_Order = ''
    switch (loginInfo.default_MealOrder) {
        case '午':
            meal_Order = '晚餐'
            break;
        case '晚':
            meal_Order = '宵夜'
            break;
        case '宵':
            meal_Order = '早餐'
            break;
        case '早':
            meal_Order = '午餐'
            break;
    }
    state.Second_MealOrder = meal_Order
}
const handleChange = () => {
    console.log(store.secondEditData);
    selectedValue.value = store.secondEditData.default_MealType
    let selectedDay = store.secondEditData.selectedDay
    flatPickrState.dateRange = selectedDay.substring(0, 10)
    console.log(store.secondEditData);
    isShowButton.value = store.secondEditData.enable
}

const handleEdit = async () => {
    //console.log(flatPickrState.dateRange);
    let loginInfo = store.loginInfo[0]
    try {
        //console.log(state.Second_MealOrder);
        let meal_Order = ''
        switch (state.Second_MealOrder) {
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
        let Meal_Type = ''
        switch (selectedValue.value) {
            case '葷食':
                Meal_Type = '葷'
                break;
            case '素食':
                Meal_Type = '素'
                break;
        }
        //console.log(Meal_Type);
        console.log(state.site_ID);
        let res = await $addSecond({
            worker_ID: loginInfo.worker_ID,
            dept_ID: loginInfo.dept_ID,
            site_ID: state.site_ID,
            meal_OrderCust: 0,  //0：自己訂; 1：代客戶訂；
            meal_Order: meal_Order,
            Meal_Type: Meal_Type,
            meal_Number: 1,
            order_Date: flatPickrState.dateRange,
            Active: true,
        })
        //console.log(res);
        let data = res.success
        if (data) {
            swalEditSuccess()
            store.isSecondAdd.click()
            handleClose()//彈窗關閉
        } else {
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }

}
const handleDelete = async () => {
    let loginInfo = store.loginInfo[0]
    let meal_Order = ''
    switch (state.Second_MealOrder) {
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
    let Meal_Type = ''
    switch (selectedValue.value) {
        case '葷食':
            Meal_Type = '葷'
            break;
        case '素食':
            Meal_Type = '素'
            break;
    }
    //console.log(Meal_Type);
    //console.log(state.site_ID);
    //console.log(flatPickrState.dateRange);
    try {
        let res = await $cancelSecond({
            worker_ID: loginInfo.worker_ID,
            order_Date: flatPickrState.dateRange,
            meal_Order: meal_Order,
            meal_OrderCust: 0,        //0：自己訂; 1：代客戶訂；
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
    store.isSecondPopEdit.click()
}
initSiteChange()
initSecond_MealOrder()
onMounted(() => {
    store.isSecondEdit = isSecondEdit.value
})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">餐別</label>
                <select class="form-select" id="example-select" name="example-select" v-model="state.Second_MealOrder"
                    disabled="true">
                    <option v-for="item in  stateSecond_MealOrder " :value="item.value" :key="item">{{ item.value }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-username">選擇廠別</label>
                <div id="app">
                    <select id="default-select" class="form-select" v-model="state.site_ID" :disabled="!isShowButton">
                        <option value="CY">CY</option>
                        <option value="JK8">JK8</option>
                        <option value="JKS">JKS</option>
                        <option value="LJ">LJ</option>
                        <option value="TC">TC</option>
                        <option value="TRI">TRI</option>
                        <option value="WQ">WQ</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇類型</label>
                <div id="app">
                    <select class="form-select" id="default-select" v-model="selectedValue" @change="handleMealType"
                        :disabled="!isShowButton">
                        <option :value="list" v-for="(list, item) in state.default_MealType" :key="item">
                            {{ list }}</option>
                    </select>
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
                <button type="button" class="btn  btn-danger ms-4" @click="handleDelete">
                    刪除訂餐
                </button>
            </div>
            <button type="button" ref="isSecondEdit" @click="handleChange" v-show="false"></button>
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