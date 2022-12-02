import { defineStore } from "pinia";

export const useLoginStore = defineStore('login',{
    state:()=>{
        return{
            token:'',
            permission:'',
            username:''

        }
    },
    persist:{
        enabled:true,
        strategies:[
            {
                key:'login', //apply state to localStorage
                storage:localStorage
            }
        ]
    }
})