<template>
  <div class="patient">
    <!-- 就诊人管理 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button
            class="button"
            type="primary"
            size="default"
            :icon="User"
            @click="addVisitor"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 就诊人管理模块展示就诊人信息的结构 -->
      <div class="visitors" v-if="scene == 0">
        <Visitor
          class="item"
          v-for="(visitor, index) in visitorArr"
          :key="visitor.id"
          :visitor="visitor"
          :index="index"
          @changeScene="changeScene"
          @removeVisitor="removeVisitor"
        />
      </div>
      <!-- 添加就诊人 | 修改已有就诊人信息的结构 -->
      <div class="form" v-if="scene == 1">
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form label-width="120px" style="margin: 0 120px">
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请你输入用户姓名"
              v-model="visitorParams.name"
            />
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select
              placeholder="请你选择证件类型"
              style="width: 100%"
              v-model="visitorParams.certificatesType"
            >
              <el-option
                v-for="(item, index) in typeArr"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              placeholder="请你输入证件号码"
              v-model="visitorParams.certificatesNo"
            />
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="visitorParams.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="visitorParams.birthdate"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="请你选择日期"
            />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              placeholder="请你输入用户手机号码"
              v-model="visitorParams.phone"
            />
          </el-form-item>
        </el-form>
        <el-divider content-position="left"
          >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
        >
        <el-form label-width="120px" style="margin: 0 120px">
          <el-form-item label="婚姻状况">
            <el-radio-group v-model="visitorParams.isMarry">
              <el-radio :label="0">未婚</el-radio>
              <el-radio :label="1">已婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保">
            <el-radio-group v-model="visitorParams.isInsure">
              <el-radio :label="0">自费</el-radio>
              <el-radio :label="1">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前的住址">
            <el-cascader
              :props="props"
              v-model="visitorParams.addressSelected"
            />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
              placeholder="请你输入用户详细地址"
              v-model="visitorParams.address"
            />
          </el-form-item>
        </el-form>
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form label-width="120px" style="margin: 0 120px">
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请你输入用户姓名"
              v-model="visitorParams.contactsName"
            />
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select
              placeholder="请你选择证件类型"
              v-model="visitorParams.contactsCertificatesType"
            >
              <el-option
                v-for="(item, index) in typeArr"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              placeholder="请你输入证件号码"
              v-model="visitorParams.contactsCertificatesNo"
            />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              placeholder="请你输入用户手机号码"
              v-model="visitorParams.contactsPhone"
            />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button
            class="submit"
            type="primary"
            size="default"
            @click="submit"
            >提交</el-button
          >
          <el-button class="reset" type="primary" size="default" @click="reset"
            >重写</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqGetVisitor } from "@/api/hospital";
import type { VisitorResponseData, VisitorArr } from "@/api/hospital/type";
import { onMounted, ref, reactive, watch } from "vue";
import {
  reqCertificationType,
  reqGetCity,
  reqAddOrUpdateVisitor,
} from "@/api/user";
import type {
  CertificationTypeResponseData,
  CertificationArr,
  AddOrUpdateVisitor,
} from "@/api/user/type";
// 级联选择器 ts 类型
import type { CascaderProps } from "element-plus";
import { ElMessage } from "element-plus";
// 引入路由器与路由方法
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();
// 存储就诊人信息
let visitorArr = ref<VisitorArr>([]);
// 定义一个响应式数据：决定卡片的身体部分的展示内容
let scene = ref<number>(0);
// 定义证件类型的数组
let typeArr = ref<CertificationArr>([]);
// 收集新增就诊人的数据
let visitorParams = reactive<AddOrUpdateVisitor>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});
// 组件挂载完毕
onMounted(() => {
  // 获取就诊人信息
  getAllVisitor();
  // 获取证件类型
  getCertificationType();
  // 判断:当前这个路由组件是不是从挂号组件而来（挂号组件而来,路径上是携带query参数type=add）
  if ($route.query.type == "add") {
    // 切换场景为 1
    scene.value = 1;
  }
  if ($route.query.type == "edit") {
    // 切换场景为 1
    scene.value = 1;
  }
});
const getAllVisitor = async () => {
  let result: VisitorResponseData = await reqGetVisitor();
  if (result.code == 200) {
    visitorArr.value = result.data;
  }
};
// 添加就诊人按钮的回调
const addVisitor = () => {
  // 清空上一次的数据
  reset();
  // 切换场景为1
  scene.value = 1;
};
// 就诊人子组件自定义事件的回调
const changeScene = (visitor: AddOrUpdateVisitor) => {
  scene.value = 1;
  // 收集已有就诊人信息
  Object.assign(visitorParams, visitor);
};
// 获取证件类型
const getCertificationType = async () => {
  let result: CertificationTypeResponseData = await reqCertificationType();
  if (result.code == 200) {
    typeArr.value = result.data;
  }
};
// 级联选择器数据
const props: CascaderProps = {
  lazy: true, // 懒加载
  // 加载级联选择器的方法
  async lazyLoad(node: any, resolve: any) {
    let result = await reqGetCity(node.data.id || "86");
    // 整理数据
    let showData = result.data.map((item: any) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
      };
    });
    // 注入组件需要展示的数据
    resolve(showData);
  },
};
// 提交按钮的方法回调
const submit = async () => {
  // 新增 或 更新 一个已有就诊人
  try {
    // 新增 或 更新 信息成功
    await reqAddOrUpdateVisitor(visitorParams);
    // 提示文字
    ElMessage({
      type: "success",
      message: visitorParams.id ? "更新成功" : "新增成功",
    });
    // 切换场景
    if ($route.query.type) {
      // 返回原路径
      $router.back();
    } else {
      // 切换场景为 0
      scene.value = 0;
    }
    // 再次获取全部就诊人的信息
    getAllVisitor();
  } catch (error) {
    ElMessage({
      type: "error",
      message: visitorParams.id ? "更新失败" : "新增失败",
    });
  }
};
// 重写按钮的方法回调
const reset = () => {
  Object.assign(visitorParams, {
    id: null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};
// 监听所有就诊人的数据
watch(
  () => visitorArr.value,
  () => {
    // 判断:当前这个路由组件是不是从挂号组件而来（挂号组件而来,路径上是携带query参数type=edit）
    if ($route.query.type == "edit") {
      // 找到要更新的已有的就诊人
      let visitor = visitorArr.value.find((item: any) => {
        return item.id == $route.query.id;
      });
      Object.assign(visitorParams, visitor);
    }
  }
);
// 子组件自定义事件：删除按钮触发
const removeVisitor = () => {
  // 再次获取全部就诊人信息
  getAllVisitor();
}
</script>

<style scoped lang="scss">
.patient {
  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .visitors {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 30%;
      margin: 10px;
    }
  }
  .form {
    .btn {
      margin-left: 240px;
      margin-bottom: 20px;
    }
  }
}
</style>
