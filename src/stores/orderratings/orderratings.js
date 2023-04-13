import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useOrderratingsStore = defineStore("orderRatings", {
    state: () => {
        return {
            data: ([]),
            starRatingSize: ''
        };
    },
    actions: {

    },
});