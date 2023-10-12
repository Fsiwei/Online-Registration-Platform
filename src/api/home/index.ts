// 封装首页的所有请求 统一管理首页模块接口

// 引入二次封装的 axios
import request from "@/utils/request";

// 引入定义好的 ts 类型，已有医院接口返回的数据，医院等级或地区接口返回的数据
import type {HospitalResponseData, HospitalLevelAndRegionResponseData, HospitalInfo} from './type'

// 通过枚举管理首页模块的接口地址
enum API {
    // 获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    // 获取医院的等级与地区的接口
    HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
    // 根据关键字医院的名字获取数据
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/',
}

// 获取医院的数据 <any, HospitalResponseData> 约束接口返回的数据类型 
// 此处的 hostype 和 districtCode 需要传递给父组件（即 Level 和 Region 的父组件）home/index.vue 组件
export const reqHospital = (page: number, limit: number, hostype='', districtCode='') => request.get<any, HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}/?hostype=${hostype}&districtCode=${districtCode}`);

// 获取医院的等级 或 地区的数据
export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any, HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL+`${dictCode}/`);

export const reqHospitalInfo = (hosname: string) => request.get<any, HospitalInfo>(API.HOSPITALINFO_URL+`${hosname}/`);