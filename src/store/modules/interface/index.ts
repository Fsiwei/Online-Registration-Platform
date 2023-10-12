// 引入已经定义好的 ts 类型
import type {
  HospitalDetail,
  DeparmentArr,
  UserInfo,
} from "@/api/hospital/type";

// 定义仓库内部存储数据 state 的 ts 类型
export interface DetailState {
  hospitalInfo: HospitalDetail;
  deparmentArr: DeparmentArr;
}

// 定义用户仓库中 state 数据的 ts 类型
export interface UserState {
  visiable: boolean; // 用于控制登录组件的 dialog 的显示与隐藏
  code: string; // 用户验证码
  userInfo: UserInfo; // 用户信息
}
