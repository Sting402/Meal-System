<script setup>
import DefaultModal1 from './DefaultModal1.vue';
import { ref, reactive, onMounted } from "vue";
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const isDefault = ref('')
const store = useAdminOrderStore();
store.isDefault = isDefault.value
onMounted(() => {
    store.isDefault = isDefault.value
})
</script>
<template>
    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1"
        aria-controls="offcanvasRight" ref="isDefault" v-show="false">
    </button>
    <div class="block-content block-content-full">
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight1"
            aria-labelledby="offcanvasRightLabel1">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel1">個人訂餐編輯</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <DefaultModal1></DefaultModal1>
            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>