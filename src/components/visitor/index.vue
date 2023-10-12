<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <div class="medical_insurance">
          {{ visitor.isInsure == 1 ? "医保" : "自费" }}
        </div>
        <div class="visitor_name">{{ visitor.name }}</div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          size="default"
          :icon="Edit"
          @click="handler"
          circle
        ></el-button>
        <el-popconfirm
          @confirm="deleteVisitor"
          :title="`确定要删除${visitor.name}吗？`"
          width="200px"
        >
          <template #reference>
            <el-button
              v-if="$route.path == '/user/patient'"
              type="danger"
              size="default"
              :icon="Delete"
              circle
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ visitor.param.certificatesTypeString }}</p>
      <p>证件号码：{{ visitor.certificatesNo }}</p>
      <p>用户性别：{{ visitor.sex == "1" ? "男性" : "女性" }}</p>
      <p>出生日期：{{ visitor.birthdate }}</p>
      <p>手机号码：{{ visitor.phone }}</p>
      <p>婚姻状况：{{ visitor.isMarry == "0" ? "未婚" : "已婚" }}</p>
      <p>当前住址：{{ visitor.param.cityString }}</p>
      <p>详细住址：{{ visitor.param.fullAddress }}</p>
      <!-- 红色的已选择的盒子 -->
      <transition name="selected">
        <div class="selected" v-if="index === currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { reqDeleteVisitor } from "@/api/user";
import { ElMessage } from "element-plus";
let $route = useRoute();
let $router = useRouter();
// 接收父组件传递过来的就诊人的信息
let props = defineProps(["visitor", "index", "currentIndex"]);
let $emit = defineEmits(["changeScene", "removeVisitor"]);
// 对应的就诊人组件修改按钮的回调
const handler = () => {
  if ($route.path == "/user/patient") {
    // 就诊人管理模块点击修改按钮，直接切换场景
    $emit("changeScene", props.visitor);
  } else {
    // 预约挂号点击修改按钮，路由跳转并携带参数
    $router.push({
      path: "/user/patient",
      query: { type: "edit", id: props.visitor.id },
    });
  }
};
// 删除确认按钮的回调
const deleteVisitor = async () => {
  try {
    // 删除成功
    await reqDeleteVisitor(props.visitor.id);
    // 提示信息
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    $emit('removeVisitor');
  } catch (error) {
    // 提示信息
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
</script>

<style scoped lang="scss">
.visitor {
  box-shadow: 0px 4px 4px #ddd;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 20px;
    background-color: #eee;
    .left {
      display: flex;
      align-items: center;
      .medical_insurance {
        padding: 4px;
        margin-right: 5px;
        background-color: #fff;
        border-radius: 5px;
        font-size: 12px;
        color: #000;
      }
      .visitor_name {
        font-size: 14px;
        color: #777;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 20px;
    font-size: 14px;
    p {
      margin: 10px 0;
      line-height: 1.5;
    }
  }
  .selected {
    position: absolute;
    width: 200px;
    height: 200px;
    color: red;
    border-radius: 50%;
    border: 4px dashed red;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 200px;
    left: 12%;
    top: 16%;
    opacity: 0.2;
    transform: rotate(45deg);
  }
  .selected-enter-from {
    transform: scale(1);
    opacity: 0.7;
  }
  .selected-enter-active {
    transition: all 0.3s;
  }
  .selected-enter-to {
    transform: scale(1.2);
    opacity: 0.7;
  }
}
</style>
