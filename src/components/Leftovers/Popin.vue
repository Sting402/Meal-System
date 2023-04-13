<script setup>
import Modal from './Modal.vue'
</script>
<template>
    <div class="block-content block-content-full">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">
            新增統計
        </button>
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">剩餘便當數量統計</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <Modal></Modal>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<style lang="scss" scoped>
.block-content-full {
    display: flex;
    flex-direction: row-reverse;
    margin-top: -50px;
    margin-right: -20px;

}
</style>