import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditReservationStore = defineStore('editReservation', {
    state: () => {
        return {
            reservationData:ref([]),
            dpSelected:ref("選擇的部門"),
            mealsSelected:ref("選擇餐別"),
            options:ref("選擇餐別"),
            selectDate:ref("選擇日期"),
            reservationSum:ref("請輸入數量")
        }
    },
    actions: {
       
    }
})