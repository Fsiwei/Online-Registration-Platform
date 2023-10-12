<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <!-- 没有用户名显示登录/注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">
          登录/注册
        </p>
        <!-- 有用户名显示用户名 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeActive('/user/certification')"
                >实名认证</el-dropdown-item
              >
              <el-dropdown-item @click="changeActive('/user/order')"
                >挂号订单</el-dropdown-item
              >
              <el-dropdown-item @click="changeActive('/user/patient')"
                >就诊人管理</el-dropdown-item
              >
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// 获取 user 仓库的数据（visiable）可以控制 login 组件的对话框的显示与隐藏
import useUserStore from "@/store/modules/user";
import { ArrowDown } from "@element-plus/icons-vue";
let userStore = useUserStore();
let $router = useRouter();
const goHome = () => {
  $router.push({ path: "/home" });
};
// 点击登录/注册按钮时弹出对话框
const login = () => {
  userStore.visiable = true;
};
// 退出登录回调
const loginOut = () => {
  // 通知 pinia 小仓库清除用户相关的信息，还要清空本地存储的用户信息
  userStore.loginOut(); // 需要在小仓库中定义该方法
  // 编程式导航路由跳转，跳转到首页
  $router.push({ path: "/home" });
};
// 点击顶部菜单跳转路由
const changeActive = (path: string) => {
  $router.push({ path });
};
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  // 其层级较高
  z-index: 999;
  width: 100%;
  height: 70px;
  background: #fff;
  // 水平居中
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 4px #ddd;
  .content {
    // 水平居中
    // margin: 0 auto;
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #777;
      .help {
        margin-right: 10px;
        cursor: pointer;
      }
      .login {
        cursor: pointer;
      }
    }
  }
}
</style>
