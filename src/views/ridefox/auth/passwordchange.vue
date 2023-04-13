<script setup>
import { reactive, computed } from "vue";
import { $confirm } from '../../../api/passwordchange/confirm'
// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import {
    required,
    minLength,
    between,
    decimal,
    integer,
    url,
    sameAs,
} from "@vuelidate/validators";
// Input state variables
const state = reactive({
    oldPassword: null,
    password: null,
    confirmPassword: null,
});
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
let message = ''
function swalConfirm() {
    toast.fire("密碼重設成功!", "建議定期修改密碼", "success");
}
function swalErrorConfirm() {
    toast.fire("密碼輸入錯誤", `${message}`, "error");
}
// Validation rules
const rules = computed(() => {
    return {
        oldPassword: {
            required,
            minLength: minLength(1),
        },
        password: {
            required,
            minLength: minLength(1),
        },
        confirmPassword: {
            required,
            sameAs: sameAs(state.password),
        },
    };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onConfirm() {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    message = ''
    let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    console.log(loginInfo);
    //supplier_ID:"S001"
    console.log(state.oldPassword);
    console.log(state.password);
    if (loginInfo.type === 'I') {
        let res = await $confirm({
            "Username": loginInfo.worker_ID,
            "OldPassword": state.oldPassword,
            "NewPassword": state.password,
            "UserType": "E"
        })
        console.log(res);
        let data = res
        console.log(data);
        if (data.update_Date) {
            swalConfirm()
        } else {
            message = data.message
            swalErrorConfirm()
        }
    }
    if (loginInfo.supplier_ID) {
        console.log(111);
        let res = await $confirm({
            "Username": loginInfo.supplier_ID,
            "OldPassword": state.oldPassword,
            "NewPassword": state.password,
            "UserType": "S"
        })
        console.log(res);
        let data = res
        console.log(data);
        if (data.update_Date) {
            swalConfirm()
        } else {
            message = data.message
            swalErrorConfirm()
        }
    }


}
</script>

<template>
    <BasePageHeading title="個人密碼修改" subtitle="建議定期修改密碼以確保帳號安全">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">個人設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">修改密碼</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <BaseBlock title="修改密碼">
                    <div class="row justify-content-center py-sm-3 py-md-5">
                        <div class="col-sm-4 col-md-3">
                            <div class="mb-4">
                                <label class="form-label" for="val-password">輸入舊密碼 <span
                                        class="text-danger">*</span></label>
                                <input type="password" id="val-password" class="form-control" :class="{
                                    'is-invalid': v$.oldPassword.$errors.length,
                                }" v-model="state.oldPassword" @blur="v$.oldPassword.$touch" placeholder="舊密碼" />
                                <div v-if="v$.oldPassword.$errors.length" class="invalid-feedback animated fadeIn">
                                    請提供舊密碼
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="val-password">輸入新密碼 <span
                                        class="text-danger">*</span></label>
                                <input type="password" id="val-password" class="form-control" :class="{
                                    'is-invalid': v$.password.$errors.length,
                                }" v-model="state.password" @blur="v$.password.$touch" placeholder="新密碼" />
                                <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
                                    請提供新密碼
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="val-confirm-password">確認新密碼 <span
                                        class="text-danger">*</span></label>
                                <input type="password" id="val-confirm-password" class="form-control" :class="{
                                    'is-invalid': v$.confirmPassword.$errors.length,
                                }" v-model="state.confirmPassword" @blur="v$.confirmPassword.$touch"
                                    placeholder="新密碼" />
                                <div v-if="v$.confirmPassword.$errors.length" class="invalid-feedback animated fadeIn">
                                    確認新密碼
                                </div>
                            </div>
                            <div class="row items-push">
                                <div class="col-lg-7">
                                    <button type="submit" class="btn btn-alt-primary" @click="onConfirm">確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseBlock>
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
<style lang="scss">
@import "sweetalert2/dist/sweetalert2.min.css";
</style>