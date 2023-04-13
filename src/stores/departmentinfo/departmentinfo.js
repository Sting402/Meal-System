import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useDepartmentInfoStore = defineStore("departmentInfo", {
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