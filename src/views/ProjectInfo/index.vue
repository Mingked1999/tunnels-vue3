<template>
    <!--Search Bar Start-->
    <div class="search">
        <span>Project Status</span>
        <el-input v-model="keyword" class="searchBar" size="large" placeholder="Type Keyword Here">
        </el-input>
        <el-button class="btn" size="large" type="primary" @click="searchProject" plain>
            Search
        </el-button>
        <el-button class="btn" size="large" type="primary" @click="createVisible = true" plain>
            Add
        </el-button>
    </div>
    <!--Search Bar end-->

    <!--Project Table Start-->
    <el-table :data="projectList.projects" 
        :header-cell-style="(headerStyle)" style="width:100%;" scrollbar-always-on>
        <el-table-column prop="name" label="Name"  width="130"/>
        <el-table-column prop="series" label="Series"  width="90"/>
        <el-table-column prop="costs" label="Costs"  width="100"/>
        <el-table-column prop="location" label="Location"  width="125"/>
        <el-table-column prop="duration" label="Duration"  width="110"/>
        <el-table-column :formatter="row => timeFormatter(Number(row.startTime))" prop="startTime" label="StartTime"  width="120"/>
        <el-table-column :formatter="row => timeFormatter(Number(row.endTime))" prop="endTime" label="EndTime"  width="120"/>
        <el-table-column prop="quantity" label="Sites"  width="80"/>
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
                <el-button size="small" @click="rowEdit(scope.$index,scope.row)">
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
    
    <!--Pagination Start-->
    <div class="paging">
        <el-pagination background lauout="prev,pager,next" :total="total" @current-change="pageSwitch"/>
    </div>
    <!--Pagination End-->

    <!--Dialog/Modal Start: Add Project-->
    <el-dialog v-model="createVisible" title="NEW PORJECT" width="60%" center>
        <el-form inline :model="projectTemp">
            <el-form-item label="NAME">
                <el-input v-model="projectTemp.name" placeholder="Project Name"/>
            </el-form-item>
            <el-form-item label="SERIES">
                <el-input v-model="projectTemp.series" placeholder="Series Number"/>
            </el-form-item>
            <el-form-item label="COSTS">
                <el-input-number v-model="projectTemp.costs" placeholder="Estimated Costs"/>
            </el-form-item>
            <el-form-item label="LOCATION">
                <el-input v-model="projectTemp.location" placeholder="Working Location"/>
            </el-form-item>
            <el-form-item label="Duration">
                <el-input-number v-model="projectTemp.duration" placeholder="How Long"/>
            </el-form-item>
            <el-form-item label="StartTime">
                <!-- <el-input v-model="projectTemp.startTime" placeholder="Start Time"/> -->
                <el-date-picker v-model="projectTemp.startTime" type="date" placeholder="Start Time" value-format="x"/>
            </el-form-item>
            <el-form-item label="EndTime">
                <!-- <el-input v-model="projectTemp.endTime" placeholder="End Time"/> -->
                <el-date-picker v-model="projectTemp.endTime" type="date" placeholder="End Time" value-format="x"/>
            </el-form-item>
            <el-form-item label="SITES">
                <el-input-number v-model="projectTemp.quantity" placeholder="Passing Sites"/>
            </el-form-item>
            <el-form-item label="STATUS">
                <el-select v-model="projectTemp.status" placeholder="Is Finished ?" size="large">
                    <el-option v-for="item in isFinished" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <!-- <el-input v-model="projectTemp.status" placeholder="Is Finished ?"/> -->
            </el-form-item>
            <el-form-item label="REMARKS">
                <!-- <el-input v-model="projectTemp.remark" placeholder="Some Notes"/> -->
                <TinyMCE @writeRemark="remarkHandle" :options="options"/>
            </el-form-item>
           
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitProject">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!--Dialog/Modal end-->

    <!--Dialog Editing Start-->
    <el-dialog v-model="editorVisible" title="EDITING" width="60%" center destroy-on-close>
        <el-form inline :model="projectEditing">
            <el-form-item label="NAME">
                <el-input v-model="projectEditing.name"/>
            </el-form-item>
            <el-form-item label="SERIES">
                <el-input v-model="projectEditing.series"/>
            </el-form-item>
            <el-form-item label="COSTS">
                <el-input-number v-model="projectEditing.costs"/>
            </el-form-item>
            <el-form-item label="LOCATION">
                <el-input v-model="projectEditing.location"/>
            </el-form-item>
            <el-form-item label="Duration">
                <el-input-number v-model="projectEditing.duration"/>
            </el-form-item>
            <el-form-item label="StartTime">
                <!-- <el-input v-model="projectTemp.startTime" placeholder="Start Time"/> -->
                <el-date-picker v-model="projectEditing.startTime" type="date" value-format="x"/>
            </el-form-item>
            <el-form-item label="EndTime">
                <!-- <el-input v-model="projectTemp.endTime" placeholder="End Time"/> -->
                <el-date-picker v-model="projectEditing.endTime" type="date" value-format="x"/>
            </el-form-item>
            <el-form-item label="SITES">
                <el-input-number v-model="projectEditing.quantity"/>
            </el-form-item>
            <el-form-item label="STATUS">
                <el-select v-model="projectEditing.status" size="large">
                    <el-option v-for="item in isFinished" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <!-- <el-input v-model="projectTemp.status" placeholder="Is Finished ?"/> -->
            </el-form-item>
            <el-form-item label="REMARKS">
                <!-- <el-input v-model="projectTemp.remark" placeholder="Some Notes"/> -->
                <TinyMCE @writeRemark="remarkEdit" :options="options" 
                    :editorId="editorId" :remark="projectEditing.remark"/>
            </el-form-item>
           
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editorVisible = false">Cancel</el-button>
                <el-button type="primary" @click="updateConfirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!--Dialog Editing End-->
</template>
<script setup>
import api from '@/api/index.js'
import { onMounted,reactive,ref } from 'vue'
import {timeFormatter} from '@/utils/timeFormatter.js'
import TinyMCE from '@/components/TinyMCE/index.vue'

let projectList = reactive({ //intiative all project lists
    projects:[]
})
let projectTemp = reactive({
    name:'',
    series:'',
    costs:0,
    location:'',
    duration:0,
    startTime:'',
    endTime:'',
    quantity:0,
    status:0,
    remark:''
}) //temp container of new project details
let projectEditing = reactive({
    name:'',
    series:'',
    costs:0,
    location:'',
    duration:0,
    startTime:'',
    endTime:'',
    quantity:0,
    status:0,
    remark:''
})
const editorId = ref(0)
const isFinished = [
  {
    value: 0,
    label: 'Finished',
  },
  {
    value: 1,
    label: 'In Progress',
  },
]
const keyword = ref("") //project search keyword
const createVisible = ref(false) //control project creation dialog visible
const editorVisible = ref(false) //control project editor dialog visible
const options = {
    width:'100%',
    height:'30vh'
}
/**
 * fetch projects in spefic pagination
 * @param {*} number: page number
 */
const fetchProjects = (number) =>{
    api.getProjects({page:number}).then(res=>{
        
        if(res.data.status == 200){
            projectList.projects = res.data.result
            //console.log(res.data)
        }
    }).catch(err=>{
        console.log(err)
    })
}
/**
 * first time loading, for projects in page 1
 */
onMounted(()=>{
    fetchProjects(1);
})
/**
 * total project number
 */
let total = ref(0) //the number of projects
/**
 * first loading total record number
 */
onMounted(()=>{
    api.ProjectNumber().then(res=>{
        //console.log(res.data)
        if(res.data.status == 200){
            //console.log(res.data)
            total.value = res.data.result[0]['count(*)']
        }else{
            total = 0
        }
    }).catch(err=>{
        console.log(err)
    })
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
 * page switching
 */
const pageSwitch = (val) =>{
    //console.log(val)
    fetchProjects(val);
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
const rowEdit = (index,row) =>{
    editorVisible.value = true //dialod visible
    editorId.value = row.id
    api.PreProject({id:row.id}).then(res=>{
        //console.log(res.data)
        if(res.data.status==200){
            //assign value to editing dialog
            projectEditing.name = res.data.result.name
            projectEditing.series = res.data.result.series
            projectEditing.costs = res.data.result.costs
            projectEditing.location = res.data.result.location
            projectEditing.duration = res.data.result.duration
            projectEditing.startTime = Number(res.data.result.startTime)
            projectEditing.endTime = Number(res.data.result.endTime)
            projectEditing.quantity = res.data.result.quantity
            projectEditing.status = res.data.result.status
            projectEditing.remark = res.data.result.remark
        }
    }).catch(err=>{
        console.log(err)
    })
}
/**
 * watch remark value and assign new value
 */
 const remarkHandle = (current) =>{
    //console.log(current)
    projectTemp.remark = current
 }
/**
 * renew remark value in editing dialog
 */
const remarkEdit = (data) =>{
    projectEditing.remark = data
}
/**
 * confirm to update a row
 */
const updateConfirm = () =>{
    api.updateProject(editorId.value,{
        name : projectEditing.name,
        series: projectEditing.series,
        costs: projectEditing.costs,
        location: projectEditing.location,
        duration: projectEditing.duration,
        startTime: projectEditing.startTime,
        endTime: projectEditing.endTime,
        quantity : projectEditing.quantity,
        status : projectEditing.status,
        remark : projectEditing.remark,
    }).then(res=>{
        if(res.data.status == 200){
            editorVisible.value = false //close window
            ElMessage({
                    message: res.data.message,
                    type: 'success',
                })
            fetchProjects(); //reload project list
        }else{
            ElMessage({
                    type: 'error',
                    message: res.data.message
                })
        }
    })
}
/**
 * allow user to delete a record
 */
const rowDelete = (index,row) =>{
    ElMessageBox.confirm(
    'Confirm to Delete this Record',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
    )
    .then(() => {   //confirm
        api.DelProject({id:row.id}).then(res=>{
            if(res.data.status==200){
                ElMessage({
                    message: `Project ${projectTemp.name} Success Deleted`,
                    type: 'success',
                })
                fetchProjects(); //reload project list
            }else{
                ElMessage({
                    type: 'error',
                    message: res.data.message
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    })
    .catch(() => { //cancel
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
/**
 * 
 */
const submitProject = () =>{
    api.AddProject({
        name:projectTemp.name,
        series:projectTemp.series,
        costs:projectTemp.costs,
        location:projectTemp.location,
        duration:projectTemp.duration,
        startTime:projectTemp.startTime,
        endTime:projectTemp.endTime,
        quantity:projectTemp.quantity,
        status:projectTemp.status,
        remark:projectTemp.remark
    }).then(res=>{
        if(res.data.status==200){
            createVisible.value = false //create success then close dialog
            fetchProjects(1); //reload project list
            ElMessage({message: `Project ${projectTemp.name} Create Success`,type: 'success',})
        }else{
            ElMessage.error(res.data.message)
        }
    }).catch(err=>{
        console.log(err)
    })

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
.paging{
    position: fixed;
    right: 1.2rem;
    bottom: 1rem;
}

</style>