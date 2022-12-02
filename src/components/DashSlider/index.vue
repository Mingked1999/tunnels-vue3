<template>
    <div class="panel-base" :style="{width:sliderStore.isCollapse?'14px':'240px'}">
        <el-menu 
        background-color="#222222" text-color="#F9F9F9" 
        active-text-color="#D4ADCF" :default-active="active" 
        :collapse="sliderStore.isCollapse"
        class="slider-vertical" router>
            <div class="logo">
                {{sliderStore.isCollapse?'DMK':'TUNNELS'}}
            </div>
            <el-menu-item index="/">
                <el-icon><HomeFilled /></el-icon>
                <span>HOME</span>
            </el-menu-item>
            <el-menu-item index="/project">
                <el-icon><DocumentCopy /></el-icon>
                <span>Project Intro</span>
            </el-menu-item>
            <el-menu-item index="/tunnel">
                <el-icon><DataLine /></el-icon>
                <span>Tunnel Design</span>
            </el-menu-item>
            <el-menu-item index="/work">
                <el-icon><Guide /></el-icon>
                <span>Work Supervision</span>
            </el-menu-item>
            <el-menu-item index="/quality">
                <el-icon><Monitor /></el-icon>
                <span>Quality Control</span>
            </el-menu-item>
            <el-menu-item index="/geoprocast">
                <el-icon><Location /></el-icon>
                <span>Geologic Procast</span>
            </el-menu-item>
            <el-menu-item index="/system">
                <el-icon><Histogram /></el-icon>
                <span>System Details</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script setup>
import {ref} from 'vue';
import { useSliderStore } from '@/stores/sliderControl.js'

const active = ref('/'); //slider keywords highlight as the user is switching between tabs
const sliderStore = useSliderStore();
//when user refresh webpage, routing path may lost -> breadcrumb and slider highlight not matched
if(localStorage.getItem('sliderKey')){
    active.value = localStorage.getItem('sliderKey')
}
</script>
<style scoped>
.slider-vertical{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 0 1rem 1rem 0;
    transition: .3s ease-in;
}
.logo{
    width:100%;
    height: 8vh;
    text-align: left;
    font-size: 1rem;
    color:#F9F9F9;
    line-height: 4.5rem;
    padding: .6rem;
    
}
</style>
