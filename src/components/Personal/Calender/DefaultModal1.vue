<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import FlatPickr from "./FlatPickr.vue";
import { usePersonaleStore } from '../../../stores/personal/personal';
import { $selectSite } from '../../../api/defaultmeal/selectSite'
import { storeToRefs } from "pinia";
const store = usePersonaleStore()
store.defaultsite_ID = storeToRefs(store)
store.default_MealOrder = storeToRefs(store)
store.default_MealType = storeToRefs(store)
const isDefaultEdit = ref('')
const isShowMeal = ref(false)
const isShowButton = ref(true)
const state = reactive({
    site_ID: '',
    Default_MealOrder: '',
    default_MealType: '',
    select: [],
    rest_ID: [],
    shift: ''
})
const stateDefault_MealOrder = ([
    { value: '午餐' },
    { value: '晚餐' },
    { value: '宵夜' },
    { value: '早餐' },
])
//判斷餐點時間
//早班同仁上班時間(8:00~17:00、9:00~18:00)  9:00~9:30廠商取資料  午(12:00吃)
//中班同仁上班時間(13:00~22:00、15:00~24:00)  14:00~14:30廠商取資料  晚(17:00吃)
//晚班同仁上班時間(21:00~06:00、23:00~08:00)  21:00~21:30廠商取資料  宵(23:00吃)、早(06:00吃)
const isMealTime = computed(() => {
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

const initSiteChange = async () => {
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        //console.log(loginInfo.default_MealOrder)
        let res = await $selectSite({
            dept_ID: loginInfo.dept_ID,
            site_ID: loginInfo.site_ID,
            meal_Order: loginInfo.default_MealOrder
        })
        //console.log(res);
        let data = res
        //console.log(data);
        //console.log(data.payload)
        state.rest_ID = data.payload
        //console.log(state.rest_ID.length);
        if (state.rest_ID.length === 1) {
            state.default_MealType = ['葷食', '素食'] //新增第二餐應該沒有輕食
        } else {
            state.default_MealType = ['葷食', '素食', '輕食']
        }
        //console.log(state.default_MealType);
        //console.log(state.site_ID);
        //console.log(selectedValue.value);
        // console.log(loginInfo.default_MealType)
        let meal_MealType = ''
        switch (loginInfo.default_MealType) {
            case '葷':
                meal_MealType = '葷食'
                break;
            case '素':
                meal_MealType = '素食'
                break;
            case '輕':
                meal_MealType = '輕食'
                break;
        }
        //console.log(meal_MealType);
        store.default_MealType = meal_MealType
        //console.log(store.default_MealType);
        store.defaultsite_ID = loginInfo.site_ID
    } catch (err) {
        console.log(err);
    }
}
const initDefault_MealOrder = async () => {
    let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    let meal_Order = ''
    switch (loginInfo.default_MealOrder) {
        case '午':
            meal_Order = '午餐'
            break;
        case '晚':
            meal_Order = '晚餐'
            break;
        case '宵':
            meal_Order = '宵夜'
            break;
        case '早':
            meal_Order = '早餐'
            break;
    }
    state.Default_MealOrder = meal_Order
}
const handleChange = () => {
    store.defaultsite_ID = store.data.site_ID
    store.default_MealType = store.data.default_MealType
    isShowButton.value = store.data.enable
}
const cancleOrder = async () => {
    store.isChangeDefault.click()
}
const hanldeReorder = async () => {
    store.isReorderDefault.click()
}
initSiteChange()
initDefault_MealOrder()
// watch(() => store.default_MealType,
//     (newVal, oldVal) => {
//         store.default_MealType = newVal
//         console.log(store.default_MealType);
//     }
// );
onMounted(() => {
    store.isDefaultEdit = isDefaultEdit.value
})
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">餐別</label>
                <select class="form-select" id="example-select" name="example-select" v-model="state.Default_MealOrder"
                    disabled="true">
                    <option v-for="item in  stateDefault_MealOrder " :value="item.value" :key="item">{{ item.value }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇廠別</label>
                <div id="app">
                    <select id="default-select" class="form-select" v-model="store.defaultsite_ID"
                        :disabled="!isShowButton">
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
                <label class="form-label" for="block-form1-password">選擇類型</label>
                <div id="app">
                    <select class="form-select" id="default-select" v-model="store.default_MealType" disabled="true">
                        <option :value="list" v-for="(list, item) in  state.default_MealType" :key="item">
                            {{ list }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <FlatPickr></FlatPickr>
            </div>
            <div class="d-flex justify-content-start" v-if="isShowButton">
                <button type="button" class="btn  btn-primary mx-3" @click="hanldeReorder">
                    重新訂餐
                </button>
                <button type="button" class="btn  btn-danger mx-2" @click="cancleOrder">
                    取消訂餐
                </button>
            </div>
        </div>
    </div>
    <button type="button" ref="isDefaultEdit" @click="handleChange" v-show="false"></button>
</template>
<style lang="scss"></style>