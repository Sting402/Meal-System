<script setup>
import { reactive, ref, onMounted, watch, toRaw } from "vue";
import FlatPickr from "vue-flatpickr-component"
import Ratings from '../../../components/Orderratings/Ratings.vue'
import { $getSite } from '../../../api/restaurant/getSite'
import { $workDay } from '../../../api/personal/getWorkday'
import { $selectSite } from '../../../api/defaultmeal/selectSite'
import { storeToRefs } from "pinia";
import { useOrderratingsStore } from '../../../stores/orderratings/orderratings';
const store = useOrderratingsStore()
store.starRatingSize = storeToRefs(store)
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
    configRange: {
        mode: "single", minDate: "2023-01-01",
        maxDate: new Date(), enable: []
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
flatPickrState.dateRange = new Date()
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
        flatPickrState.configRange.enable = filteredDates //先篩選整個月份
        //console.log(flatPickrState.configRange.enable);
    } catch (err) {
        console.log(err);
    }
}
getNoworkDates()
//
const state = reactive({
    site_ID: [],
    MealOrder: '',//午餐
    MealType: '',
    supplier: ''
})
const stateConfirm = reactive({
    site_ID: "",
    MealOrder: "",
    MealType: "",
    supplier: ""
})
//選擇廠區
const getSite = async () => {
    try {
        state.site_ID = []
        let res = await $getSite({ "active": true })
        //console.log(res);
        if (res.success) {
            let data = res.payload
            //console.log(data);
            data.forEach((item) => {
                state.site_ID.push(item.site_ID)
            })
            //console.log(state.site_ID);
            let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
            stateConfirm.site_ID = loginInfo.site_ID
        } else {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
//確認送出 
const handleconfirm = () => {
    console.log(stateConfirm.site_ID);
    console.log(store.starRatingSize);
}
//先模擬
getSite()
</script>
<template>
    <BasePageHeading title="餐點評分" subtitle="歡迎多利用評分系統">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">餐點</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">餐點評分</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <!-- <form @submit.prevent> -->
                <BaseBlock title="餐點評分">
                    <template #options>
                        <button type="submit" class="btn btn-sm btn-primary" @click="handleconfirm">
                            送出評分
                        </button>
                    </template>
                    <div class="row justify-content-center py-sm-3 py-md-5">
                        <div class="col-sm-8 col-md-4">
                            <div class="mb-4">
                                <label class="form-label" for="example-flatpickr-default">選擇日期</label>
                                <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="請選擇日期..."
                                    v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="block-form1-username">廠別</label>
                                <div id="app">
                                    <select id="default-select" class="form-select" v-model="stateConfirm.site_ID"
                                        disabled="true">
                                        <option v-for="(list, item) in state.site_ID" :value="list" :key="item">{{ list }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="block-form1-password">選擇餐別</label>
                                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別">
                                    <option value="1">午餐</option>
                                    <option value="2">晚餐</option>
                                    <option value="3">宵夜</option>
                                    <option value="4">早餐</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="block-form1-password">選擇類型</label>
                                <select class="form-select" id="example-select" name="example-select" placeholder="選擇類型">
                                    <!-- <option selected>公司別(請款)..</option> -->
                                    <option value="1">葷食</option>
                                    <option value="2">素食</option>
                                    <option value="3">輕食</option>
                                    <option value="4">菲餐</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" id="orderratings-supplier">供應商</label>
                                <select class="form-select" id="example-select" name="example-select" placeholder="選擇類型">
                                    <option value="好食客">好食客</option>
                                    <option value="全誠">全誠</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="block-form1-password">選擇評分</label>
                                <Ratings></Ratings>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="block-form1-username">備註</label>
                                <div class="mb-2">
                                    <textarea class="form-control" id="example-textarea-input" name="example-textarea-input"
                                        rows="2" placeholder="輸入事由" style="resize:none;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseBlock>
                <!-- </form> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "../../../assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";
</style>