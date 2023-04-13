<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { $addRestaurant } from "../../api/restaurant/addRestaurant"
import { $getSite } from '../../api/restaurant/getSite'
import { useRestaurantInfoStore } from "../../stores/restaurant/restaurant";
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
function swalErrorAdd() {
    toast.fire("輸入錯誤", "請重新輸入", "error");
}
function swalAddSuccess() {
    toast.fire("新增成功", "餐廳添加成功", "success");
}
const stateAdd = reactive({
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
const v$ = useVuelidate(rules, stateAdd);
async function handleConfirm() {
    const result = await v$.value.$validate();
    console.log(result);
    if (!result) {
        return;
    }
    let Restaurant = await $addRestaurant({
        rest_Name: stateAdd.rest_Name,
        rest_ID: stateAdd.rest_ID,
        site_ID: selectedValue.value,
        active: true
    })
    console.log(Restaurant);
    if (Restaurant) {
        swalAddSuccess()
        store.isChange.click()
    } else {
        swalErrorAdd()
    }
}
const selectedValue = ref('');
const state = reactive({
    options: [],
})
const getSite = async () => {
    try {
        let res = await $getSite({ "active": true })
        let data = res.payload
        let arr = data.map(item => item.site_ID)
        state.options = arr
    } catch (err) {
        console.log(err)
    }
}
const getChange = () => {
    store.isChange.click()
    console.log(selectedValue.value);
}
getSite()
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-rest_Name">餐廳名稱</label>
                <input type="text" class="form-control" placeholder="餐廳" :class="{
                    'is-invalid': v$.rest_Name.$errors.length,
                }" v-model="stateAdd.rest_Name" @blur="v$.rest_Name.$touch" />
                <div v-if="v$.rest_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入餐廳名稱
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-rest_ID ">餐廳英文</label>
                <input type="text" class="form-control" placeholder="EX:JKS_3FP  JKS_4FL" :class="{
                    'is-invalid': v$.rest_ID.$errors.length,
                }" v-model="stateAdd.rest_ID" @blur="v$.rest_ID.$touch" />
                <div v-if="v$.rest_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入餐廳英文
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">所屬廠區</label>
                <select @change="getChange" class="form-select" id="example-select" name="example-select"
                    v-model="selectedValue">
                    <option v-for="(option, index) in state.options" :key="index">{{ option }}</option>
                </select>
            </div>
            <div class="d-flex justify-content-start">
                <button type="button" class="btn btn-primary leftovers-confirm" @click="handleConfirm">
                    確認
                </button>
            </div>
        </div>
        <button type="button" class="btn btn-alt-secondary push" @click="swalInfo" v-show="false"></button>
        <div class="col-md-6">
            <button type="button" class="btn btn-alt-secondary push" @click="swalAddSuccess" v-show="false">
                <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
            </button>
            <button type="button" class="btn btn-alt-secondary push" @click="swalErrorAdd" v-show="false">
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
