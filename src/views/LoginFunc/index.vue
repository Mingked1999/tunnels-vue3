<template>
   <div class="loginBase">
    <!--
        scroll down to the very bottom to see how to use this component
        https://element-plus.org/en-US/component/form.html#form-item-attributes
    -->
    <el-form class="user" size="large" :model="user">
        <div class="title-container">
            <h3 class="title">WELCOME TO TUNNEL MANAGEMENT SYSTEM</h3>
        </div>
        <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="username or email" name="username" type="text"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="user.password" placeholder="place input password" name="password" type="password"></el-input>
        </el-form-item>
        <el-button style="width: 100%;margin-bottom: 30px;" type="primary" @click.prevent="loginSubmit">Login</el-button>
        <!--@click.prevent: prevent default execute-->
    </el-form>
   </div>
</template>
<script setup>
import { reactive } from 'vue';
import api from '@/api/index.js';
import { useLoginStore } from '@/stores/loginStore.js'
import { useRouter } from 'vue-router';


const loginStore = useLoginStore()
const router = useRouter()
const user = reactive({ //user input listening
    username:'',
    password:''
})
/**
 * login verification
 */
const loginSubmit = () =>{
    api.loginUser({
        username:user.username,
        password:user.password
    }).then(res=>{
        //console.log(res.data)
        if(res.data.status === 200){
            //login user and store session info
            loginStore.token = res.data.token
            loginStore.username = res.data.username
            loginStore.permission = res.data.permission
            router.push('/')
        }else{
            ElMessage.error(res.data.message)
        }
    })
}
</script>
<style scoped>
.loginBase{
    width: 100%;
    height: 100%;
    background-color:#777DA7;
}
.user{
    position: relative;
    width:40vw ;
    padding: 10rem 2rem 0;
    margin: 0 auto; /**align center */
}
.title-container .title{
    font-size: 2rem;
    color:#EFF5F5 ;
    text-align: center;
    margin: 1rem;
}
</style>