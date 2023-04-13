<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
// 路由中添加key解决切换路由時頁面不展示内容，刷新後才展示内容问题
// const route = useRoute();
// const key = computed(() => {
//   console.log(`${route.path} + ${Math.random()}`);
//   return route.path + Math.random();
// });

</script>
<template>
  <RouterView />
</template>

<style lang="scss">
// Main Stylesheet
@import "@/assets/scss/main";

// All color themes are included and available by default
// Feel free to comment out any of them if you won't use them in your project
@import "@/assets/scss/oneui/themes/amethyst";
@import "@/assets/scss/oneui/themes/city";
@import "@/assets/scss/oneui/themes/flat";
@import "@/assets/scss/oneui/themes/modern";
@import "@/assets/scss/oneui/themes/smooth";
</style>
