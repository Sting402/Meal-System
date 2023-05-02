import { $get, $setToken, $post } from '../../utils/request'
export const $suppliersOrderReport = async (params) => {
    try {
        let data = await $post('/api/Report/SuppliersOrderReport', params);
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