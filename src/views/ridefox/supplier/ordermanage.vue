<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, toRaw } from "vue";
import FlatPickr from "vue-flatpickr-component"
import { getToday } from '../../../utils/utils'
import Dep from '../../../components/Ordermanage/MultipleSelectDep.vue'
import Loc from '../../../components/Ordermanage/MultipleSelectLoc.vue'
import Type from '../../../components/Ordermanage/MultipleSelectType.vue'
import Supplier from '../../../components/Ordermanage/MultipleSelectSupplier.vue'
import { storeToRefs } from "pinia";
import { useOrdermanageStore } from '../../../stores/ordermanage/ordermanage'
const store = useOrdermanageStore()
const { count } = storeToRefs(store)
//console.log(count.value);
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
    configRange: { mode: "single", minDate: "2023-01-01", maxDate: new Date() },
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
// let today = getToday()
// flatPickrState.dateDefault = today
const hanldeConfirm = () => {
    //console.log(store.optionsMultipleSelectedDep);
    // let dep = toRaw(store.optionsMultipleSelectedDep);//toRaw可以將一個reactive變數轉換為一般的JavaScript object
    const dep = [...store.optionsMultipleSelectedDep];//2種方式將pinia proxy的方式轉成陣列
    const supplier = [...store.optionsMultipleSelectedSupplier]
    const type = toRaw(store.optionsMultipleSelectedType)
    console.log(dep, supplier, flatPickrState.dateDefault, type);
}
// 
const openExcelFile = () => {
    var a = document.createElement("a"); //创建一个<a></a>标签
    a.href = "/static/廠商訂購管理報表.xlsx"; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
    a.download = "廠商訂購管理報表.xlsx"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
    a.style.display = "none"; // 障眼法藏起来a标签
    document.body.appendChild(a); // 将a标签追加到文档对象中
    a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
    a.remove(); // 一次性的，用完就删除a标签
}

</script>
<template>
    <BasePageHeading title="廠商訂購管理報表" subtitle="">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">查詢報表</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">廠商訂購管理報表</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="廠商訂購管理報表" :rounded="true" header-class="bg-muted" themed>
            <div class="row items-push text-center">
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">選擇日期</label>
                    <FlatPickr id="example-flatpickr-default" class="form-control" placeholder="請選擇日期"
                        v-model="flatPickrState.dateDefault" :config="flatPickrState.configRange" />
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">供應商</label>
                    <Supplier></Supplier>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">餐別</label>
                    <Type></Type>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">部門</label>
                    <Dep></Dep>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">地點</label>
                    <Loc></Loc>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">確認</label>
                    <button type="button" class="btn btn-alt-secondary w-100" data-bs-toggle="tooltip"
                        data-bs-placement="left" title="Left Tooltip" @click="hanldeConfirm">
                        匯出資料
                    </button>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">下載</label>
                    <button type="button" class="btn btn-alt-secondary w-100" data-bs-toggle="tooltip"
                        data-bs-placement="left" title="Left Tooltip" @click="openExcelFile">
                        匯出EXCEL
                    </button>
                </div>
            </div>
        </BaseBlock>
    </div>
</template>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "../../../assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";
</style>