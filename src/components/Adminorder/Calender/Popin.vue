<script setup>
import { ref, reactive, onMounted, computed, watchEffect } from "vue";
import Model1 from './Modal1.vue'
import Modal2 from './Modal2.vue'
import Modal3 from './Modal3.vue'
import { Offcanvas } from 'bootstrap'
import { useAdminOrderStore } from '../../../stores/adminorder/select';
const store = useAdminOrderStore()

const getAddMeal = async () => {
    try {
        let loginInfo = store.loginInfo[0]
        console.log(loginInfo);
        store.secondData = loginInfo
        store.visitorsData = loginInfo
        console.log(store.visitorsData);

    } catch (err) {
        console.log(err);
    }
}
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
    store.isOffcanvasRef = isOffcanvasRef.value
    offcanvasRef.value = document.getElementById('offcanvasRight')//獲得bootstrap關閉元素然後加入closeOffcanvas方法
})
</script>
<template>
    <button class="btn btn-primary push" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight" @click="getAddMeal">
        代訂餐點
    </button>
    <div class="block-content block-content-full">
        <div class="offcanvas offcanvas-end bg-body-extra-light overflow-y-auto overflow-x-hidden " tabindex="-1"
            id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <BaseBlock>
                <template #content>
                    <ul class="nav nav-tabs nav-tabs-block" role="tablist">
                        <li class="nav-item">
                            <button class="nav-link active" id="btabs-animated-slideleft-home-tab" data-bs-toggle="tab"
                                data-bs-target="#btabs-animated-slideleft-home" role="tab"
                                aria-controls="btabs-animated-slideleft-home" aria-selected="true">
                                管理者代訂第二餐
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" id="btabs-animated-slideleft-profile-tab" data-bs-toggle="tab"
                                data-bs-target="#btabs-animated-slideleft-profile" role="tab"
                                aria-controls="btabs-animated-slideleft-profile" aria-selected="false">
                                管理者代訂第三餐
                            </button>
                        </li>
                        <li class="nav-item ms-auto">
                            <button class="nav-link" id="btabs-animated-slideleft-settings-tab" data-bs-toggle="tab"
                                data-bs-target="#btabs-animated-slideleft-settings" role="tab"
                                aria-controls="btabs-animated-slideleft-settings" aria-selected="false">
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                                    @click="closeOffcanvas"></button>
                            </button>
                        </li>
                    </ul>
                    <div class="block-content tab-content ">
                        <div class="tab-pane fade fade-left show active" id="btabs-animated-slideleft-home" role="tabpanel"
                            aria-labelledby="btabs-animated-slideleft-home-tab" tabindex="0">
                            <Model1></Model1>
                        </div>
                        <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-profile" role="tabpanel"
                            aria-labelledby="btabs-animated-slideleft-profile-tab" tabindex="0">
                            <Modal3></Modal3>
                        </div>
                        <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-settings" role="tabpanel"
                            aria-labelledby="btabs-animated-slideleft-settings-tab" tabindex="0">
                            <Model1></Model1>
                        </div>
                    </div>
                </template>
            </BaseBlock>
        </div>
        <button type="button" class="btn btn-secondary" @click="closeOffcanvas" ref="isOffcanvasRef"
            v-show="false">關閉</button>
    </div>

    <!-- <a class="btn btn-primary push" data-bs-toggle="modal" href="#exampleModalToggle" role="button">新增餐點</a> -->
</template>
<style lang="scss">
.offcanvas-scroll {
    overflow: auto !important;
}
</style>