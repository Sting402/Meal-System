import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $select = async (params) => {
    try {
        let data = await $post('/api/Employees/ModifyEmployees', params)
        console.log('try');
        //console.log(data.success);
        let sucess = data.success
        if (sucess) {
            console.log("傳送成功");
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