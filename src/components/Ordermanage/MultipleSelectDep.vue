<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from 'vue-select'
import { $departmentInfo } from '../../api/departmentinfo/getDepartment'
import { storeToRefs } from "pinia";
import { useOrdermanageStore } from '../../stores/ordermanage/ordermanage'
const store = useOrdermanageStore()
// Vue Select initial values
const vueSelectDep = reactive({
    optionsMultiple: [],
    optionsMultipleSelectedDep: []
});
const getDepartment = async () => {
    try {
        store.data = []
        vueSelectDep.optionsMultiple = []
        let res = await $departmentInfo({ "active": true })
        if (res.success) {
            let data = res.payload
            //console.log(data);
            data.forEach((item) => {
                vueSelectDep.optionsMultiple.push(item.dept_ID)
            })
            //console.log(vueSelectDep.optionsMultiple);
        } else {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
getDepartment()
// const selectedOptions = computed(() => {
//     return vueSelectDep.optionsMultipleSelectedDep
//         ? vueSelectDep.optionsMultipleSelectedDep.map(item => item.label)
//         : null;
// });
watch(() => vueSelectDep.optionsMultipleSelectedDep,
    (newVal, oldVal) => {
        //console.log("Selected options changed from:", oldVal, "to", newVal);
        const newObj = Object.values(newVal)
        //console.log(newObj);
        //console.log(typeof newObj);
        store.optionsMultipleSelectedDep = newObj
        //console.log(Array.isArray(store.optionsMultipleSelectedDep));
        //console.log(store.optionsMultipleSelectedDep);
    }
);
</script>
<template>
    <VueSelect multiple v-model="vueSelectDep.optionsMultipleSelectedDep" :options="vueSelectDep.optionsMultiple"
        placeholder="請款部門">
    </VueSelect>
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>