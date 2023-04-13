import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAdminOrderStore = defineStore("adminOrder", {
    state: () => {
        return {
            data: reactive({
            }),
            isDefault: ref(false),//默認餐按鈕修改用
            isSecond: ref(false),
            isVisitors: ref(false)


        };
    },
    actions: {

    },
});