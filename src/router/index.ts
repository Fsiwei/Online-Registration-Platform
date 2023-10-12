// 引入 createRouter 方法，该方法可用于创建路由器实例，可管理多个路由
import { createRouter, createWebHistory } from "vue-router";

// 往后需要在入口文件中安装路径，故此处需要对外暴露
// 此处使用的是默认暴露，暴露 createRouter 方法
export default createRouter({
  // 路由模式的设置
  history: createWebHistory(),
  // 管理路由
  routes: [
    // 第一个路由，首页
    {
      // 路由的路径
      path: "/home",
      // 标明使用的是哪个组件，此处使用的是路由懒加载的方式
      component: () => import("@/pages/home/index.vue"),
      meta: {
        title: "首页",
      },
    },
    // 第二个路由，医院
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
      // 配置子路由
      children: [
        {
          path: "register",
          component: () => import("@/pages/hospital/register/index.vue"),
          meta: {
            title: "预约挂号",
          },
        },
        {
          path: "detail",
          component: () => import("@/pages/hospital/detail/index.vue"),
          meta: {
            title: "医院详情",
          },
        },
        {
          path: "notice",
          component: () => import("@/pages/hospital/notice/index.vue"),
          meta: {
            title: "预约通知",
          },
        },
        {
          path: "close",
          component: () => import("@/pages/hospital/close/index.vue"),
          meta: {
            title: "停诊信息",
          },
        },
        {
          path: "search",
          component: () => import("@/pages/hospital/search/index.vue"),
          meta: {
            title: "查询",
          },
        },
        {
          path: "register_step1",
          component: () =>
            import("@/pages/hospital/register/register_step1.vue"),
          meta: {
            title: "预约第一步",
          },
        },
        {
          path: "register_step2",
          component: () =>
            import("@/pages/hospital/register/register_step2.vue"),
          meta: {
            title: "预约第二步",
          },
        },
      ],
    },
    // 第三个路由，微信登录的路由
    {
      path: "/wxlogin",
      component: () => import("@/pages/wxlogin/index.vue"),
    },
    // 第四个路由，会员中心路由
    {
      path: "/user",
      component: () => import("@/pages/user/index.vue"),
      // 配置子路由
      children: [
        {
          path: "certification",
          component: () => import("@/pages/user/certification/index.vue"),
          meta: {
            title: "实名认证",
          },
        },
        {
          path: "order",
          component: () => import("@/pages/user/order/index.vue"),
          meta: {
            title: "挂号订单",
          },
        },
        {
          path: "patient",
          component: () => import("@/pages/user/patient/index.vue"),
          meta: {
            title: "就诊人管理",
          },
        },
        {
          path: "profile",
          component: () => import("@/pages/user/profile/index.vue"),
          meta: {
            title: "账号信息",
          },
        },
        {
          path: "feedback",
          component: () => import("@/pages/user/feedback/index.vue"),
          meta: {
            title: "意见反馈",
          },
        },
      ],
    },
    // 当访问到根时，立即重定向到 home 首页
    {
      path: "/",
      redirect: "/home",
    },
  ],
  // 滚动行为：控制滚动条的位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
