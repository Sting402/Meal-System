import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      data: ref([]),
      isLogin: ref([]),
      path: ref([]),
      secondPath: ref([]),
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
      // let secondData = [
      //   {
      //     name: "代訂餐點",
      //     // subActivePaths: "/backend/tables/",
      //     sub: [
      //       {
      //         name: "代訂產線",
      //         to: "newComer",
      //         icon: "si si-wrench",
      //       },
      //       {
      //         name: "代訂新人",
      //         to: "productionLine",
      //         icon: "si si-graduation",
      //       },
      //       {
      //         name: "代訂倉庫",
      //         to: "warehouse",
      //         icon: "si si-badge",
      //       },
      //       {
      //         name: "代訂人員",
      //         to: "staff",
      //         icon: "si si-badge",
      //       },
      //     ]
      //   },
      // ]

    }
    // await axios.post('/api/forgotPassword', this.registerEmail)
    // .then(res => {
    //     console.log(res);
    //     this.checkEmail = res.data.message
    // })
  },
});
