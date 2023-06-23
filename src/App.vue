<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div id="root" class="min-h-screen flex relative lg:static surface-ground">
    <SidebarLayout />
    <div id="content-container" class="min-h-screen flex flex-column relative flex-auto">
      <HeaderLayout />
      <RouterView />
    </div>
  </div>
</template>


<style scope>
#content-container{
  width: calc(100vw - 300px);
  background-color: white;
}
</style>