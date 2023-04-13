<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { useLocationInfoStore } from "../../stores/locationinfo/locationinfo";
import { $addLocation } from "../../api/locationinfo/addLocation"
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
function swalErrorAdd() {
    toast.fire("輸入錯誤", "請重新輸入", "error");
}
function swalAddSuccess() {
    toast.fire("新增成功", "廠區添加成功", "success");
}
const stateAdd = reactive({
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
const v$ = useVuelidate(rules, stateAdd);
async function handleConfirm() {
    const result = await v$.value.$validate();
    console.log(result);
    if (!result) {
        return;
    }
    store.isChange.click()
    let addLocation = await $addLocation({
        site_ID: stateAdd.site_ID,
        site_Name: stateAdd.site_Name,
        zipCode: stateAdd.zipCode,
        site_Address: stateAdd.site_Address,
        active: true
    })
    console.log(addLocation);
    if (Location) {
        swalAddSuccess()
        store.isChange.click()
    } else {
        swalErrorConfirm()
    }
}
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID ">廠區代號</label>
                <input type="text" class="form-control" placeholder="廠區" :class="{
                    'is-invalid': v$.site_ID.$errors.length,
                }" v-model="stateAdd.site_ID" @blur="v$.site_ID.$touch" />
                <div v-if="v$.site_ID.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_Name">廠區中文</label>
                <input type="text" class="form-control" placeholder="廠區中文" :class="{
                    'is-invalid': v$.site_Name.$errors.length,
                }" v-model="stateAdd.site_Name" @blur="v$.site_Name.$touch" />
                <div v-if="v$.site_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區中文
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-zipCode">廠區郵遞區號</label>
                <input type="text" class="form-control" placeholder="郵遞區號" :class="{
                    'is-invalid': v$.zipCode.$errors.length,
                }" v-model="stateAdd.zipCode" @blur="v$.zipCode.$touch" />
                <div v-if="v$.zipCode.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區郵遞區號
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_Address">廠區地址</label>
                <input type="text" class="form-control" placeholder="地址" :class="{
                    'is-invalid': v$.site_Address.$errors.length,
                }" v-model="stateAdd.site_Address" @blur="v$.site_Address.$touch" />
                <div v-if="v$.site_Address.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入廠區地址
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
