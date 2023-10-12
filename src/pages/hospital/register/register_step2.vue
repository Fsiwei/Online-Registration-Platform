<template>
  <div class="container">
    <div class="tip">确认挂号信息</div>
    <!-- 卡片：展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请点击选择就诊人</span>
          <el-button
            class="button"
            type="success"
            size="default"
            :icon="User"
            @click="goVisitor"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人的信息 -->
      <div class="user">
        <Visitor
          class="item"
          v-for="(visitor, index) in visitorArr"
          :key="visitor.id"
          :visitor="visitor"
          @click="changeIndex(index)"
          :index="index"
          :currentIndex="currentIndex"
        />
      </div>
    </el-card>
    <!-- 卡片：展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片的身体部分展示挂号的信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期：</div>
          </template>
          <span
            >{{ doctorInfo.workDate }} {{ doctorInfo.param?.dayOfWeek }}
            {{ doctorInfo.workTime == 0 ? "上午" : "下午" }}</span
          >
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院：</div>
          </template>
          <span>{{ doctorInfo.param?.hosname }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室：</div>
          </template>
          <span>{{ doctorInfo.param?.depname }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名：</div>
          </template>
          <span>{{ doctorInfo.docname }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称：</div>
          </template>
          <span>{{ doctorInfo.title }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长：</div>
          </template>
          <span>{{ doctorInfo.skill }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医事服务费：</div>
          </template>
          <span class="amount">{{ doctorInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="confirm">
      <el-button
        type="primary"
        size="default"
        @click="submitOrder"
        :disabled="currentIndex === -1 ? true : false"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { User } from "@element-plus/icons-vue";
// 引入获取就诊人信息的接口
import { reqGetVisitor, reqGetDoctorInfo } from "@/api/hospital";
// 引入获取就诊人的数据类型
import type {
  VisitorResponseData,
  VisitorArr,
  DoctorInfoData,
} from "@/api/hospital/type";
// 引入提交订单的接口
import { reqSubmitOrder } from "@/api/user";
// 引入提交订单的数据类型
import type { SubmitOrder } from "@/api/user/type";
// 就诊人组件
import Visitor from "@/components/visitor/index.vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
let $route = useRoute();
let $router = useRouter();
// 存储所有就诊人信息
let visitorArr = ref<VisitorArr>([]);
// 存储挂号医生信息
let doctorInfo = ref<any>({});
// 存储用户选定的就诊人的索引值
let currentIndex = ref<number>(-1);
// 组件挂在完毕后获取数据
onMounted(() => {
  // 获取就诊人信息
  fetchVisitorData();
  // 获取挂号医生信息
  fetchDoctorData();
});
// 获取就诊人信息
const fetchVisitorData = async () => {
  let result: VisitorResponseData = await reqGetVisitor();
  if (result.code == 200) {
    visitorArr.value = result.data;
  }
};
// 获取挂号医生信息
const fetchDoctorData = async () => {
  let result: DoctorInfoData = await reqGetDoctorInfo(
    $route.query.docId as string
  );
  if (result.code == 200) {
    doctorInfo.value = result.data;
  }
};

const changeIndex = (curIndex: number) => {
  // 存储当前用户选中的就诊人信息索引值
  currentIndex.value = curIndex;
};

// 提交订单的函数
const submitOrder = async () => {
  let hoscode = doctorInfo.value.hoscode;
  let scheduleId = doctorInfo.value.id;
  let patientId = visitorArr.value[currentIndex.value].id;
  let result: SubmitOrder = await reqSubmitOrder(
    hoscode,
    scheduleId,
    patientId
  );
  if (result.code == 200) {
    $router.push({ path: "/user/order", query: { orderId: result.data } });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};
// 预约挂号添加就诊人按钮，切换到就诊人管理的路由
const goVisitor = () => {
  $router.push({ path: "/user/patient", query: { type: "add" } });
};
</script>

<style scoped lang="scss">
.container {
  padding: 10px 20px;
  .tip {
    font-size: 20px;
    color: #777;
    font-weight: 700;
  }
  .box-card {
    margin: 40px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 30%;
        margin: 10px;
      }
    }
    .margin-top {
      .amount {
        color: red;
      }
    }
  }
  .confirm {
    text-align: center;
    .el-button--primary {
      width: 200px;
      height: 40px;
      font-size: 14px;
    }
  }
}
</style>
