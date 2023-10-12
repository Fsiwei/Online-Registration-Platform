// 定义用户相关的仓库
// 定义小仓库
import { defineStore } from "pinia";

// 引入获取验证码的请求方法
import { reqUserCode, reqUserLogin } from "@/api/hospital";

import type { LoginData, UserLoginResponseData } from "@/api/hospital/type";

import type { UserState } from "./interface";

import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      visiable: false, // 用于控制登录组件的 dialog 的显示与隐藏
      code: "", // 存储用户验证码
      userInfo: JSON.parse(GET_TOKEN() as string) || {}, // 存储用户信息，本地存储有就从本地存储中取出，没有就赋值空对象
    };
  },
  actions: {
    async getCode(phone: string) {
      // 向服务器携带手机号码，获取验证码
      let result: any = await reqUserCode(phone);
      if (result.code == 200) {
        this.code = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 用户手机号码登录方法
    async userLogin(loginData: LoginData) {
      // 登录请求
      let result: UserLoginResponseData = await reqUserLogin(loginData);
      if (result.code == 200) {
        this.userInfo = result.data;
        // 本地存储持久化存储用户数据
        SET_TOKEN(JSON.stringify(this.userInfo));
        // 返回一个成功的 Ptomise
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 定义退出登录的方法
    loginOut() {
      // 清除仓库中用户相关的信息
      this.userInfo = { name: "", token: "" };
      // 清空本地存储的用户信息
      REMOVE_TOKEN();
    },
    // 查询微信扫码登录的接口（查看本地存储是否存储数据）
    queryState() {
      // 开启定时器每隔一段时间询问一次：本地存储是否拥有用户信息
      let timer = setInterval(() => {
        // 如果本地存储已经有数据，即扫码成功
        if (GET_TOKEN()) {
          // 关闭 dialog
          this.visiable = false;
          // 将用户信息存入仓库
          this.userInfo = JSON.parse(GET_TOKEN() as string);
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  getters: {},
});

export default useUserStore;
