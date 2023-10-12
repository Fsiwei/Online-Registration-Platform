<template>
  <div class="hospital">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>&nbsp;/ 医院信息</span>
      </div>
      <!-- 以路由作为高亮标识 -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/hospital/register"
          @click="changeActive('/hospital/register')"
        >
          <el-icon><Calendar /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/detail"
          @click="changeActive('/hospital/detail')"
        >
          <el-icon><Document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/notice"
          @click="changeActive('/hospital/notice')"
        >
          <el-icon><Bell /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/close"
          @click="changeActive('/hospital/close')"
        >
          <el-icon><Warning /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/search"
          @click="changeActive('/hospital/search')"
        >
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区域：路由组件展示的位置 -->
    <div class="content">
      <!-- 子组件展示结构位置 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// 引入小仓库
import useDetailStore from "../../store/modules/hospitalDetail";
// 获取仓库对象
let detailStore = useDetailStore();
// 引入需要的小图标
import {
  HomeFilled,
  Calendar,
  Document,
  Bell,
  Warning,
  Search,
} from "@element-plus/icons-vue";
// 引入 useRoute 方法获取路由信息
import { useRouter, useRoute } from "vue-router";
let $router = useRouter();
// 获取当前路由信息
let $route = useRoute();
// 左侧导航路由跳转的函数
const changeActive = (path: string) => {
  // 跳转二级路由
  $router.push({ path, query: { hoscode: $route.query.hoscode } }); // 在切换路由的同时传递医院编号
};
// 组件挂载完毕：通知 pinia 仓库发请求获取医院详情的数据，存储在仓库中
onMounted(() => {
  // 获取医院详情数据
  detailStore.getHospital($route.query.hoscode as string); // 断言
  // 获取某个医院科室的数据
  detailStore.getDeparment($route.query.hoscode as string); // 断言
});
</script>

<style scoped lang="scss">
.hospital {
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
      justify-content: center;
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
