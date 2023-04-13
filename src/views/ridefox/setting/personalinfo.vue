<script setup>
import { reactive, computed, onMounted, watch, ref, watchEffect } from "vue";
import { ElLoading } from 'element-plus'//Loading加載
import { readFile, character, delay } from '../../../utils/utils'
import Upload from '../../../components/Personalinfo/ExcelUpload.vue'
// Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from "vue-dataset";
// Get example data
import users from "@/data/usersDataset.json";
//導入請求api
import { $personalInfo } from '../../../api/personalinfo/personalinfo'
import { usePersonalinfoStore } from "../../../stores/personalinfo/personalinfo";
const store = usePersonalinfoStore();
const isChange = ref('')
// Helper variables
const cols = reactive([
    {
        name: "員工編號",
        field: "worker_ID",
        sort: "",
    },
    {
        name: "英文姓名",
        field: "e_Name",
        sort: "",
    },
    {
        name: "中文姓名",
        field: "c_Name",
        sort: "",
    },
    {
        name: "Email",
        field: "eMail",
        sort: "",
    },
    {
        name: "員工類型",
        field: "type",
        sort: "",
    },
    {
        name: "部門",
        field: "dept_ID",
        sort: "",
    },
    {
        name: "廠區",
        field: "site_ID",
        sort: "",
    },
    {
        name: "班別",
        field: "shift",
        sort: "",
    },
    {
        name: "類型",
        field: "default_MealType",
        sort: "",
    },
    {
        name: "PR_Excel",
        field: "pR_Excel",
        sort: "",
    },
    {
        name: "Status",
        field: "active",
        sort: "",
    },
    {
        name: "Modify",
        field: "modify_Date",
        sort: "",
    },

]);

// Sort by functionality
const sortBy = computed(() => {
    return cols.reduce((acc, o) => {
        if (o.sort) {
            o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
        }
        return acc;
    }, []);
});

// On sort th click
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
const $isChange = ref('')
const getEmployeesInfo = async () => {
    try {
        let loadingInstance = ElLoading.service({
            text: "加載中，稍待片刻",
            background: "rgba(0,0,0,.7)"
        })
        await delay(100)//等待讓畫面出面
        let res = await $personalInfo({ "active": true })//這一支api是用條件查詢
        console.log(res);
        let data = res
        console.log(data);
        sessionStorage.setItem('personalInfo', JSON.stringify(data))
        let obj = await JSON.parse(sessionStorage.getItem('personalInfo'))
        store.data.push(obj)
        newStore[0] = obj
        // console.log(store.data[0]);
        console.log(newStore);
        loadingInstance.close()
    } catch (err) {
        console.log(err);
    }
}
const handleChange = () => {
    getEmployeesInfo()
}
// Apply a few Bootstrap 5 optimizations
onMounted(() => {
    getEmployeesInfo()
    store.isChange = isChange.value
    // Remove labels from
    document.querySelectorAll("#datasetLength label").forEach((el) => {
        el.remove();
    });

    // Replace select classes
    let selectLength = document.querySelector("#datasetLength select");

    selectLength.classList = "";
    selectLength.classList.add("form-select");
    selectLength.style.width = "80px";
});
</script>
<template>
    <BasePageHeading title="員工資料維護" subtitle="資料維護">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">員工資料維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <Upload></Upload>
    <div class="content">
        <BaseBlock title="員工資料" content-full>
            <Dataset v-slot="{ ds }" :ds-data="newStore[0]" :ds-sortby="sortBy" :ds-search-in="['worker_ID', 'e_Name', 'c_Name', 'eMail',
                'dept_ID', 'shift', 'site_ID', 'default_MealType', 'pR_Excel', 'type', 'active', 'modify_Date',]">
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
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th v-for="(th, index) in         cols" :key="th.field" :class="['sort', th.sort]"
                                            @click="onSort($event, index)" class="text-center">
                                            {{ th.name }} <i class="gg-select float-end"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <DatasetItem tag="tbody" class="fs-sm">
                                    <template #default="{ row, rowIndex }">
                                        <tr>
                                            <!-- <th scope="row">{{ row.worker_ID }}</th> -->
                                            <th style="min-width: 150px" class="text-center">{{ row.worker_ID }}</th>
                                            <td style="min-width: 150px" class="text-center">{{ row.e_Name }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.c_Name }}</td>
                                            <td class="text-center">{{ row.eMail }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.type }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.dept_ID }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.site_ID }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.shift }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.default_MealType }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.pR_Excel }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.active }}</td>
                                            <td style="min-width: 150px" class="text-center">{{ row.modify_Date }}</td>
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