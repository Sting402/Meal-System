import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useReferenceInfoStore = defineStore("referenceInfo", {
    state: () => {
        return {
            data: reactive([]),
            isflatPickrChange: ref(false),
            isSelectedDay: reactive([]),
            isSelectedSite: reactive([]),
            isSelectedType: reactive([]),
            optionsMultipleSelectedSite: [],
            optionsMultipleSelectedType: []
        };
    },
    actions: {

    },
});