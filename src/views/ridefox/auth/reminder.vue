<script setup>
import { reactive, computed } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
//導入請求api
import { $reminder } from '../../../api/reminder/reminder'
import { $confirm } from '../../../api/reminder/confirm'
// Main store and Router
const store = useTemplateStore();
const router = useRouter();
// Set default properties
let toast = Swal.mixin({
  buttonsStyling: false,
  target: "#page-container",
  customClass: {
    confirmButton: "btn btn-success m-1",
    cancelButton: "btn btn-danger m-1",
    input: "form-control",
  },
});
function swalSuccess() {
  toast.fire("寄送成功", "我們將把認證碼發送至您的Email", "success");
}
function swalErrorEmail() {
  toast.fire("帳號輸入錯誤", "請重新輸入帳號", "error");
}
function swalConfirm() {
  toast.fire("密碼重設成功!", "3秒後跳轉至登入頁面", "success");
}
function swalErrorConfirm() {
  toast.fire("帳號或驗證碼輸入錯誤", "請重新輸入", "error");
}
// Input state variables
const state = reactive({
  userName: null,
  UserType: null
});
const confirm = reactive({
  username: null,
  verificationcode: null,
  NewPassword: null,
  UserType: null
})
// Validation rules
const rules = computed(() => {
  return {
    reminder: {
      required,
      minLength: minLength(3),
    },
  };
});
const rules1 = computed(() => {
  return {
    username: {
      required,
      minLength: minLength(3),
    },
    NewPassword: {
      required,
      minLength: minLength(3),
    },
    verificationcode: {
      required,
      minLength: minLength(3),
    }
  };
});
// Use vuelidate
const v$ = useVuelidate(rules, state);
const v1$ = useVuelidate(rules1, confirm);
//發送eMail
async function onSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  if (state.reminder.length === 4) {
    state.UserType = "S"
  } else {
    state.UserType = "E"
  }
  console.log(state.UserType);
  let message = await $reminder({
    Username: state.reminder,
    UserType: state.UserType
  })
  console.log(message);
  if (message) {
    swalSuccess()
  } else {
    swalErrorEmail()
  }
}
//驗證碼驗證
async function onConfirm() {
  const result1 = await v1$.value.$validate();
  if (!result1) {
    return;
  }
  if (confirm.length === 4) {
    confirm.UserType = "S"
  } else {
    confirm.UserType = "E"
  }
  // console.log({
  //   Username: confirm.username,
  //   OldPassword: confirm.verificationcode,
  //   NewPassword: confirm.NewPassword,
  //   UserType: confirm.UserType
  // });
  let message = await $confirm({
    Username: confirm.username,
    OldPassword: confirm.verificationcode,
    NewPassword: confirm.NewPassword,
    UserType: confirm.UserType
  })
  console.log(message);
  if (message) {
    swalConfirm()
    // alert('確認成功')
    setTimeout(() => {
      router.push({ name: "login" });
    }, 3000)
  } else {
    console.log("錯誤處理");
    //錯誤處理
    swalErrorConfirm()
  }
}
</script>
<template>
  <div class="hero-static col-lg-12 d-flex flex-column align-items-center bg-body-extra-light ">
    <div class="w-100">
      <div class="bg-body-extra-light">
        <div class="content content-full">
          <div class="row g-0 justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-4 py-4 px-4 px-lg-5">
              <div class="text-center">
                <p class="mb-2">
                  <i class="fa fa-2x fa-circle-notch text-primary"></i>
                </p>
                <h1 class="h4 mb-1">忘記密碼</h1>
                <p class="mb-3">
                  請輸入您的帳號，我們將把認證碼發送至您的Email。
                </p>
              </div>
              <div class="mb-4">
                <input type="text" class="form-control form-control-lg form-control-alt" id="reminder-credential"
                  name="reminder-credential" placeholder="輸入帳號" :class="{
                    'is-invalid': v$.reminder.$errors.length,
                  }" v-model="state.reminder" @blur="v$.reminder.$touch" />
                <div v-if="v$.reminder.$errors.length" class="invalid-feedback animated fadeIn">
                  請輸入帳號
                </div>
              </div>
              <div class="row justify-content-center mb-4">
                <div class="col-lg-8">
                  <button type="button" class="btn w-100 btn-primary" @click="onSubmit">
                    <i class="fa fa-fw fa-envelope me-1"></i> 發送E-mail
                  </button>
                </div>
              </div>
              <div class="mb-4">
                <input type="text" class="form-control form-control-lg form-control-alt py-3" id="login-username"
                  name="login-username" placeholder="輸入帳號" :class="{
                    'is-invalid': v1$.username.$errors.length,
                  }" v-model="confirm.username" @blur="v1$.username.$touch" />
                <div v-if="v1$.username.$errors.length" class="invalid-feedback animated fadeIn">
                  請輸入帳號
                </div>
              </div>
              <div class="mb-4">
                <input type="password" class="form-control form-control-lg form-control-alt py-3" id="login-password"
                  name="login-password" placeholder="輸入驗證碼" :class="{
                    'is-invalid': v1$.verificationcode.$errors.length,
                  }" v-model="confirm.verificationcode" @blur="v1$.verificationcode.$touch" />
                <div v-if="v1$.verificationcode.$errors.length" class="invalid-feedback animated fadeIn">
                  請輸入驗證碼
                </div>
              </div>
              <div class="mb-4">
                <input type="password" class="form-control form-control-lg form-control-alt py-3" id="login-password"
                  name="login-password" placeholder="輸入新密碼" :class="{
                    'is-invalid': v1$.NewPassword.$errors.length,
                  }" v-model="confirm.NewPassword" @blur="v1$.NewPassword.$touch" />
                <div v-if="v1$.NewPassword.$errors.length" class="invalid-feedback animated fadeIn">
                  輸入新密碼
                </div>
              </div>
              <div class="row justify-content-center mb-4">
                <div class="col-lg-8">
                  <button type="button" class="btn w-100 btn-primary" @click="onConfirm">
                    確認
                  </button>
                </div>
              </div>
              <div class="text-center">
                <RouterLink :to="{ name: 'login' }" class="fs-sm fw-medium">登入?</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <!-- Success -->
    <button type="button" class="btn btn-alt-secondary push" @click="swalSuccess" v-show="false">
      <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
    </button>
    <!-- END Success -->
    <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEmail" v-show="false">
      <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
    </button>
  </div>
  <div class="col-md-6">
    <!-- Success -->
    <button type="button" class="btn btn-alt-secondary push" @click="swalConfirm" v-show="false">
      <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
    </button>
    <button type="button" class="btn btn-alt-secondary push" @click="swalErrorConfirm" v-show="false">
      <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
    </button>
    <!-- END Success -->
  </div>
</template>
<style lang="scss" >
// SweetAlert2
@import "sweetalert2/dist/sweetalert2.min.css";
</style>
