<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="separator">|</div>
      <div class="deparment">{{ workData.baseMap?.bigname }}</div>
      <div class="separator">·</div>
      <div class="sub_deparment">{{ workData.baseMap?.depname }}</div>
    </div>

    <!-- 中部展示预约日期结构 -->
    <div class="middle">
      <h4 class="time">{{ workData.baseMap?.workDateString }}</h4>
      <div class="container">
        <div
          class="item"
          :class="{
            active: item.status == -1 || item.availableNumber == -1,
            cur: item.workDate == workTime.workDate,
          }"
          v-for="item in workData.bookingScheduleList"
          :key="item"
          @click="changeTime(item)"
        >
          <div class="item_top">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="item_bottom">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">
              {{
                item.availableNumber == -1
                  ? "已约满了"
                  : `剩余${item.availableNumber}号`
              }}
            </div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="pageNo"
        layout="prev, pager, next"
        :total="workData.total"
        @current-change="fetchWorkData"
      />
    </div>

    <!-- 底部展示医生信息的结构 -->
    <div class="bottom">
      <!-- 展示即将放号的时间 -->
      <div class="release_time" v-if="workTime.status == 1">
        <span class="time">xxxx-xx-xx 08:30:00</span>
        <!-- <span class="time">{{ workData.bookingScheduleList.workDate }} 08:30:00</span> -->
        <span class="release">放号</span>
      </div>
      <!-- 展示可预约医生信息的结构：上午、下午 -->
      <div class="doctor" v-else>
        <!-- 上午 -->
        <div class="am_pm">
          <!-- 顶部文字提示 -->
          <div class="tip">
            <svg
              t="1693808099169"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10727"
              width="16"
              height="16"
            >
              <path
                d="M513.123 795.991c-76.156 0-147.753-29.658-201.603-83.508-53.849-53.849-83.504-125.444-83.504-201.596 0-76.153 29.657-147.749 83.504-201.598 53.85-53.851 125.446-83.508 201.603-83.508 76.147 0 147.742 29.658 201.593 83.508 53.853 53.852 83.511 125.447 83.511 201.598s-29.659 147.747-83.511 201.597c-53.852 53.85-125.445 83.507-201.593 83.507zM513.123 272.352c-131.529 0-238.534 107.007-238.534 238.535s107.006 238.533 238.534 238.533 238.533-107.005 238.533-238.533c0-131.529-107.006-238.535-238.533-238.535z"
                fill="#1296db"
                p-id="10728"
              ></path>
              <path
                d="M513.123 149.007c-12.861 0-23.285-10.426-23.285-23.285v-91.359c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.358c0 12.862-10.426 23.286-23.285 23.286z"
                fill="#1296db"
                p-id="10729"
              ></path>
              <path
                d="M513.123 1010.674c-12.861 0-23.285-10.426-23.285-23.285v-91.346c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.346c0 12.861-10.426 23.285-23.285 23.285z"
                fill="#1296db"
                p-id="10730"
              ></path>
              <path
                d="M240.764 261.825c-5.959 0-11.919-2.274-16.466-6.821l-64.592-64.591c-9.094-9.093-9.094-23.838 0-32.931 9.093-9.094 23.838-9.094 32.931 0l64.593 64.592c9.094 9.093 9.094 23.838 0 32.931-4.546 4.545-10.507 6.82-16.467 6.82z"
                fill="#1296db"
                p-id="10731"
              ></path>
              <path
                d="M850.050 871.111c-5.958 0-11.919-2.272-16.467-6.82l-64.593-64.593c-9.093-9.094-9.093-23.839 0-32.932 9.094-9.094 23.839-9.094 32.932 0l64.593 64.593c9.093 9.094 9.093 23.839 0 32.932-4.546 4.545-10.507 6.82-16.466 6.82z"
                fill="#1296db"
                p-id="10732"
              ></path>
              <path
                d="M36.59 534.183c-12.861 0.001-23.286-10.423-23.289-23.283-0.001-12.861 10.423-23.286 23.283-23.289l91.348-0.011c12.861-0.001 23.286 10.423 23.289 23.283 0.001 12.861-10.423 23.286-23.283 23.289l-91.348 0.011z"
                fill="#1296db"
                p-id="10733"
              ></path>
              <path
                d="M989.613 534.173h-91.346c-12.861 0-23.285-10.426-23.285-23.285s10.426-23.285 23.285-23.285h91.346c12.861 0 23.285 10.426 23.285 23.285s-10.426 23.285-23.285 23.285z"
                fill="#1296db"
                p-id="10734"
              ></path>
              <path
                d="M176.173 871.122c-5.959 0-11.919-2.272-16.466-6.82-9.094-9.094-9.094-23.839 0-32.932l64.593-64.593c9.094-9.094 23.838-9.094 32.931 0s9.094 23.839 0 32.932l-64.593 64.593c-4.546 4.546-10.506 6.82-16.466 6.82z"
                fill="#1296db"
                p-id="10735"
              ></path>
              <path
                d="M785.457 261.825c-5.959 0-11.918-2.272-16.467-6.821-9.094-9.094-9.093-23.838 0.001-32.931l64.593-64.592c9.094-9.093 23.838-9.094 32.931 0s9.093 23.838-0.001 32.931l-64.593 64.592c-4.545 4.546-10.506 6.821-16.465 6.821z"
                fill="#1296db"
                p-id="10736"
              ></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!-- 展示可预约医生信息 -->
          <div class="doc_info" v-for="doctor in amArr" :key="doctor.id">
            <!-- 左侧展示：医生姓名 | 技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span class="separator">|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 右侧展示挂号费 -->
            <div class="right">
              <!-- 挂号费 -->
              <div class="expense">
                <svg
                  t="1693816074774"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="11839"
                  width="16"
                  height="16"
                >
                  <path
                    d="M787.669861 62.749836h-65.742653l-210.480106 375.237589L298.62537 62.749836h-65.917737L454.915321 454.536484H224.561601v49.146496h253.973731v149.487257H224.561601v49.146496h253.973731v257.529684h66.552546V702.316733h257.045387v-49.146496H545.087878v-149.487257h257.045387v-49.146496H567.906187z"
                    fill="#777777"
                    p-id="11840"
                  ></path>
                </svg>
                <span>{{ doctor.amount }}</span>
              </div>
              <!-- 某个医生的剩余挂号数 -->
              <div class="residue">
                <el-button
                  type="primary"
                  size="default"
                  @click="goStep2(doctor)"
                  >剩余{{ doctor.availableNumber }}</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 下午 -->
        <div class="am_pm">
          <!-- 顶部文字提示 -->
          <div class="tip">
            <svg
              t="1693808099169"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10727"
              width="16"
              height="16"
            >
              <path
                d="M513.123 795.991c-76.156 0-147.753-29.658-201.603-83.508-53.849-53.849-83.504-125.444-83.504-201.596 0-76.153 29.657-147.749 83.504-201.598 53.85-53.851 125.446-83.508 201.603-83.508 76.147 0 147.742 29.658 201.593 83.508 53.853 53.852 83.511 125.447 83.511 201.598s-29.659 147.747-83.511 201.597c-53.852 53.85-125.445 83.507-201.593 83.507zM513.123 272.352c-131.529 0-238.534 107.007-238.534 238.535s107.006 238.533 238.534 238.533 238.533-107.005 238.533-238.533c0-131.529-107.006-238.535-238.533-238.535z"
                fill="#1296db"
                p-id="10728"
              ></path>
              <path
                d="M513.123 149.007c-12.861 0-23.285-10.426-23.285-23.285v-91.359c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.358c0 12.862-10.426 23.286-23.285 23.286z"
                fill="#1296db"
                p-id="10729"
              ></path>
              <path
                d="M513.123 1010.674c-12.861 0-23.285-10.426-23.285-23.285v-91.346c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.346c0 12.861-10.426 23.285-23.285 23.285z"
                fill="#1296db"
                p-id="10730"
              ></path>
              <path
                d="M240.764 261.825c-5.959 0-11.919-2.274-16.466-6.821l-64.592-64.591c-9.094-9.093-9.094-23.838 0-32.931 9.093-9.094 23.838-9.094 32.931 0l64.593 64.592c9.094 9.093 9.094 23.838 0 32.931-4.546 4.545-10.507 6.82-16.467 6.82z"
                fill="#1296db"
                p-id="10731"
              ></path>
              <path
                d="M850.050 871.111c-5.958 0-11.919-2.272-16.467-6.82l-64.593-64.593c-9.093-9.094-9.093-23.839 0-32.932 9.094-9.094 23.839-9.094 32.932 0l64.593 64.593c9.093 9.094 9.093 23.839 0 32.932-4.546 4.545-10.507 6.82-16.466 6.82z"
                fill="#1296db"
                p-id="10732"
              ></path>
              <path
                d="M36.59 534.183c-12.861 0.001-23.286-10.423-23.289-23.283-0.001-12.861 10.423-23.286 23.283-23.289l91.348-0.011c12.861-0.001 23.286 10.423 23.289 23.283 0.001 12.861-10.423 23.286-23.283 23.289l-91.348 0.011z"
                fill="#1296db"
                p-id="10733"
              ></path>
              <path
                d="M989.613 534.173h-91.346c-12.861 0-23.285-10.426-23.285-23.285s10.426-23.285 23.285-23.285h91.346c12.861 0 23.285 10.426 23.285 23.285s-10.426 23.285-23.285 23.285z"
                fill="#1296db"
                p-id="10734"
              ></path>
              <path
                d="M176.173 871.122c-5.959 0-11.919-2.272-16.466-6.82-9.094-9.094-9.094-23.839 0-32.932l64.593-64.593c9.094-9.094 23.838-9.094 32.931 0s9.094 23.839 0 32.932l-64.593 64.593c-4.546 4.546-10.506 6.82-16.466 6.82z"
                fill="#1296db"
                p-id="10735"
              ></path>
              <path
                d="M785.457 261.825c-5.959 0-11.918-2.272-16.467-6.821-9.094-9.094-9.093-23.838 0.001-32.931l64.593-64.592c9.094-9.093 23.838-9.094 32.931 0s9.093 23.838-0.001 32.931l-64.593 64.592c-4.545 4.546-10.506 6.821-16.465 6.821z"
                fill="#1296db"
                p-id="10736"
              ></path>
            </svg>
            <span class="text">下午号源</span>
          </div>
          <!-- 展示可预约医生信息 -->
          <div class="doc_info" v-for="doctor in pmArr" :key="doctor.id">
            <!-- 左侧展示：医生姓名 | 技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span class="separator">|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 右侧展示挂号费 -->
            <div class="right">
              <!-- 挂号费 -->
              <div class="expense">
                <svg
                  t="1693816074774"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="11839"
                  width="16"
                  height="16"
                >
                  <path
                    d="M787.669861 62.749836h-65.742653l-210.480106 375.237589L298.62537 62.749836h-65.917737L454.915321 454.536484H224.561601v49.146496h253.973731v149.487257H224.561601v49.146496h253.973731v257.529684h66.552546V702.316733h257.045387v-49.146496H545.087878v-149.487257h257.045387v-49.146496H567.906187z"
                    fill="#777777"
                    p-id="11840"
                  ></path>
                </svg>
                <span>{{ doctor.amount }}</span>
              </div>
              <!-- 某个医生的剩余挂号数 -->
              <div class="residue">
                <el-button
                  type="primary"
                  size="default"
                  @click="goStep2(doctor)"
                  >剩余{{ doctor.availableNumber }}</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital";
import { useRoute, useRouter } from "vue-router";
import type {
  HospitalWorkData,
  DoctorResponseData,
  DocArr,
  Doctor,
} from "@/api/hospital/type";
// 获取路由对象
let $route = useRoute();
let $router = useRouter();
// 分页器当前页码
let pageNo = ref<number>(1);
// 每页展示的数据条数
let limit = ref<number>(6);
// 存储医院科室挂号数据
let workData = ref<any>({});
// 存储排班日期：当前数据的第一个
let workTime: any = ref({});
// 存储排班医生的数据
let docArr = ref<DocArr>([]);
// 组件挂载完毕后发起一次请求
onMounted(() => {
  fetchWorkData();
});
// 封装获取挂号数据的方法
const fetchWorkData = async () => {
  let result: HospitalWorkData = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  if (result.code == 200) {
    workData.value = result.data;
    workTime.value = workData.value.bookingScheduleList[0];
    // 获取一次医生的数据
    getDoctorWorkData();
  }
};
// 封装获取某天医生排班的数据
const getDoctorWorkData = async () => {
  // 医院编号
  let hoscode: string = $route.query.hoscode as string;
  // 科室编号
  let depcode: string = $route.query.depcode as string;
  // 时间
  let workDate: string = workTime.value.workDate;
  // 获取排班医生的数据
  let result: DoctorResponseData = await reqHospitalDoctor(
    hoscode,
    depcode,
    workDate
  );
  if ((result.code = 200)) {
    docArr.value = result.data;
  }
};

const changeTime = (item: any) => {
  // 存储用户选择的那天的数据
  workTime.value = item;
  // 再发起一次请求
  getDoctorWorkData();
};

// 计算出上午排班的医生数据
let amArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 0;
  });
});
// 计算出下午排班的医生数据
let pmArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 1;
  });
});

// 路由跳转进入到选择就诊人页面
const goStep2 = (doctor: Doctor) => {
  $router.push({
    path: "/hospital/register_step2",
    query: { docId: doctor.id },
  });
};
</script>

<script lang="ts">
export default {
  name: "RegisterStep1",
};
</script>

<style scoped lang="scss">
.wrap {
  margin: 0 20px;
  .top {
    display: flex;
    text-align: center;
    color: #777;
    .separator {
      margin: 0 10px;
    }
  }
  .middle {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      font-weight: 700;
    }
    .container {
      width: 100%;
      display: flex;
      margin: 30px 0;
      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 0 5px;
        color: #777;
        font-size: 14px;
        transition: all 0.5s;
        &.active {
          border: 1px solid #ccc;
          .item_top {
            background-color: #ccc;
          }
        }
        &.cur {
          transform: scale(1.08);
        }
        .item_top {
          width: 100%;
          height: 30px;
          background-color: #e8f2ff;
          font-weight: 700;
          text-align: center;
          line-height: 30px;
        }
        .item_bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
  .bottom {
    .release_time {
      font-size: 20px;
      text-align: center;
      font-weight: 700;
      .time {
        margin-right: 10px;
        color: deepskyblue;
      }
      .release {
        color: skyblue;
      }
    }
    .doctor {
      .am_pm {
        .tip {
          display: flex;
          align-items: center;
          .text {
            color: #777;
            font-weight: 700;
          }
        }
        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          padding: 10px 0;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              color: deepskyblue;
              margin: 0 0 15px;
              .separator {
                margin: 0 10px;
              }
            }
            .skill {
              font-size: 14px;
              color: #777;
            }
          }
          .right {
            display: flex;
            align-items: center;
            margin-right: 70px;
            .expense {
              display: flex;
              align-items: center;
              margin-right: 50px;
              color: #777;
            }
            .residue {
              .el-button--primary {
                width: 100px;
                height: 40px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
