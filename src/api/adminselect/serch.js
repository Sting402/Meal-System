import { $get, $setToken, $post } from '../../utils/request'
import { reactive, computed, ref } from "vue";
export const $serch = async (params) => {
    let data = await $get('api/getSelect', params)
}