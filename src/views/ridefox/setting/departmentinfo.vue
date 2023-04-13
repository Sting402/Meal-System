<script setup>
import { reactive, computed, onMounted, watch, ref, watchEffect } from "vue";
import Swal from "sweetalert2";
import Popin from '../../../components/Departmentinfo/Popin.vue'
import PopinEdit from '../../../components/Departmentinfo/PopinEdit.vue'
import { ElLoading } from 'element-plus'//Loading加載
import {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from "vue-dataset";
import { readFile, character, delay } from '../../../utils/utils'
import { $departmentInfo } from '../../../api/departmentinfo/getDepartment'
import { $editDelDepartment } from '../../../api/departmentinfo/editDelDepartment'
import { useDepartmentInfoStore } from "../../../stores/departmentinfo/departmentinfo";
const store = useDepartmentInfoStore();
const cols = reactive([
    {
        name: "部門代號",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "部門英文縮寫",
        field: "dept_Name",
        sort: "",
    },
    {
        name: "部門英文全名",
        field: "dept_Desc",
        sort: "",
    },
    {
        name: "編輯/刪除",
        field: "eDit",
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
    toast.fire("刪除失敗", "請重新刪除", "error");
}
function swalEditSuccess() {
    toast.fire("刪除成功", "部門資料刪除成功", "success");
}
const isChange = ref('')
const departmentInfoList = reactive([

])

const handleEdit = (item) => {
    console.log(item);
    store.index = item
    store.data = departmentInfoList.values
    console.log(store.data);
    //console.log(store.index);
    // console.log(store.data[0][item]);
}
const handleEditDel = async (item) => {
    console.log(item);
    try {
        store.index = item
        //console.log(locationInfoList.values);
        store.data = departmentInfoList.values
        //console.log(store.data[item].site_ID);
        let res = await $editDelDepartment({
            dept_ID: store.data[item].dept_ID
        })
        console.log(res);
        let data = res.success
        if (data) {
            swalEditSuccess()
            getLocationInfo()
        } else {
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }
}
const handleChange = async () => {
    getLocationInfo()
}
const getLocationInfo = async () => {
    try {
        let loadingInstance = ElLoading.service({
            text: "加載中，稍待片刻",
            background: "rgba(0,0,0,.7)"
        })
        await delay(100)//等待讓畫面出面
        store.data = []
        departmentInfoList.values = []
        let res = await $departmentInfo({ "active": true })
        console.log(res);
        let data = res.payload
        console.log(data);
        departmentInfoList.values = data
        newStore[0] = departmentInfoList.values
        console.log(newStore[0]);
        console.log(departmentInfoList.values);
        store.data = departmentInfoList.values
        loadingInstance.close()//
    } catch (err) {
        console.log(err);
    }
}
onMounted(() => {
    getLocationInfo()
    console.log(isChange.value);
    store.isChange = isChange.value
    store.isChange.click()
    document.querySelectorAll("#datasetLength label").forEach((el) => {
        el.remove();
    });

    // Replace select classes
    let selectLength = document.querySelector("#datasetLength select");

    selectLength.classList = "";
    selectLength.classList.add("form-select");
    selectLength.style.width = "80px";
})
</script>
<template>
    <BasePageHeading title="部門資料維護" subtitle="部門維護功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">部門資料維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <!-- <div class="content">
                                <BaseBlock title="部門資料">
                                    <template #options>
                                        <Popin></Popin>
                                    </template>
                                    <table class="table table-bordered table-striped table-vcenter">
                                        <thead>
                                            <tr>
                                                <th class="text-center" style="width: 15%">部門代號</th>
                                                <th class="text-center" style="width: 15%">部門英文縮寫</th>
                                                <th class="text-center" style="width: 15%">部門英文全名</th>
                                                <th class="text-center" style="width: 5%">編輯/刪除</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list, item) in departmentInfoList.values ">
                                                <td class="text-center">{{ list.dept_ID }}</td>
                                                <td class="text-center">{{ list.dept_Name }}</td>
                                                <td class="text-center">{{ list.dept_Desc }}</td>
                                                <td class="text-center">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="offcanvas"
                                                            data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2"
                                                            @click="handleEdit(item)">
                                                            <i class="fa fa-fw fa-pencil-alt"></i>
                                                        </button>
                                                        <button type="button" class="btn btn-sm btn-alt-secondary" @click="handleEditDel(item)">
                                                            <i class="fa fa-fw fa-times"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </BaseBlock>
                                <button @click="handleChange" ref="isChange" v-show="false">改變</button>
                            </div> -->
    <div class="content">
        <BaseBlock title="部門資料" content-full>
            <template #options>
                <Popin></Popin>
            </template>
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
                                        <!-- <th scope="col">員工編號</th> -->
                                        <th v-for="(th, index) in     cols" :key="th.field" :class="['sort', th.sort]"
                                            @click="onSort($event, index)" class="text-center">
                                            {{ th.name }} <i class="gg-select float-end"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <DatasetItem tag="tbody" class="fs-sm">
                                    <template #default="{ row, rowIndex }">
                                        <tr>
                                            <!-- <th scope="row">{{ row.worker_ID }}</th> -->
                                            <th class="text-center" style="min-width: 150px">{{ row.dept_ID }}</th>
                                            <td class="text-center" style="min-width: 150px">{{ row.dept_Name }}</td>
                                            <td class="text-center" style="min-width: 150px">{{ row.dept_Desc }}</td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-sm btn-alt-secondary"
                                                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2"
                                                        aria-controls="offcanvasRight2" @click="handleEdit(rowIndex)">
                                                        <i class="fa fa-fw fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-sm btn-alt-secondary"
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
            <button @click="handleChange" ref="isChange" v-show="false">改變</button>
        </BaseBlock>
    </div>
    <PopinEdit></PopinEdit>
    <div class="col-md-6">
        <button type="button" class="btn btn-alt-secondary push" @click="swalEditSuccess" v-show="false">
            <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEdit" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss">
@import "sweetalert2/dist/sweetalert2.min.css";

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