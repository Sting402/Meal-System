import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $personalInfo = async (params) => {
    // let data = await $post('api/PersonalInfo', params)
    // return data
    //可以透過data訊息來接收axios的判斷
    // let data = await $get('/api/Employee/GetAllEmployee', params); {"active": true }
    try {
        let data = await $post('/api/Employees/GetEmployeesbyCondition', params);
        console.log(data.success);
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
