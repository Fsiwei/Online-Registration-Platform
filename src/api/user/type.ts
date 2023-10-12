export interface ResponseData {
  code: number;
  message: string;
  data: number;
  ok: boolean;
}
// 提交订单接口返回的数据的 ts 类型
export interface SubmitOrder extends ResponseData {
  data: number;
}

// 订单详情数据的 ts 类型
export interface OrderInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: string;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
// 订单详情接口返回的数据的 ts 类型
export interface OrderResponseData extends ResponseData {
  data: OrderInfo;
}

// 获取二维码接口返回的数据的 ts 类型
export interface PayInfo {
  codeUrl: string;
  orderId: number;
  totalFee: number;
  resultCode: string;
}

export interface Qrcode extends ResponseData {
  data: PayInfo;
}

// 查询支付结果的 ts 数据类型
export interface PayResult extends ResponseData {
  data: boolean;
}

// 代表一个用户信息的数据类型
export interface UserInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  openid: null;
  nickName: null;
  phone: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  certificatesUrl: string;
  authStatus: number;
  status: number;
}

// 获取用户信息接口返回的数据的 ts 类型
export interface UserInfoResponseData extends ResponseData {
  data: UserInfo;
}

// 代表证件类型的数据 ts 类型
export interface CertificationType {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}

export type CertificationArr = CertificationType[];

export interface CertificationTypeResponseData extends ResponseData {
  data: CertificationArr;
}

// 用户认证携带参数的 ts 类型
export interface UserParam {
  certificatesNo: string;
  certificatesType: string;
  certificatesUrl: string;
  name: string;
}

// 代表一个订单的 ts 类型
export interface Order {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: null;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}

export type Records = Order[];

// 获取订单接口数据的 ts 类型
export interface UserOrderInfoResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    hitCount: boolean;
    searchCount: boolean;
    pages: number;
  };
}

// 代表一个就诊人的 ts 类型
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
  name: string;
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
// 全部就诊人的数据 ts 类型
export type AllVisitors = Visitor[];
// 获取全部就诊人的 ts 类型
export interface AllVisitorResponseData extends ResponseData {
  data: AllVisitors;
}

// 订单状态的 ts 类型
export interface OrderState {
  comment: string;
  status: number;
}
// 全部订单状态的 ts 类型
export type AllOrderState = OrderState[];
// 获取全部订单状态码接口返回的数据 ts 类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState;
}

// 新增与修改已有的就诊人参数的数据 ts 类型
export interface AddOrUpdateVisitor {
  id?: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  addressSelected: string[];
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
}
