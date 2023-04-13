import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useOrdermanageStore = defineStore("ordermanage", {
    state: () => {
        return {
            data: ([
            ]),
            count: false,
            isChange: (false),
            optionsMultipleSelectedDep: [],
            optionsMultipleSelectedSupplier: [],
            optionsMultipleSelectedType: []
            // isSecond: ref(false),
            // isVisitors: ref(false)


        };
    },
    actions: {

    },
});