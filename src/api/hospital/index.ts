// 引入二次封装的 axios
import request from "@/utils/request";
import type {
  HospitalDetailResponse,
  DeparmentResponseData,
  LoginData,
  UserLoginResponseData,
  WxLoginResponseData,
  HospitalWorkData,
  DoctorResponseData,
  VisitorResponseData,
  DoctorInfoData,
} from "./type";

// 枚举请求地址
enum API {
  // 医院详情接口
  HOSPITALDETAIL_URL = "/hosp/hospital/",
  // 获取某个医院科室的数据
  HOSPITALDEPARMENT_URL = "/hosp/hospital/department/",
  // 获取手机验证码接口
  GRTUSERCODE_URL = "/sms/send/",
  // 用户登录接口
  USERLOGIN_URL = "/user/login",
  // 获取微信扫码登录需要的参数
  WXLOGIN_URL = "/user/weixin/getLoginParam/",
  // 获取某个医院的某个科室预约挂号数据
  HOSPITALWORK_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  // 获取医院某个科室某天相应医生排班的数据
  HOSPITALDOCTOR_URL = "/hosp/hospital/auth/findScheduleList/",
  // 获取某个账号下的所有就诊人信息
  GETVISITOR_URL = "/user/patient/auth/findAll",
  // 获取挂号医生信息
  GETDOCTOR_URL = "/hosp/hospital/getSchedule/",
}
// 获取医院详情的接口
export const reqHospitalDetial = (hoscode: string) =>
  request.get<any, HospitalDetailResponse>(API.HOSPITALDETAIL_URL + hoscode);

// 获取某个医院科室的接口
export const reqHospitalDeparment = (hoscode: string) =>
  request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);

// 获取手机验证码接口
export const reqUserCode = (phone: string) =>
  request.get<any, any>(API.GRTUSERCODE_URL + phone);

// 获取用户登录接口
export const reqUserLogin = (data: LoginData) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

// 获取微信扫码登录生成二维码需要的参数接口
export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, WxLoginResponseData>(
    API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );

export const reqHospitalWork = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  request.get<any, HospitalWorkData>(
    API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`
  );

// 获取医生排班的数据
export const reqHospitalDoctor = (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  request.get<any, DoctorResponseData>(
    API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`
  );

// 获取某个账号下所有就诊人信息
export const reqGetVisitor = () =>
  request.get<any, VisitorResponseData>(API.GETVISITOR_URL);

// 获取挂号医生信息
export const reqGetDoctorInfo = (scheduleId: string) =>
  request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId);
