import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useRestaurantInfoStore = defineStore("restaurant", {
    state: () => {
        return {
            data: reactive([
            ]),
            isChange: ref(false),
            site: []
        };
    },
    actions: {

    },
});