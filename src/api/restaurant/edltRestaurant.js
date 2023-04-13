import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $editRestaurant = async (params) => {
    try {
        let data = await $post('/api/Restaurants/ModifyRestaurants', params);
        console.log(data);
        if (data.message === 'Request failed with status code 400') {
            return false
        }
        return data;
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}