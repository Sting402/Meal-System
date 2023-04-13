import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $upLoadInfo = async (params) => {
    //可以透過data訊息來接收axios的判斷
    // let data = await $post('/api/Employees/ImportEmployees', params);
    // console.log(data);
    try {
        let data = await $post('/api/Employees/ImportEmployees', params)
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
