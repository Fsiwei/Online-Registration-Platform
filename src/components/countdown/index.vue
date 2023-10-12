<template>
  <div class="countdowm">
    <span>获取验证码（{{ time }}）</span>
  </div>
</template>

<script setup lang="ts">
// 引入组合式 API 函数 ref
import { ref, watch } from "vue";
// 倒计时的事件
let time = ref<number>(60);

// 监听父组件传递过来的 props 数据的变化，以及相应的回调
watch(
  () => props.flag,
  () => {
    // 开启定时器
    let timer = setInterval(() => {
        time.value--;
        if(time.value == 0){
            // 通知父组件倒计时模式结束
            $emit('getFlag', false);
            // 清除定时器
            clearInterval(timer);
        }
    }, 1000);
  },
  {
    immediate: true, // 组件一挂载立即开启监听
  }
);

// 需要父组件通过 props 将 flag 传递给子组件，让子组件来监听 flag 值的变化
// 接受 flag
let props = defineProps(["flag"]);
let $emit = defineEmits(["getFlag"]);
</script>

<script lang="ts">
export default {
  name: "CountDown",
};
</script>

<style scoped lang="scss"></style>
