import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $addSupplier = async (params) => {
    try {
        let data = await $post('/api/Suppliers/AddSuppliers', params);
        console.log(data.success);
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