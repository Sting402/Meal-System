<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import axios from "axios";
import Swal from "sweetalert2";
import { useLoginStore } from "../../../stores/login/login";
//導入請求api
import { $login } from '../../../api/login'
import { $setToken } from '../../../utils/request'
// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

// Main store and Router
const store = useTemplateStore();
const storeLogin = useLoginStore();
//導入路由器對象
const $router = useRouter()
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
// Input state variables
const state = reactive({
    username: null,
    password: null,
    UserType: "E",
    remember: false,
});
function swalErrorConfirm() {
    toast.fire("帳號或驗證碼輸入錯誤", "請重新輸入", "error");
}
// Validation rules
const rules = computed(() => {
    return {
        username: {
            required,
            minLength: minLength(3),
        },
        password: {
            required,
            minLength: minLength(5),
        },
    };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
    const result = await v$.value.$validate();
    //$router.push("/layout/personal")
    if (!result) {
        // notify user form is invalid
        return;
    }
    //console.log(state.username);
    let isLogin = await $login({
        username: state.username,
        Password: state.password,
        UserType: state.UserType
    })
    //return 有true
    console.log(isLogin);
    if (isLogin) {
        console.log("執行login");
        let token = sessionStorage.getItem('token')
        $setToken(token)
        $router.push("/layout/personal")
    }
    else {
        swalErrorConfirm()
    }
}
</script>
<template>
    <div class="hero-static col-lg-12 d-flex flex-column align-items-center bg-body-extra-light">
        <div class="p-3 w-100 d-lg-none text-center">
        </div>
        <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
            <div class="w-100">
                <div class="text-center mb-5">
                    <p class="mb-3">
                        <i class="fa fa-2x fa-circle-notch text-primary-light"></i>
                    </p>
                    <h1 class="fw-bold mb-2">登入</h1>
                    <p class="fw-medium text-muted">
                        請登入
                    </p>
                </div>
                <div class="row g-0 justify-content-center">
                    <div class="col-sm-8 col-xl-4">
                        <form @submit.prevent="onSubmit">
                            <div class="mb-4">
                                <input type="text" class="form-control form-control-lg form-control-alt py-3"
                                    id="login-username" name="login-username" placeholder="Username" :class="{
                                        'is-invalid': v$.username.$errors.length,
                                    }" v-model="state.username" @blur="v$.username.$touch" />
                                <div v-if="v$.username.$errors.length" class="invalid-feedback animated fadeIn">
                                    請輸入使用者名稱
                                </div>
                            </div>
                            <div class="mb-4">
                                <input type="password" class="form-control form-control-lg form-control-alt py-3"
                                    id="login-password" name="login-password" placeholder="Password" :class="{
                                        'is-invalid': v$.password.$errors.length,
                                    }" v-model="state.password" @blur="v$.password.$touch" />
                                <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
                                    請輸入密碼
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <RouterLink :to="{ name: 'reminder' }"
                                        class="text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1">
                                        忘記密碼?
                                    </RouterLink>
                                </div>
                                <div>
                                    <RouterLink :to="{ name: 'supplierLogin' }"
                                        class="text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1">
                                        廠商登入
                                    </RouterLink>
                                </div>
                                <div>
                                    <button type="submit" class="btn btn-lg btn-alt-primary" @click="">
                                        <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                                        登入
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <button type="button" class="btn btn-alt-secondary push" @click="swalConfirm" v-show="false">
            <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalErrorConfirm" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss" >
// SweetAlert2
@import "sweetalert2/dist/sweetalert2.min.css";
</style>