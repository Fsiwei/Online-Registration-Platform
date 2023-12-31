export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 代表医院详情的数据
export interface HospitalDetail {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: string;
    route: string;
    status: number;
    bookingRule: null;
  };
}

// 获取医院详情返回数据 ts
export interface HospitalDetailResponse extends ResponseData {
  data: HospitalDetail;
}

// 代表某个医院科室的数据
export interface Deparment {
  depcode: string;
  depname: string;
  children?: Deparment[];
}

// 代表存储科室数组类型
export type DeparmentArr = Deparment[];

// 获取某个医院科室的返回数据 ts
export interface DeparmentResponseData extends ResponseData {
  data: DeparmentArr;
}

// 用户登录接口需要携带参数类型
export interface LoginData {
  phone: string;
  code: string;
}

// 登录接口返回的用户信息数据的类型
export interface UserInfo {
  name: string;
  token: string;
}

// 登录接口返回的数据的 ts 类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo;
}

// 定义微信扫码登录返回的数据的 ts 类型
export interface WxLogin {
  redirectUri: string;
  appid: string;
  scope: string;
  state: string;
}

export interface WxLoginResponseData extends ResponseData {
  data: WxLogin;
}

// 医院科室的可预约数据
export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}
export interface WorkData {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: number;
}

export type BookingScheduleList = WorkData[];

export interface HospitalWorkData extends ResponseData {
  data: {
    total: number;
    bookingScheduleList: BookingScheduleList;
    baseMap: BaseMap;
  };
}

// 代表一个医生的数据
export interface Doctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

// 数组包含全部医生
export type DocArr = Doctor[];

// 获取医生排班接口返回的数据
export interface DoctorResponseData extends ResponseData {
  data: DocArr;
}

// 代表一个就诊人数据的 ts 类型
export interface Visitor {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    certificatesTypeString: string;
    contactsCertificatesTypeString: string;
    cityString: null;
    fullAddress: string;
    districtString: null;
    provinceString: null;
  };
  userId: number;
  name: number;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  provinceCode: null;
  cityCode: null;
  districtCode: null;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  isInsure: number;
  cardNo: null;
  status: string;
}
export type VisitorArr = Visitor[];
export interface VisitorResponseData extends ResponseData {
  data: VisitorArr;
}

// 获取某个挂号医生数据
export interface DoctorInfoData extends ResponseData {
  data: Doctor;
}
