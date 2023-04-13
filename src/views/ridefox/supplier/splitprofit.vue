<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import FlatPickr from "../../../components/Splitprofit/FlatPickr.vue";
import Supplier from '../../../components/Splitprofit/MultipleSelectSupplier.vue';
import Dep from '../../../components/Splitprofit/MultipleSelectDep.vue'
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
    configRange: { minDate: "today" },
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
const openExcelFile = () => {
    var a = document.createElement("a"); //创建一个<a></a>标签
    a.href = "/static/廠商公司分帳報表.xlsx"; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
    a.download = "廠商公司分帳報表.xlsx"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
    a.style.display = "none"; // 障眼法藏起来a标签
    document.body.appendChild(a); // 将a标签追加到文档对象中
    a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
    a.remove(); // 一次性的，用完就删除a标签
}

</script>
<template>
    <BasePageHeading title="廠商公司分帳報表" subtitle="分帳報表">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">查詢報表</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">廠商公司分帳報表</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="廠商公司分帳報表" :rounded="true" header-class="bg-muted" themed>
            <div class="row items-push text-center">
                <div class="col-sm-6 col-xl-2 col-md-2">
                    <label class="form-label" for="example-select">日期</label>
                    <FlatPickr id="example-flatpickr-default" class="form-control" placeholder="請選擇日期"
                        v-model="flatPickrState.dateDefault" />
                    <!-- <button type="button" class="btn btn-primary w-100" data-bs-toggle="tooltip"
                        data-bs-placement="bottom" title="Bottom Tooltip">
                        Bottom
                    </button> -->
                </div>
                <div class="col-sm-6 col-xl-2 col-md-2">
                    <label class="form-label" for="example-select">請款廠商</label>
                    <Supplier></Supplier>
                </div>
                <div class="col-sm-6 col-xl-2 col-md-2">
                    <label class="form-label" for="example-select">部門(請款)</label>
                    <Dep></Dep>
                </div>
                <div class="col-sm-6 col-xl-2 col-md-2">
                    <label class="form-label" for="example-select">公司別</label>
                    <select class="form-select" id="example-select" name="example-select" placeholder="公司別(請款)">
                        <option selected>公司別(請款)</option>
                        <option value="1">Suspension</option>
                    </select>
                </div>
                <div class="col-sm-6 col-xl-2 col-md-2">
                    <label class="form-label" for="example-select">公司別</label>
                    <select class="form-select" id="example-select" name="example-select" placeholder="公司別(請款)">
                        <option selected>公司別(請款)</option>
                        <option value="1">Component</option>
                    </select>
                </div>
                <div class="col-sm-6 col-xl-2 col-md-2">
                    <label class="form-label" for="example-select">下載</label>
                    <button type="button" class="btn 
btn-alt-secondary w-100" data-bs-toggle="tooltip" data-bs-placement="left" title="Left Tooltip" @click="openExcelFile">
                        匯出EXCEL
                    </button>
                </div>
            </div>
        </BaseBlock>
    </div>
</template>
<style lang="scss">
// FullCalendar custom overrides  一定要加 不然畫面不顯示
@import "flatpickr/dist/flatpickr.css";
</style>

<!-- <script setup>
import { reactive } from "vue";


</script>

<template>
    <BasePageHeading title="廠商公司分帳報表" subtitle="分帳報表">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">查詢報表</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">廠商公司分帳報表</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading> -->

<!-- 
    <div class="content">
        <BaseBlock title="請款區間" id="supplier-baseblock">
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th>
                                <MultipleSelectPro></MultipleSelectPro>
                            </th>
                            <th>
                                <MultipleSelectDep></MultipleSelectDep>
                            </th>
                            <th>
                                <select class="form-select" id="example-select" name="example-select"
                                    placeholder="公司別(請款)..">
                                    <option selected>公司別(請款)..</option>
                                    <option value="1">Suspension</option>
                                </select>
                            </th>
                            <th>
                                <select class="form-select" id="example-select" name="example-select"
                                    placeholder="公司別(請款)..">
                                    <option selected>公司別(請款)..</option>
                                    <option value="1">Component</option>
                                </select>
                            </th>
                            <th>總計 結果</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>好食客</td>
                            <td>810</td>
                            <td>7190</td>
                            <td></td>
                            <td>7190</td>

                        </tr>
                        <tr>
                            <td>好食客</td>
                            <td>821</td>
                            <td>12670</td>
                            <td></td>
                            <td>12670</td>
                        </tr>
                        <tr>
                            <td>好食客</td>
                            <td>Component</td>
                            <td></td>
                            <td>19860</td>
                            <td>19860</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </BaseBlock>
    </div>
</template> -->