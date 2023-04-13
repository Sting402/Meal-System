<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useDefault } from '../../stores/ordersystem/default';
import { useNewReservationStore } from '../../stores/ordersystem/newReservation';

const storeReservation = useNewReservationStore()
const storeDefault = useDefault()
//
let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
//代訂餐二次確認
const newReservationConfirm = () => {
    // console.log(storeReservation.selectDate);
    let newreservation = {
        title: "代訂餐點",
        start: new Date(y, m, storeReservation.selectDate.slice(8, storeReservation.selectDate.length)),
        allDay: true,
        end: new Date(y, m, storeReservation.selectDate.slice(8, storeReservation.selectDate.length)),
        type: "代訂餐",
        dpSelected: storeReservation.dpSelected,
        mealsSelected: storeReservation.mealsSelected,
        options: storeReservation.options,
        reservationSum: storeReservation.reservationSum,
        color: "blue",
        index: storeDefault.calendarOptions.length + 1
    }
    // console.log(newreservation);
    storeReservation.reservationOrder.push(newreservation)
    storeDefault.calendarOptions.push(newreservation)
    storeDefault.isOrderAll = !storeDefault.isOrderAll
    storeDefault.newReservation = !storeDefault.newReservation
}
//代訂餐二次取消
const newReservationCancle = () => {
    storeDefault.isOrderAll = !storeDefault.isOrderAll
    storeDefault.newReservation = !storeDefault.newReservation
}


</script>
<template>
    <!-- 代訂編輯 第二次彈窗 start -->
    <div class="modal-dialog" role="document" v-if="storeDefault.newReservation">
        <div class="modal-content">
            <BaseBlock title="新增餐點" transparent class="mb-0">
                <template #content>
                    <div class="block-content fs-sm">
                        <div id="output">
                            選擇的地點是: {{ storeReservation.dpSelected }}
                        </div>
                        <div id="output">
                            選擇的餐別是: {{ storeReservation.mealsSelected }}
                        </div>
                        <div id="output">
                            選擇的類型是: {{ storeReservation.options }}
                        </div>
                        <div id="output">
                            葷食的數量是: {{ storeReservation.reservationMeatSum }} 個
                        </div>
                        <div id="output">
                            素食的數量是: {{ storeReservation.reservationMeatSum }} 個
                        </div>
                        <div id="output">
                            選擇的日期是: {{ storeReservation.selectDate }} 號
                        </div>
                    </div>
                    <div class="block-content block-content-full text-start bg-body">
                        <button type="button" class="btn btn-success btn-sm col-md-4 offset-md-1"
                            @click="newReservationConfirm">
                            確認
                        </button>
                        <button type="button" class="btn btn-sm btn-primary col-md-4 offset-md-1"
                            @click="newReservationCancle">
                            取消
                        </button>
                    </div>
                </template>
            </BaseBlock>
        </div>
    </div>
    <!-- 代訂編輯 第二次彈窗 end -->
</template>
<style lang="scss">

</style>