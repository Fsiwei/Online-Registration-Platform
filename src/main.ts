// 此文件是入口文件

// vue3 框架提供的方法 createApp 方法，可用于创建单页面应用实例方法
import { createApp } from "vue";

// 引入清除默认样式文件
import "@/style/reset.scss";
// 引入根组件 App
// import App from './App.vue'
import App from "@/App.vue";

// 引入全局组件（顶部、底部都是全局组件）
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";
import Login from "@/components/login/index.vue";
import Visitor from "@/components/visitor/index.vue";

// 引入 vue-router 核心插件并安装
import router from "@/router";
// import vue from '@vitejs/plugin-vue';

// 引入 element-plus 和它的样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入 element-plus 的国际化文件
// 忽略 ts 的校验
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 引入 pinia 仓库
import pinia from "@/store";
// 利用 createApp 方法创建应用实例，并将应用实例挂载到挂载点上
// createApp(App).mount('#app')

// 可以用下面的代码代替
const app = createApp(App);

// 定义为全局组件
app.component("HospitalTop", HospitalTop);
app.component("HospitalBottom", HospitalBottom);
app.component("Login", Login);
app.component("Visitor", Visitor);

// 安装 vue-router
// vue3 写法
app.use(router);

// 安装 element-plus 插件
// app.use(ElementPlus);
// 配置 element-plus 国际化文件
app.use(ElementPlus, {
  locale: zhCn,
});
// 安装 pinia 仓库
app.use(pinia);
// 引入路由鉴权文件
import "./permisstion";
// 挂载点在 index.html 静态页面中
app.mount("#app");
