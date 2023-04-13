import { $get, $setToken, $post } from '../utils/request'
import { reactive, computed, ref } from "vue"

export const $loginSupplier = async (params) => {
    // let data = await $get('admin', params)
    try {
        let data = await $post('/api/Login/Login', params)
        console.log("try");
        console.log(data);
        //console.log(data.menu);
        // console.log(typeof (data.menu));
        let Menus = JSON.parse(data.menu)
        console.log(Menus);
        sessionStorage.setItem('loginInfo', JSON.stringify(data))
        sessionStorage.setItem('menu', JSON.stringify(Menus))
        sessionStorage.setItem('menuSelect', JSON.stringify(Menus.MenusSelect))
        sessionStorage.setItem('token', JSON.stringify(data.jwt))
        localStorage.setItem('loginInfo', JSON.stringify(data))
        localStorage.setItem('menu', JSON.stringify(Menus))
        localStorage.setItem('menuSelect', JSON.stringify(Menus.MenusSelect))
        return true //很重要 return true 給login 成功才跳轉
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
}