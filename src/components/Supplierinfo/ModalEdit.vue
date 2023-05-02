<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
import { required, minLength } from "@vuelidate/validators";
import { $editSupplier } from "../../api/supplierinfo/editSupplier"
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
function swalErrorEdit() {
    toast.fire("輸入錯誤", "請重新輸入", "error");
}
function swalEditSuccess() {
    toast.fire("編輯成功", "供應商編輯成功", "success");
}
const stateEdit = reactive({
    supplier_Name: null,
    address: null,
    telphone: null,
    email: null,
    mealType: null,
    supplier_ID: null,
    mealOrder: null,
    provide_Sites: null
})
const selectedValue = ref('');
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
        value: '菲食',
        label: '菲食',
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
    console.log(selectedValue.value);
    const resultSelect = Object.values(selectedValue.value)
        .filter(option => option.includes('食'))
        .map(option => option.charAt(0))
        .join(',');
    console.log(resultSelect);
    const resultSelectOrder = Object.values(selectedOrder.value)
    console.log(resultSelectOrder);
    const NewResultSelectOrder = resultSelectOrder.map(str => str.substring(0, str.length - 1)).join(",");
    // .filter(option => option.includes('餐', '宵'))
    // .map(option => option.charAt(0))
    // .join(',');
    console.log(NewResultSelectOrder);
    const resultSelectProvide_Sites = Object.values(selectedProvide_Sites.value)
        .map(option => option)
        .join(',');
    console.log(resultSelectProvide_Sites);
    console.log();
    try {
        let editSupplierData = ''
        if (supplierPassword.value === '') {
            console.log(111);
            editSupplierData = {
                supplier_ID: stateEdit.supplier_ID,
                supplier_Name: stateEdit.supplier_Name,
                address: stateEdit.address,
                telphone: stateEdit.telphone,
                email: stateEdit.email,
                mealType: resultSelect,
                mealOrder: NewResultSelectOrder,
                provide_Sites: resultSelectProvide_Sites,
            }
        } else {
            console.log(222);
            editSupplierData = {
                supplier_ID: stateEdit.supplier_ID,
                supplier_Name: stateEdit.supplier_Name,
                address: stateEdit.address,
                telphone: stateEdit.telphone,
                email: stateEdit.email,
                mealType: resultSelect,
                mealOrder: NewResultSelectOrder,
                provide_Sites: resultSelectProvide_Sites,
                password: supplierPassword.value
            }
        }
        let editSupplier = await $editSupplier(editSupplierData)
        if (editSupplier) {
            swalEditSuccess()
            store.isChange.click()
        } else {
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }

}
watchEffect(() => {
    // console.log(store.index);
    console.log(store.data[store.index]);
    try {
        stateEdit.values = store.data[store.index]
        // console.log(stateEdit.values);
        if (store.data[store.index]) {
            stateEdit.supplier_Name = store.data[store.index].supplier_Name
            // console.log(stateEdit.supplier_Name);
            stateEdit.address = store.data[store.index].address
            stateEdit.telphone = store.data[store.index].telphone
            stateEdit.email = store.data[store.index].email
            stateEdit.mealType = store.data[store.index].mealType
            stateEdit.supplier_ID = store.data[store.index].supplier_ID
            stateEdit.mealOrder = store.data[store.index].mealOrder
            // stateEdit.provide_Sites = store.data[store.index].provide_Sites
            console.log(stateEdit.mealType);
            // selectedValue.value = ['葷食' '素食''輕食''菲食']
            const mealTypeArr = stateEdit.mealType.split(',')
            // console.log(mealTypeArr);
            selectedValue.value = mealTypeArr.map(type => {
                switch (type) {
                    case '葷':
                        return '葷食';
                    case '素':
                        return '素食';
                    case '輕':
                        return '輕食';
                    case '菲':
                        return '菲食';
                    default:
                        return type;
                }
            })
            console.log(stateEdit.mealOrder);
            const mealOrderArr = stateEdit.mealOrder.split(',')
            console.log(mealOrderArr);
            selectedOrder.value = mealOrderArr.map(order => {
                switch (order) {
                    case '午':
                        return '午餐';
                    case '晚':
                        return '晚餐';
                    case '宵':
                        return '宵夜';
                    case '早':
                        return '早餐';
                    default:
                        return order;
                }
            })

            const provide_SitesArr = store.data[store.index].provide_Sites.split(',')
            console.log(provide_SitesArr);
            selectedProvide_Sites.value = provide_SitesArr.map(item => item)
        }
    } catch (err) {
        console.log(err);
    }
})
const supplierPassword = ref('')
const isPassword = ref(false)
const handlePassword = () => {
    isPassword.value = true
}
onMounted(() => {

})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-supplier_Name">供應商名稱</label>
                <input type="text" class="form-control" placeholder="名稱" :class="{
                    'is-invalid': v$.supplier_Name.$errors.length,
                }" v-model="stateEdit.supplier_Name" @blur="v$.supplier_Name.$touch" />
                <div v-if="v$.supplier_Name.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商名稱
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-address">供應商地址</label>
                <input type="text" class="form-control" placeholder="地址" :class="{
                    'is-invalid': v$.address.$errors.length,
                }" v-model="stateEdit.address" @blur="v$.address.$touch" />
                <div v-if="v$.address.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商地址
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-telphone">供應商電話</label>
                <input type="text" class="form-control" placeholder="電話" :class="{
                    'is-invalid': v$.telphone.$errors.length,
                }" v-model="stateEdit.telphone" @blur="v$.telphone.$touch" />
                <div v-if="v$.telphone.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商電話
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-email">供應商Email</label>
                <input type="text" class="form-control" placeholder="Email" :class="{
                    'is-invalid': v$.email.$errors.length,
                }" v-model="stateEdit.email" @blur="v$.email.$touch" />
                <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
                    請輸入供應商Email
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">供應商餐點類型</label>
                <el-select v-model="selectedValue" multiple placeholder="餐點類型" style="width: 240px;height: 100%;">
                    <el-option v-for="item in stateMealType.options" :key="item.value" :label="item.label"
                        :value="item.value" :disabled="item.disabled" />
                </el-select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">供應商餐別</label>
                <el-select v-model="selectedOrder" multiple placeholder="餐點餐別" style="width: 240px;height: 100%;">
                    <el-option v-for="item in stateMealOrder.options" :key="item.value" :label="item.label"
                        :value="item.value" :disabled="item.disabled" />
                </el-select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-site_ID">對應廠區</label>
                <el-select v-model="selectedProvide_Sites" multiple placeholder="廠區" style="width: 240px;height: 100%;">
                    <el-option v-for="item in stateProvide_Sites.options" :key="item.value" :label="item.label"
                        :value="item.value" :disabled="item.disabled" />
                </el-select>
            </div>
            <div class="mb-4" v-if="isPassword">
                <label class="form-label" for="block-form1-site_ID">修改供應商密碼</label>
                <input type="text" class="form-control" v-model="supplierPassword">
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary me-4" @click="handleEdit">
                    確認
                </button>
                <button type="button" class="btn btn-primary" @click="handlePassword">
                    修改供應商密碼
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