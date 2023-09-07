<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarLayout from './components/SidebarLayout.vue'
import HeaderLayout from './components/HeaderLayout.vue'
</script>

<template>
  <div id="root" class="min-h-screen flex relative md:static">
    <SidebarLayout />
    <div class="min-h-screen flex flex-column relative flex-auto main-content">
      <HeaderLayout />
      <section class="px-2 sm:px-2 my-2">
        <RouterView />
      </section>
    </div>
  </div>
</template>


<style scope>
#root {
  /* background: #f9fafc; */
  background: white;
  overflow: scroll;
  height: 100%;
}

.main-content {
  background: var(--Background-color, #F9FAFE);
}

@media only screen and (max-width: 768px) {
  #root {
    display: flex;
    flex-flow: column;
  }
}

@media only screen and (min-width: 991px) {
  .main-content {
    width: calc(100% - 276px);
  }
}
</style>