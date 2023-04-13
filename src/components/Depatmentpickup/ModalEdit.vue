<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { useDepartmentInfoStore } from "../../stores/departmentinfo/departmentinfo";
import { $editSupplier } from "../../api/supplierinfo/editSupplier"
const store = useDepartmentInfoStore();
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
    toast.fire("編輯成功", "部門編輯成功", "success");
}
const stateEdit = reactive({
    dept_ID: null,
    site_ID: null,
    rest_Name: null,
})
const rules = computed(() => {
    return {
        site_ID: {
            required,
            minLength: minLength(3),
        },
        dept_ID: {
            required,
            minLength: minLength(3),
        },
        rest_Name: {
            required,
            minLength: minLength(3),
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
    let editSupplier = await $editSupplier({
        dept_ID: stateEdit.dept_ID,
        site_ID: stateEdit.site_ID,
        rest_Name: stateEdit.rest_Name,
    })
    if (editSupplier) {
        swalEditSuccess()
        store.isChange.click()
    } else {
        swalErrorEdit()
    }
}
watchEffect(() => {
    // console.log(store.index);
    // console.log(store.data[store.index]);
    try {
        stateEdit.values = store.data[store.index]
        // console.log(stateEdit.values);
        if (store.data[store.index]) {
            stateEdit.dept_ID = store.data[store.index].dept_ID
            // console.log(stateEdit.dept_ID);
            stateEdit.site_ID = store.data[store.index].site_ID
            stateEdit.dept_ID = store.data[store.index].dept_ID
            stateEdit.rest_Name = store.data[store.index].rest_Name
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
                <label class="form-label" for="block-form1-dept_ID">部門代號</label>
                <input type="text" class="form-control" placeholder="部門" :class="{
                    'is-invalid': v$.dept_ID.$errors.length,
                }" v-model="stateEdit.dept_ID" @blur="v$.dept_ID.$touch" />
                <div v-if="v$.dept_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入部門代號
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">所屬廠區</label>
                <input type="text" class="form-control" placeholder="廠區" :class="{
                    'is-invalid': v$.site_ID.$errors.length,
                }" v-model="stateEdit.site_ID" @blur="v$.site_ID.$touch" />
                <div v-if="v$.site_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區代號
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-rest_Name">餐廳地點</label>
                <input type="text" class="form-control" placeholder="地點" :class="{
                    'is-invalid': v$.rest_Name.$errors.length,
                }" v-model="stateEdit.rest_Name" @blur="v$.rest_Name.$touch" />
                <div v-if="v$.rest_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入餐廳地點
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