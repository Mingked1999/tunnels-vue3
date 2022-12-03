<template>
    <div class="tunnel-layout">
        <Setting @onLogoSwitch="getLogoToggle"/>
        <DashSlider :logoToggle="logoToggle"/>
        <div class="dash-content" :style="{marginLeft:sliderStore.isCollapse?'3.7vw':'12.7vw'}">
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
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import permitted from '../router/onlyPermited.js'

const sliderStore = useSliderStore();
const loginStore = useLoginStore();
const router = useRouter();
const logoToggle = ref(false)
onMounted(()=>{
    if(loginStore.permission=='admin'){ 
    //only when access level is admin to add work to routing config
        router.addRoute('layout',permitted)
    }
})
const getLogoToggle = (data) =>{
    //console.log(data)
    logoToggle.value = data
}
</script>
<style scoped>
.dash-content{
    transition: 0.3s ease-in;
}
.views{
    padding-left: 1.05vw;
    height: auto;
}
</style>