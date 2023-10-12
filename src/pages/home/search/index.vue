<template>
  <dvi class="search">
    <el-autocomplete
      @select="goDetail"
      :trigger-on-focus="false"
      clearable
      placeholder="请输入医院名称"
      class="form"
      v-model="hosname"
      :fetch-suggestions="fetchData"
    />
    <el-button type="primary" size="default" :icon="Search"></el-button>
  </dvi>
</template>

<script setup lang="ts">
// 引入 element-plus 提供的图标
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
// 引入路由器
import {useRouter} from 'vue-router';
// 引入请求方法
import { reqHospitalInfo } from "@/api/home";
// 引入定义好的 ts 类型
import type { HospitalInfo } from "@/api/home/type";
// 创建路由器对象
let $router = useRouter();
// 收集搜索的关键字（医院的名字）
let hosname = ref<string>("");
const fetchData = async (keyword: string, cb: any) => {
  // 当用户输入完关键字后该函数会执行一次，然后发起请求获取需要展示的数据即可
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  if (result.code == 200) {
    // 整理数据，使获得的数据的格式符合第三方库提供的组件所需的数据格式
    let showData = result.data.map((item) => {
      // 第三方库组件展示的数据是一个对象
      return {
        value: item.hosname, // 展示医院的名称
        hoscode: item.hoscode, // 存储医院的编码为后续点击跳转路由做准备
      };
    });
    // 通过 cb 回调函数，给组件提供展示的数据
    cb(showData);
  }
};
// 点击某一个推荐项，然后跳转路由（注意：该第三方组件的 select 事件会将用户点击的那一项注进来）
const goDetail = (item: any) => {
  // 路由跳转
  // 点击推荐项目进入医院的详情页，还要携带 query 参数（医院的编码）
  $router.push({path: "/hospital/register", query:{hoscode: item.hoscode}});
};
</script>

<script lang="ts">
export default {
  name: "Search",
};
</script>

<!-- 此处定义的是局部样式，是无法修改第三方组件库的样式，需要用深度选择器 -->
<!-- 审查元素，在网页中查看要修改样式的第三方组件库组件的类名 -->
<!-- 深度选择器：css：>>>， less：/deep/，scss：::v-deep -->
<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  // ::v-deep .el-input__wrapper {
  //    width: 600px;
  //    margin-right: 10px;
  // }
  // 可以写成
  ::v-deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
