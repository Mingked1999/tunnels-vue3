<template>
  <RouterView />
</template>

<script setup>
  import { RouterView } from 'vue-router'
</script>

<style>
/**global CSS */
body,html,#app{
  height: 100%;
}
.el-menu{
  border-right: 0; /* remove element menu right border */
}
</style>
