<template>
    <h3>Hello, {{loginStore.username}}</h3>
</template>
<script setup>
import { useLoginStore } from '@/stores/loginStore.js'
const loginStore = useLoginStore();
</script>
