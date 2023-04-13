import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePersonalinfoStore = defineStore("personalinfo", {
    state: () => {
        return {
            data: reactive([
                // title: "默認餐",
                // start: "",
                // allDay: true,
                // type: "默認餐",
                // dpSelected: "CY",
                // mealsSelected: "午餐",
                // options: "葷食",
                // color: "rgb(76, 120, 221)",
                // selectYear: "",
                // selectDate: "",
                // number: 1,
                // index: ""
            ]),
            isChange: ref(false),
            // isSecond: ref(false),
            // isVisitors: ref(false)


        };
    },
    actions: {

    },
});