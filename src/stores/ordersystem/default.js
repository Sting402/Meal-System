import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDefault = defineStore("default", {
  state: () => {
    return {
      data: ref([]),
      index: ref(""),
      dpSelected: ref("選擇的部門"),
      mealsSelected: ref("選擇餐別"),
      options: ref("選擇餐別"),
      selectDate: ref("選擇的日期"),
      isOrderAll: ref(true),
      secondMeal: ref(false),
      newReservation: ref(false),
      calendarOptions: ref(""),
      isEditAll: ref(true),
      //判斷是哪一個餐別
      isDefault: ref(false),
      isSecond: ref(false),
      isReservation: ref(false),
      //二次彈窗
      isPopDefault: ref(false),
      isPopDefaultCancle: ref(false),
      isPopDefaultRecover: ref(false),
      isPopSecond: ref(false),
      isPopSecondCancle: ref(false),
      isPopReservation: ref(false),
      isPopReservationCancle: ref(false),
      isBreakfastTime: ref("")
    };
  },
  actions: {

  },
});
