<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
import Popin from '../../../components/Locationinfo/Popin.vue'
import PopinEdit from '../../../components/Locationinfo/PopinEdit.vue'
import { ElLoading } from 'element-plus'//Loading加載
import { readFile, character, delay } from '../../../utils/utils'
import { $locationInfo } from '../../../api/locationinfo/getLocation'
import { $editDelLocation } from '../../../api/locationinfo/editDelLocation'
import { useLocationInfoStore } from "../../../stores/locationinfo/locationinfo";
const store = useLocationInfoStore();
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
    toast.fire("輸入錯誤", "請重新輸入", "error");
}
function swalEditSuccess() {
    toast.fire("刪除成功", "廠區資料刪除成功", "success");
}
const isChange = ref('')
const locationInfoList = reactive([

])
console.log(isChange.value);
const handleEdit = (item) => {
    store.index = item
    store.data = locationInfoList.values
}
//需要再測試
const handleEditDel = async (item) => {
    try {
        //console.log(item);
        store.index = item
        //console.log(locationInfoList.values);
        store.data = locationInfoList.values
        //console.log(store.data[item].site_ID);
        let res = await $editDelLocation({
            site_ID: store.data[item].site_ID
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
    try {
        store.data = []
        locationInfoList.values = []
        let loadingInstance = ElLoading.service({
            text: "加載中，稍待片刻",
            background: "rgba(0,0,0,.7)"
        })
        await delay(100)//等待讓畫面出面
        console.log(locationInfoList.values);
        let res = await $locationInfo({
            "active": true
        })
        console.log(res);
        let data = res
        locationInfoList.values = data
        console.log(locationInfoList.values);
        store.data = locationInfoList.values
        loadingInstance.close()
    } catch (err) {
        console.log(err);
    }
}
const getLocationInfo = async () => {
    try {
        store.data = []
        locationInfoList.values = []
        let res = await $locationInfo()
        console.log(res);
        let data = res
        locationInfoList.values = data
        console.log(locationInfoList.values);
        store.data = locationInfoList.values
    } catch (err) {
        console.log(err);
    }
}
onMounted(() => {
    getLocationInfo()
    store.isChange = isChange.value
})
</script>
<template>
    <BasePageHeading title="廠區資料維護" subtitle="廠區維護功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">廠區維護功能</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="廠區資料">
            <template #options>
                <Popin></Popin>
            </template>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 10%">廠區代號</th>
                            <th class="text-center" style="width: 10%">廠區中文</th>
                            <th class="text-center" style="width: 10%">廠區郵遞區號</th>
                            <th class="text-center" style="width: 10%">廠區地址</th>
                            <th class="text-center" style="width: 5%">編輯/刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list, item) in locationInfoList.values ">
                            <td class="text-center">{{ list.site_ID }}</td>
                            <td class="text-center">{{ list.site_Name }}</td>
                            <td class="text-center">{{ list.zipCode }}</td>
                            <td class="text-center">{{ list.site_Address }}</td>
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
            </div>
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
</style>