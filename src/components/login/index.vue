import useUserStore from '../../store/modules/user';
<template>
  <div class="login_container">
    <!-- v-model：控制对话框的显示与隐藏  title：对话框左上角的标题 -->
    <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog">
      <!-- 对话框身体部分结构 -->
      <el-row>
        <!-- 左侧结构：手机号码登录、微信扫一扫登录 -->
        <el-col :span="12">
          <div class="loginForm">
            <!-- 场景一：手机号码登录 -->
            <div class="phoneLogin" v-show="scene == 0">
              <el-form :model="loginParam" :rules="rules" ref="form">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="请输入手机号码"
                    :prefix-icon="User"
                    v-model="loginParam.phone"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    placeholder="请输入手机验证码"
                    :prefix-icon="Lock"
                    v-model="loginParam.code"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="!isPhone || flag">
                    <!-- 倒计时组件 -->
                    <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                    <span v-else @click="getCode">获取验证码</span>
                  </el-button>
                </el-form-item>
              </el-form>
              <div class="bottom">
                <el-button
                  style="width: 100%"
                  type="primary"
                  size="default"
                  :disabled="!isPhone || loginParam.code.length < 6"
                  @click="login"
                  >用户登录</el-button
                >
                <div class="changeScene" @click="changeScene">
                  <p>微信扫码登录</p>
                  <svg
                    t="1693483355689"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6187"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445"
                      p-id="6188"
                    ></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445"
                      p-id="6189"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 场景二：微信扫码登录 -->
            <div class="wechatLogin" v-show="scene == 1">
              <!-- 在这个容器中显示微信扫码登录页面 -->
              <div id="login_container"></div>
              <div class="bottom" @click="changeToPhoneScene">
                <p>手机短信验证码登录</p>
                <svg
                  t="1693491146358"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="14488"
                  width="32"
                  height="32"
                >
                  <path
                    d="M512.1 512.4m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
                    fill="#d81e06"
                    p-id="14489"
                    data-spm-anchor-id="a313x.search_index.0.i20.40ee3a81ByJ8vt"
                    class="selected"
                  ></path>
                  <path
                    d="M619.9 796.8H404.2c-23.8 0-43.3-19.5-43.3-43.3V271.2c0-23.8 19.5-43.3 43.3-43.3h215.7c23.8 0 43.3 19.5 43.3 43.3v482.3c0 23.9-19.5 43.3-43.3 43.3z"
                    fill="#FFFFFF"
                    p-id="14490"
                  ></path>
                  <path
                    d="M623.2 734H401c-7.7 0-13.9-6.2-13.9-13.9V304.7c0-7.7 6.2-13.9 13.9-13.9h222.2c7.7 0 13.9 6.2 13.9 13.9v415.4c0 7.7-6.2 13.9-13.9 13.9z"
                    fill="#d81e06"
                    p-id="14491"
                    data-spm-anchor-id="a313x.search_index.0.i21.40ee3a81ByJ8vt"
                    class="selected"
                  ></path>
                  <path
                    d="M512.1 765.8m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z"
                    fill="#d81e06"
                    p-id="14492"
                    data-spm-anchor-id="a313x.search_index.0.i23.40ee3a81ByJ8vt"
                    class="selected"
                  ></path>
                  <path
                    d="M550.2 474.4c1-0.5 1.4-1.7 0.9-2.7-1.4-3.3-5.7-9.5-17.3-9.5-15.8 0-21.6 5.7-21.6 5.7s-4.1-5.7-21.6-5.7-25.1 23.5-21.3 42.3c4.1 20.2 17.5 39.6 25.9 39.6s10.9-4.6 18-4.6 12.3 4.6 18.3 4.6 13.1-5.2 18-13.4c3.4-5.7 5.3-11.5 6.1-14.6 0.3-1.1-0.3-2.2-1.4-2.6-4.1-1.3-13.1-5.6-13.1-19.2 0.1-13.1 6.2-18.2 9.1-19.9zM532.4 435.2c1.6-0.3 3.1 1 3 2.6-0.3 3.8-1.4 10.3-5.6 15.1-4.2 4.8-10.5 6.8-14.2 7.6-1.6 0.3-3.1-1-3-2.6 0.3-3.8 1.4-10.3 5.6-15.1 4.2-4.9 10.5-6.8 14.2-7.6z"
                    fill="#d81e06"
                    p-id="14493"
                    data-spm-anchor-id="a313x.search_index.0.i22.40ee3a81ByJ8vt"
                    class="selected"
                  ></path>
                  <path
                    d="M522.8 263.5H473c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h49.8c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z"
                    fill="#d81e06"
                    p-id="14494"
                    data-spm-anchor-id="a313x.search_index.0.i24.40ee3a81ByJ8vt"
                    class="selected"
                  ></path>
                  <path
                    d="M548.1 259.5m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0Z"
                    fill="#d81e06"
                    p-id="14495"
                    data-spm-anchor-id="a313x.search_index.0.i26.40ee3a81ByJ8vt"
                    class="selected"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 右侧结构：二维码登录 -->
        <el-col :span="12">
          <div class="rightContent">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code_login_wechat.png" alt="" />
                <svg
                  t="1693483355689"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6187"
                  width="16"
                  height="16"
                >
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#bfbfbf"
                    p-id="6188"
                  ></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#bfbfbf"
                    p-id="6189"
                  ></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>“快速预约挂号”</p>
              </div>
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="" />
                <svg
                  t="1693484064468"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="7720"
                  width="16"
                  height="16"
                >
                  <path
                    d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                    p-id="7721"
                    fill="#bfbfbf"
                  ></path>
                </svg>
                <p>扫一扫下载</p>
                <p>“预约挂号”APP</p>
              </div>
            </div>
            <div class="bottom">
              <h4>xxxxxx官方指定平台</h4>
              <h4>快速挂号 安全放心</h4>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 对话框底部按钮 -->
      <template #footer>
        <div>
          <el-button type="primary" size="default" @click="closeDialog"
            >关闭窗口</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, reactive, computed, watch } from "vue";
// 获取 user 仓库的数据（visiable）可以控制 login 组件的对话框的显示与隐藏
import useUserStore from "@/store/modules/user";
// @ts-ignore
import { User, Lock, CircleClose, CircleCheck } from "@element-plus/icons-vue";
// 引入倒计时组件
import CountDown from "../countdown/index.vue";
import { ElMessage } from "element-plus";
// 引入微信扫码登录参数请求
import { reqWxLogin } from "@/api/hospital";
import type { WxLoginResponseData } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();
// 定义一个响应式数据控制倒计时组件的显示与隐藏
let flag = ref<boolean>(false); // 默认隐藏，flag为真->开启倒计时，flag为假->隐藏倒计时
let userStore = useUserStore();
// 控制两个场景的响应式数据
let scene = ref<number>(0); // 0：代表试机号码登录  1：代表微信扫码登录
// 获取表单按钮
let form = ref<any>();
// 收集表单数据---手机号码
let loginParam = reactive({
  // 收集手机号码
  phone: "",
  // 收集验证码
  code: "",
});
// 通过计算属性验证手机号码格式是否正确
let isPhone = computed(() => {
  // 手机号码正则表达式
  const reg = /^1[3456789]\d{9}$/;
  // 返回布尔值：真代表是手机号码，假代表不是手机号码
  return reg.test(loginParam.phone);
});
// 获取验证码按钮的回调
const getCode = async () => {
  // 解决 element-plus 按钮禁用还能点击的问题
  if (!isPhone.value || flag.value) return;
  // 开启倒计时模式，显示倒计时组件
  flag.value = true;
  // 当点击获取验证码的按钮时，通知 pinia 仓库存储验证码
  try {
    // 获取验证码成功
    await userStore.getCode(loginParam.phone); // 需要在小仓库中定义该方法
    // 直接使用仓库中存储的验证码
    loginParam.code = userStore.code;
  } catch (error) {
    // 获取验证码失败
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};
// 倒计时子组件绑定的自定义事件
// 作用：当倒计时为零的时候，通知父组件隐藏倒计时组件
const getFlag = (value: boolean) => {
  // 倒计时模式结束
  flag.value = value;
};
// 点击用户登录按钮回调
const login = async () => {
  // 当校验规则都通过了才发送请求，会返回一个 Promise
  // 能保证表单校验两项都符合条件
  await form.value.validate();
  // 发起登录请求
  // 登录请求成功：顶部组件需要展示用户名，还要关闭对话框
  // 登录请求失败：弹出对应登录失败的错误信息
  // 调用小仓库中定义的方法，并传递 phone 和 code
  try {
    // 用户登录成功
    await userStore.userLogin(loginParam);
    // 关闭对话框
    userStore.visiable = false;
    // 获取 url 的 query 参数
    let redirect = $route.query.redirect;
    if (redirect) {
      $router.push(redirect as string);
    } else {
      $router.push("/home");
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};
// 自定义手机号码的校验规则
const validatePhone = (rule: any, value: any, callBack: any) => {
  // rule：是表单校验规则对象
  // value：是当前文本的内容
  // callBack：回调函数
  const reg = /^1[3456789]\d{9}$/;
  if (reg.test(value)) {
    // 符合规则就放行
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
};
// 自定义验证码的校验规则
const validateCode = (rule: any, value: any, callBack: any) => {
  // rule：是表单校验规则对象
  // value：是当前文本的内容
  // callBack：回调函数
  const reg = /^\d{6}$/;
  if (reg.test(value)) {
    // 符合规则就放行
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};
// 表单校验规则
const rules = {
  // 表单的自定义校验
  phone: [
    {
      validator: validatePhone,
      message: "手机号码必须是11位",
      trigger: "change",
    },
  ],
  code: [
    { validator: validateCode, message: "验证码必须是6位", trigger: "change" },
  ],
};
// 点击微信扫码登录微信小图标切换登录方式
const changeScene = async () => {
  // 切换为场景1：微信扫码登录
  scene.value = 1;
  // 发起请求获取微信扫码登录的二维码需要的参数
  // 需要向企业的服务器发送请求，获取微信扫码登录页面的参数
  // 参数中还携带一个参数：该参数用于告诉企业服务器，在用户授权成功后重定向到项目的哪一个页面
  let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin"); // 需要进行编码，window.location.origin其含义是：当前页面的域名
  let result: WxLoginResponseData = await reqWxLogin(redirect_URL);
  // 生成微信扫码登录二维码页面
  // @ts-ignore
  new WxLogin({
    self_redirect: true, // true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    id: "login_container", // 显示二维码容器设置，即该容器的 id
    appid: result.data.appid, // 应用位置的唯一标识 appid
    scope: "snsapi_login", // 表示当前微信扫码登录页面已授权
    redirect_uri: result.data.redirectUri, // 填写授权回调域路径，即用户授权成功后，微信服务器向企业后台推送 code 地址
    state: result.data.state, // state 是企业服务器重定向的地址并携带用户信息
    style: "black", // 二维码的样式
    href: "", // 自定义样式的链接
  });
};
// 点击切换手机短信验证码盒子回调
const changeToPhoneScene = () => {
  // 切换为场景2：手机号码登录
  scene.value = 0;
};
// 监听场景的数据
watch(
  () => scene.value,
  (val: number) => {
    // 如果是微信扫码登录场景
    if (val == 1) {
      // 通过仓库来实现 dialog 的关闭
      userStore.queryState(); // 该方法需要在仓库中定义
    }
  }
);
// 关闭窗口按钮的回调
const closeDialog = () => {
  userStore.visiable = false;
};
</script>

<script lang="ts">
export default {
  name: "Login",
};
</script>

<style scoped lang="scss">
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .loginForm {
    padding: 20px;
    border: 1px solid #ccc;
    .phoneLogin {
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        .changeScene {
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            margin: 10px 0 5px;
            cursor: pointer;
          }
        }
      }
    }
    .wechatLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      .bottom {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          margin-bottom: 5px;
        }
      }
    }
  }
  .rightContent {
    padding: 0 10px;
    .top {
      display: flex;
      .item {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          margin-bottom: 5px;
          width: 120px;
        }
        p {
          margin-top: 5px;
          letter-spacing: 1px;
          line-height: 16px;
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      h4 {
        font-size: 18px;
        margin: 20px 0;
      }
    }
  }
}
</style>
