<template>
    <div class="nav-container" >
        <div class="toggle-menu">
            <div class="toggle-menu-toggle">
                <!--if true display, otherwise display another one-->
                <el-icon v-if="sliderStore.isCollapse" class="icon" @click="openSlider(false)" >
                    <Expand/>
                </el-icon>
                <el-icon v-else class="icon" @click="closeSlider(true)">
                    <Fold/>
                </el-icon>
            </div>
        </div>
        <div class="toggle-menu-breadcrumb">
            <el-breadcrumb>
                <el-breadcrumb-item>Present</el-breadcrumb-item>
                <el-breadcrumb-item>{{sliderStore.breadCrumb}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{loginStore.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <router-link to="/profile">
                                Profile
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logout">Logout</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { useLoginStore } from '@/stores/loginStore.js'
import { useSliderStore } from '@/stores/sliderControl.js' //store collapse condition in pinia/vuex
import { useRouter } from 'vue-router';
const loginStore = useLoginStore();
const sliderStore = useSliderStore();
const router = useRouter();
/**
 * clear local storage so that logout user
 */
const logout = () =>{
    loginStore.token = ""
    loginStore.permission = ""
    loginStore.username = ""
    router.push('/login')
}
/**
 * @param {false} flag 
 * according to pinia slider value to collapse or open the slider
 */
const closeSlider = (flag) =>{
    sliderStore.isCollapse = flag //false passed in
}
const openSlider = (flag) =>{
    sliderStore.isCollapse = flag
}
</script>

<style scoped>
.nav-container{
    height: auto;
    height: 8vh;
    background-color: #ffffff;
    padding-left: 3vw;
}
.toggle-menu{
    padding-top: .7rem;
}
.icon{
    font-size: 2rem;
}
.toggle-menu-breadcrumb{
    float: left;
    line-height: 8vh;
    margin-top:.45rem;
    margin-left: 1.2rem;
}
.toggle-menu-toggle{
    float: left;
}
.user{
    font-size: 1.2rem;
    position: absolute;
    right: 1rem;
    top:1rem ;
}
</style>