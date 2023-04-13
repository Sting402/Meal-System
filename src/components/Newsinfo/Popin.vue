<script setup>
import Content from './Content.vue'
</script>
<template>
    <div class="block-content block-content-full">
        <div class=" gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">新增最新消息</button>
        </div>
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">最新消息維護</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <Content></Content>
            </div>
        </div>
    </div>
</template>