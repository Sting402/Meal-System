<script setup>
import ModalEdit from './ModalEdit.vue'
</script>
<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight2" aria-labelledby="offcanvasRightLabel2">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel2">編輯部門維護</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ModalEdit></ModalEdit>
        </div>
    </div>
</template>