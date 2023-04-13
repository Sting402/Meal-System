import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $editDelLocation = async (params) => {
    try {
        let data = await $post('/api/Sites/RemoveSites', params);
        // console.log(data.success);
        if (data.success === false) {
            return false
        }
        return data;
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}