<template>
  <div class="">
    <!-- 首页轮播图的结构 -->
    <Carousel />
    <!-- 首页搜索医院的表单区  -->
    <Search />
    <!-- 底部展示医院信息的结构 -->
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel" />
        <!-- 地区子组件 -->
        <Region @getRegion="getRegion" />
        <!-- 展示各医院信息的结构 -->
        <div class="hospital" v-if="hasHospitalArr.length>0">
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="item.id"
            :hospitalInfo="item"
          />
        </div>
        <el-empty v-else description="暂无数据" />
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout=" prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 医院的路由组件一挂载，就要发起请求，获取数据，每次切换分页器页码也要发起请求获取数据
// 引入组合式 API 函数，以及相应式数据 ref
// @ts-ignore
import { onMounted, ref } from "vue";
// 引入请求的方法
// @ts-ignore
import { reqHospital } from "@/api/home";

// 引入首页轮播图组件
import Carousel from "./carousel/index.vue";
// 引入搜索框组件
// 忽略 ts 的校验
// @ts-ignore
import Search from "./search/index.vue";
// 引入医院等级子组件
import Level from "./level/index.vue";
// 引入地区子组件
// 忽略 ts 的校验
// @ts-ignore
import Region from "./region/index.vue";
// 引入展示医院信息的卡片组件
// @ts-ignore
import Card from "./card/index.vue";
// 引用右侧静态子组件
import Tip from "./tip/index.vue";
// 引入定义好的 ts 类型
import type { Content, HospitalResponseData } from "@/api/home/type";

// 分页器需要的数据
// import { ref } from "vue";
// 分页器当前页码
let pageNo = ref<number>(1);
// 分页器一页展示多少条数据
let pageSize = ref<number>(10);
// 存储已有的医院数据，并约束为 Content 类型
let hasHospitalArr = ref<Content>([]);
// 存储医院的总个数
let total = ref<number>(0);
// 组件挂在完毕后，发起一次请求
// 存储医院等级的响应式数据
let hostype = ref<string>("");
// 存储医院所在地区的响应式数据
let districtCode = ref<string>("");
onMounted(() => {
  getHospitalInfo();
});
// 获取已有医院的数据
const getHospitalInfo = async () => {
  // 获取医院的数据：默认获取第一页，一页十个医院的数据，并定义为定义好的 ts 类型
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  ); // 返回值是 Promise
  // 请求成功
  if (result.code == 200) {
    // 存储已有的医院数据
    hasHospitalArr.value = result.data.content;
    // 存储医院的总个数
    total.value = result.data.totalElements;
  }
};
// 分页器页码发生变化时的回调
const currentChange = () => {
  getHospitalInfo();
};
// 分页器下拉菜单发生变化时的回调
const sizeChange = () => {
  getHospitalInfo();
};
// 子组件的自定义事件：获取子组件传给父组件的医院等级和地区的参数
let getLevel = (level: string) => {
  // 搜集参数：等级参数
  hostype.value = level;
  // 在发起请求
  getHospitalInfo();
};
let getRegion = (region: string) => {
  // 搜集参数：地区参数
  districtCode.value = region;
  // 在发起请求
  getHospitalInfo();
};
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 49%;
    margin: 5px 0;
  }
}
::v-deep(.el-pagination) {
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
