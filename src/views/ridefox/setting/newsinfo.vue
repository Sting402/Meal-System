<script setup>
import { reactive, computed, onMounted, watch, ref, watchEffect } from "vue"; import Serch from "../../../components/Newsinfo/Serch.vue";
import FlatPickr from "../../../components/Newsinfo/FlatPickr.vue";
import Popin from '../../../components/Newsinfo/Popin.vue'
import { flatMap } from "lodash";
import {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from "vue-dataset";
import { usePopinStore } from "../../../stores/newsinfo/popin";
const store = usePopinStore();
let Nowdate = new Date();
let today = Nowdate.toISOString().slice(0, 10);
const cols = reactive([
    {
        name: "標題",
        field: "title",
        sort: "",
    },
    {
        name: "上下架",
        field: "onAndoffShelves",
        sort: "",
    },
    {
        name: "開始日期",
        field: "start",
        sort: "",
    },
    {
        name: "結束日期",
        field: "end",
        sort: "",
    },
    {
        name: "編輯人員",
        field: "staff",
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
newStore[0] = store.data
console.log(newStore[0]);
// const infoList = reactive([
//     {
//         title: "公告",
//         upAndDown: "有",
//         start: "2023-01-18",
//         end: "2023-01-20",
//         staff: "Steven",
//     },
//     {
//         title: "新聞",
//         upAndDown: "有",
//         start: "2023-01-18",
//         end: "2023-01-20",
//         staff: "Terry",
//     },
// ])
const editList = reactive([
    {
        title: "",
        start: "",
        end: "",
        staff: "",
        index: ""
    }
])
const handleEdit = (item) => {
    console.log(item);
    const { title, start, end, staff } = store.data[item]
    editList[0] = { title, start, end, staff }
    editList[0].index = item
}
const handleEditConfirm = () => {
    console.log(editList[0].index);
    const { title, start, end, staff } = editList[0]
    store.data[editList[0].index] = { title, start, end, staff }
}
const handleEditDel = (item) => {
    //console.log(item);
    store.data.splice(item, 1)
}
onMounted(() => {
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
    <BasePageHeading title="最新消息維護" subtitle="維護功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">最新消息維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <!-- <Serch></Serch> -->
    <!-- <div class="content">
                <BaseBlock title="最新消息維護" id="supplier-baseblock">
                    <Popin></Popin>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-vcenter">
                            <thead>
                                <tr>
                                    <th style="width: 10%">標題</th>
                                    <th style="width: 10%">上下架</th>
                                    <th style="width: 10%">開始日期</th>
                                    <th style="width: 10%">結束日期</th>
                                    <th style="width: 10%">編輯人員</th>
                                    <th style="width: 10%">編輯/刪除</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(list, item) in store.data ">
                                    <td>{{ list.title }}</td>
                                    <td> <button type="button" class="btn btn-sm btn-alt-secondary">
                                            <i class="fa fa-fw fa-square-caret-up"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-alt-secondary">
                                            <i class="fa fa-fw fa-square-caret-down"></i>
                                        </button>
                                    </td>
                                    <td>{{ list.start }}</td>
                                    <td>{{ list.end }}</td>
                                    <td>{{ list.staff }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-alt-primary push" data-bs-toggle="modal"
                                                                                                                                                                                data-bs-target="#modal-block-normal">
                                                                                                                                                                                Launch Modal
                                                                                                                                                                            </button>
                                            <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="modal"
                                                data-bs-target="#modal-block-normal" @click="handleEdit(item)">
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
                    </div>
                </BaseBlock>
            </div> -->

    <!-- <div class="modal" id="modal-block-normal" tabindex="-1" role="dialog" aria-labelledby="modal-block-normal"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <BaseBlock title="編輯">
                        <template #options>
                            <button type="submit" class="btn btn-sm btn-primary" @click="handleEditConfirm">
                                確定
                            </button>
                            <button type="button" class="btn btn-sm btn-alt-primary me-1" data-bs-dismiss="modal">
                                Close
                            </button>
                        </template>
                        <div class="row justify-content-center py-sm-3 py-md-5">
                            <div class="col-sm-10 col-md-8">
                                <div class="mb-4">
                                    <label class="form-label" for="block-form1-username">標題</label>
                                    <input type="text" class="form-control" v-model="editList[0].title" />
                                </div>
                                <div class="mb-4">
                                    <label class="form-label" for="block-form1-password">開始日期</label>
                                    <input type="text" class="form-control" v-model="editList[0].start" />
                                </div>
                                <div class="mb-4">
                                    <label class="form-label" for="block-form1-password">結束日期</label>
                                    <input type="text" class="form-control" v-model="editList[0].end" />
                                </div>
                                <div class="mb-4">
                                    <label class="form-label" for="block-form1-password">編輯人員</label>
                                    <input type="text" class="form-control" v-model="editList[0].staff" />
                                </div>
                            </div>
                        </div>
                    </BaseBlock>
                </div>
            </div>
        </div> -->
    <div class="content">
        <BaseBlock title="最新消息維護" content-full>
            <template #options>
                <Popin></Popin>
            </template>
            <Dataset v-slot="{ ds }" :ds-data="newStore[0]" :ds-sortby="sortBy"
                :ds-search-in="['title', 'onAndoffShelves', 'start', 'end', 'staff']">
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
                                            <th class="text-center" style="min-width: 150px">{{ row.title }}</th>
                                            <td> <button type="button" class="btn btn-sm btn-alt-secondary">
                                                    <i class="fa fa-fw fa-square-caret-up"></i>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-alt-secondary">
                                                    <i class="fa fa-fw fa-square-caret-down"></i>
                                                </button>
                                            </td>
                                            <td class="text-center" style="min-width: 150px">{{ row.start }}</td>
                                            <td class="text-center" style="min-width: 150px">{{ row.end }}</td>
                                            <td class="text-center" style="min-width: 150px">{{ row.staff }}</td>
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
</template>
<style lang="scss">
@import "sweetalert2/dist/sweetalert2.min.css";

.row {
    display: flex;
}

.datepick {
    flex: 1;
}

.searchbar {
    flex: 1;
    height: 38px;
    width: 100px !important;
    position: relative;

}

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