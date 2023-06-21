<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div class="app">
    <Sidebar />
    <div class="content">
      <HeaderLayout />
      <RouterView />
    </div>
  </div>
</template>


<style scoped>
.app {
  display: flex;
}

.content {
  flex: 1;
  padding-left: 20%;
}
</style>
