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
import { useLoginStore } from '@/stores/loginStore.js'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import permitted from '../router/onlyPermited.js'

const sliderStore = useSliderStore();
const loginStore = useLoginStore();
const router = useRouter();

onMounted(()=>{
    if(loginStore.permission=='admin'){ 
    //only when access level is admin to add work to routing config
        router.addRoute('layout',permitted)
    }
})
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