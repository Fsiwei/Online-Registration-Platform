import { useRouter } from 'vue-router';
<template>
  <el-card class="box-card" shadow="hover" @click="goDetail">
    <div class="content">
      <div class="left">
        <div class="hospital_name">{{ hospitalInfo.hosname }}</div>
        <div class="tip">
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
            <span>{{ hospitalInfo.param.hostypeString ? hospitalInfo.param.hostypeString : '默认等级'}}</span>
          </div>
          <div class="time">
            <svg
              t="1692796498859"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5131"
              width="16"
              height="16"
            >
              <path
                d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                fill="#575B66"
                p-id="5132"
              ></path>
              <path
                d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                fill="#575B66"
                p-id="5133"
              ></path>
            </svg>
            <span>每天{{ hospitalInfo.bookingRule?.releaseTime}}放号</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
let $router = useRouter();
// 点击医院卡片时跳转到医院详情页
const goDetail = () => {
  $router.push({path: "/hospital/register", query:{hoscode: props.hospitalInfo.hoscode}});
}
// 接收父组件传递过来的 props -> 即为已有的医院的数据
let props = defineProps(["hospitalInfo"]);
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 60%;
    .tip {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      color: #777;
      .level {
        display: flex;
        align-items: center;
        span {
          margin-left: 4px;
        }
      }
      .time {
        display: flex;
        align-items: center;
        span {
          margin-left: 4px;
        }
      }
    }
  }
  .right {
    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
