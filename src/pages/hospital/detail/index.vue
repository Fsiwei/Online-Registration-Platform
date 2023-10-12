<template>
  <div class="detail">
    <div class="info">
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
      <div class="content">
        <div class="left">
          <img
            :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
            alt=""
          />
        </div>
        <div class="right">
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
        </div>
      </div>
    </div>
    <div class="intro">
      <h4>医院介绍</h4>
      <div class="detailIntro">
        {{ hospitalStore.hospitalInfo.hospital?.intro }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入医院详情仓库的数据
import useDetailStore from "@/store/modules/hospitalDetail";
// 获取数据
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.detail {
  margin: 0 20px;
  .info {
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
        margin-top: 20px;
        margin-left: 20px;
        font-size: 14px;
        div {
          color: #777;
          margin-bottom: 10px;
          letter-spacing: 1px;
          line-height: 16px;
          span {
            margin-right: 20px;
          }
        }
      }
    }
  }
  .intro {
    margin-top: 30px;
    font-size: 14px;
    h4 {
      margin-top: 25px;
      margin-bottom: 20px;
      font-size: 18px;
      color: black;
    }
    div {
      color: #777;
      margin-bottom: 10px;
      letter-spacing: 1px;
      line-height: 1.5;
    }
  }
}
</style>
