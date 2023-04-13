import axios from 'axios'

//初始化axios實例 https://www.kancloud.cn/yunye/axios/234845

var instance = axios.create({//'http://172.16.5.108:5022/'
    baseURL: 'http://220.133.235.3:5020/',//'http://localhost:3000/api/' http://220.133.235.3:5020/swagger/index.html
    timeout: 5000,
    //headers: { 'X-Custom-Header': 'foobar' }
    // validateStatus: function (status) {
    //     return status >= 200 && status < 300; // 所有2xx狀態碼視為有效，其他視為失敗
    // },
});

//全局的 axios 默认值
let tokenStr = JSON.parse(sessionStorage.getItem('token'))
let newtoken = `bearer ${tokenStr}`
axios.defaults.headers.common['Authorization'] = newtoken;
//將token信息 添加到headers
export const $setToken = (token) => {
    //Authorization 要跟後端溝通
    // instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    let tokenStr = JSON.parse(token)
    // console.log(tokenStr);
    let newtoken = `bearer ${tokenStr}`
    // console.log(newtoken);
    instance.defaults.headers.common['Authorization'] = newtoken;
}


//get方法
export const $get = async (url, params) => {
    try {
        const response = await instance.get(url, params);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("error,instance");
        return error;
    }
};
//post方法
export const $post = async (url, params) => {
    try {
        const response = await instance.post(url, params);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error("error,instance");
        return error;
    }
};
//put方法
export const $put = async (url, params) => {
    let { data } = await instance.put(url, {
        params
    })
    return data
}
//delete方法
export const $delete = async (url, params) => {
    let { data } = await instance.delete(url, {
        params
    })
    return data
}