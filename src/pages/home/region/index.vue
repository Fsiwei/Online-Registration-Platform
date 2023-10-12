<template>
  <div class="content">
    <div class="left">地区：</div>
    <ul class="region">
      <li :class="{active:activeFlag==''}" @click="changeRegion('')">全部</li>
      <li v-for="region in regionArr" :class="{active:activeFlag == region.value}" :key="region.value" @click="changeRegion(region.value)">{{ region.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 引入医院所在地区的请求
import { reqHospitalLevelAndRegion } from '@/api/home';
// 在组件挂载完毕后发起请求
import { onMounted, ref  } from 'vue';
// 引入定义好的 ts 类型
import {
  HospitalLevelAndRegionResponseData,
  HospitalLevelAndRegionArr,
} from "@/api/home/type";
// 定义一个数组存储医院所在地区数据
let regionArr = ref<HospitalLevelAndRegionArr>([]);
// 控制医院所在地区高亮响应式数据
let activeFlag = ref<string>('');
// 组件挂在完毕
onMounted(() => {
  getRegion();
})
// 将获取医院所在地区的请求封装成函数
const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin");
  // 存储医院所在地区数据
  if(result.code == 200){
    regionArr.value = result.data;
  }
}
// 点击等级按钮的回调
const changeRegion = (region:string) => {
  activeFlag.value = region;
  // 触发自定义事件：即将医院所在地区参数回传给父组件
  $emit('getRegion', region);
}
// 定义子组件要触发父组件中的自定义事件
let $emit = defineEmits(['getRegion']);
</script>

<!-- 方便在开发者工具中找到是那个组件 -->
<script lang="ts">
export default {
  name: "Region",
};
</script>

<style scoped lang="scss">
.content {
  color: #777;
  margin-top: 30px;
  display: flex;
  .left {
    margin-right: 5px;
    width: 62px;
  }
  .region {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 10px;
      margin-bottom: 10px;
      &.active {
        color: #55a6fe;
      }
    }
    li:hover {
      color: #55a6fe;
      cursor: pointer;
    }
  }
}
</style>
