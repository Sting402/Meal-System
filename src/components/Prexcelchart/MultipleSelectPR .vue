<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from "vue-select";
// Vue Select initial values
const vueSelectState = reactive({
    options: [
        "64901-810-28_810",
        "64901-810-28_Suspension",
        "64901-810-28_Component"

    ],
    optionsSelected: null,
    optionsMultiple: [
        "64901-810-28_810",
        "64901-810-28_Suspension",
        "64901-810-28_Component"
    ],
    optionsMultipleSelected: null,
});

// Vueform Slider
const vueformSliderState = reactive({
    valNormal: 50,
    valMinMax: 212,
    valMarks: 1000,
    valDouble: [200, 800],
    valNegative: [-150, 150],
    valStep: [-250, 250],
});


</script>
<template>
    <VueSelect multiple v-model="vueSelectState.optionsMultipleSelected" :options="vueSelectState.optionsMultiple"
        placeholder="PR分帳">
    </VueSelect>
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>