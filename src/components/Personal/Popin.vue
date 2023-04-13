<script setup>
import { onMounted, ref, watch } from "vue";
import { useDefault } from '../../stores/ordersystem/default';
const storeDefault = useDefault()
const $popin = ref(null)
const isLogin = ref(false)
//先寫等之後測試
watch(isLogin, (newVal, oldVal) => {
    if (newVal === true && oldVal === false) {
        myButton.value.click()
    }
})
onMounted(() => {
    $popin.value.click()
})
</script>
<template>
    <div class="col-md-6" v-show="false">
        <BaseBlock title="Pop In" class="h-100 mb-0">
            <p class="fs-sm text-muted">Poping in animation</p>
            <button type="button" class="btn btn-alt-primary push" data-bs-toggle="modal"
                data-bs-target="#modal-block-popin" ref="$popin">
                Launch Modal
            </button>
        </BaseBlock>
</div>
<div class="modal fade" id="modal-block-popin" tabindex="-1" role="dialog" aria-labelledby="modal-block-popin"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-popin" role="document">
        <div class="modal-content">
            <BaseBlock title="佈告欄" transparent class="mb-0">
                <template #options>
                    <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa fa-fw fa-times"></i>
                    </button>
                </template>
                    <template #content>
                        <div class="block-content fs-sm">
                            <div class="row justify-content-center ">
                                <div class="col-sm-10 col-md-8">
                                    <!-- <div class="mb-4">
                                            <label class="form-label" for="example-text-input">開始日期</label>
                                            <div class="mb-2 pop-title">2023-01-18</div>
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" for="example-text-input">結束日期</label>
                                        <div class="mb-2 pop-title">2023-01-23</div>
                                        </div>
                                        <div class="mb-4">
                                            <label class="form-label" for="example-text-input">標題</label>
                                            <div class="mb-2 pop-title">本日公告</div>
                                        </div> -->
                                    <p class="fw-bold">新春快樂</p>
                                    <p class="fw-normal">溫馨提示:</p>
                                    <p class="fw-normal">1.注意交通安全</p>
                                    <p class="fw-normal">2.注意身體健康</p>
                                    <!-- <div class="mb-4"> -->
                                    <!--   <label class="form-label" for="block-form1-password">內容</label>-->
                                    <!-- <div class="mb-2 pop-content">
                                                過年假期，新年快樂!!!
                                                過年假期，新年快樂!!!
                                                過年假期，新年快樂!!!
                                            </div> -->
                                    <!-- </div> -->

                                </div>
                            </div>
                        </div>
                    </template>
                </BaseBlock>

            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>