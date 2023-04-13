import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useWorkoffdaysinfoStore = defineStore("workoffdaysinfo", {
    state: () => {
        return {
            data: reactive([
            ]),
            isChange: ref(false),
        };
    },
    actions: {

    },
});