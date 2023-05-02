<script setup>
import { ref, reactive, onMounted, computed, watchEffect, watch } from "vue";//要改成第三餐
import FlatPickr from "vue-flatpickr-component"
import Swal from "sweetalert2";
import { $selectSite } from '../../../api/defaultmeal/selectSite'
import { $addThird } from '../../../api/personal/addThird'
import { $workDay } from '../../../api/personal/getWorkday'
import { $addVisitors } from '../../../api/personal/addVisitors'
import { useAdminOrderStore } from '../../../stores/adminorder/select';
import { storeToRefs } from "pinia";
const store = useAdminOrderStore()
store.thirdData = storeToRefs(store)
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
function swalErrorEdit() {
    toast.fire("新增失敗", "請重新新增", "error");
}
function swalEditSuccess() {
    toast.fire("新增成功", "新增餐點成功", "success");
}
const state = reactive({
    site_ID: '',
    default_MealOrder: '',
    default_MealType: '',
    order_Desc: '', // //事由
    select: '',
    rest_ID: [],
})
const stateThird_MealOrder = ([
    { value: '午餐' },
    { value: '晚餐' },
    { value: '宵夜' },
    { value: '早餐' },
])
const selectedValue = ref('')
const handleMealType = async () => {
    siteChange()
}
const initSiteChange = async () => {
    try {
        let loginInfo = store.loginInfo[0]
        console.log(loginInfo.default_MealOrder)
        let meal_Order = ''
        switch (loginInfo.default_MealOrder) {
            case '午':
                meal_Order = '宵夜'
                break;
            case '晚':
                meal_Order = '早餐'
                break;
            case '宵':
                meal_Order = '午餐'
                break;
            case '早':
                meal_Order = '晚餐'
                break;
        }
        let res = await $selectSite({
            dept_ID: loginInfo.dept_ID,
            site_ID: loginInfo.site_ID,
            meal_Order: meal_Order
        })
        let data = res
        //console.log(data);
        //console.log(data.payload)
        state.rest_ID = data.payload
        //console.log(state.rest_ID);
        if (state.rest_ID.length === 1) {
            state.default_MealType = ['葷食', '素食'] //新增第二餐應該沒有輕食
        }
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
        state.default_MealOrder = meal_Order
    } catch (err) {
        console.log(err);
    }
}
const handleConfirm = async () => {
    //console.log(123);
    //console.log(flatPickrState.dateRange);
    let loginInfo = store.loginInfo[0]
    let adminInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    try {
        //console.log(state.default_MealOrder);
        let meal_Order = ''
        switch (state.default_MealOrder) {
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
        let Meal_Type = ''
        switch (selectedValue.value) {
            case '葷食':
                Meal_Type = '葷'
                break;
            case '素食':
                Meal_Type = '素'
                break;
        }
        let res = await $addThird({
            worker_ID: loginInfo.worker_ID,
            dept_ID: loginInfo.dept_ID,
            site_ID: state.site_ID,
            meal_OrderCust: 2,  //0：自己訂; 1：代客戶訂；2：管理者代訂員工的第三餐；
            // meal_Order: state.default_MealOrder,
            meal_Order: meal_Order,
            // meal_Type: selectedValue.value,
            Meal_Type: Meal_Type,
            order_Date: flatPickrState.dateRange,
            meal_Number: 1,
            "order_Desc": state.order_Desc,
            Active: true,
            "op": adminInfo.worker_ID
        })
        console.log(res);
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
initSiteChange()
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
            return date.getMonth() === targetMonth; //從0開始 所有有落差
        });

        //console.log(filteredDates); // ["2023-03-07", "2023-03-19"]
        flatPickrState.configRange.enable = filteredDates
        //console.log(flatPickrState.configRange.enable);
    } catch (err) {
        console.log(err);
    }
}
getNoworkDates()
//彈窗關閉
const handleClose = () => {
    store.isOffcanvasRef.click()
}
watch(() => store.thirdData,
    (newVal, oldVal) => {
        console.log(newVal);
        store.thirdData = newVal
        console.log(store.thirdData.default_MealOrder);
        switch (store.thirdData.default_MealOrder) {
            case '午':
                state.default_MealOrder = '晚餐'
                break;
            case '晚':
                state.default_MealOrder = '宵夜'
                break;
            case '宵':
                state.default_MealOrder = '早餐'
                break;
            case '早':
                state.default_MealOrder = '午餐'
                break;
        }
    }
);
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-1">
        <div class="col-sm-10 col-md-8">
            <h3 class="fw-normal" style="font-weight: 900;">管理者代訂第三餐</h3>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">餐別</label>
                <select class="form-select" id="example-select" name="example-select" v-model="state.default_MealOrder"
                    disabled="true">
                    <option v-for="item in  stateThird_MealOrder " :value="item.value" :key="item">{{ item.value }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-username">選擇廠別</label>
                <div id="app">
                    <select id="default-select" class="form-select" v-model="state.site_ID" @change="siteChange">
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
                    <select class="form-select" id="default-select" v-model="selectedValue" @change="handleMealType">
                        <option :value="list" v-for="(list, item) in state.default_MealType" :key="item">
                            {{ list }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="example-flatpickr-default">選擇日期</label>
                <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="請選擇日期..."
                    v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">訂餐事由<span class="text-danger">*</span></label>
                <textarea class="form-control" id="example-textarea-input" name="example-textarea-input" rows="2"
                    placeholder="事由" style="resize:none;" v-model="state.order_Desc"></textarea>
            </div>
            <div class="d-flex justify-content-start py-md-3">
                <div class="mb-4">
                    <button type="button" class="btn btn-primary" @click="handleConfirm">
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