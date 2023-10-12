<template>
  <div class=""></div>
</template>

<script setup lang="ts">
import { SET_TOKEN } from "@/utils/user";
// 获取用户信息
import { useRoute } from "vue-router";
// 获取路由对象
let $router = useRoute();

// 持久化存储用户信息
SET_TOKEN(JSON.stringify($router.query));

// 此路由的代码执行，意味着微信扫码登录授权成功，已获取用户信息
// 将 iframe 中的 HTML 页面隐藏
// 获取静态页面
let html: any = document.querySelector("html");
// 隐藏 iframe 中的静态页面
html.style.display = "none";
</script>

<style scoped lang="scss"></style>
