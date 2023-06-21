<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div class="app">
      <SidebarLayout />
      <HeaderLayout />
      <RouterView />
  </div>
</template>


<style scoped>
.app {
  display: flex;
}
</style>
