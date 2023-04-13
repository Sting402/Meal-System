<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// import VueSelect from "vue-select";
import VueSelect from "vue-select";
import Dropzone from "dropzone";
const mobileSideNav = ref(false);
const vueSelectCBDMeal = reactive({
    options0: [
        "葷食",
        "素食",
        "輕食",
        "菲餐"
    ],
    optionsSelected: null,
    optionsMultiple0: [
        "葷食",
        "素食",
        "輕食",
        "菲餐"
    ],
    optionsMultipleSelected: null,
});
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
</script>
<template>
    <BasePageHeading title="預估餐點數量維護" subtitle="一個禮拜">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">Elements</a>
                    </li>
                    <!-- <li class="breadcrumb-item" aria-current="page">Tabs</li> -->
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
                            星期一
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="btabs-animated-slideleft-profile-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-profile" role="tab"
                            aria-controls="btabs-animated-slideleft-profile" aria-selected="false">
                            星期二
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="btabs-animated-slideleft-Wednesday-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-Wednesday" role="tab"
                            aria-controls="btabs-animated-slideleft-Wednesday" aria-selected="false">
                            星期三
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="btabs-animated-slideleft-profile-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-Thursday" role="tab"
                            aria-controls="btabs-animated-slideleft-Thursday" aria-selected="false">
                            星期四
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="btabs-animated-slideleft-Friday-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-Friday" role="tab"
                            aria-controls="btabs-animated-slideleft-Friday" aria-selected="false">
                            星期五
                        </button>
                    </li>
                </ul>
                <div class="block-content tab-content overflow-hidden">
                    <div class="tab-pane fade fade-left show active" id="btabs-animated-slideleft-home" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-home-tab" tabindex="0">
                        <BaseBlock title="預估餐點數量維護一" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">場別</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">產線</th>
                                            <th style="width: 15%">倉庫</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CBD</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CY</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JK8</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JKS</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>LJ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TC</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TRI</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>WQ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-profile" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-profile-tab" tabindex="0">
                        <BaseBlock title="預估餐點數量維護二" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">場別</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">產線</th>
                                            <th style="width: 15%">倉庫</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CBD</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CY</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JK8</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JKS</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>LJ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TC</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TRI</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>WQ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-Wednesday" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-Wednesday-tab" tabindex="0">
                        <BaseBlock title="預估餐點數量維護三" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">場別</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">產線</th>
                                            <th style="width: 15%">倉庫</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CBD</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CY</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JK8</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JKS</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>LJ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TC</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TRI</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>WQ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-Thursday" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-Friday-tab" tabindex="0">
                        <BaseBlock title="預估餐點數量維護四" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">場別</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">產線</th>
                                            <th style="width: 15%">倉庫</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CBD</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CY</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JK8</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JKS</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>LJ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TC</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TRI</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>WQ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </BaseBlock>
                    </div>
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-Friday" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-Friday-tab" tabindex="0">
                        <BaseBlock title="預估餐點數量維護五" id="supplier-baseblock">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-vcenter">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">場別</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">產線</th>
                                            <th style="width: 15%">倉庫</th>
                                            <th style="width: 15%">餐別</th>
                                            <th style="width: 15%">總和</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CBD</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CY</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JK8</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>JKS</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>LJ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TC</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>TRI</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>WQ</td>
                                            <td>午</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>晚</td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
                                            </td>
                                            <td class="d-sm-table-cell fw-semibold" id="meal-select">
                                                <VueSelect multiple v-model="vueSelectCBDMeal.optionsMultipleSelected"
                                                    :options="vueSelectCBDMeal.optionsMultiple0" placeholder="請選擇餐別">
                                                </VueSelect>
                                            </td>
                                            <td>
                                                <input type="number" id="input-list" min="0" />
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
</style>