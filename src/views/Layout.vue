<template>
    <div class="tunnel-layout">
        <DashSlider/>
        <div class="dash-content">
            <router-view></router-view>
        </div>
    </div>
   
</template>
<script setup>
//import DashSlider from '@/components/DashSlider/index.vue'
</script>
<style scoped>
.dash-content{
    margin-left: 20vw;
    padding: 1rem;
}
</style>