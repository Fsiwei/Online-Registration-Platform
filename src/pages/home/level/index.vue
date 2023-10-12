<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li v-for="level in levelArr" :class="{active:activeFlag == level.value}" :key="level.value" @click="changeLevel(level.value)">{{ level.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入医院等级的请求方法
import { reqHospitalLevelAndRegion } from "@/api/home";
// 当组件挂在完毕之后，就要发起请求
import { onMounted, ref } from "vue";
// 引入定义好的 ts 类型
import type {
  HospitalLevelAndRegionResponseData,
  HospitalLevelAndRegionArr,
} from "@/api/home/type";
// 定义一个数组存储医院等级数据
let levelArr = ref<HospitalLevelAndRegionArr>([]);
// 控制医院等级高亮响应式数据
let activeFlag = ref<string>('');
// 组件挂载完毕
onMounted(() => {
  getLevel();
});
// 将获取医院等级数据的请求封装成函数
const getLevel = async () => {
  let result: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion("Hostype");
    // 存储医院等级数据
  if (result.code == 200) {
    levelArr.value = result.data;
  }
}
// 点击等级按钮的回调
const changeLevel = (level:string) => {
  activeFlag.value = level;
  // 触发自定义事件：即将医院等级参数回传给父组件
  $emit('getLevel', level);
}
// 定义子组件要触发父组件中的自定义事件
let $emit = defineEmits(['getLevel']);
</script>

<!-- 方便在开发者工具中找到是那个组件 -->
<script lang="ts">
export default {
  name: "Level",
};
</script>

<style scoped lang="scss">
.level {
  color: #777;
  h1 {
    font-weight: 700;
    margin: 10px 0;
  }
  .content {
    display: flex;
    .left {
      margin-right: 5px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 10px;
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
}
</style>
