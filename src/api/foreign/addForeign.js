import { $get, $setToken, $post } from '../../utils/request'

export const $addforeignInfo = async (params) => {
    try {
        let data = await $post('/api/MealOrderDL/DLSetMealOrder', params);
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