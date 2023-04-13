import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $confirm = async (params) => {
    try {
        let data = await $post('/api/Login/ResetPassword', params)
        console.log('try');
        //console.log(data.success);
        let message = data.message
        console.log(message);
        if (message) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}