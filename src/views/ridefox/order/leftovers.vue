<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import Popin from '../../../components/Leftovers/Popin.vue'
import EditModel from '../../../components/Leftovers/EditModal.vue'
const infoList = reactive([

])
const getToday = () => {
    let date = new Date();
    let options = { weekday: 'long' };
    let day = date.toLocaleDateString('zh-CN', options);
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    let today = `${y}-${m + 1}-${d} ${day}`
    return today
}
let today = getToday()
const handleEdit = (item) => {
    console.log(item);
}
const handleEditDel = (item) => {
    console.log(item);
    infoList.splice(item, 1);
}
const handleEditConfirm = () => {

}
</script>
<template>
    <BasePageHeading title="剩餘便當數量" subtitle="">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item">
                            <a class="link-fx" href="javascript:void(0)">餐點</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">剩餘便當數量</li>
                    </ol>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock>
            <template #content>
                <div class="block-content tab-content overflow-hidden">
                    <div class="tab-pane fade fade-left show active" id="btabs-animated-slideleft-home" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-home-tab" tabindex="0">
                        <h4 class="fw-normal">{{ today }}</h4>
                        <BaseBlock id="supplier-baseblock">
                            <div class="d-flex justify-content-end">
                                <Popin></Popin>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr id="left-overblock">
                                            <th class="text-center" style="width: 10%">廠別</th>
                                            <th class="text-center" style="width: 10%">餐別</th>
                                            <th class="text-center" style="width: 10%">類型</th>
                                            <th class="text-center" style="width: 10%">部門</th>
                                            <th class="text-center" style="width: 10%">總和</th>
                                            <th class="text-center" style="width: 5%">編輯/刪除</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for=" (list, item) in infoList" :key="item">
                                            <td class="text-center">{{ list.Pro }}</td>
                                            <td class="text-center">{{ list.Type }}</td>
                                            <td class="text-center">{{ list.Meal }}</td>
                                            <td class="text-center">{{ list.Dep }}</td>
                                            <td class="text-center">{{ list.Total }}</td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-sm btn-alt-secondary"
                                                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2"
                                                        aria-controls="offcanvasRight2" @click="handleEdit(item)">
                                                        <i class="fa fa-fw fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-sm btn-alt-secondary"
                                                        @click="handleEditDel(item)">
                                                        <i class="fa fa-fw fa-times"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                </div>
            </template>
        </BaseBlock>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight2" aria-labelledby="offcanvasRightLabel2">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel2">編輯剩餘便當數量維護</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <EditModel></EditModel>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>