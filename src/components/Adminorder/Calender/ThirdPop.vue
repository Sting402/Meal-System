<script setup>
import ThirdModal1 from './ThirdModal1.vue'
import { ref, reactive, onMounted } from "vue";
import { Offcanvas } from 'bootstrap'
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const isThird = ref('')
const store = useAdminOrderStore()
store.isThird = isThird.value
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
    store.isThird = isThird.value
    store.isThirdPopEdit = isOffcanvasRef.value
    offcanvasRef.value = document.getElementById('offcanvasRight4')//獲得bootstrap關閉元素然後加入closeOffcanvas方法
})
//目前沒用
</script>
<template>
    <button type="button" class="btn btn-secondary" @click="closeOffcanvas" ref="isOffcanvasRef" v-show="false">關閉</button>
    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight4"
        aria-controls="offcanvasRight" ref="isThird" v-show="false">
    </button>
    <div class="block-content block-content-full">
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight4"
            aria-labelledby="offcanvasRightLabel4">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel4">第三餐訂餐編輯</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ThirdModal1></ThirdModal1>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>