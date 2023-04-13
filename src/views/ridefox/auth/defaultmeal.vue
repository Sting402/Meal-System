<script setup>
import { ref, reactive, onMounted, computed, watchEffect, onUnmounted } from "vue";
import Swal from "sweetalert2";
import { $defaultmeal } from '../../../api/defaultmeal/getDefaultmeal'
import { $selectSite } from '../../../api/defaultmeal/selectSite'
import { $editConfirm } from '../../../api/defaultmeal/editConfirm'
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
function swalErrorEdit() {
    toast.fire("輸入錯誤", "請重新輸入", "error");
}
function swalEditSuccess() {
    toast.fire("編輯成功", "預設餐編輯成功", "success");
}
const state = reactive({
    site_ID: '',
    default_MealOrder: '',
    default_MealType: '',
    select: [],
    rest_ID: []
})
const selectedValue = ref('');
let loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
state.default_MealOrder = loginInfo.default_MealOrder
console.log(loginInfo.default_MealType);
switch (loginInfo.default_MealType) {
    case '葷':
        state.default_MealType = ['葷食']
        console.log(state.default_MealType);
        break;
    case '素':
        state.default_MealType = ['素食']
        break;
    case '輕':
        state.default_MealType = ['輕食']
        break;
}
console.log(state.default_MealType);
selectedValue.value = state.default_MealType[0]
// state.default_MealType = loginInfo.default_MealType
//console.log(state.default_MealType);
const getDefaultmeal = async () => {
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        console.log(loginInfo);
        state.site_ID = loginInfo.site_ID
        let res = await $defaultmeal(
            {
                worker_ID: loginInfo.worker_ID,
                site_ID: loginInfo.site_ID,
                dept_ID: loginInfo.dept_ID,
                meal_Order: loginInfo.default_MealOrder
            })
        //console.log(res);
        let data = res
        console.log(data);
        state.select = res.rests
        //console.log(state.select);
        //console.log(data)
        data.rests.forEach(item => {
            //console.log(item);
            //console.log(item.default);
            if (item.default) {
                state.site_ID = item.site_ID
                console.log(data.default_MealOrder);
                switch (data.default_MealOrder) {
                    case '午':
                        state.default_MealOrder = '午餐'
                        break;
                    case '晚':
                        state.default_MealOrder = '晚餐'
                        break;
                    case '宵':
                        state.default_MealOrder = '宵夜'
                        break;
                    case '早':
                        state.default_MealOrder = '早餐'
                        break;
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const siteChange = async () => {
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        //console.log(loginInfo.default_MealOrder);
        // switch (loginInfo.default_MealOrder) {
        //     case '午':
        //         state.default_MealOrder = '午餐'
        //         break;
        //     case '晚':
        //         state.default_MealOrder = '晚餐'
        //         break;
        //     case '宵':
        //         state.default_MealOrder = '宵夜'
        //         break;
        //     case '早':
        //         state.default_MealOrder = '早餐'
        //         break;
        // }
        let res = await $selectSite({
            dept_ID: loginInfo.dept_ID,
            site_ID: state.site_ID,
            meal_Order: state.default_MealOrder
        })
        //接著繼續下去 還沒完
        let data = res
        console.log(data);
        //console.log(data.payload)
        state.rest_ID = data.payload
        //console.log(state.rest_ID);
        if (state.rest_ID.length === 1) {
            state.default_MealType = ['葷食', '素食']
        } else {
            state.default_MealType = ['葷食', '素食', '輕食']
        }
        console.log(state.site_ID);
    } catch (err) {
        console.log(err);
    }
}
const handleMealType = async () => {
    siteChange()
}
const handleConfirm = async () => {
    console.log(selectedValue.value);
    switch (loginInfo.default_MealType) {
        case '葷食':
            selectedValue.value = ['葷']
            console.log(selectedValue.value);
            break;
        case '素食':
            selectedValue.value = ['素']
            console.log(selectedValue.value);
            break;
        case '輕食':
            selectedValue.value = ['輕']
            console.log(selectedValue.value[0]);
            break;
    }
    console.log(selectedValue.value);
    try {
        let res = await $editConfirm({
            worker_ID: loginInfo.worker_ID,
            site_ID: state.site_ID,
            shift: loginInfo.shift,
            default_MealType: selectedValue.value[0]
        })
        console.log(res);
        swalEditSuccess()
        getDefaultmeal()
    } catch (err) {
        console.log(err);
        swalErrorEdit()
    }
}
// 1.開放期間: 每月15號00: 00AM至25號23: 59PM
// 2.廠別: 例 JK8、JKS、TRI等
// 3.類別: 葷、素、輕，註: 輕食限定 JK8、JKS、TC
// 4.未修改: 未完成修改者將依照最後一次系統預設之廠別及類別供餐
getDefaultmeal()
let popoverTriggerList = [];
let popoverList = [];
onMounted(() => {
    popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    );

    // ..and init them
    popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new window.bootstrap.Popover(popoverTriggerEl, {
            container: popoverTriggerEl.dataset.bsContainer || "#page-container",
            animation:
                popoverTriggerEl.dataset.bsAnimation &&
                    popoverTriggerEl.dataset.bsAnimation.toLowerCase() == "true"
                    ? true
                    : false,
            trigger: popoverTriggerEl.dataset.bsTrigger || "hover focus",
        });
    });
})
onUnmounted(() => {
    popoverList.forEach((popover) => popover.dispose());
});
</script>
<template>
    <BasePageHeading title="預設餐維護">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">個人設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">預設餐維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <form @submit.prevent>
                    <BaseBlock title="預設餐維護">
                        <template #options>
                            <button type="button" class="btn btn-sm btn-primary" @click="handleConfirm(item)">
                                確認
                            </button>
                        </template>
                        <div class="row justify-content-end py-sm-3 py-md-5">
                            <div class="col-sm-10 col-md-8">
                                <div class="mb-4 col-sm-7 col-md-4">
                                    <label class="form-label" for="block-form1-username">選擇廠別</label>
                                    <div id="app">
                                        <select id="default-select" class="form-select" v-model="state.site_ID"
                                            @change="siteChange">
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
                                <div class="mb-4 col-sm-7 col-md-4">
                                    <label class="form-label" for="block-form1-password">餐別</label>
                                    <div id="app">
                                        <select class="form-select" id="default-select" v-model="state.default_MealOrder"
                                            :disabled="true">
                                            <option :value="state.default_MealOrder">{{ state.default_MealOrder }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-4 col-sm-7 col-md-4">
                                    <label class="form-label" for="block-form1-password">選擇類型</label>
                                    <div id="app">
                                        <select class="form-select" id="default-select" v-model="selectedValue"
                                            @click="handleMealType">
                                            <option :value="list" v-for="(list, item) in state.default_MealType"
                                                :key="item">
                                                {{ list }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-4 col-sm-7 col-md-4">
                                    <button type="button" class="btn btn-danger w-100" data-bs-toggle="popover"
                                        data-bs-placement="right" title="注意提示" data-bs-html="true"
                                        data-bs-content="<span class='text-danger' style='color: red !important;'>1.開放期間:每月15號00:00AM至25號23:59PM</span><br>
                                                            <span class='text-danger' style='color: red !important;'>2.廠別: 例 JK8、JKS、TRI等</span><br>
                                                            <span class='text-danger' style='color: red !important;'> 3.類別: 葷、素、輕，註: 輕食限定 JK8、JKS、TC</span><br>
                                                            <span class='text-danger' style='color: red !important;'> 4.未修改:未完成修改者將依照最後一次系統預設之廠別及類別供餐</span>">
                                        重要提醒
                                    </button>
                                </div>

                                <!-- <h5 class="fw-normal" style="color: red">請於本月25號(含)前完成預設餐點設定</h5> -->
                            </div>
                        </div>
                    </BaseBlock>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <button type="button" class="btn btn-alt-secondary push" @click="swalEditSuccess" v-show="false">
            <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEdit" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss">
.popover {
    max-width: 450px !important;
    font-size: 18px;
}
</style>
<style lang="scss">
@import "sweetalert2/dist/sweetalert2.min.css";
</style>
