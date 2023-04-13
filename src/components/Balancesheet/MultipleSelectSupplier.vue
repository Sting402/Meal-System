<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import VueSelect from 'vue-select'
import { $supplierInfo } from '../../api/supplierinfo/getSupplier'
import { useOrdermanageStore } from '../../stores/ordermanage/ordermanage'
const store = useOrdermanageStore()
const vueSelectSupplier = reactive({
    optionsMultiple: [
        '好食客'
    ],
    optionsMultipleSelected: []
});
const getSupplier = async () => {
    try {
        store.data = []
        vueSelectSupplier.optionsMultiple = []
        let res = await $supplierInfo({ "active": true })
        if (res.success) {
            let data = res.payload
            //console.log(data);
            data.forEach((item) => {
                vueSelectSupplier.optionsMultiple.push(item.supplier_Name)
            })
            //console.log(vueSelectSupplier.optionsMultiple);
        } else {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
getSupplier()
watch(() => vueSelectSupplier.optionsMultipleSelected,
    (newVal, oldVal) => {
        //console.log("Selected options changed from:", oldVal, "to", newVal);
        const newObj = Object.values(newVal)
        //console.log(newObj);
        //console.log(typeof newObj);
        store.optionsMultipleSelectedSupplier = newObj
        //console.log(Array.isArray(store.optionsMultipleSelectedDep));
        //console.log(store.optionsMultipleSelectedSupplier);
    }
);
</script>
<template>
    <VueSelect multiple v-model="vueSelectSupplier.optionsMultipleSelected" :options="vueSelectSupplier.optionsMultiple"
        placeholder="請選擇廠商">
    </VueSelect>
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>