<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import VueSelect from 'vue-select'
import { $getSite } from '../../api/restaurant/getSite'
import { storeToRefs } from "pinia";
import { useReferenceInfoStore } from '../../stores/reference/reference'
const store = useReferenceInfoStore()
const { optionsMultipleSelectedSite } = storeToRefs(store)
const vueSelectSite = reactive({
    optionsMultiple: [],
});
const getSite = async () => {
    try {
        store.data = []
        vueSelectSite.optionsMultiple = []
        let res = await $getSite({ "active": true })
        console.log(res);
        if (res.success) {
            let data = res.payload
            //console.log(data);
            data.forEach((item) => {
                vueSelectSite.optionsMultiple.push(item.site_ID)
            })
            //console.log(vueSelectSite.optionsMultiple);
        } else {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
getSite()
watch(() => optionsMultipleSelectedSite.value,
    (newVal, oldVal) => {
        optionsMultipleSelectedSite.value = newVal
    }
);
</script>
<template>
    <VueSelect multiple v-model="optionsMultipleSelectedSite" :options="vueSelectSite.optionsMultiple" placeholder="請選擇廠別">
    </VueSelect>
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>