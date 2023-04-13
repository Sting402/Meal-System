import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useLocationInfoStore = defineStore("locationInfo", {
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