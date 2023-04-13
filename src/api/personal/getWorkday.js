import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $workDay = async (params) => {
    try {
        let data = await $post('/api/Personalorder/GetWorkDay', params);
        if (data.success) {
            return data.payload
        } else {
            return false
        }

    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }

}