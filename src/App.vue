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
.el-dialog__header{
    background-color:#00005C ;
    margin-right: 0 !important;
}
.el-dialog__header span{
    color: #FBFACD;
}


</style>
