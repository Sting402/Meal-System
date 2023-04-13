import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditDefaultStore = defineStore("editDefault", {
  state: () => {
    return {
      defaultData: ref([]),
      // type:ref("種類"),
      // dpSelected:ref("選擇的部門"),
      // mealsSelected:ref("選擇餐別"),
      // options:ref("選擇餐別"),
      // selectDate:ref("選擇的日期"),
    };
  },
  actions: {},
});
