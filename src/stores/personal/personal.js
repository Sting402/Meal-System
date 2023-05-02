import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePersonaleStore = defineStore("personal", {
    state: () => {
        return {
            data: reactive({}),
            secondData: reactive({}),
            visitorsData: reactive({}),
            secondEditData: '',
            visitorsEditData: reactive({}),
            thirdData: reactive({}),
            isDefault: ref(false),//默認餐按鈕修改用
            isSecond: ref(false),
            isVisitors: ref(false),
            isChangeDefault: ref(''),
            isReorderDefault: ref(''),
            isDefaultEdit: ref(''),
            isSecondAdd: ref(''),
            isSecondEdit: ref(''),
            isVisitorsAdd: ref(''),
            isVisitorsEdit: ref(''),
            defaultsite_ID: ref(''),
            default_MealOrder: ref(''),
            default_MealType: ref(''),
            isOffcanvasRef: ref(''),
            isSecondPopEdit: ref(''),
            isVisitorsPopEdit: ref('')
        };
    },
    actions: {

    },
});