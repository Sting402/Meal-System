import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $addSecond = async (params) => {
    try {
        let data = await $post('/api/MealOrder/IDLSetMealOrder', params);
        if (data) {
            return data
        } else {
            return false
        }

    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}