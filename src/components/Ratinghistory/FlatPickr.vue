<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";

// Flatpickr, for more info and examples you can check out https://github.com/ankurk91/vue-flatpickr-component
import FlatPickr from "vue-flatpickr-component";
import { getToday } from '../../utils/utils'


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
    configRange: { mode: "range", minDate: "today" },
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
flatPickrState.dateRange = new Date()
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
let today = getToday()
flatPickrState.dateDefault = today
</script>
<template>
    <!-- Page Content -->

    <!-- Flatpickr Datetimepicker -->
    <form @submit.prevent>
        <!-- <div class="row">
            <div class="col-lg-8 col-xl-6">
                <div class="row mb-4">
                    <div class="col-xl-7"> -->
        <label class="form-label" for="example-flatpickr-default">選擇日期</label>
        <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="請選擇日期"
            v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
        <!-- </div>
                </div>
            </div>
        </div> -->
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