import { $get, $setToken, $post } from '../../utils/request'

export const $foreignInfo = async (params) => {
    try {
        let data = await $post('/api/MealOrderDL/GetDLMealOrderbyCondition', params);
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