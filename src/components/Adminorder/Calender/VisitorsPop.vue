<script setup>
//目前沒用
import VisitorsModal1 from './VisitorsModal1.vue';
import { ref, reactive, onMounted } from "vue";
import { Offcanvas } from 'bootstrap'
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const isVisitors = ref('')
const store = useAdminOrderStore()
store.isVisitors = isVisitors.value
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
    store.isVisitors = isVisitors.value
    store.isVisitorsPopEdit = isOffcanvasRef.value
    offcanvasRef.value = document.getElementById('offcanvasRight3')//獲得bootstrap關閉元素然後加入closeOffcanvas方法
})
</script>
<template>
    <button type="button" class="btn btn-secondary" @click="closeOffcanvas" ref="isOffcanvasRef" v-show="false">關閉</button>
    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight3"
        aria-controls="offcanvasRight" ref="isVisitors" v-show="false">
        <!-- +訪客代訂 -->
    </button>
    <div class="block-content block-content-full">
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight3"
            aria-labelledby="offcanvasRightLabel3">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel3">訪客訂餐編輯</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <VisitorsModal1></VisitorsModal1>
            </div>
        </div>
    </div>
</template>