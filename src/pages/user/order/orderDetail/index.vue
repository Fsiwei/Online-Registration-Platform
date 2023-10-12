<template>
  <div class="orderDetail">
    <!-- 展示订单详情的结构 -->
    <el-card class="box-card">
      <!-- 卡片头部结构 -->
      <template #header>
        <div class="card-header">
          <div class="title">挂号详情</div>
        </div>
      </template>
      <!-- 展示身体部分顶部结构 -->
      <div class="top">
        <!-- 左侧标签 -->
        <el-tag class="ml-2" type="success">
          <div class="tag">
            <svg
              t="1694065148612"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2625"
              width="16"
              height="16"
            >
              <path
                d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"
                fill="#1be628"
                p-id="2626"
              ></path>
            </svg>
            <span class="tip">{{ orderInfo.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <!-- 右侧二维码 -->
        <div class="right_info">
          <img src="../../../../assets/images/code_app.png" alt="" />
          <div class="text">
            <div class="text_top">
              <p>微信</p>
              <svg
                t="1694071610372"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4111"
                width="12"
                height="12"
              >
                <path
                  d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z"
                  fill="#13c31f"
                  p-id="4112"
                ></path>
                <path
                  d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z"
                  fill="#13c31f"
                  p-id="4113"
                ></path>
              </svg>
              <p>关注 “北京114预约挂号”</p>
            </div>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>
      <!-- 订单详情底部的结构 -->
      <div class="bottom">
        <div class="left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人信息</div>
              </template>
              <span>{{ orderInfo.patientName }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              <span>{{ orderInfo.reserveDate }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              <span>{{ orderInfo.hosname }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              <span>{{ orderInfo.depname }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              <span>{{ orderInfo.title }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医事服务费</div>
              </template>
              <span class="expence">{{ orderInfo.amount }}元</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              <span>{{ orderInfo.outTradeNo }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              <span>{{ orderInfo.createTime }}</span>
            </el-descriptions-item>
          </el-descriptions>
          <div
            class="btn"
            v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
          >
            <el-popconfirm title="确定取消预约？" @confirm="cancel">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
            <el-button
              type="primary"
              v-if="orderInfo.orderStatus == 0"
              @click="openDialog"
              >支付</el-button
            >
          </div>
        </div>
        <div class="right">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>注意事项</span>
              </div>
            </template>
            <div class="note">
              <p>
                1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
              </p>
              <p class="notable">
                2.【取号】就诊当天需在{{
                  orderInfo.fetchTime
                }}在医院取号，未取号视为爽约，该号不退不换；
              </p>
              <p>
                3.【退号】在{{
                  orderInfo.quitTime
                }}前可在线退号，逾期将不可办理退号退费；
              </p>
              <p>
                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
              </p>
              <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
    <!-- 展示支付的二维码对话框 -->
    <!-- 对话框通过v-model控制显示与隐藏的 true:展示 false隐藏 -->
    <el-dialog
      v-model="dialogVisible"
      title="微信支付"
      width="450px"
      @close="close"
    >
      <!-- 支付需要使用的二维码图片 -->
      <div class="payQRcode">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <!-- 对话框的底部结构 -->
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"
          >关闭窗口</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  reqOrderInfo,
  reqCancelOrder,
  reqQrcode,
  reqQueryPayState,
} from "@/api/user";
import type { OrderResponseData, Qrcode, PayResult } from "@/api/user/type";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// 生成二维码插件 qrcode
import QRCode from "qrcode";
let $route = useRoute();
// 存储订单详情数据
let orderInfo = ref<any>({});
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
// 定义存储二维码图片路径
let imgUrl = ref<string>("");
// 存储定时器的引用
let timer = ref<any>();
// 组件挂载完毕
onMounted(() => {
  getOrderInfo();
});
// 获取订单详情数据
const getOrderInfo = async () => {
  let result: OrderResponseData = await reqOrderInfo(
    $route.query.orderId as string
  );
  if (result.code == 200) {
    orderInfo.value = result.data;
  }
};
// 取消订单  订单状态有三种： orderStatus  -1  取消预约  0 预约但是没有支付  1 支付成功
const cancel = async () => {
  try {
    // 取消预约成功
    await reqCancelOrder($route.query.OrderInfo as string);
    // 再次获取订单详情的数据
    getOrderInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "取消预约失败",
    });
  }
};
// 点击支付按钮的回调
const openDialog = async () => {
  // 显示对话框
  dialogVisible.value = true;
  // 发起请求获取支付需要的二维码信息
  let result: Qrcode = await reqQrcode($route.query.orderId as string);
  // 根据服务器返回二维码信息生成二维码图片
  imgUrl.value = await QRCode.toDataURL(result.data.codeUrl);
  // 询问支付的结果
  // 当二维码显示后，每隔一段时间询问一次服务器是否支付成功
  timer.value = setInterval(async () => {
    let payResult: PayResult = await reqQueryPayState(
      $route.query.OrderId as string
    );
    // 当返回结果为真，即支付成功
    if (payResult.data) {
      // 隐藏对话框
      dialogVisible.value = false;
      // 提示信息
      ElMessage({
        type: "success",
        message: "支付成功",
      });
      // 支付成功后清除定时器
      clearInterval(timer.value);
      // 再次获取订单详情的数据
      getOrderInfo();
    }
  }, 2000);
};
// 关闭窗口按钮的回调
const closeDialog = () => {
  // 隐藏对话框
  dialogVisible.value = false;
  // 清除定时器
  clearInterval(timer.value);
};
// 对话框右上角的x关闭对话框的事件
const close = () => {
  // 清除定时器
  clearInterval(timer.value);
};
</script>

<style scoped lang="scss">
.orderDetail {
  .box-card {
    .top {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        .tip {
          margin-left: 5px;
        }
      }
      .right_info {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          margin-right: 10px;
        }
        .text {
          font-size: 12px;
          line-height: 1.5;
          .text_top {
            display: flex;
            align-items: center;
            .icon {
              margin: 0 4px;
            }
          }
        }
      }
    }
    .bottom {
      display: flex;
      margin: 20px 0;
      .left {
        flex: 4;
        margin-right: 20px;
        .expence {
          color: red;
          font-weight: 700;
        }
        .btn {
          margin-top: 10px;
        }
      }
      .right {
        flex: 6;
        p {
          margin: 10px 0;
          line-height: 1.6;
        }
        .notable {
          color: red;
        }
      }
    }
  }
}
::v-deep(.el-dialog__body) {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .payQRcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 250px;
      margin-bottom: 10px;
    }
    p {
      line-height: 1.5;
    }
  }
}
</style>
