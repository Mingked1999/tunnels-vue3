<template>
    <div class="search">
        <span>Project Status</span>
        <el-input v-model="keyword" class="searchBar" size="large" placeholder="Type Keyword Here">
        </el-input>
        <el-button class="btn" size="large" type="primary" @click="searchProject" plain>
            Search
        </el-button>
        <el-button class="btn" size="large" type="primary" @click="" plain>
            Add
        </el-button>
    </div>
    <!--Project Table Start-->
    <el-table :data="projectList.projects" 
        :header-cell-style="(headerStyle)" style="width:100%;" scrollbar-always-on>
        <el-table-column prop="name" label="Name"  width="130"/>
        <el-table-column prop="series" label="Series"  width="90"/>
        <el-table-column prop="price" label="Price"  width="100"/>
        <el-table-column prop="destination" label="Destination"  width="125"/>
        <el-table-column prop="duration" label="Duration"  width="110"/>
        <el-table-column :formatter="row => timeFormatter(Number(row.startTime))" prop="startTime" label="StartTime"  width="120"/>
        <el-table-column :formatter="row => timeFormatter(Number(row.endTime))" prop="endTime" label="EndTime"  width="120"/>
        <el-table-column prop="quantity" label="Entries"  width="80"/>
        <el-table-column prop="status" label="Status"  width="100">
            <template #default="scope">
                <el-tag :type="scope.row.status=='1'?'':'success'">
                    <!-- {{scope.row.status=='1'?'In Progress':'Completed'}} -->
                    {{checkStatus(scope.row.status)}}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="Operations" width="150">
            <template #default="scope">
                <el-button size="small" @click="rowUpdate(scope.$index,scope.row)">
                    Edit
                </el-button>
                <el-button size="small" @click="rowDelete(scope.$index,scope.row)" type="danger">
                    Delete
                </el-button>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="remark" label="Remarks" width="auto">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
                <!--Some data are like <p>hobart kinston...</p>, here to remove <p>-->
            </template>
        </el-table-column>
    </el-table>
    <!--Project Table End-->
</template>
<script setup>
import api from '@/api/index.js'
import { onMounted,reactive,ref } from 'vue'
import {timeFormatter} from '@/utils/timeFormatter.js'

const projectList = reactive({
    projects:[]
})
const keyword = ref("")
const fetchProjects = (number) =>{
    api.getProjects({page:number}).then(res=>{
        //console.log(res.data)
        if(res.data.status == 200){
            projectList.projects = res.data.result
        }
    }).catch(err=>{
        console.log(err)
    })
}
onMounted(()=>{
    fetchProjects(1);
})
/**
 * search project contains keyword in name, destination and remarks
 */
const searchProject = () =>{
    //console.log(keyword.value)
    api.searchProjects({keyword:keyword.value}).then(res=>{
        if(res.data.status == 200){
            //console.log(res.data)
            projectList.projects = res.data.result
        }else{
            projectList.projects = []
        }
    }).catch(err=>{
        console.log(err)
    })
}
/**
 * according to status value return specific text
 * @param {*} status 
 */
const checkStatus = (status) =>{
 return status=='1'?'In Progress':'Completed'
}
/**
 * table header styling
 */
const headerStyle = () =>{
    return{
        background:'#dcdcdc',
        color:'#999',
        fontWeight:700
    }
}
/**
 * allow user to update new details of a row
 */
const rowUpdate = (index,row) =>{
    console.log(index,row)
}
/**
 * allow user to delete a record
 */
const rowDelete = (index,row) =>{
    console.log(index,row)
}
</script>
<style scoped>
.search{
    margin-top: .7rem;
    box-sizing: border-box;
    padding: .7rem;
    width: 100%;
    background-color: aliceblue;
}
.search span{
    font-weight: 700;
}
.search .searchBar{
    width: 15vw;
}
</style>