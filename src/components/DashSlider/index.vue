<template>
    <div class="panel-base">
        <el-menu 
        background-color="#7785AC" text-color="#A5E6BA" 
        active-text-color="#D4ADCF" :default-active="active" 
        class="slider-vertical" router>
            <div class="logo">Tunnel Project</div>
            <el-menu-item index="/">
                <span>HOME</span>
            </el-menu-item>
            <el-menu-item index="/project">
                <span>Project Intro</span>
            </el-menu-item>
            <el-menu-item index="/tunnel">
                <span>Tunnel Design</span>
            </el-menu-item>
            <el-menu-item index="/work">
                <span>Work Supervision</span>
            </el-menu-item>
            <el-menu-item index="/quality">
                <span>Quality Control</span>
            </el-menu-item>
            <el-menu-item index="/geoprocast">
                <span>Geologic Procast</span>
            </el-menu-item>
            <el-menu-item index="/system">
                <span>System Details</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script setup>
import {ref} from 'vue';
const active = ref('/')
</script>
<style scoped>
.slider-vertical{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 20vw;
}
.logo{
    width:100%;
    height: 10vh;
    background-color: #344D67;
    text-align: center;
    font-size: 1.8rem;
    color:#A5E6BA;
    line-height: 4.5rem;
}
</style>
