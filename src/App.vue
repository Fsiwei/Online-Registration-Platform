<template>
  <div class="container">
    <!-- 顶部的全局组件 -->
    <HospitalTop />
    <!-- 展示路由组件区域 -->
    <div class="content">
      <!-- 展示路由组件区域 -->
      <router-view></router-view>
    </div>
    <!-- 底部的全局组件 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login v-if="userStore.visiable" />
  </div>
</template>

<script setup lang="ts">
// 获取 user 仓库的数据（visiable）可以控制 login 组件的对话框的显示与隐藏
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
