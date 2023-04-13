<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { useLocationInfoStore } from "../../stores/locationinfo/locationinfo";
import { $editSupplier } from "../../api/supplierinfo/editSupplier"
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
    toast.fire("編輯成功", "廠區編輯成功", "success");
}
const stateEdit = reactive({
    site_ID: null,
    site_Name: null,
    zipCode: null,
    site_Address: null
})
const rules = computed(() => {
    return {
        site_ID: {
            required,
            minLength: minLength(1),
        },
        site_Name: {
            required,
            minLength: minLength(1),
        },
        zipCode: {
            required,
            minLength: minLength(1),
        },
        site_Address: {
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
    let editSupplier = await $editSupplier({
        site_ID: stateEdit.site_ID,
        site_Name: stateEdit.site_Name,
        zipCode: stateEdit.zipCode,
        site_Address: stateEdit.site_Address,
    })
    if (editSupplier) {
        swalEditSuccess()
        store.isChange.click()
    } else {
        swalErrorEdit()
    }
}
watchEffect(() => {
    console.log(store.index);
    console.log(store.data[store.index]);
    try {
        stateEdit.values = store.data[store.index]
        // console.log(stateEdit.values);
        if (store.data[store.index]) {
            stateEdit.site_ID = store.data[store.index].site_ID
            stateEdit.site_Name = store.data[store.index].site_Name
            stateEdit.zipCode = store.data[store.index].zipCode
            stateEdit.site_Address = store.data[store.index].site_Address
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
                <label class="form-label" for="block-form1-site_ID ">廠區代號</label>
                <input type="text" class="form-control" placeholder="廠區" :class="{
                    'is-invalid': v$.site_ID.$errors.length,
                }" v-model="stateEdit.site_ID" @blur="v$.site_ID.$touch" disabled="true" />
                <div v-if="v$.site_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區代號
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_Name">廠區中文</label>
                <input type="text" class="form-control" placeholder="中文" :class="{
                    'is-invalid': v$.site_Name.$errors.length,
                }" v-model="stateEdit.site_Name" @blur="v$.site_Name.$touch" />
                <div v-if="v$.site_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區中文
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-zipCode">廠區郵遞區號</label>
                <input type="text" class="form-control" placeholder="郵遞區號" :class="{
                    'is-invalid': v$.zipCode.$errors.length,
                }" v-model="stateEdit.zipCode" @blur="v$.zipCode.$touch" />
                <div v-if="v$.zipCode.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區郵遞區號
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_Address">廠區地址</label>
                <input type="text" class="form-control" placeholder="地址" :class="{
                    'is-invalid': v$.site_Address.$errors.length,
                }" v-model="stateEdit.site_Address" @blur="v$.site_Address.$touch" />
                <div v-if="v$.site_Address.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區地址
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