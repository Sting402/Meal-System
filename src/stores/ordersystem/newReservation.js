import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNewReservationStore = defineStore('reservation', {
    state: () => {
        return {
            reservationOrder:ref([]),
            dpSelected:ref(""),
            mealsSelected:ref(""),
            options:ref(""),
            selectDate:ref(""),
            reservationMeatSum:ref(""),
            reservationVegetarianSum:ref("")
        }
    },
    actions: {
       
    }
})