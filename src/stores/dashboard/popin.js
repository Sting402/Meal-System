import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useDashboardPopinStore = defineStore("dashboardPopin", {
    state: () => {
        return {
            $popin: ref(null),//驅動彈窗功能
            index: ref(0)
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
        async getRouter() {
            await axios.get('http://localhost:3000/adminData')
                .then(res => {
                    this.path = res.data.map(function (elements, item, arry) {
                        return arry[item]
                    })
                    console.log(this.path);
                    localStorage.setItem('path', JSON.stringify(this.path))
                })
        }
    },
});