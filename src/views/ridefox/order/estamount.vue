<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// import VueSelect from "vue-select";
import VueSelect from "vue-select";
import Dropzone from "dropzone";
const mobileSideNav = ref(false);
//
const NextWeek = reactive([
    { title: "星期一" },
    { title: "星期二" },
    { title: "星期三" },
    { title: "星期四" },
    { title: "星期五" },
    { title: "星期六" },
    { title: "星期日" },
])
const productList = reactive([
    { title: "CBD" },
    { title: "CY" },
    { title: "JK8" },
    { title: "JKS" },
    { title: "LJ" },
    { title: "TC" },
    { title: "TRI" },
    { title: "WQ" }
])
const vueSelectCBDMeal = reactive({
    optionsPro: [
        "833",
        "843",
        "844",
        "845",
        "846",
        "847",
        "871"
    ],
    optionsWare: [
        "871"
    ],
    optionsMeal: [
        "葷食",
        "素食",
        "輕食",
        "菲餐"
    ],
    optionsSelectedPro: null,
    optionsSelectedMeal: null,
    optionsSelectedWare: null,
    optionsMultiplePro: [
        "833",
        "843",
        "844",
        "845",
        "846",
        "847",
    ],
    optionsMultipleWare: [
        "871"
    ],
    optionsMultipleMeal: [
        "葷食",
        "素食",
        "輕食",
        "菲餐"
    ],
});
const vueSelectCBDRadio = reactive({
    optionsDep: [
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
    ]
})
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
const dayList = ref([])
const getToday = () => {
    let arr = []
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        let options = { weekday: 'long' };
        let day = date.toLocaleDateString('zh-CN', options);
        let y = date.getFullYear();
        let m = date.getMonth();
        let d = date.getDate();
        let today = `${y}-${m + 1}-${d} ${day}`
        arr.push(today)
    }
    return arr
}
dayList.value = getToday()
//console.log(dayList.value);
//獲得下星期一到星期日的日期
let startDate = new Date();
// 获取下禮拜一
startDate.setDate(startDate.getDate() - startDate.getDay() + 1 + 7);
const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
let weekDates = [];
// 循环 7 次来获取星期一到星期日的日期
for (let i = 0; i < 7; i++) {
    let newDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    weekDates.push(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} ${weekday[newDate.getDay()]}`);
}
//console.log(weekDates);
</script>
<template>
    <BasePageHeading title="預估餐點數量維護" subtitle="一個禮拜">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <ol class="breadcrumb breadcrumb-alt">
                        <li class="breadcrumb-item">
                            <a class="link-fx" href="javascript:void(0)">餐點</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">預估餐點數量</li>
                    </ol>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <!-- Full Table -->
        <BaseBlock>
            <template #content>
                <ul class="nav nav-tabs nav-tabs-block" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link active" id="btabs-animated-slideleft-home-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-home" role="tab"
                            aria-controls="btabs-animated-slideleft-home" aria-selected="true">
                            本周修改
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="btabs-animated-slideleft-profile-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-profile" role="tab"
                            aria-controls="btabs-animated-slideleft-profile" aria-selected="false">
                            下周預估
                        </button>
                    </li>
                </ul>
                <div class="block-content tab-content overflow-hidden">
                    <div class="tab-pane fade fade-left show active" id="btabs-animated-slideleft-home" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-home-tab" tabindex="0">
                        <h4 class="fw-normal">{{ dayList[0] }}</h4>
                        <BaseBlock title="本日不可修改" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th class="text-center" style="width: 10%">廠別</th>
                                            <th class="text-center" style="width: 10%">餐別</th>
                                            <th class="text-center" style="width: 10%">產線數量</th>
                                            <th class="text-center" style="width: 10%">倉庫數量</th>
                                            <th class="text-center" style="width: 10%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(list, item) in productList">
                                        <tr>
                                            <td class="text-center">{{ list.title }}</td>
                                            <td class="text-center">午餐</td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td class="text-center">晚餐</td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td class="text-center">宵夜</td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td class="text-center">早餐</td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td class="text-center">
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                        <BaseBlock :title="dayList[1]" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">廠別</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">產線數量</th>
                                            <th style="width: 15%">倉庫數量</th>
                                            <th style="width: 15%">餐點類型</th>
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(list, item) in productList">
                                        <tr>
                                            <td>{{ list.title }}</td>
                                            <td>午餐</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚餐</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>宵夜</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>早餐</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-profile" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-profile-tab" tabindex="0">
                        <BaseBlock id="supplier-baseblock" v-for="(list, item) in NextWeek">
                            <h4 class="fw-normal">{{ weekDates[item] }}</h4>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">廠別</th>
                                            <th style="width: 15%">餐別</th>
                                            <!-- <th style="width: 15%">產線</th> -->
                                            <th style="width: 15%">產線數量</th>
                                            <!-- <th style="width: 15%">倉庫</th> -->
                                            <th style="width: 15%">倉庫數量</th>
                                            <!-- <th style="width: 15%">餐點類型</th> -->
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(list, item) in productList">
                                        <tr>
                                            <td>{{ list.title }}</td>
                                            <td>午餐</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚餐</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>宵夜</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>早餐</td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-estamount" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                </div>
            </template>
        </BaseBlock>
        <!-- END Full Table -->
    </div>
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

#input-estamount {
    width: 80px;
}
</style>