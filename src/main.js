import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// You can use the following starter router instead of the default one as a clean starting point
// import router from "./router/starter";
import router from "./router";

// Template components
import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";

// Template directives
import clickRipple from "@/directives/clickRipple";
//
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'//這部份還是要引入
// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
//
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VueStorage from 'vue-ls';


//刷新時檢查是否需要更新token
console.log('main.js');
import { $setToken } from './utils/request'
let token = sessionStorage.getItem('token')
//console.log(token);
if (token) {
    $setToken(token)
}

// Craft new application
const app = createApp(App);

// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

// Register global directives
app.directive("click-ripple", clickRipple);
//
app.use(ElementPlus)
// Use Pinia and Vue Router
app.use(createPinia());
app.use(router);
app.use(VXETable)
app.use(VueStorage);
// ..and finally mount it!
app.mount("#app");
