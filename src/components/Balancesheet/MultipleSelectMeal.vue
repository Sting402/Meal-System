<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import VueSelect from 'vue-select'
const vueSelectState = reactive({
    options: [
        "葷食",
        "素食",
        "輕食",
        "菲餐"
    ],
    optionsSelected: null,
    optionsMultiple: [
        "葷食",
        "素食",
        "輕食",
        "菲餐"
    ],
    optionsMultipleSelected: null,
});



</script>
<template>
    <VueSelect multiple v-model="vueSelectState.optionsMultipleSelected" :options="vueSelectState.optionsMultiple"
        placeholder="請選擇類型">
    </VueSelect>
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>