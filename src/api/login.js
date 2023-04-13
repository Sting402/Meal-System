//loginApi
import { $get, $setToken, $post } from '../utils/request'
import $ridefoxmenu from '../data/ridefoxmenu'
import { reactive, computed, ref } from "vue";
//登陸api
export const $login = async (params) => {
    try {
        let data = await $post('/api/Login/Login', params)
        console.log("try");
        console.log(data);
        //console.log(data.menu);
        console.log(data.jwt);
        let token = data.jwt
        if (token) {
            let Menus = JSON.parse(data.menu)
            // console.log(Menus);
            sessionStorage.setItem('loginInfo', JSON.stringify(data))
            sessionStorage.setItem('menu', JSON.stringify(Menus))
            sessionStorage.setItem('menuSelect', JSON.stringify(Menus.MenusSelect))
            sessionStorage.setItem('token', JSON.stringify(data.jwt))
            localStorage.setItem('loginInfo', JSON.stringify(data))
            localStorage.setItem('menu', JSON.stringify(Menus))
            localStorage.setItem('menuSelect', JSON.stringify(Menus.MenusSelect))
            // localStorage.setItem('token', JSON.stringify(data.jwt))
            console.log(111);
            return true //很重要 return true 給login 成功才跳轉
        } else {
            return false
        }
    } catch (error) {
        console.log("catch");
        console.log("error");
        return false
    }
    // console.log(data.menu);
    // let Menus = JSON.parse(data.menu)
    // let MenusSelect = Menus.MenusSelect
    // console.log(Menus);
    // console.log(MenusSelect);
    // let success = true;//JSON.parse(data.message)

    // let { success, messge } = data
    //console.log(Menus);
    // console.log(success);
    //console.log(typeof $ridefoxmenu);
    //console.log(menus);
    //console.log($ridefoxmenu.main);
    // sessionStorage.setItem('loginInfo', JSON.stringify(data))
    // sessionStorage.setItem('menu', JSON.stringify(Menus[0]))
    //const ridefoxmenu = JSON.parse(JSON.stringify($ridefoxmenu))
    // $ridefoxmenu.main = $ridefoxmenu.main.filter(originalItem => {
    //     return menus.some(updatedItem => {
    //         return originalItem.name === updatedItem.name
    //     })
    // })
    // console.log($ridefoxmenu.main);
    // menus.forEach(item => {
    //     //console.log(item);
    //     if (item.name === '代訂人員訂餐') {
    //         console.log(item.subname);
    //         console.log($ridefoxmenu.main);
    //         console.log($ridefoxmenu.main[4].sub);
    //         $ridefoxmenu.main[4].sub = $ridefoxmenu.main[4].sub.filter(originalItem => {
    //             return item.subname.some(updatedItem => {
    //                 return originalItem.name === updatedItem.name
    //             })
    //         })
    //     }
    // });
    //console.log($ridefoxmenu.main);
    // let originalArray = [
    //     { name: 'John', age: 30, time: 1 },
    //     { name: 'Jane', age: 25, time: 1 },
    //     { name: 'Jim', age: 35, time: 1 }
    // ];

    // let updatedArray = [
    //     { name: 'John', age: 31 },
    //     { name: 'Jane', age: 26 }
    // ];
    // originalArray = originalArray.filter(originalItem => {
    //     return updatedArray.some(updatedItem => {
    //         return originalItem.name === updatedItem.name;
    //     });
    // });
    // console.log(originalArray);
    // if (success) {
    //     //登入成功邏輯
    //     // let { token } = data[0]
    //     // //console.log(token);
    //     // sessionStorage.setItem('token', token)
    //     //在請求頭中更新token訊息
    //     // $setToken(token)
    //     // ridefoxmenu.main.push(menu)
    //     //console.log(ridefoxmenu);
    //     sessionStorage.setItem('loginInfo', JSON.stringify(data))
    //     // sessionStorage.setItem('menu', JSON.stringify(Menus[0]))
    //     sessionStorage.setItem('menu', JSON.stringify(Menus))
    //     sessionStorage.setItem('menuSelect', JSON.stringify(Menus.MenusSelect))
    //     // let user = {
    //     //     username: data[0].userName,
    //     //     role: data[0].role
    //     // }
    //     // //緩存用戶訊息
    //     // sessionStorage.setItem('user', JSON.stringify(user))
    //     //
    //     // let path = data[0].path
    //     // sessionStorage.setItem('path', JSON.stringify(path))

    // } else {
    //     //失敗
    // }
    //很重要 return success 給login 成功才跳轉
    //return success
}