import * as components from '@element-plus/icons-vue'
export default {
     /**element-plus icon mounted to global */
    install:(app)=>{
        for(const key in components){
            const componentConfig = components[key];
            app.component(componentConfig.name,componentConfig)
        }
    },
};