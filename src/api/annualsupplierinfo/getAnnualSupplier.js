import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $annualSupplier = async (params) => {
    try {
        let data = await $post('/api/MealProvide/GetMealProvidebyCondition', params);
        //console.log(data);
        // if (data.message === "timeout of 5000ms exceeded") {
        //     //這邊加上延遲發送失敗
        //     return false
        // } else if (data.message === "Request failed with status code 404") {
        //     return false
        // }
        if (data.success) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}