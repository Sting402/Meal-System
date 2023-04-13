import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $confirm = async (params) => {
    try {
        let res = await $post('/api/Login/ResetPassword', params)
        console.log(res);
        let data = res
        console.log(data);
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