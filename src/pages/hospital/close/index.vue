<template>
  <div class="close">
    <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
  </div>
  <el-empty description="暂无数据" />
</template>

<script setup lang="ts">
// 引入医院详情仓库的数据
import useDetailStore from "@/store/modules/hospitalDetail";
// 获取数据
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.close {
  margin: 0 20px;
  h1 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
  }
}
</style>
