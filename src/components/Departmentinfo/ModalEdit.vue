<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { useDepartmentInfoStore } from "../../stores/departmentinfo/departmentinfo";
import { $editDepartmentInfo } from "../../api/departmentinfo/editDepartment"
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
    dept_Name: null,
    dept_Desc: null
})
const rules = computed(() => {
    return {
        dept_ID: {
            required,
            minLength: minLength(1),
        },
        dept_Name: {
            required,
            minLength: minLength(1),
        },
        dept_Desc: {
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
    let editSupplier = await $editDepartmentInfo({
        dept_ID: stateEdit.dept_ID,
        dept_Name: stateEdit.dept_Name,
        dept_Desc: stateEdit.dept_Desc,
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
            stateEdit.dept_ID = store.data[store.index].dept_ID
            stateEdit.dept_Name = store.data[store.index].dept_Name
            stateEdit.dept_Desc = store.data[store.index].dept_Desc
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
                <label class="form-label" for="block-form1-password">部門英文縮寫</label>
                <input type="text" class="form-control" placeholder="英文縮寫" :class="{
                    'is-invalid': v$.dept_Name.$errors.length,
                }" v-model="stateEdit.dept_Name" @blur="v$.dept_Name.$touch" />
                <div v-if="v$.dept_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入部門英文縮寫
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">部門英文全名</label>
                <input type="text" class="form-control" placeholder="英文全名" :class="{
                    'is-invalid': v$.dept_Desc.$errors.length,
                }" v-model="stateEdit.dept_Desc" @blur="v$.dept_Desc.$touch" />
                <div v-if="v$.dept_Desc.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入部門英文全名
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