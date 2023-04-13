<script setup>
import { reactive, ref, onMounted, watch } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from "vue-select";
import { storeToRefs } from "pinia";
import { useReferenceInfoStore } from '../../stores/reference/reference'
const store = useReferenceInfoStore()
const { optionsMultipleSelectedType } = storeToRefs(store)//使用響應式pinia 要記得.value
const vueSelectType = reactive({
    optionsMultiple: [
        "午餐",
        "晚餐",
        "宵夜",
        "早餐"
    ],
});
watch(() => optionsMultipleSelectedType.value,
    (newVal, oldVal) => {
        optionsMultipleSelectedType.value = newVal
        //console.log(optionsMultipleSelectedType.value);
    }
);
console.log(optionsMultipleSelectedType.value);
</script>
<template>
    <VueSelect multiple v-model="optionsMultipleSelectedType" :options="vueSelectType.optionsMultiple" placeholder="請選擇餐別">
    </VueSelect>
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>
