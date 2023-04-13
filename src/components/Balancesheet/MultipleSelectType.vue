<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from 'vue-select'
// Vue Select initial values
const vueSelectState = reactive({
    options: [
        "午餐",
        "晚餐",
        "宵夜",
        "早餐"
    ],
    optionsSelected: null,
    optionsMultiple: [
        "午餐",
        "晚餐",
        "宵夜",
        "早餐"
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
    <form @submit.prevent>
        <VueSelect multiple v-model="vueSelectState.optionsMultipleSelected" :options="vueSelectState.optionsMultiple"
            placeholder="請款供應商">
        </VueSelect>
    </form>
</template>
<style lang="scss">
// Vue Select + Custom overrides
// @import "vue-select/src/scss/vue-select";
@import "vue-select/src/scss/vue-select";
@import "../../assets/scss/vendor/vue-select";
</style>