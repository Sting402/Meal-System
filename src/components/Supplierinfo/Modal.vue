<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength, email } from "@vuelidate/validators";
import { $addSupplier } from "../../api/supplierinfo/addSupplier"
import { $supplierInfo } from '../../api/supplierinfo/getSupplier'
import { useSupplierInfoStore } from "../../stores/supplierinfo/supplierinfo";
const store = useSupplierInfoStore();
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
    toast.fire("新增成功", "供應商添加成功", "success");
}
const state = reactive({
    supplier_Name: null,
    address: null,
    telphone: null,
    email: null,
    mealType: null,
    supplier_ID: null
})
const selectedType = ref('');
const stateMealType = reactive({
    options: [{
        value: '葷食',
        label: '葷食',
    },
    {
        value: '素食',
        label: '素食',
    },
    {
        value: '輕食',
        label: '輕食',
    },
    {
        value: '菲餐',
        label: '菲餐',
    }
    ],
})
const selectedOrder = ref('');
const stateMealOrder = reactive({
    options: [{
        value: '午餐',
        label: '午餐',
    },
    {
        value: '晚餐',
        label: '晚餐',
    },
    {
        value: '宵夜',
        label: '宵夜',
    },
    {
        value: '早餐',
        label: '早餐',
    }
    ],
})
const selectedProvide_Sites = ref('');
const stateProvide_Sites = reactive({
    options: [{
        value: 'CBD',
        label: 'CBD',
    },
    {
        value: 'CY',
        label: 'CY',
    },
    {
        value: 'JK8',
        label: 'JK8',
    },
    {
        value: 'JKS',
        label: 'JKS',
    },
    {
        value: 'LJ',
        label: 'LJ',
    },
    {
        value: 'TC',
        label: 'TC',
    },
    {
        value: 'TRI',
        label: 'TRI',
    },
    {
        value: 'WQ',
        label: 'WQ',
    },
    ],
})
const rules = computed(() => {
    return {
        supplier_Name: {
            required,
            minLength: minLength(1),
        },
        address: {
            required,
            minLength: minLength(3),
        },
        telphone: {
            required,
            minLength: minLength(3),
        },
        email: {
            required,
            minLength: minLength(3),
            email,
        },
    };
});
const v$ = useVuelidate(rules, state);
async function handleConfirm() {
    const result = await v$.value.$validate();
    console.log(result);
    if (!result) {
        return;
    }
    console.log(store.data)
    console.log(selectedType.value);
    console.log(selectedOrder.value);
    console.log(selectedProvide_Sites.value);
    const resultSelectType = Object.values(selectedType.value)
        .filter(option => option.includes('食'))
        .map(option => option.charAt(0))
        .join(',');
    console.log(resultSelectType);
    const resultSelectOrder = Object.values(selectedOrder.value)
        .filter(option => option.includes('餐'))
        .map(option => option.charAt(0))
        .join(',');
    console.log(resultSelectOrder);
    const resultSelectProvide_Sites = Object.values(selectedProvide_Sites.value)
        .map(option => option)
        .join(',');
    console.log(resultSelectProvide_Sites);
    try {
        let res = await $supplierInfo({})
        console.log(res.payload.length);
        if (res.payload.length < 9) {
            state.supplier_ID = `S00${res.payload.length + 1}`
        } else {
            state.supplier_ID = `S0${res.payload.length + 1}`
        }
    } catch (err) {
        console.log(err);
    }
    console.log(state.supplier_ID);
    let addSupplier = await $addSupplier({
        supplier_ID: state.supplier_ID,
        supplier_Name: state.supplier_Name,
        address: state.address,
        telphone: state.telphone,
        email: state.email,
        mealType: resultSelectType,
        password: state.supplier_ID,
        mealOrder: resultSelectOrder,
        provide_Sites: resultSelectProvide_Sites,
        active: true
    })
    console.log(addSupplier);
    if (addSupplier) {
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
                <label class="form-label" for="block-form1-supplier_Name">供應商名稱</label>
                <input type="text" class="form-control" placeholder="名稱" :class="{
                    'is-invalid': v$.supplier_Name.$errors.length,
                }" v-model="state.supplier_Name" @blur="v$.supplier_Name.$touch" />
                <div v-if="v$.supplier_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商名稱
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-address">供應商地址</label>
                <input type="text" class="form-control" placeholder="地址" :class="{
                    'is-invalid': v$.address.$errors.length,
                }" v-model="state.address" @blur="v$.address.$touch" />
                <div v-if="v$.address.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商地址
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-telphone">供應商電話</label>
                <input type="text" class="form-control" placeholder="電話" :class="{
                    'is-invalid': v$.telphone.$errors.length,
                }" v-model="state.telphone" @blur="v$.telphone.$touch" />
                <div v-if="v$.telphone.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商電話
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-email">供應商Email</label>
                <input type="text" class="form-control text-warp" placeholder="Email" :class="{
                    'is-invalid': v$.email.$errors.length,
                }" v-model="state.email" @blur="v$.email.$touch" style="word-break: break-all;" />
                <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商Email
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">供應商餐點類型</label>
                <el-select v-model="selectedType" multiple placeholder="餐點類型" style="width: 240px;height: 100%;">
                    <el-option v-for="item in stateMealType.options" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">供應商餐別</label>
                <el-select v-model="selectedOrder" multiple placeholder="餐點餐別" style="width: 240px;height: 100%;">
                    <el-option v-for="item in stateMealOrder.options" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">對應廠區</label>
                <el-select v-model="selectedProvide_Sites" multiple placeholder="廠區" style="width: 240px;height: 100%;">
                    <el-option v-for="item in stateProvide_Sites.options" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
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
