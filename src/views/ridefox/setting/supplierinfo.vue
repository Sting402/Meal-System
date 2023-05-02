<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import Popin from '../../../components/Supplierinfo/Popin.vue'
import PopinEdit from '../../../components/Supplierinfo/PopinEdit.vue'
import Swal from "sweetalert2";
import { ElLoading } from 'element-plus'//Loading加載
import { readFile, character, delay } from '../../../utils/utils'
import { $supplierInfo } from '../../../api/supplierinfo/getSupplier'
import { $editDelSupplier } from '../../../api/supplierinfo/editDelSupplier'
import { useSupplierInfoStore } from "../../../stores/supplierinfo/supplierinfo";
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
    toast.fire("刪除成功", "供應商資料刪除成功", "success");
}
const store = useSupplierInfoStore();
const isChange = ref('')
const infoList = reactive([

])
console.log(isChange.value);
const handleEdit = (item) => {
    //console.log(item);
    store.index = item
    store.data = infoList.values
    console.log(store.data);
    //console.log(store.index);
    // console.log(store.data[0][item]);
}
const handleEditDel = async (item) => {
    console.log(item);
    console.log(infoList.values[item].supplier_ID);
    let res = await $editDelSupplier({
        supplier_ID: infoList.values[item].supplier_ID,
        active: false
    })
    let editDelSupplier = res
    if (editDelSupplier) {
        swalAddSuccess()
        getSupplierInfo()
    } else {
        swalErrorAdd()
    }
}
const handleChange = async () => {
    try {
        store.data = []
        infoList.values = []
        console.log(infoList.values);
        let res = await $supplierInfo({ "active": true })//這一支api是用條件查詢
        console.log(res);
        let data = res
        console.log(data.payload);
        infoList.values = data.payload
        console.log(infoList.values);
        store.data = infoList.values
    } catch (err) {
        console.log(err);
    }
}
const getSupplierInfo = async () => {
    try {
        let loadingInstance = ElLoading.service({
            text: "加載中，稍待片刻",
            background: "rgba(0,0,0,.7)"
        })
        await delay(100)//等待讓畫面出面
        store.data = []
        infoList.values = []
        console.log(infoList.values);
        let res = await $supplierInfo({ "active": true })//這一支api是用條件查詢
        console.log(res);
        let data = res
        console.log(data.payload);
        infoList.values = data.payload
        console.log(infoList.values);
        store.data = infoList.values
        loadingInstance.close()
    } catch (err) {
        console.log(err);
    }
}
const getEmailHtml = (email) => {
    const index = email.indexOf('@')
    if (index === -1) {
        return email
    }
    const before = email.substring(0, index)
    const after = email.substring(index)
    return `${before}<br>${after}`
}
onMounted(() => {
    getSupplierInfo()
    store.isChange = isChange.value
})
</script>
<template>
    <BasePageHeading title="供應商資料維護" subtitle="供應商維護功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">供應商資料維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="供應商資料" id="supplier-baseblock">
            <template #options>
                <Popin></Popin>
            </template>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 10%">供應商ID</th>
                            <th class="text-center" style="width: 10%">供應商名稱</th>
                            <th class="text-center" style="width: 10%">供應商地址</th>
                            <th class="text-center" style="width: 10%">供應商電話</th>
                            <th class="text-center" style="width: 10%">供應商Mail</th>
                            <th class="text-center" style="width: 10%">供應商餐點類型</th>
                            <th class="text-center" style="width: 10%">供應商餐別</th>
                            <th class="text-center" style="width: 10%">對應廠區</th>
                            <th class="text-center" style="width: 5%">編輯/刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list, item) in infoList.values">
                            <td class="text-center">
                                {{ list.supplier_ID }}
                            </td>
                            <td class="text-center">
                                {{ list.supplier_Name }}
                            </td>
                            <td class="text-center">
                                {{ list.address }}
                            </td>
                            <td class="text-center">
                                {{ list.telphone }}
                            </td>
                            <td class="text-center" v-html="getEmailHtml(list.email)"></td>
                            <td class="text-center">
                                {{ list.mealType }}
                            </td>
                            <td class="text-center">
                                {{ list.mealOrder }}
                            </td>
                            <td class="text-center">
                                {{ list.provide_Sites }}
                            </td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn btn-primary me-1" data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight2"
                                        @click="handleEdit(item)">
                                        <i class="fa fa-fw fa-pencil-alt"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-danger" @click="handleEditDel(item)">
                                        <i class="fa fa-fw fa-times"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </BaseBlock>
        <button @click="handleChange" ref="isChange" v-show="false">改變</button>
    </div>
    <PopinEdit></PopinEdit>
</template>