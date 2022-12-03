<template>
    <div class="card">
        <div class="box">
            <el-icon class="icon"><Monitor /></el-icon>
            <span class="title">Tunnel Number 1234</span>
        </div>
        <div class="box">
            <el-icon class="icon"><DocumentChecked /></el-icon>
            <span class="title">Qualified Number 999</span>
        </div>
        <div class="box">
            <el-icon class="icon"><DataLine /></el-icon>
            <span class="title">In Progress 235</span>
        </div>
        <div class="box">
            <el-icon class="icon"><DataAnalysis /></el-icon>
            <span class="title">Procasting 9999</span>
        </div>
    </div>
    <div class="chart" id="tunnel">
    </div>
</template>
<script setup>
import { getCurrentInstance,onMounted } from 'vue';
import api from '@/api/index.js';
const {proxy} = getCurrentInstance()

onMounted(()=>{
    api.getLines().then(res=>{
        //console.log(res.data.result.lines)
        if(res.data.status == 200){
            proxy.$chart("tunnel",res.data.result.lines)
            //loading chart when DOM rendered
        }
    }).catch(err=>{
        console.log(err)
    })
    
   
})
</script>
<style scoped>
.card{
    display: flex;
    width: auto;
}
.card .box{
    flex: 1; /**size average */
    height:15vh;
    margin: .6rem;
    padding: .6rem;
    background-color: #ffffff;
}
/**first card has no left margin, last card has no right margin */
.card .box:nth-child(1){
    margin-left: 0;
}
.card .box:nth-child(4){
    margin-right: 0;
}
.box .icon{
    font-size: 3.4rem;
    line-height: 17vh;
    float: left;
    padding-left: 1.2rem;
    color: rgb(139, 203, 203);
}
.box .title{
    width: 60%;
    display: block;
    font-size: 1.4rem;
    line-height: 5vh;
    float: right;
    /* padding-right: 1.2rem; */
}
.chart{
    width: 100%;
    height: 40vh;
    background-color: #ffffff;
    margin-left: .5vw;
}
</style>