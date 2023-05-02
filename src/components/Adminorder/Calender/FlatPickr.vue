<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
// Flatpickr, for more info and examples you can check out https://github.com/ankurk91/vue-flatpickr-component
import FlatPickr from "vue-flatpickr-component"
import { getToday } from '../../../utils/utils';
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const store = useAdminOrderStore()


// Flatpickr variables
const flatPickrState = reactive({
    // Initial values
    dateDefault: null,
    dateCustom: null,
    dateFriendly: null,
    dateRange: null,
    timeStandalone: null,
    timeStandalone24: null,
    timeDateTime: null,
    timeDateTime24: null,
    inlineDefault: null,
    inlineTime: null,

    // Configuration, get more form https://chmln.github.io/flatpickr/options/
    configCustom: { dateFormat: "d-m-Y" },
    configFriendly: { dateFormat: "F j, Y" },
    configRange: { mode: "single", minDate: "today", clickOpens: false, },
    configTimeStandalone: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    },
    configTimeStandalone24: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
    },
    configDateTime: { enableTime: true },
    configDateTime24: { enableTime: true, time_24hr: true },
    configInlineDefault: { inline: true },
    configInlineTime: { inline: true, enableTime: true },
});
//flatPickrState.dateRange = new Date()
// Vue Color variables
const vueColorState = reactive({
    colors: "#5c80d1",
});

// Custom Input Maxlength variables
const maxLength = reactive({
    max: 20,
    maxValue: "",
    max2: 30,
    maxValue2: "",
    max3: 40,
    maxValue3: "",
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

// Dropzone variables
const dropzone = ref(null);
//
const stateDefault = reactive({
    selectedDay: null,
})
watchEffect(() => {
    console.log(store.data);
    // console.log(store.data[store.index]);
    try {
        if (store.data) {
            stateDefault.selectedDay = store.data.selectedDay
            flatPickrState.dateRange = stateDefault.selectedDay
        }
        console.log(stateDefault.selectedDay);
    } catch (err) {
        console.log(err);
    }
})


onMounted(() => {

})
</script>
<template>
    <form @submit.prevent>
        <label class="form-label" for="example-flatpickr-default">選擇日期</label>
        <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="日期已過訂單無法修改"
            v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
    </form>
</template>
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