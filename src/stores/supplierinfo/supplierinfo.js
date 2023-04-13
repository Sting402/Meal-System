import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useSupplierInfoStore = defineStore("supplierinfo", {
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