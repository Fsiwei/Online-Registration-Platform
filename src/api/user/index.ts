// 引入二次封装的 axios
import request from "@/utils/request";
import {
  SubmitOrder,
  OrderResponseData,
  Qrcode,
  PayResult,
  UserInfoResponseData,
  CertificationTypeResponseData,
  UserParam,
  UserOrderInfoResponseData,
  AllVisitorResponseData,
  AllOrderStateResponseData,
  AddOrUpdateVisitor,
} from "./type";
// 枚举地址
enum API {
  // 提交订单（创建订单），获取订单号码接口
  SUBMITORDER_URL = "/order/orderInfo/auth/submitOrder",
  // 获取订单详情的数据
  GETORDERINFO_URL = "/order/orderInfo/auth/getOrderInfo/",
  // 取消订单接口
  CANCELORDER_URL = "/order/orderInfo/auth/cancelOrder/",
  // 获取支付订单二维码接口
  QRCODE_URL = "/order/weixin/createNative/",
  // 查询订单支付的结果
  PAYRESULT_URL = "/order/weixin/queryPayStatus/",
  // 获取当前账号用户信息
  USERINFO_URL = "/user/auth/getUserInfo",
  // 获取证件的类型的接口地址
  CERTIFICATIONTYPE_URL = "/cmn/dict/findByDictCode/",
  // 用户认证的结构
  USERCERTATION_URL = "/user/auth/userAuah",
  // 获取用户订单号的数据
  USERORDERINFO_URL = "/order/orderInfo/auth/",
  // 获取全部就诊人信息
  ALLVISITORS_URL = "/user/patient/auth/findAll",
  // 获取订单状态
  ORDERSTATE_URL = "/order/orderInfo/auth/getStatusList",
  // 获取城市的数据
  CITY_URL = "/cmn/dict/findByParentId/",
  // 新增就诊人接口
  ADDVISITOR_URL = "/user/patient/auth/save",
  // 更新就诊人接口
  UPDATEVISITOR_URL = "/user/patient/auth/update",
  // 删除就诊人接口
  DELETEVISITOR_URL = "/user/patient/auth/remove/",
}

// 提交订单
export const reqSubmitOrder = (
  hoscode: string,
  scheduleId: string,
  patientId: number
) =>
  request.post<any, SubmitOrder>(
    API.SUBMITORDER_URL + `/${hoscode}/${scheduleId}/${patientId}`
  );

// 获取订单详情的方法
export const reqOrderInfo = (id: string) =>
  request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id);

// 取消订单的方法
export const reqCancelOrder = (id: string) =>
  request.get<any, any>(API.CANCELORDER_URL + id);

// 获取支付二维码接口
export const reqQrcode = (orderId: string) =>
  request.get<any, Qrcode>(API.QRCODE_URL + orderId);

// 查询订单支付的结果
export const reqQueryPayState = (orderId: string) =>
  request.get<any, PayResult>(API.PAYRESULT_URL + orderId);

// 获取当前用户信息的接口
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL);

export const reqCertificationType = (CertificationType = "CertificatesType") =>
  request.get<any, CertificationTypeResponseData>(
    API.CERTIFICATIONTYPE_URL + CertificationType
  );

// 用户认证接口
export const reqUserCertion = (data: UserParam) =>
  request.post<any, any>(API.USERCERTATION_URL, data);

// 用户订单号的接口
// 其中 patientId & orderStatus 是 query 参数，且可有可无，即发起请求是这两个参数不是必须携带的
export const reqUserOrderInfo = (
  page: number,
  limit: number,
  patientId: string,
  orderStatus: string
) =>
  request.get<any, UserOrderInfoResponseData>(
    API.USERORDERINFO_URL +
      `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
  );

// 获取全部就诊人信息的接口
export const reqAllVisitors = () =>
  request.get<any, AllVisitorResponseData>(API.ALLVISITORS_URL);

// 获取订单状态的接口
export const reqOrderState = () =>
  request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL);

// 获取城市的数据
export const reqGetCity = (parentId: string) =>
  request.get<any, any>(API.CITY_URL + parentId);

// 新增或更新就诊人接口
export const reqAddOrUpdateVisitor = (data: AddOrUpdateVisitor) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEVISITOR_URL, data);
  } else {
    return request.post<any, any>(API.ADDVISITOR_URL, data);
  }
};

// 删除就诊人接口
export const reqDeleteVisitor = (id: number) =>
  request.delete<any, any>(API.DELETEVISITOR_URL + id);
