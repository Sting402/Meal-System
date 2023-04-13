<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from "vue-select";
// Vue Select initial values
const vueSelectState = reactive({
    options: [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "MySQL",
        "Ruby",
        "Angular",
        "React",
        "Vue.js",
    ],
    optionsSelected: null,
    optionsMultiple: [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "MySQL",
        "Ruby",
        "Angular",
        "React",
        "Vue.js",
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

<style lang="scss">
// Flatpickr + Custom overrides
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";

// Vue Color Custom overrides
@import "@/assets/scss/vendor/vue-color";

// Vue Select + Custom overrides
@import "vue-select/src/scss/vue-select";
@import "@/assets/scss/vendor/vue-select";

// Vue Form Slider + Custom overrides
@import "@vueform/slider/themes/default.css";
@import "@/assets/scss/vendor/vueform-slider";

// Dropzone + Custom overrides
@import "dropzone/dist/dropzone.css";
@import "@/assets/scss/vendor/dropzone";
</style>

<template>
    <form @submit.prevent>
        <VueSelect multiple v-model="vueSelectState.optionsMultipleSelected" :options="vueSelectState.optionsMultiple"
            placeholder="">
        </VueSelect>
    </form>
</template>