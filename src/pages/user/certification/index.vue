<template>
  <div class="certification">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>实名信息</span>
        </div>
      </template>
      <div class="tip">
        <el-icon><InfoFilled /></el-icon>
        <span class="text"
          >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span
        >
      </div>
      <!-- 卡片身体的底部：认证成功的结构、未认证成功的结构 -->
      <!-- 认证成功的结构 -->
      <el-descriptions
        v-if="userInfo.authStatus == 1"
        class="margin-top"
        :column="1"
        style="margin: 20px auto"
        border
      >
        <el-descriptions-item label-align="center">
          <template #label>
            <div class="cell-item">用户姓名</div>
          </template>
          <span>{{ userInfo.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item label-align="center">
          <template #label>
            <div class="cell-item">证件类型</div>
          </template>
          <span>{{
            userInfo.certificatesType == "10" ? "身份证" : "户口本"
          }}</span>
        </el-descriptions-item>
        <el-descriptions-item label-align="center">
          <template #label>
            <div class="cell-item">证件号码</div>
          </template>
          <span>{{ userInfo.certificatesNo }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <!-- 未认证成功的结构 -->
      <!-- 表单中的 :model="" ：表示什么数据需要校验 -->
      <el-form
        v-else
        class="form"
        label-width="100px"
        style="width: 60%; max-width: 460px; margin: 20px auto"
        :model="params"
        :rules="rules"
        ref="form"
      >
        <!-- 表单项中的 prop ：表示要校验的对象的具体属性 -->
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="params.name" />
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select
            style="width: 100%"
            placeholder="请选择证件类型"
            v-model="params.certificatesType"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in typeArr"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificatesNo">
          <el-input
            placeholder="请输入证件号码"
            v-model="params.certificatesNo"
          />
        </el-form-item>
        <!-- 
            action:upload组件向服务器提交图片路径
            limit:照片墙约束图片个数
            on-exceed:超出约束数量的钩子
        -->
        <el-form-item label="上传证件" prop="certificatesUrl">
          <el-upload
            ref="upload"
            list-type="picture-card"
            action="/api/oss/file/fileUpload?fileHost=userAuah"
            :limit="1"
            :on-exceed="exceedhandler"
            :on-success="successhandler"
            :on-preview="previewhandler"
            :on-remove="removehandler"
          >
            <img
              style="width: 100%; height: 100%"
              src="../../../assets/images/auth_example.png"
            />
          </el-upload>
          <el-dialog v-model="dialogVisiable">
            <img
              style="width: 100%; height: 100%"
              v-if="params.certificatesUrl"
              :src="params.certificatesUrl"
              w-full
              alt="Preview Image"
            />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="primary" @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入组合式 API 函数
import { onMounted, ref, reactive } from "vue";
// 引入element-plus图标
import { InfoFilled } from "@element-plus/icons-vue";
// 获取用户信息
import {
  reqUserInfo,
  reqCertificationType,
  reqUserCertion,
} from "@/api/user/index";
import { ElMessage } from "element-plus";
import type {
  UserInfoResponseData,
  CertificationArr,
  CertificationTypeResponseData,
  UserParam,
} from "@/api/user/type";
// 存储用户信息
let userInfo: any = ref<any>({});
let typeArr = ref<CertificationArr>([]);
// 收集用户表单认证的数据
let params = reactive<UserParam>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});
// 控制对话框的显示与隐藏
let dialogVisiable = ref<boolean>(false);
// 获取图片上传组件实例
let upload = ref();
// 获取表单组件实例
let form = ref();
// 组件挂载完毕
onMounted(() => {
  // 获取用户信息的方法
  getUserInfo();
  // 获取证件类型的接口
  getCertificationType();
});
// 获取当前用户信息
const getUserInfo = async () => {
  let result: UserInfoResponseData = await reqUserInfo();
  if (result.code == 200) {
    userInfo.value = result.data;
  }
};
// 获取证件类型
const getCertificationType = async () => {
  let result: CertificationTypeResponseData = await reqCertificationType();
  if (result.code == 200) {
    typeArr.value = result.data;
  }
};

// 超出数量的钩子
const exceedhandler = () => {
  ElMessage({
    type: "error",
    message: "图片只能上传一张",
  });
};

// 图片上传成功的钩子
const successhandler = (response: any) => {
  // 如果图片上传成功校验结果清除
  // clearValidate：清理某个字段的表单验证信息
  form.value.clearValidate("certificatesUrl");
  // 收集上传成功图片地址
  // response:上传图片请求服务器返回的数据
  // uploadFile上传文件对象
  params.certificatesUrl = response.data;
};
// 预览上传图片的钩子
const previewhandler = () => {
  // 触发预览的钩子的时候，对话框显示
  dialogVisiable.value = true;
};
// 移除上传图片的钩子
const removehandler = () => {
  params.certificatesUrl = "";
};
// 重写按钮的回调
const reset = () => {
  // 清除 upload 组件
  upload.value.clearFiles();
  //清空数据
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
};
// 提交按钮的回调
const submit = async () => {
  // form.value.validate(); 可以保证全部的表单校验通过返回一个成功的promise
  // 如果有一个表单校验失败返回的是一个失败的promise对象,后面的语句就不再执行了
  await form.value.validate();
  try {
    // 认证成功
    await reqUserCertion(params);
    // 提示消息
    ElMessage({
      type: "success",
      message: "认证成功",
    });
    // 认证成功后再次获取用户信息
    getUserInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败",
    });
  }
};

// 自定义用户名校验方法
const validatorName = (rule: any, value: any, callBack: any) => {
  // rule：即为当前校验字段的校验规则对象
  const reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callBack(); // 放行
  } else {
    callBack(new Error("请输入正确中国人的名字"));
  }
};
// 自定义证件类型校验方法
const validatorCertificatesType = (rule: any, value: any, callBack: any) => {
  // rule：即为当前校验字段的校验规则对象
  if (value == "10" || value == "20") {
    callBack(); // 放行
  } else {
    callBack(new Error("请选择证件的类型"));
  }
};
// 自定义证件号码校验方法
const validatorCertificatesNo = (rule: any, value: any, callBack: any) => {
  // rule：即为当前校验字段的校验规则对象
  let sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
  let hkb = /^\d{9}$/;
  if (sfz.test(value) || hkb.test(value)) {
    callBack(); // 放行
  } else {
    callBack(new Error("请输入正确的身份证或者户口本的号码"));
  }
};
// 自定义图片上传校验方法
const validatorCertificatesUrl = (rule: any, value: any, callBack: any) => {
  // rule：即为当前校验字段的校验规则对象
  // value：即为上传图片地址
  if (value.length) {
    callBack(); // 放行
  } else {
    callBack(new Error("请上传证件照图片"));
  }
};
// 表单校验规则对象
const rules = {
  // 用户名的校验规则
  name: [
    {
      required: true, // 表示该项必须校验
      validator: validatorName, // 对应的校验方法
    },
  ],
  // 证件类型的校验规则
  certificatesType: [
    {
      required: true, // 表示该项必须校验
      validator: validatorCertificatesType, // 对应的校验方法
    },
  ],
  // 证件号码的校验规则
  certificatesNo: [
    {
      required: true, // 表示该项必须校验
      validator: validatorCertificatesNo, // 对应的校验方法
    },
  ],
  // 上传图片的校验规则
  certificatesUrl: [
    {
      required: true, // 表示该项必须校验
      validator: validatorCertificatesUrl, // 对应的校验方法
    },
  ],
};
</script>

<style scoped lang="scss">
.certification {
  .box-card {
    .tip {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: #777;
      .text {
        margin-left: 5px;
      }
    }
  }
}
</style>
