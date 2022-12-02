import { defineStore } from "pinia";

export const useSliderStore = defineStore('slider',{
    state:()=>{
        return{
            isCollapse:false //closed
        }
    }
})