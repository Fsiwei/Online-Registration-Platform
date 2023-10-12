<template>
  <div class="allOrders">
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <div class="title">挂号订单</div>
        </div>
      </template>
      <!--提供用户选择的下拉菜单 :inline="true" 行内-->
      <el-form :inline="true">
        <el-form-item label="就诊人">
          <el-select
            placeholder="请选择就诊人"
            v-model="patientId"
            @change="changeVisitor"
          >
            <el-option label="请选择全部就诊人" value="" />
            <el-option
              v-for="visitor in allVisitors"
              :key="visitor.id"
              :label="visitor.name"
              :value="visitor.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select
            placeholder="请选择订单状态"
            v-model="orderStatus"
            @change="changeOrderState"
          >
            <el-option label="全部订单" value="" />
            <el-option
              v-for="(orderState, index) in allOrderStates"
              :key="index"
              :label="orderState.comment"
              :value="orderState.status"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表格展示订单的数据 -->
      <!-- 表格中的 :data="" ：表示什么数据需要校验 -->
      <el-table border :data="allOrdersArr">
        <!-- 单元格中的 prop ：表示要校验的对象的具体属性 -->
        <el-table-column prop="reserveDate" label="就诊时间" width="120" />
        <el-table-column prop="hosname" label="医院" width="120" />
        <el-table-column prop="depname" label="科室" width="120" />
        <el-table-column prop="title" label="医生职称" width="120" />
        <el-table-column prop="amount" label="服务费" width="120" />
        <el-table-column prop="patientName" label="就诊人" width="120" />
        <el-table-column prop="orderStatus" label="订单状态" width="120" />
        <el-table-column prop="operation" label="操作" width="110">
          <template #="{ row }">
            <el-button type="text" @click="geDetail(row)">详情</el-button>
          </template> </el-table-column
        >/>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper, -> , sizes, total,"
        :total="total"
        @current-change="getUserOrderInfo"
        @size-change="handler"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// 获取路由器对象
import { useRouter } from "vue-router";
let $router = useRouter();
import {
  reqUserOrderInfo,
  reqAllVisitors,
  reqOrderState,
} from "@/api/user/index";
import type {
  UserOrderInfoResponseData,
  Records,
  AllVisitorResponseData,
  AllOrderStateResponseData,
  AllVisitors,
  AllOrderState,
} from "@/api/user/type";
//当前分页器页码
let pageNo = ref<number>(1);
//当前页码默认展示几条数据
let pageSize = ref<number>(10);
// 收集就诊人的 ID
let patientId = ref<string>("");
// 收集订单状态
let orderStatus = ref<string>("");
// 存储所有的订单
let allOrdersArr = ref<Records>([]);
// 存储订单的总个数
let total = ref<number>(0);
// 存储全部就诊人的信息
let allVisitors = ref<AllVisitors>([]);
// 存储全部订单状态
let allOrderStates = ref<AllOrderState>([]);
// 组件挂载完毕
onMounted(() => {
  // 获取用户订单数据的方法
  getUserOrderInfo();
  // 获取全部就诊人的信息以及全部的订单状态
  getAllVisitorsAndAllOrderState();
});
// 获取用户订单数据的方法
const getUserOrderInfo = async (pager: number = 1) => {
  // 切换当前页码
  pageNo.value = pager;
  let result: UserOrderInfoResponseData = await reqUserOrderInfo(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (result.code == 200) {
    allOrdersArr.value = result.data.records;
    total.value = result.data.total;
  }
};
// 切换订单详情路由的方法
const geDetail = (row: any) => {
  $router.push({ path: "/user/order", query: { orderId: row.id } });
};
// 下拉菜单事件回调
const handler = (pageSizes: number) => {
  pageSize.value = pageSizes;
  getUserOrderInfo();
};
// 获取全部就诊人的信息以及全部的订单状态接口的方法
const getAllVisitorsAndAllOrderState = async () => {
  // 获取全部就诊人的信息
  const allVisitor: AllVisitorResponseData = await reqAllVisitors();
  // 获取全部的订单状态
  const allOrderState: AllOrderStateResponseData = await reqOrderState();
  allVisitors.value = allVisitor.data;
  allOrderStates.value = allOrderState.data;
};
// 就诊人下拉菜单回调
const changeVisitor = () => {
  //根据就诊人的 ID 再次获取挂号订单的数据
  getUserOrderInfo();
};
//订单状态下拉菜单回调
const changeOrderState = () => {
  getUserOrderInfo();
};
</script>

<style scoped lang="scss">
.allOrders {
  .box-card {
    ::v-deep(.el-table--fit) {
      width: 950px;
    }
    ::v-deep(.el-pagination) {
      margin-top: 20px;
    }
  }
}
</style>
