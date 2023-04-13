import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $workoffdaysinfo = async (params) => {
    try {
        let data = await $post('/api/noworkday/GetNoWorkDay', params);
        console.log(data);
        if (data.success) {
            return data.payload;
        } else {
            return false
        }

    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }

}