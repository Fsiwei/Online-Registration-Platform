// 定义首页模块的 ts 数据类型
// 将服务器返回的数据中常见的数据定义为一个接口（例如，code、data、message、ok等）
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 代表已有的医院数据的 ts 类型
export interface Hospital {
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
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
}

// 存储全部已有医院的数据类型
export type Content = Hospital[];

// 获取已有医院接口返回的数据 ts 类型
export interface HospitalResponseData extends ResponseData {
  // 必须继承，因为接口返回的字段有code、data、message、ok、
  // 此处只需定义 ResponseData 中没有定义的类型即可
  data: {
    content: Content[];
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  };
}

// 代表医院等级或者地区数据 ts 类型
export interface HospitalLevelAndRegion {
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
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[];

// 获取医院等级或地区接口返回的数据
export interface HospitalLevelAndRegionResponseData extends ResponseData {
  data: HospitalLevelAndRegionArr;
}

export interface HospitalInfo extends ResponseData {
  data: Content;
}