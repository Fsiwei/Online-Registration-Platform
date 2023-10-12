// 小仓库
// defineStore 函数用于定义小仓库的方法
import { defineStore } from "pinia";
import { reqHospitalDetial, reqHospitalDeparment } from "@/api/hospital/index";
// 引入详情数据的 ts 类型
import type {HospitalDetailResponse, DeparmentResponseData, DeparmentArr, HospitalDetail} from "@/api/hospital/type";
// 引入详情数据的 ts 类型
import type {DetailState} from "./interface";
// pinia 仓库写法：组合式API、选择式API
// defineStore 函数：第一个参数是仓库名称，第二个参数是一个对象
const useDetailStore = defineStore("Detail", {
  state: (): DetailState => {
    // 存储数据的地方，与vuex有区别，pinia 中 state是箭头函数
    return {// 需要定义返回对象的数据类型
        // 医院详情的数据
        hospitalInfo: ({} as HospitalDetail), // 断言
        deparmentArr:([] as DeparmentArr), // 要定义 ts 类型
    }; // 返回的数据必须是一个对象，且作为仓库中的数据
  },
  actions: {
    // 获取医院详情的方法
    async getHospital(hoscode: string) {
      let result: HospitalDetailResponse = await reqHospitalDetial(hoscode);
      if(result.code == 200){
        this.hospitalInfo = result.data;
      }
    },
    // 获取某个医院科室的方法
    async getDeparment(hoscode: string) {
      let result: DeparmentResponseData = await reqHospitalDeparment(hoscode);
      if(result.code == 200){
        // 存储的数据是科室
        this.deparmentArr = result.data; // 需要在小仓库中写入该字段
      }
    }
  },
  getters: {},
});
// 获取仓库的方法对外暴露，这样组件才能拿到仓库中的数据
export default useDetailStore;
