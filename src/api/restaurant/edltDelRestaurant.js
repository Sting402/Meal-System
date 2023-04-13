import { $get, $setToken, $post } from '../../utils/request'
export const $editDelRestaurant = async (params) => {
    try {
        let data = await $post('/api/Restaurants/RemoveRestaurants', params);
        console.log(data);
        if (data.message === 'Request failed with status code 400') {
            return false
        }
        return data;
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}