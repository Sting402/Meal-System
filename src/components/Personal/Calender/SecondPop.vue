<script setup>
import SecondModal1 from './SecondModal1.vue';
import { ref, reactive, onMounted } from "vue";
import { Offcanvas } from 'bootstrap'
import { usePersonaleStore } from '../../../stores/personal/personal'
const isSecond = ref('')
const store = usePersonaleStore()
store.isSecond = isSecond.value
const isOffcanvasRef = ref('');
const offcanvasRef = ref('')
const closeOffcanvas = () => {
    console.log('執行了');
    const offcanvas = Offcanvas.getInstance(offcanvasRef.value)
    if (offcanvasRef.value !== null) {
        const offcanvas = Offcanvas.getInstance(offcanvasRef.value)
        offcanvas.hide()
    }
    offcanvas.hide()
}
onMounted(() => {
    store.isSecond = isSecond.value
    store.isSecondPopEdit = isOffcanvasRef.value
    offcanvasRef.value = document.getElementById('offcanvasRight2')//獲得bootstrap關閉元素然後加入closeOffcanvas方法
})
//目前沒用
</script>
<template>
    <button type="button" class="btn btn-secondary" @click="closeOffcanvas" ref="isOffcanvasRef" v-show="false">關閉</button>
    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2"
        aria-controls="offcanvasRight" ref="isSecond" v-show="false">
    </button>
    <div class="block-content block-content-full">
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight2"
            aria-labelledby="offcanvasRightLabel2">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel2">個人訂餐編輯</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <SecondModal1></SecondModal1>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>