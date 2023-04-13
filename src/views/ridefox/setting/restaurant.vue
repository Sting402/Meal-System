<script setup>
import { reactive, ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import Popin from '../../../components/Restaurant/Popin.vue'
import PopinEdit from '../../../components/Restaurant/PopinEdit.vue'
import { ElLoading } from 'element-plus'//Loading加載
import { readFile, character, delay } from '../../../utils/utils'
import { $restaurantInfo } from '../../../api/restaurant/getRestaurant'
import { $editDelRestaurant } from '../../../api/restaurant/edltDelRestaurant'
import { useRestaurantInfoStore } from "../../../stores/restaurant/restaurant";
const store = useRestaurantInfoStore();
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
    toast.fire("刪除成功", "餐廳資料刪除成功", "success");
}
const restaurantInfoList = reactive([

])
const isChange = ref('')
const handleEdit = (item) => {
    store.index = item
    store.data = restaurantInfoList.values
}
const handleEditDel = async (item) => {
    try {
        //console.log(item);
        store.index = item
        store.data = restaurantInfoList.values
        console.log(store.data[item].rest_ID);
        let res = await $editDelRestaurant({
            rest_ID: store.data[item].rest_ID,
        })
        console.log(res);
        let data = res.success
        if (data) {
            swalEditSuccess()
            getRestaurant()
        } else {
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }
}
const handleChange = () => {
    getRestaurant()
}
const getRestaurant = async () => {
    try {
        let loadingInstance = ElLoading.service({
            text: "加載中，稍待片刻",
            background: "rgba(0,0,0,.7)"
        })
        await delay(100)
        store.data = []
        restaurantInfoList.values = []
        let res = await $restaurantInfo()
        console.log(res);
        let data = res
        restaurantInfoList.values = data
        console.log(restaurantInfoList.values);
        store.data = restaurantInfoList.values
        loadingInstance.close()
    } catch (err) {
        console.log(err);
    }
}
onMounted(() => {
    getRestaurant()
    store.isChange = isChange.value
})
</script>
<template>
    <BasePageHeading title="餐廳資料維護" subtitle="餐廳維護功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">餐廳資料維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <BaseBlock title="餐廳資料">
            <template #options>
                <Popin></Popin>
            </template>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 10%">餐廳名稱</th>
                            <th class="text-center" style="width: 10%">餐廳英文</th>
                            <th class="text-center" style="width: 10%">所屬廠區</th>
                            <th class="text-center" style="width: 10%">餐廳地點</th>
                            <th class="text-center" style="width: 5%">編輯/刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list, item) in restaurantInfoList.values ">
                            <td class="text-center">{{ list.rest_Name }}</td>
                            <td class="text-center">{{ list.rest_ID }}</td>
                            <td class="text-center">{{ list.site_ID }}</td>
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
</template>