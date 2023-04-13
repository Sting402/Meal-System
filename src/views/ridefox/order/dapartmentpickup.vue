<script setup>
import { reactive, computed, onMounted, watch, ref, watchEffect } from "vue";
import Popin from '../../../components/Depatmentpickup/Popin.vue'
import PopinEdit from '../../../components/Depatmentpickup/PopinEdit.vue'
import Swal from "sweetalert2";
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
import { $departmentInfo } from '../../../api/depatmentpickup/getDepartment'
import { $editDelRestaurant } from '../../../api/depatmentpickup/editDelRestaurant'
import { useDepatmentpickupStore } from "../../../stores/depatmentpickup/depatmentpickup";
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
function swalErrorAdd() {
    toast.fire("刪除失敗", "請檢查對應關係", "error");
}
function swalAddSuccess() {
    toast.fire("刪除成功", "部門對應餐廳刪除成功", "success");
}
const store = useDepatmentpickupStore();
const cols = reactive([
    {
        name: "部門代號",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "所屬廠區",
        field: "site_ID",
        sort: "",
    },
    {
        name: "餐廳地點",
        field: "rest_Name ",
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
const isChange = ref('')
const departmentInfoList = reactive([])
console.log(isChange.value);
const handleEdit = (item) => {
    //console.log(item);
    store.index = item
    store.data = departmentInfoList.values
    console.log(store.data);
    //console.log(store.index);
    // console.log(store.data[0][item]);
}
const handleEditDel = async (item) => {
    console.log(item);
    console.log(departmentInfoList.values[item]);
    let res = await $editDelRestaurant({
        dept_ID: departmentInfoList.values[item].dept_ID,
        rest_ID: departmentInfoList.values[item].rest_ID,
    })
    let editDelRestaurant = res
    if (editDelRestaurant) {
        swalAddSuccess()
        getLocationInfo()
    } else {
        swalErrorAdd()
    }
}
const handleChange = async () => {
    try {
        getLocationInfo()
    } catch (err) {
        console.log(err);
    }
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

        let res = await $departmentInfo({})
        console.log(res);
        let data = res.payload
        console.log(data);
        departmentInfoList.values = data
        newStore[0] = departmentInfoList.values
        console.log(departmentInfoList.values);
        store.data = departmentInfoList.values
        loadingInstance.close()//
    } catch (err) {
        console.log(err);
    }
}
onMounted(() => {
    getLocationInfo()
    store.isChange = isChange.value
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
    <BasePageHeading title="部門取餐維護" subtitle="部門取餐維護功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">部門取餐維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="部門取餐地點">
            <template #options>
                <Popin></Popin>
            </template>
            <!-- <table class="table table-bordered table-striped table-vcenter">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 15%">部門代號</th>
                                                            <th style="width: 15%">所屬廠區</th>
                                                            <th style="width: 15%">餐廳地點</th>
                                                            <th style="width: 15%">刪除</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(list, item) in departmentInfoList.values ">
                                                            <td>{{ list.dept_ID }}</td>
                                                            <td>{{ list.site_ID }}</td>
                                                            <td>{{ list.rest_Name }}</td>
                                                            <td>
                                                                <div class="btn-group">
                                                                    <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="offcanvas"
                                                                        data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2"
                                                                        @click="handleEdit(item)" v-if="false">
                                                                        <i class="fa fa-fw fa-pencil-alt"></i>
                                                                    </button>
                                                                    <button type="button" class="btn btn-sm btn-alt-secondary" @click="handleEditDel(item)">
                                                                        <i class="fa fa-fw fa-times"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table> -->
            <Dataset v-slot="{ ds }" :ds-data="newStore[0]" :ds-sortby="sortBy"
                :ds-search-in="['dept_ID', 'site_ID', 'rest_Name']">
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
                                            <td class="text-center" style="min-width: 150px">{{ row.site_ID }}</td>
                                            <td class="text-center" style="min-width: 150px">{{ row.rest_Name }}</td>
                                            <td class="text-center">
                                                <div class="btn-group">
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
        </BaseBlock>
        <button @click="handleChange" ref="isChange" v-show="false">改變</button>
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