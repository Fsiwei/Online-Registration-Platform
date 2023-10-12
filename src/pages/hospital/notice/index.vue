<template>
  <div class="notice">
    <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号须知</h1>
    <div class="content">
      <div class="tip">为方便您早日康复，请您认真阅读预约挂号须知：</div>
      <div class="guide">
        <div class="real_name">
          <h4>一、预约实名制</h4>
          <p>
            统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名，有效证件（身份证、护照）、性别、手机号码、社保卡号等基本信息。
          </p>
        </div>
        <div class="register">
          <h4>二、预约挂号</h4>
          <p>按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
          <p>
            在统一自然日，同一医院，同一科室，同一就诊单位，同一就诊人，可以预约最多1个号源；<br />
            在统一自然周，同一就诊人，可以预约最多8个号源；<br />
            在统一自然月，同一就诊人，可以预约最多12个号源；<br />
            在统一自然季度，同一就诊人，可以预约最多24个号源。
          </p>
        </div>
        <div class="cancel">
          <h4>三、取消预约</h4>
          <p>
            已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。
          </p>
        </div>
        <div class="handler">
          <h4>四、爽约处理</h4>
          <p>
            如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：
          </p>
          <p>
            累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；<br />
            累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入医院详情仓库的数据
import useDetailStore from "@/store/modules/hospitalDetail";
// 获取数据
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.notice {
  margin: 0 20px;
  h1 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
  }
  .content {
    .tip {
      font-size: 14px;
      color: #777;
      margin-bottom: 20px;
    }
    .guide {
      h4 {
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 20px;
        font-size: 14px;
        color: #777;
        letter-spacing: 2px;
        line-height: 20px;
      }
    }
  }
}
</style>
