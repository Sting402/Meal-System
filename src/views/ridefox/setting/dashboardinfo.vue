<script setup>
// import FlatPickr from '../../../components/Dashboardinfo/FlatPickr.vue'
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import FlatPickr from "vue-flatpickr-component";
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
const vueColorState = reactive({
    colors: "#5c80d1",
});
const maxLength = reactive({
    max: 20,
    maxValue: "",
    max2: 30,
    maxValue2: "",
    max3: 40,
    maxValue3: "",
});
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
    <BasePageHeading title="佈告欄維護">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">佈告欄維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <form @submit.prevent>
                    <BaseBlock title="佈告欄維護">
                        <template #options>
                            <button type="submit" class="btn btn-sm btn-primary">
                                佈告欄消息上架
                            </button>
                            <!-- <button type="reset" class="btn btn-sm btn-alt-primary">
                                                                                                                                                                                                            Reset
                                                                                                                                                                                                        </button> -->
                        </template>
                        <div class="row justify-content-center py-sm-3 py-md-5 w-100">
                            <div class="col-sm-10 col-md-4 ">
                                <div class="mb-4 ">
                                    <label class="form-label" for="example-flatpickr-default">日期</label>
                                    <FlatPickr id="example-flatpickr-default" class="form-control" placeholder="選擇日期"
                                        v-model="flatPickrState.dateDefault" :config="flatPickrState.configRange" />
                                </div>
                                <div class="mb-4">
                                    <label class="form-label" for="example-text-input">標題</label>
                                    <input type="text" class="form-control" placeholder="輸入標題" />
                                </div>
                                <!-- <div class="mb-4">
                                        <label class="form-label" for="block-form1-password">上傳檔案</label>
                                        <div id="app">
                                            <input class="form-control" type="file" id="example-file-input" />
                                        </div>
                                    </div> -->
                                <div class="mb-4">
                                    <label class="form-label" for="block-form1-password">內容</label>
                                    <div class="mb-2">
                                        <textarea class="form-control" id="example-textarea-input"
                                            name="example-textarea-input" rows="2" placeholder="輸入事由"
                                            style="resize:none;"></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </BaseBlock>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
// #default-select {
//     width: 200px !important;
//     background-color: 100px;
// }
</style>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
</style>