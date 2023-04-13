<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { $addDepartmentInfo } from "../../api/depatmentpickup/addDepartment"
import { useDepatmentpickupStore } from "../../stores/depatmentpickup/depatmentpickup";
const store = useDepatmentpickupStore();
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
let message = ''
function swalErrorAdd() {
    toast.fire("新增失敗", "請檢查對應關係", "error");
}
function swalAddSuccess() {
    toast.fire("新增成功", "部門對應餐廳添加成功", "success");
}
const stateAdd = reactive({
    dept_ID: null,
    rest_ID: null,
})
const rules = computed(() => {
    return {
        dept_ID: {
            required,
            minLength: minLength(1),
        },
    };
});
const v$ = useVuelidate(rules, stateAdd);
async function handleConfirm() {
    const result = await v$.value.$validate();
    // console.log(result);
    if (!result) {
        return;
    }

    //console.log(stateAdd.dept_ID);
    console.log(selectRestaurant.value.rest_ID);
    let add = {
        dept_ID: stateAdd.dept_ID,
        rest_ID: selectRestaurant.value.rest_ID,
        default_Rest: true
    }
    let departmentRestaurant = await $addDepartmentInfo(add)
    console.log(departmentRestaurant);

    if (departmentRestaurant) {
        swalAddSuccess()
        store.isChange.click()
    } else {
        swalErrorAdd()
    }
}
const getRestaurant = () => {
    console.log(selectRestaurant.value.rest_ID);
}
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-dept_ID">部門代號</label>
                <input type="text" class="form-control" placeholder="部門" :class="{
                    'is-invalid': v$.dept_ID.$errors.length,
                }" v-model="stateAdd.dept_ID" @blur="v$.dept_ID.$touch" />
                <div v-if="v$.dept_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入部門代號
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇餐廳</label>
                <div id="app">
                    <select class="form-select" id="default-select" @click="getRestaurant" v-model="selectRestaurant">
                        <option :value="list" v-for="(list, item) in store.restaurant" :key="item">
                            {{ list.rest_ID }}</option>
                    </select>
                </div>
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
