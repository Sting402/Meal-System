<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// Vue Select, for more info and examples you can check out https://github.com/sagalbot/vue-select
import VueSelect from "vue-select";
// Vue Select initial values
const vueSelectState = reactive({
    options: [
        "221",
        "222",
        "241",
        "245",
        "248",
        "500",
        "810",
        "812",
        "821",
        "823",
        "825",
        "833",
        "841",
        "842",
        "843",
        "846",
        "850",
        "860",
        "930",
        "932",
        "933",
        "940",
        "945"
    ],
    optionsSelected: null,
    optionsMultiple: [
        "221",
        "222",
        "241",
        "245",
        "248",
        "500",
        "810",
        "812",
        "821",
        "823",
        "825",
        "833",
        "841",
        "842",
        "843",
        "846",
        "850",
        "860",
        "930",
        "932",
        "933",
        "940",
        "945"
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
            placeholder="請款部門">
        </VueSelect>
    </form>
</template>