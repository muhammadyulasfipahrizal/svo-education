<template>
  <div id="app-sidebar" class="sidebar surface-section h-full md:h-auto hidden md:block flex-shrink-0 absolute md:static left-0 top-0 surface-border select-none max-h-screen overflow-y-auto">
    <div v-show="!isMobile">
      <a href="/dashboard">
        <div class="logo-container">
          <img src="/assets/img/svo-academy-logo.png" alt="Logo" class="logo-image">
          <h1 class="header-title">Education</h1>
        </div>
      </a>
      <SidebarNavigation/>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarNavigation from './SidebarNavigation.vue'
import { ref, watchEffect } from 'vue'

const isMobile = ref(window.matchMedia('(max-width: 768px)').matches)
const showSidebarNavigation = ref(false)

const showNavigation = () => {
  showSidebarNavigation.value = !showSidebarNavigation.value
}

watchEffect(() => {
  const handleResize = () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches
  }
  
  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

</script>

<style scoped>
#app-sidebar {
  min-width: 276px;
  background-color: #fff;
  padding: 1rem;
  top: 0;
  left: 0;

  @media screen and (max-width: 768px) {
    padding: 0rem;
  }
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}

.logo-image {
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
}

.header-title {
  margin: 0;
  padding: 0.5rem 0;
  color: black;
}

.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-transition-enter,
.sidebar-transition-leave-to {
  transform: translateX(-100%);
}
</style>
