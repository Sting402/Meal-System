import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const useAdminOrderStore = defineStore("adminOrder", {
    state: () => {
        // return {
        //     isSelect: ref(null),//驅動
        //     data: reactive([])
        // };
        return {
            data: reactive({}),
            loginInfo: reactive({}),
            secondData: reactive({}),
            visitorsData: reactive({}),
            thirdData: reactive({}),
            secondEditData: '',
            visitorsEditData: reactive({}),
            thirdEditData: reactive({}),
            isDefault: ref(false),//默認餐按鈕修改用
            isSecond: ref(false),
            isVisitors: ref(false),
            isThird: ref(false),
            isChangeDefault: ref(''),
            isReorderDefault: ref(''),
            isDefaultEdit: ref(''),
            isSecondAdd: ref(''),
            isSecondEdit: ref(''),
            isVisitorsAdd: ref(''),
            isVisitorsEdit: ref(''),
            isThirdAdd: ref(''),
            isThirdEdit: ref(''),
            defaultsite_ID: ref(''),
            default_MealOrder: ref(''),
            default_MealType: ref(''),
            isOffcanvasRef: ref(''),
            isSecondPopEdit: ref(''),
            isVisitorsPopEdit: ref(''),
            isThirdPopEdit: ref(''),
            isThirdPopEdit: ref(''),
            isGetWorkday: ref('')
        };
    },
    actions: {
        //假數據用
        getToken() {
            // this.isLogin = [{
            //   "msg": "登录成功",
            // "success":"登录成功"
            //   "loginResult": true,
            //   "user": {
            //     "id": 1,
            //     "username": "admin",
            //     "password": "11111"
            //   },
            //   "token": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NDc0NTcxNH0.fmQX5kRcrrg-6CCNqRkkpUCirXUO0yD86yZSeW6z51X-S1f7gZVne53lzzj47pwf_TwbGI3PGparTjKSUBVQCg"
            // }]
            // console.log(this.isLogin);
        },
        // async getRouter() {
        //     await axios.get('http://localhost:3000/adminData')
        //         .then(res => {
        //             this.path = res.data.map(function (elements, item, arry) {
        //                 return arry[item]
        //             })
        //             console.log(this.path);
        //             localStorage.setItem('path', JSON.stringify(this.path))
        //         })
        // }
    },
});