import { useRoute } from 'vue-router';
<template>
  <div class="order">
    <div v-if="$route.query.orderId">
      <OrderDetail />
    </div>
    <div v-else>
      <AllOrders />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
// 引入子组件
import OrderDetail from "./orderDetail/index.vue";
import AllOrders from "./allOrders/index.vue";
// 获取路由对象
let $route = useRoute();
</script>

<style scoped lang="scss"></style>
