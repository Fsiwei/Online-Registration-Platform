import router from '@/router';
<template>
  <div class="user">
    <!-- 左侧显示导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>&nbsp;/ 会员中心</span>
      </div>
      <!-- 以路由作为高亮标识 -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/user/certification"
          @click="changeActive('/user/certification')"
        >
          <el-icon><User /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeActive('/user/order')">
          <el-icon><Document /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item
          index="/user/patient"
          @click="changeActive('/user/patient')"
        >
          <el-icon><EditPen /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item
          index="/user/profile"
          @click="changeActive('/user/profile')"
        >
          <el-icon><Setting /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item
          index="/user/feedback"
          @click="changeActive('/user/feedback')"
        >
          <el-icon><Message /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧展示会员中心二级路由组建区域 -->
    <div class="content">
      <!-- 子组件展示结构的位置 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// 引入需要的小图标
import {
  HomeFilled,
  User,
  Document,
  EditPen,
  Setting,
  Message,
} from "@element-plus/icons-vue";
let $router = useRouter();
let $route = useRoute();
// 左侧导航路由跳转的函数
const changeActive = (path: string) => {
  $router.push({ path });
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  margin-top: 20px;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #777;
    }
  }
  .content {
    flex: 8;
    padding: 40px 0;
  }
}
</style>
