<script setup>
import Modal from './Modal.vue'
</script>
<template>
    <div>
        <div>
            <button class="btn btn-sm btn-primary" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                新增部門
            </button>
        </div>
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">部門取餐地點維護</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <Modal></Modal>
            </div>
        </div>
    </div>
</template>