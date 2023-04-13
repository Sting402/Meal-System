import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useDepatmentpickupStore = defineStore("depatmentpickup", {
    state: () => {
        return {
            data: reactive([
            ]),
            isChange: ref(false),
            index: ''
        };
    },
    actions: {

    },
});