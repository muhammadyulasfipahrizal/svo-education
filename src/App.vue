<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div id="root" class="min-h-screen flex w-screen relative md:static surface-ground">
    <SidebarLayout />
    <div class="bg-white min-h-screen flex flex-column relative flex-auto">
      <HeaderLayout />
      <RouterView />
    </div>
  </div>
</template>


<style scope>
@media only screen and (max-width: 768px) {
  #root {
    display: flex;
    flex-flow: column; 
  }
}
</style>