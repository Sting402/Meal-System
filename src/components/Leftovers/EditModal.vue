<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
const vueSelectRadio = reactive({
    optionsPro: [
        "CBD",
        "CY",
        "JK8",
        "JKS",
        "LJ",
        "TC",
        "TRI",
        "WQ"
    ],
    optionsType: [
        "午餐",
        "晚餐",
        "宵夜",
        "早餐"
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
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇地點</label>
                <div id="app">
                    <select class="form-select" id="example-select" name="example-select" placeholder="廠別">
                        <option :value="list" v-for="(list, item) in vueSelectRadio.optionsPro">
                            {{ list }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇餐別</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別">
                    <!-- <option selected>公司別(請款)..</option> -->
                    <option value="1">午餐</option>
                    <option value="2">晚餐</option>
                    <option value="3">宵夜</option>
                    <option value="4">早餐</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇類型</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇類型">
                    <option value="1">葷食</option>
                    <option value="2">素食</option>
                    <option value="3">輕食</option>
                    <option value="4">菲餐</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇部門</label>
                <div id="app">
                    <select class="form-select" id="example-select" name="example-select" placeholder="部門">
                        <option :value="list" v-for="(list, item) in vueSelectRadio.optionsDep">
                            {{ list }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">輸入總和</label><br>
                <input type="number" class="form-control" min="0" />
            </div>
            <div class="d-flex justify-content-start">
                <button type="button" class="btn btn-primary leftovers-confirm">
                    確認
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.leftovers-confirm {
    margin-right: 100px;
}
</style>