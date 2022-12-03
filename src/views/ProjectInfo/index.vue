<template>
    <el-table :data="projectList.projects" style="width:100%;">
        <el-table-column prop="name" label="Name"  width="180"/>
        <el-table-column prop="series" label="Series"  width="110"/>
        <el-table-column prop="price" label="Price"  width="100"/>
        <el-table-column prop="destination" label="Destination"  width="165"/>
        <el-table-column prop="duration" label="Duration"  width="90"/>
        <el-table-column prop="startTime" label="StartTime"  width="180"/>
        <el-table-column prop="endTime" label="EndTime"  width="180"/>
        <el-table-column prop="quantity" label="Entries"  width="80"/>
        <el-table-column prop="status" label="Entries"  width="80"/>
        <el-table-column show-overflow-tooltip prop="remark" label="Entries" width="480"/>
    </el-table>
</template>
<script setup>
import api from '@/api/index.js'
import { onMounted,reactive } from 'vue'

const projectList = reactive({
    projects:[]
})
onMounted(()=>{
    api.getProjects({page:1}).then(res=>{
        //console.log(res.data)
        if(res.data.status == 200){
            projectList.projects = res.data.result
        }
    }).then(err=>{
        console.log(err)
    })
})
</script>
<style scoped>
</style>