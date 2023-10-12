// 此处是要对 axios 函数库进行二次封装（面试高频问题）
/*
你在工作时是否对 axios 进行过二次封装？二次封装的目的？
封装过。
目的：
1.利用axios的请求（例如，在请求拦截器中搞一些携带功能的参数）、响应拦截器功能（例如，可以把服务器返回数据进行简化？、也可以统一处理HTTP网络错误）。
2.利用请求拦截器，一般可在请求头中携带公共的参数，例如，token。
3.响应拦截器，可以简化服务器返回的数据，也能处理 HTTP网络错误。
*/
// axios
import axios from "axios";
import { ElMessage } from "element-plus";
// 引入仓库
import useUserStore from "@/store/modules/user";
// 利用 axios.create 方法创建一个 axios 实例：该实例可以设置基础路径、超时时间等
const request = axios.create({
  baseURL: "/api", // 请求的基础路径的设置
  timeout: 5000, // 超时时间的设置，如果请求超出 5s 请求失败
});

// 为手动创建的 axios 添加请求拦截器和响应拦截器
// 请求拦截器，注入一个回调，config 是配置对象（需要原封不动，否则发不了请求）
request.interceptors.request.use((config) => {
  // 获取用户仓库
  let userStore = useUserStore();
  // 如果有用户的 token ，请求头需要携带 token
  // token：是公共参数。如果用户登录了需要携带参数
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  /* 
    config：请求拦截器回调注入的配置对象
    config 身上最重要一个属性 headers 属性，可以通过请求头携带公共参数，例如， token 
    */
  // 需要原封不动返回 config
  return config; // 未进行简化
});
// 响应拦截器，有两个回调，一个是成功的回调，一个是失败的回调
// 成功的回调一般是使用简化数据，
request.interceptors.response.use(
  (response) => {
    // 响应拦截器成功的回调，一般会进行简化数据
    return response.data; // 因为 axios 的 response 中的 data 才是开发想要的数据  // 未进行简化
  },
  (error) => {
    // 处理 HTTP 网路错误
    let status = error.response.status;
    switch (status) {
      case 404:
        //错误提示信息
        ElMessage({
          type: "error",
          message: "请求失败路径出现问题",
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: "error",
          message: "服务器挂了",
        });
        break;
      case 401:
        ElMessage({
          type: "error",
          message: "参数有误",
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

// 必须对外暴露 axios ，否则其他文件无法使用
export default request;
// 拿到接口的数据要展示，需要配置代理跨域
