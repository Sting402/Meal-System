<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import FlatPickr from "vue-flatpickr-component"
import FileSaver from 'file-saver';
import Swal from "sweetalert2";
import { $suppliersOrderReport } from '../../../api/searchproviding/suppliersOrderReport'
import axios from 'axios'
// Flatpickr variables
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
    configRange: { minDate: "today", minDate: "2023-01-01", maxDate: new Date() },
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
const selectedValue = ref('請選擇餐別')
const options = [
    { value: '請選擇餐別' },
    { value: '早餐' },
    { value: '午餐' },
    { value: '晚餐' },
    { value: '宵夜' }
];
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
let message = ''
function swalSuccess() {
    toast.fire("下載成功", "Excel下載成功", "success");
}
function swalError() {
    toast.fire("下載失敗", `${message}`, "error");
}
//
const hanldeConfirm = async () => {
    console.log(flatPickrState.dateDefault);
    if (!flatPickrState.dateDefault) {
        console.log('null');
        message = '請選擇日期'
        swalError()
        return
    }
    if (selectedValue.value == '請選擇餐別') {
        console.log('null');
        message = '請選擇餐別'
        swalError()
        return
    }
    try {
        let loginInfo = await JSON.parse(sessionStorage.getItem('loginInfo'))
        console.log(loginInfo.supplier_ID);
        let res = await axios.post('http://220.133.235.3:5020/api/Report/SuppliersOrderReport', {
            "supplier_ID": loginInfo.supplier_ID,
            "order_Date": flatPickrState.dateDefault,
            "meal_Order": selectedValue.value.substring(0, 1)
        }, {
            responseType: 'blob' // 將響應類型設置為blob
        });
        console.log(res);
        let data = res.data
        console.log(data);
        if (data) {
            const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
            // FileSaver.saveAs(blob, 'report.xlsx');//不然會下載2次
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'report.xlsx';
            downloadLink.click();
            swalSuccess()
        } else {
            swalError()
        }
    } catch (err) {
        console.log(err);
    }
}
// const openExcelFile = () => {
//     var a = document.createElement("a");
//     a.href = "/static/Meal_List.xlsx";
//     a.download = "廠商出餐查詢.xlsx";
//     a.style.display = "none";
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
// }

</script>
<template>
    <BasePageHeading title="廠商出餐查詢報表" subtitle="">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">查詢報表</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">廠商出餐查詢報表</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="供應商" :rounded="true" header-class="bg-muted" themed>
            <div class="row items-push text-center">
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">餐別</label>
                    <select class="form-select" id="example-select" name="example-select" v-model="selectedValue">
                        <option v-for="(list, item) in options" :key="item" :value="list.value">{{ list.value }}</option>
                    </select>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">日期</label>
                    <FlatPickr id="example-flatpickr-default" class="form-control" placeholder="請選擇日期"
                        v-model="flatPickrState.dateDefault" :config="flatPickrState.configRange" />
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">下載</label>
                    <button type="button" class="btn btn-alt-secondary w-100" data-bs-toggle="tooltip"
                        data-bs-placement="left" title="Left Tooltip" @click="hanldeConfirm">
                        匯出資料
                    </button>
                </div>
                <!-- <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">下載</label>
                    <button type="button" class="btn 
                            btn-alt-secondary w-100" data-bs-toggle="tooltip" data-bs-placement="left"
                        title="Left Tooltip" @click="openExcelFile">
                        匯出EXCEL
                    </button>
                </div> -->
            </div>
        </BaseBlock>
    </div>
</template>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "../../../assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";
</style>