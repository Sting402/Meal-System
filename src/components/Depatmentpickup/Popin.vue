<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import Modal from './Modal.vue'
import { $restaurantInfo } from '../../api/departmentinfo/getRestaurant'
import { useDepatmentpickupStore } from "../../stores/depatmentpickup/depatmentpickup";
const store = useDepatmentpickupStore();
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
        <div class="restaurant">
            <button class="btn btn-sm btn-primary restaurant-btn" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" @click="getAllRestaurant">
                新增部門連結餐廳
            </button>
            <div class="clearfix"></div>
        </div>
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
<style lang="scss">
.restaurant {
    display: flex;
    align-items: center;
}

.restaurant-btn {
    flex: 1;
}
</style>