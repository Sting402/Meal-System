<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { $getSite } from '../../api/restaurant/getSite'
import { $editRestaurant } from "../../api/restaurant/edltRestaurant"
import { useRestaurantInfoStore } from "../../stores/restaurant/restaurant";
const store = useRestaurantInfoStore();
const selectRestaurant = ref('')
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
    toast.fire("編輯成功", "餐廳資料編輯成功", "success");
}
const stateEdit = reactive({
    rest_Name: null,
    rest_ID: null,
})
const rules = computed(() => {
    return {
        rest_Name: {
            required,
            minLength: minLength(1),
        },
        rest_ID: {
            required,
            minLength: minLength(1),
        },
    };
});
const v$ = useVuelidate(rules, stateEdit);
async function handleEdit() {
    const result = await v$.value.$validate();
    console.log(result);
    if (!result) {
        return;
    }
    console.log(selectRestaurant.value);
    let editRestaurant = await $editRestaurant({
        rest_ID: stateEdit.rest_ID,
        rest_Name: stateEdit.rest_Name,
        site_ID: selectRestaurant.value,
        active: true
    })
    if (editRestaurant) {
        swalEditSuccess()
        store.isChange.click()
    } else {
        swalErrorEdit()
    }
}
// let lastValue = null;//防止選中後再次觸發
// const getRestaurant = async (value) => {
//     if (value !== lastValue) {
//         lastValue = value;
//         let res = await $getSite({
//             active: true
//         })
//         let data = res
//         console.log(data);
//         store.site = data.payload
//     }
// }
const getChange = () => {
    // store.isChange.click()
    console.log(selectRestaurant.value);
}
const state = reactive({
    options: [],
})
const getSite = async () => {
    try {
        let res = await $getSite({ "active": true })
        let data = res.payload
        let arr = data.map(item => item.site_ID)
        let newArr = Object.values(arr)
        console.log(newArr);
        state.options = newArr
        console.log(state.options);
    } catch (err) {
        console.log(err)
    }
}
getSite()
watchEffect(() => {
    // console.log(store.index);
    console.log(store.data[store.index]);
    try {
        stateEdit.values = store.data[store.index]
        // console.log(stateEdit.values);
        if (store.data[store.index]) {
            stateEdit.rest_ID = store.data[store.index].rest_ID
            stateEdit.rest_Name = store.data[store.index].rest_Name
            console.log(store.data[store.index].site_ID);
            // selectRestaurant.site_ID = store.data[store.index].site_ID
            selectRestaurant.value = store.data[store.index].site_ID
        }
    } catch (err) {
        console.log(err);
    }
})
onMounted(() => {

})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-rest_Name">餐廳名稱</label>
                <input type="text" class="form-control" placeholder="餐廳" :class="{
                    'is-invalid': v$.rest_Name.$errors.length,
                }" v-model="stateEdit.rest_Name" @blur="v$.rest_Name.$touch" />
                <div v-if="v$.rest_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入餐廳名稱
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-rest_ID ">餐廳英文</label>
                <input type="text" class="form-control" placeholder="EX:JKS_3FP  JKS_4FL" :class="{
                    'is-invalid': v$.rest_ID.$errors.length,
                }" v-model="stateEdit.rest_ID" @blur="v$.rest_ID.$touch" />
                <div v-if="v$.rest_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入餐廳英文
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇廠區</label>
                <div id="app">
                    <select class="form-select" id="default-select" @change="getChange" v-model="selectRestaurant"
                        :value="selectRestaurant">
                        <option v-for="(option, index) in state.options" :key="index" :value="option">{{ option }}</option>
                    </select>
                </div>
            </div>
            <div class="d-flex justify-content-start">
                <button type="button" class="btn btn-primary leftovers-confirm" @click="handleEdit">
                    確認
                </button>
            </div>
        </div>
        <div class="col-md-6">
            <button type="button" class="btn btn-alt-secondary push" @click="swalEditSuccess" v-show="false">
                <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
            </button>
            <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEdit" v-show="false">
                <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
            </button>
        </div>
    </div>
</template>
<style lang="scss">
@import "sweetalert2/dist/sweetalert2.min.css";

.leftovers-confirm {
    margin-right: 100px;
}
</style>