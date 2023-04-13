<script setup>
import Model1 from './Modal1.vue'
import Modal2 from './Modal2.vue'
</script>
<template>
    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">管理者代訂</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Model1></Model1>
                </div>
            <div class="modal-footer adminorder-footer">
                    <button class="btn btn-primary push" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                        data-bs-dismiss="modal">確認</button>
                    <!-- <button class="btn btn-primary push" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                data-bs-dismiss="modal">取消</button> -->
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel2">再次確認</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Modal2></Modal2>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary push" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                        data-bs-dismiss="modal">確認</button>
                    <button class="btn btn-primary push" data-bs-toggle="modal" href="#exampleModalToggle" role="button"
                        data-bs-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    <a class="btn btn-primary push" data-bs-toggle="modal" href="#exampleModalToggle" role="button">新增餐點</a>
</template>
<style lang="scss"></style>