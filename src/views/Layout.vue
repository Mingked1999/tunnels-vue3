<template>
    <div class="tunnel-layout">
        <DashSlider/>
        <div class="dash-content" :style="{marginLeft:sliderStore.isCollapse?'2.4vw':'12.7vw'}">
            <DashNav/>
            <div class="views">
                <router-view></router-view>
            </div>
        </div>
    </div>
   
</template>
<script setup>
import { useSliderStore } from '@/stores/sliderControl.js'
const sliderStore = useSliderStore();
</script>
<style scoped>
.dash-content{
    transition: 0.3s ease-in;
}
.views{
    padding-left: 5vw;
    height: auto;
}
</style>