<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div id="root" class="min-h-screen flex relative md:static surface-ground">
    <SidebarLayout />
    <div class="min-h-screen flex flex-column relative flex-auto main-content">
      <HeaderLayout />
      <RouterView />
    </div>
  </div>
</template>


<style scope>
.main-content {
  background: #F9FAFE;
}

@media only screen and (max-width: 768px) {
  #root {
    display: flex;
    flex-flow: column;
  }
}

@media only screen and (min-width: 991px) {
  .main-content {
    width: calc(100% - 300px);
  }
}
</style>