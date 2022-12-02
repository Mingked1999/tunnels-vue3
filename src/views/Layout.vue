<template>
    <div class="tunnel-layout">
        <DashSlider/>
        <div class="dash-content">
            <DashNav/>
            <div class="views">
                <router-view></router-view>
            </div>
        </div>
    </div>
   
</template>
<script setup>

</script>
<style scoped>
.views{
    padding-left: 15vw;
    height: auto;
}
</style>