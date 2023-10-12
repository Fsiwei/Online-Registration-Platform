<template>
  <div class="register">
    <div class="top">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="level">
        <svg
          t="1692796437334"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4007"
          width="16"
          height="16"
        >
          <path
            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
            p-id="4008"
          ></path>
        </svg>
        <span>{{
          hospitalStore.hospitalInfo.hospital?.param.hostypeString
        }}</span>
      </div>
    </div>
    <!-- 展示内容区域 -->
    <div class="content">
      <div class="left">
        <img
          :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
          alt=""
        />
      </div>
      <div class="right">
        <div class="part_one">
          <h4>挂号规则</h4>
          <div class="time">
            <span
              >预约周期：{{
                hospitalStore.hospitalInfo.bookingRule?.cycle
              }}天</span
            >
            <span
              >放号时间：{{
                hospitalStore.hospitalInfo.bookingRule?.releaseTime
              }}</span
            >
            <span
              >停挂时间：{{
                hospitalStore.hospitalInfo.bookingRule?.stopTime
              }}</span
            >
          </div>
          <div class="adress">
            具体地址：{{
              hospitalStore.hospitalInfo.hospital?.param.fullAddress
            }}
          </div>
          <div class="route">
            规划路线：{{
              hospitalStore.hospitalInfo.hospital?.route
            }}更多乘车路线详见须知。
          </div>
          <div class="queit_time">
            退号时间：就诊前一工作日{{
              hospitalStore.hospitalInfo.bookingRule?.quitTime
            }}前取消
          </div>
        </div>
        <div class="part_two">
          <h4>医院预约规则</h4>
          <div
            class="rule"
            v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule
              ?.rule"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <!-- 放置每一个医院的科室的数据 -->
    <div class="deparment">
      <div class="leftNav">
        <ul>
          <li
            @click="changeIndex(index)"
            :class="{ active: index == currentIndex }"
            v-for="(deparment, index) in hospitalStore.deparmentArr"
            :key="deparment.depcode"
          >
            {{ deparment.depname }}
          </li>
        </ul>
      </div>
      <div class="subDeparment">
        <!-- 用一个 div 代表：大科室与小科室   -->
        <div
          class="showDeparment"
          v-for="deparment in hospitalStore.deparmentArr"
          :key="deparment.depcode"
        >
          <h1 class="cur">
            {{ deparment.depname }}
          </h1>
          <!-- 每个大科室下的小科室 -->
          <ul>
            <li
              @click="showLogin(item)"
              v-for="item in deparment.children"
              :key="item.depcode"
            >
              {{ item.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
// 引入医院详情仓库的数据
import useDetailStore from "@/store/modules/hospitalDetail";
// 获取路由器
let $router = useRouter();
// 获取路由对象
let $route = useRoute();
// 获取数据
let hospitalStore = useDetailStore();
// 控制科室高亮的响应式数据
let currentIndex = ref<number>(0);
const changeIndex = (index: number) => {
  currentIndex.value = index;
  // 点击导航获取右侧科室（h1大科室的标题）
  let allH1 = document.querySelectorAll(".cur");
  // 滚动到对应科室的位置
  allH1[currentIndex.value].scrollIntoView({
    behavior: "smooth", // 过渡动画效果
    block: "start", // 滚动到的位置
  });
};
// 点击登录/注册按钮时弹出对话框
const showLogin = (item: any) => {
  $router.push({
    path: "/hospital/register_step1",
    query: { hoscode: $route.query.hoscode, depcode: item.depcode },
  });
};
</script>

<style scoped lang="scss">
.register {
  margin: 0 20px;
  .top {
    display: flex;
    .title {
      font-size: 24px;
      font-weight: 900;
    }
    .level {
      display: flex;
      align-items: center;
      margin-left: 10px;
      color: #777;
      span {
        margin-left: 4px;
      }
    }
  }
  .content {
    margin-top: 20px;
    display: flex;
    .left {
      width: 80px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      .part_one {
        h4 {
          margin-bottom: 20px;
          font-size: 18px;
          color: black;
        }
        div {
          color: #777;
          margin-bottom: 10px;
          letter-spacing: 2px;
          line-height: 20px;
          span {
            margin-right: 20px;
          }
        }
      }
      .part_two {
        h4 {
          margin-top: 25px;
          margin-bottom: 20px;
          font-size: 18px;
          color: black;
        }
        div {
          color: #777;
          margin-bottom: 10px;
          letter-spacing: 2px;
          line-height: 20px;
        }
      }
    }
  }
  .deparment {
    margin-top: 20px;
    display: flex;
    width: 100%;
    height: 500px;
    .leftNav {
      width: 95px;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          text-align: center;
          font-size: 14px;
          color: #777;
          line-height: 41px;
          cursor: pointer;
          &.active {
            border-left: 2px solid #aa0909;
            color: #aa0909;
            background-color: #fff;
          }
        }
      }
    }
    .subDeparment {
      flex: 1;
      margin-left: 5px;
      width: 80px;
      height: 100%;
      color: #777;
      font-size: 14px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none; // 隐藏滚动条
      }
      .showDeparment {
        h1 {
          padding: 10px 0;
          padding-left: 10px;
          background: rgb(248, 248, 248);
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 5px 0;
            padding-left: 10px;
            width: 33%;
            letter-spacing: 1px;
            line-height: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
