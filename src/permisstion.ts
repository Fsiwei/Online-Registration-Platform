// 路由鉴权：即路由能不能被访问到的权限设置（这里使用的是全局守卫）
// 引入路由器
import router from "./router";
// 引入进度条
import NProgress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css";
// 引入大仓库
import pinia from "@/store";
// 引入用户相关的小仓库
import useUserStore from "@/store/modules/user";

let userStore = useUserStore(pinia);
// 存储用户未登录时可以访问的路由的路径
let whiteList = [
  "/home",
  "/hospital/register",
  "/hospital/detail",
  "/hospital/notice",
  "/hospital/close",
  "/hospital/search",
];
// 不要进度条加载时的小圆环
NProgress.configure({ showSpinner: false });
// 添加相应的全局守卫（前置守卫 & 后置守卫）
// 前置守卫
// to：要跳转到哪个路由、from：从哪个路由跳转来、next：放行函数
router.beforeEach((to, from, next) => {
  // 访问路由组件的之前,进度条开始动
  NProgress.start();
  // 动态设置网页左上角的标题
  document.title = `尚医通-${to.meta.title}`;
  //   根据 token 来判断用户是否登录
  let token = userStore.userInfo.token;
  if (token) {
    // 用户登录
    next();
  } else {
    // 用户未登录
    if (whiteList.includes(to.path)) {
      // 用户访问的路由在 whiteList 中，即可放行
      next();
    } else {
      // 用户访问的路由不在 whiteList 中，就显示登录组件并跳转到首页
      userStore.visiable = true;
      next({ path: "/home", query: { redirect: to.fullPath } });
    }
  }
});
// 后置守卫
router.afterEach((to, from) => {
  // 访问路由组件成功,进度条消失
  NProgress.done();
});
