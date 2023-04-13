import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $reminder = async (params) => {
    try {
        let data = await $post('/api/Login/ForgetPassword', params)
        console.log('try');
        //console.log(data.success);
        let sucess = data.success
        console.log(sucess);
        if (sucess) {
            console.log();
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}
