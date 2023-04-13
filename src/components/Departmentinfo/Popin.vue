<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import Modal from './Modal.vue'
import { useDepartmentInfoStore } from "../../stores/departmentinfo/departmentinfo";
import { $restaurantInfo } from '../../api/departmentinfo/getRestaurant'
const store = useDepartmentInfoStore();
const getAllRestaurant = async () => {
    try {
        let allRestaurant = await $restaurantInfo({})
        store.restaurant = allRestaurant
        console.log(allRestaurant);
    } catch (err) {
        console.log(err);
    }
}
</script>
<template>
    <div class="block-content block-content-full">
        <button class="btn btn-sm btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight" @click="getAllRestaurant">
            新增部門
        </button>
        <div class="offcanvas offcanvas-end bg-body-extra-light" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header bg-body-light">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">部門資料維護</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <Modal></Modal>
            </div>
        </div>
    </div>
</template>