<script setup>
import { reactive, ref, onMounted, toRaw, computed } from "vue";
import FlatPickr from "vue-flatpickr-component"
import { saveAs } from 'file-saver';//匯出excel用
import Type from '../../../components/Reference/MultipleSelectType.vue';
import * as xlsx from "xlsx";
import Pro from '../../../components/Reference/MultipleSelectPro.vue'
import {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from "vue-dataset";
import { useReferenceInfoStore } from '../../../stores/reference/reference'
import { $departmentInfo } from '../../../api/departmentinfo/getDepartment'
const store = useReferenceInfoStore()
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
    configRange: { mode: "range", minDate: "2023-01-01", maxDate: new Date() },
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
const hanldeConfirm = () => {
    //console.log(store.optionsMultipleSelectedDep);
    // let dep = toRaw(store.optionsMultipleSelectedDep);//toRaw可以將一個reactive變數轉換為一般的JavaScript object
    const type = toRaw(store.optionsMultipleSelectedType)
    const site = toRaw(store.optionsMultipleSelectedSite)
    console.log(flatPickrState.dateRange, type, site);
}
//
const cols = reactive([
    // {
    //     name: "廠別",
    //     field: "dept_ID",
    //     sort: "",
    // },
    // {
    //     name: "部門英文縮寫",
    //     field: "dept_Name",
    //     sort: "",
    // },
    // {
    //     name: "部門英文全名",
    //     field: "dept_Desc",
    //     sort: "",
    // },
    // {
    //     name: "編輯/刪除",
    //     field: "eDit",
    //     sort: "",
    // },
    {
        name: "廠別",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "日期",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "餐別午",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "餐別晚",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "餐別宵",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "餐別早",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "餐別總計",
        field: "dept_ID",
        sort: "",
    },
]);
const sortBy = computed(() => {
    return cols.reduce((acc, o) => {
        if (o.sort) {
            o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
        }
        return acc;
    }, []);
});
function onSort(event, i) {
    let toset;
    const sortEl = cols[i];

    if (!event.shiftKey) {
        cols.forEach((o) => {
            if (o.field !== sortEl.field) {
                o.sort = "";
            }
        });
    }

    if (!sortEl.sort) {
        toset = "asc";
    }

    if (sortEl.sort === "desc") {
        toset = event.shiftKey ? "" : "asc";
    }

    if (sortEl.sort === "asc") {
        toset = "desc";
    }

    sortEl.sort = toset;
}
const newStore = reactive([])

const handleEdit = (item) => {
    console.log(item);
}
const handleEditDel = async (item) => {
    console.log(item);
}
const departmentInfoList = reactive([

])
const getLocationInfo = async () => {
    try {
        store.data = []
        departmentInfoList.values = []
        let res = await $departmentInfo({ "active": true })
        console.log(res);
        let data = res.payload
        //console.log(data);
        departmentInfoList.values = data
        store.data = departmentInfoList.values
        newStore[0] = departmentInfoList.values
    } catch (err) {
        console.log(err);
    }
}
getLocationInfo()
// 
const openExcelFile = () => {
    var a = document.createElement("a"); //创建一个<a></a>标签
    a.href = "/static/test.xlsx"; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
    a.download = "test.xlsx"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
    a.style.display = "none"; // 障眼法藏起来a标签
    document.body.appendChild(a); // 将a标签追加到文档对象中
    a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
    a.remove(); // 一次性的，用完就删除a标签
}
const handleConfirm = () => {
    console.log(store.isSelectedDay);
    store.isflatPickrChange.click()
    console.log(store.isSelectedSite);
    console.log(store.isSelectedType);
}
// const exportExcelFile = () => {
//     console.log(store.data);
//     //生成 Excel 文件
//     const worksheet = xlsx.utils.json_to_sheet(store.data);
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     // 生成 Excel 文件并保存到本地
// const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
// const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// saveAs(blob, '員工資料表.xlsx'); // 保存文件到本地
//     // fetch('/public/employees.json')
//     //     .then(response => response.json())
//     //     .then(data => {
//     //     })
//     //     .catch(error => {
//     //         console.error('读取JSON文件时出错：', error);
//     //     });
// }
function formatDate(date, fmt) {
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}
let arr = []
const exportExcelFile = async () => {
    const response = await fetch('/static/test.xlsx');
    const dataBuffer = await response.arrayBuffer();
    const workbook = xlsx.read(dataBuffer, { type: 'array' });

    // 读取透视表 1
    const pivotSheetName1 = workbook.SheetNames[1];
    const pivotWorksheet1 = workbook.Sheets[pivotSheetName1];
    const pivotData1 = xlsx.utils.sheet_to_csv(pivotWorksheet1, { header: 1, defval: '' });

    // 读取透视表 2
    const pivotSheetName2 = workbook.SheetNames[2];
    const pivotWorksheet2 = workbook.Sheets[pivotSheetName2];
    const pivotData2 = xlsx.utils.sheet_to_json(pivotWorksheet2, { header: 1, defval: '' });

    // 读取普通工作表
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // 修改数据
    const newData = data.map((item) => {
        if (item.日期) {
            const dateValue = new Date((item.日期 - (25567 + 2)) * 86400 * 1000);
            item.日期 = formatDate(dateValue, 'yyyy-MM-dd');
        }
        return item;
    });

    // 添加新数据到数组
    newData.unshift({
        廠區: 'CKS',
        數量: 107,
        日期: '2023-11-26',
    });

    const newWorksheet = xlsx.utils.json_to_sheet(newData);

    const newWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    xlsx.utils.book_append_sheet(newWorkbook, pivotWorksheet1, pivotSheetName1);
    xlsx.utils.book_append_sheet(newWorkbook, pivotWorksheet2, pivotSheetName2);



    const excelBuffer = xlsx.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, '員工資料表.xlsx');
};
onMounted(() => {
    // Remove labels from
    // document.querySelectorAll("#datasetLength label").forEach((el) => {
    //     el.remove();
    // });

    // // Replace select classes
    // let selectLength = document.querySelector("#datasetLength select");

    // selectLength.classList = "";
    // selectLength.classList.add("form-select");
    // selectLength.style.width = "80px";
});
</script>
<template>
    <!-- <button @click="exportExcelFile">匯出Excel</button> -->
    <BasePageHeading title="廠商參考值報表" subtitle="">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">查詢報表</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">廠商參考值報表</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="廠商參考值報表" :rounded="true" header-class="bg-muted" themed>
            <div class="row items-push text-center">
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">選擇日期</label>
                    <!-- <FlatPickr></FlatPickr> -->
                    <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="請選擇日期"
                        v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">廠別</label>
                    <Pro></Pro>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">餐別</label>
                    <Type></Type>
                </div>
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">確認</label>
                    <button type="button" class="btn btn-alt-secondary w-100" data-bs-toggle="tooltip"
                        data-bs-placement="left" title="Left Tooltip" @click="hanldeConfirm">
                        匯出資料
                    </button>
                </div>
                <!-- <div class="col-sm-6 col-xl-4 col-md-4">
                                                                                                                                            <label class="form-label" for="example-select">確認輸出</label>
                                                                                                                                            <button type="button" class="btn btn-primary w-100" data-bs-toggle="tooltip" data-bs-placement="left"
                                                                                                                                                title="Left Tooltip" @click="handleConfirm">
                                                                                                                                                確定
                                                                                                                                            </button>
                                                                                                                                        </div> -->
                <div class="col-sm-6 col-xl-4 col-md-4">
                    <label class="form-label" for="example-select">下載</label>
                    <button type="button" class="btn  btn-alt-secondary w-100" data-bs-toggle="tooltip"
                        data-bs-placement="left" title="Left Tooltip" @click="openExcelFile">
                        匯出EXCEL
                    </button>
                </div>
            </div>
        </BaseBlock>
    </div>
    <!-- <div class="content">
                                                                                                                                    <BaseBlock title="資料" content-full>
                                                                                                                                        <Dataset v-slot="{ ds }" :ds-data="newStore[0]" :ds-sortby="sortBy"
                                                                                                                                            :ds-search-in="['dept_ID', 'dept_Name', 'dept_Desc']">
                                                                                                                                            <div class="row" :data-page-count="ds.dsPagecount">

                                                                                                                                                <div id="datasetLength" class="col-md-8 py-2">
                                                                                                                                                    <DatasetShow />
                                                                                                                                                </div>
                                                                                                                                                <div class="col-md-4 py-2">
                                                                                                                                                    <DatasetSearch ds-search-placeholder="搜尋" />
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <hr />
                                                                                                                                            <div class="row">
                                                                                                                                                <div class="col-md-12">
                                                                                                                                                    <div class="table-responsive">
                                                                                                                                                        <table class="table table-striped mb-0">
                                                                                                                                                            <thead>
                                                                                                                                                                <tr>
                                                                                                                                                                    <th v-for="(th, index) in     cols" :key="th.field" :class="['sort', th.sort]"
                                                                                                                                                                        @click="onSort($event, index)" class="text-center">
                                                                                                                                                                        {{ th.name }} <i class="gg-select float-end"></i>
                                                                                                                                                                    </th>
                                                                                                                                                                </tr>
                                                                                                                                                            </thead>
                                                                                                                                                            <DatasetItem tag="tbody" class="fs-sm">
                                                                                                                                                                <template #default="{ row, rowIndex }">
                                                                                                                                                                    <tr>
                                                                                                                                                                        <th class="text-center" style="min-width: 150px">{{ row.dept_ID }}</th>
                                                                                                                                                                        <td class="text-center" style="min-width: 150px">{{ row.dept_Name }}</td>
                                                                                                                                                                        <td class="text-center" style="min-width: 150px">{{ row.dept_Desc }}</td>
                                                                                                                                                                        <td class="text-center">
                                                                                                                                                                            <div class="btn-group">
                                                                                                                                                                                <button type="button" class="btn btn-sm btn-primary"
                                                                                                                                                                                    style="margin-right: 4px;" @click="handleEdit(rowIndex)">
                                                                                                                                                                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                                                                                                                                                                </button>
                                                                                                                                                                                <button type="button" class="btn btn-sm btn-danger"
                                                                                                                                                                                    @click="handleEditDel(rowIndex)">
                                                                                                                                                                                    <i class="fa fa-fw fa-times"></i>
                                                                                                                                                                                </button>
                                                                                                                                                                            </div>
                                                                                                                                                                        </td>
                                                                                                                                                                    </tr>
                                                                                                                                                                </template>
                                                                                                                                                            </DatasetItem>
                                                                                                                                                        </table>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
                                                                                                                                                <DatasetInfo class="py-3 fs-sm" />
                                                                                                                                                <DatasetPager class="flex-wrap py-3 fs-sm" />
                                                                                                                                            </div>
                                                                                                                                        </Dataset>
                                                                                                                                    </BaseBlock>
                                                                                                                                </div> -->
</template>
<style lang="scss" scoped>
.gg-select {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(1);
    width: 22px;
    height: 22px;
}

.gg-select::after,
.gg-select::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 8px;
    height: 8px;
    left: 7px;
    transform: rotate(-45deg);
}

.gg-select::before {
    border-left: 2px solid;
    border-bottom: 2px solid;
    bottom: 4px;
    opacity: 0.3;
}

.gg-select::after {
    border-right: 2px solid;
    border-top: 2px solid;
    top: 4px;
    opacity: 0.3;
}

th.sort {
    cursor: pointer;
    user-select: none;

    &.asc {
        .gg-select::after {
            opacity: 1;
        }
    }

    &.desc {
        .gg-select::before {
            opacity: 1;
        }
    }
}
</style>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "../../../assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";
</style>