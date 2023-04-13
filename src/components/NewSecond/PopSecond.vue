<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useDefault } from '../../stores/ordersystem/default';
import { useNewSecondStore } from '../../stores/ordersystem/newSecond';


const storeDefault = useDefault()
const storeNewSecond = useNewSecondStore()
//
let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
//


//第二餐確定
const newOrderConfirm = () => {

    // console.log(storeNewSecond.selectDate.slice(8, flatPickrState.dateRange.length));
    if (storeNewSecond.selectDate.length < 11) {
        // let dateRange = flatPickrState.dateRange.splice(0,8)
    }
    else {

    }
    let newOrder = {
        title: "第二餐",
        start: new Date(y, m, storeNewSecond.selectDate.slice(8, storeNewSecond.selectDate.length)),
        allDay: true,
        end: new Date(y, m, storeNewSecond.selectDate.slice(8, storeNewSecond.selectDate.length)),
        type: "第二餐",
        dpSelected: storeNewSecond.dpSelected,
        mealsSelected: storeNewSecond.mealsSelected,
        options: storeNewSecond.options,
        selectDate: storeNewSecond.selectDate,
        color: "black",
        index: storeDefault.calendarOptions.length + 1
    }
    //console.log(newOrder);
    storeNewSecond.secondOrder.push(newOrder)
    storeDefault.calendarOptions.push(newOrder)
    storeDefault.isOrderAll = !storeDefault.isOrderAll
    storeDefault.secondMeal = !storeDefault.secondMeal
}
//第二餐取消
const newOrderCancle = () => {
    storeDefault.isOrderAll = !storeDefault.isOrderAll
    storeDefault.secondMeal = !storeDefault.secondMeal
}
</script>
<template>
    <div class="modal-dialog" role="document" v-if="storeDefault.secondMeal">
        <div class="modal-content">
            <BaseBlock title="新增餐點" transparent class="mb-0">
                <template #content>
                    <div class="block-content fs-sm">
                        <div id="output">
                            選擇的地點是: {{ storeNewSecond.dpSelected }}
                        </div>
                        <div id="output">
                            選擇的餐別是: {{ storeNewSecond.mealsSelected }}
                        </div>
                        <div id="output">
                            選擇的類型是: {{ storeNewSecond.options }}
                        </div>
                        <div id="output">
                            選擇的日期是: {{ storeNewSecond.selectDate }} 號
                        </div>
                    </div>
                    <div class="block-content block-content-full text-start bg-body">
                        <button type="button" class="btn btn-success btn-sm col-md-4 offset-md-1"
                            @click="newOrderConfirm">
                            確認
                        </button>
                        <button type="button" class="btn btn-sm btn-primary col-md-4 offset-md-1"
                            @click="newOrderCancle">
                            取消
                        </button>
                    </div>
                </template>
            </BaseBlock>
        </div>
    </div>
</template>
<style lang="scss">
// FullCalendar custom overrides  一定要加 不然畫面不顯示
@import "flatpickr/dist/flatpickr.css";
</style>