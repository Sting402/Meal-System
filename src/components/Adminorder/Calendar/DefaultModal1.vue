<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import FlatPickr from "./FlatPickr.vue";
const isShowMeal = ref(false)
const isDisabled = ref(false)
//判斷餐點時間
//早班同仁上班時間(8:00~17:00、9:00~18:00)  9:00~9:30廠商取資料  午(12:00吃)
//中班同仁上班時間(13:00~22:00、15:00~24:00)  14:00~14:30廠商取資料  晚(17:00吃)
//晚班同仁上班時間(21:00~06:00、23:00~08:00)  21:00~21:30廠商取資料  宵(23:00吃)、早(06:00吃)
const isMealTime = computed(() => {
    //先大概寫一下
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes;
    if (currentHour >= 6 && currentHour < 9) {
        isShowMeal.value = false
        // storeNewSecond.mealsSelected = "午餐"
        return "午餐";
    } else if (currentHour >= 10 && currentHour < 14) {
        isShowMeal.value = false
        // storeNewSecond.mealsSelected = "晚餐"
        return "晚餐";
    } else if (currentHour >= 15 && currentHour < 17) {
        isShowMeal.value = true
        return "宵夜";
    } else if (currentHour >= 23 && currentHour < 6) {
        isShowMeal.value = true
        return "早餐";
    } else {
        return "還無法訂購餐點";
    }
})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇廠別</label>
                <div id="app">
                    <select id="default-select" class="form-select" :disabled="isDisabled">
                        <option value="CBD">CBD</option>
                        <option value="CY">CY</option>
                        <option value="JK8">JK8</option>
                        <option value="JKS">JKS</option>
                        <option value="LJ">LJ</option>
                        <option value="TC">TC</option>
                        <option value="TRI">TRI</option>
                        <option value="WQ">WQ</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇餐別</label>
                <div id="app">
                    <select id="default-select" class="form-select">
                        <option value="午餐">午餐</option>
                        <option value="晚餐">晚餐</option>
                        <option value="宵夜">宵夜</option>
                        <option value="早餐">早餐</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇類型</label>
                <div id="app">
                    <select id="default-select" class="form-select">
                        <option value="葷食">葷食</option>
                        <option value="素食">素食</option>
                        <option value="葷食">輕食</option>
                        <option value="素食">菲餐</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <FlatPickr></FlatPickr>
            </div>
            <div class="d-flex justify-content-start">
                <button type="button" class="btn btn-primary mx-2">
                    取消訂餐
                </button>
                <button type="button" class="btn btn-alt-secondary mx-3">
                    重新訂餐
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>