<template>
    <div class="setting">
        <el-button type="primary" @click="drawer = true">
            <el-icon class="icon"><Setting /></el-icon>
        </el-button>
        <el-drawer v-model="drawer" title="System Setting" size="20%">
            <div class="logo">
                <span>Logo Hide/Show </span>
                <el-switch v-model="logoToggle" />
            </div>
        </el-drawer>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { watch} from 'vue';

const drawer = ref(false)
const logoToggle = ref(false)

const emit = defineEmits(['onLogoSwitch']) //1. define emit event
watch(logoToggle,(newValue,oldValue)=>{
    //console.log(newValue)
    emit('onLogoSwitch',newValue) //2. emit event name and new value
})
</script>
<style scoped>
.setting{
    position: fixed;
    right: 0;
    top:40%;
    z-index: 100;
}
.icon{
    font-size: 1.7rem;
}
.logo{
    width: 100%;
    padding: .35rem;
}
</style>