import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePopinStore = defineStore("popin", {
    state: () => {
        return {
            file: ref(null),
            data: reactive([
                {
                    id: 0,
                    title: "公告",
                    start: "2023-01-18",
                    end: "2023-01-20",
                    staff: "Steven",
                    content: [{ content: "明天寒流持續影響，中央氣象局針對22縣市發布低溫特報，並表示，明天清晨各地受輻射冷卻影響，低溫仍下探10度，白天北部高溫約15至17度，最快要到開工日(30日)才會逐漸回暖，預計白天各地有機會見到陽光，高溫回升至20度以上。" }],
                    videoUrl: [{}]
                },
                {
                    id: 1,
                    title: "新聞",
                    start: "2023-01-22",
                    end: "2023-01-25",
                    staff: "Terry",
                    content: [{ content: "氣象局今針對全台22縣市發布低溫特報，桃園市、新竹縣、苗栗縣、台中市、彰化縣、南投縣、雲林縣、宜蘭縣有6度以下氣溫發生的機率；新北市、基隆市、台北市、新竹市、花蓮縣、台東縣、澎湖縣、金門縣有持續10度左右或以下氣溫發生的機率，連江縣有持續6度左右或以下氣溫發生的機率(橙色燈號)；嘉義市、嘉義縣、台南市、高雄市、屏東縣有10度以下氣溫發生的機率(黃色燈號)。" }],
                    videoUrl: [{}]
                }
            ])
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