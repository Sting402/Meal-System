<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { $loginSupplier } from '../../../api/loginSupplier'
import { $setToken } from '../../../utils/request'
// Main store and Router
const store = useTemplateStore();
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
function swalError() {
    toast.fire("帳號或密碼輸入錯誤", "請重新輸入", "error");
}
// Input state variables
const state = reactive({
    username: null,
    password: null,
    UserType: "S",
    remember: false,
});

// Validation rules
const rules = computed(() => {
    return {
        username: {
            required,
            minLength: minLength(3),
        },
        password: {
            required,
            minLength: minLength(3),
        },
    };
});
// Use vuelidate
const v$ = useVuelidate(rules, state);
const handleLogin = async () => {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    let message = await $loginSupplier({
        username: state.username,
        Password: state.password,
        UserType: state.UserType
    })
    console.log(message);
    if (message) {
        let token = sessionStorage.getItem('token')
        $setToken(token)
        $router.push({ name: "searchproviding" });
    }
    else {
        swalError()
        // state.username = ''
        // state.password = ''
    }
}
</script>
<template>
    <div class="hero-static d-flex align-items-center">
        <div class="content">
            <div class="row justify-content-center push">
                <div class="col-md-8 col-lg-6 col-xl-4">
                    <!-- Sign In Block -->
                    <BaseBlock title="廠商登入" class="mb-0">
                        <template #options>
                            <RouterLink :to="{ name: 'reminder' }" class="btn-block-option fs-sm">忘記密碼?
                            </RouterLink>
                            <RouterLink :to="{ name: 'login' }" class="btn-block-option fs-sm">回到登陸?
                            </RouterLink>
                            <!-- <RouterLink :to="{ name: 'auth-signup' }" class="btn-block-option">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </RouterLink> -->
                        </template>
                        <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
                            <p class="fw-medium text-muted">歡迎請登入</p>
                            <div class="py-3">
                                <div class="mb-4">
                                    <input type="text" class="form-control form-control-alt form-control-lg"
                                        id="login-username" name="login-username" placeholder="Username" :class="{
                                            'is-invalid': v$.username.$errors.length,
                                        }" v-model="state.username" @blur="v$.username.$touch" />
                                    <div v-if="v$.username.$errors.length" class="invalid-feedback animated fadeIn">
                                        請輸入使用者名稱
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <input type="password" class="form-control form-control-alt form-control-lg"
                                        id="login-password" name="login-password" placeholder="Password" :class="{
                                            'is-invalid': v$.password.$errors.length,
                                        }" v-model="state.password" @blur="v$.password.$touch" />
                                    <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
                                        請輸入密碼
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-md-6 col-xl-5">
                                    <button type="button" class="btn w-100 btn-alt-primary" @click="handleLogin">
                                        <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                                        登入
                                    </button>
                                </div>
                            </div>
                        </div>
                    </BaseBlock>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <button type="button" class="btn btn-alt-secondary push" @click="swalError" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss" >
// SweetAlert2
@import "sweetalert2/dist/sweetalert2.min.css";
</style>