<template>
  <div id="app-sidebar"
    class="sidebar surface-section h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 surface-border select-none">
    <div class="logo-container">
      <img src="/assets/img/svo-academy-logo.png" alt="Logo" class="logo-image">
      <h1 class="header-title">Education</h1>
    </div>
    <nav>
      <ul class="menu-root">
        <li>
          <router-link to="/admin" class="menuitem-link" :class="{ active: isActive('/admin') }">
            <i class="pi pi-fw pi-info-circle"></i>
            <span class="menuitem-text">Admin</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard" class="menuitem-link" :class="{ active: isActive('/dashboard') }">
            <i class="pi pi-fw pi-home"></i>
            <span class="menuitem-text">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/event" class="menuitem-link" :class="{ active: isActive('/event') }">
            <i class="pi pi-fw pi-calendar"></i>
            <span class="menuitem-text">Event</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/live" class="menuitem-link" :class="{ active: isActive('/live') }">
            <i class="pi pi-fw pi-video"></i>
            <span class="menuitem-text">Live</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/progress" class="menuitem-link" :class="{ active: isActive('/progress') }">
            <i class="pi pi-fw pi-chart-bar"></i>
            <span class="menuitem-text">Progress</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/grades" class="menuitem-link" :class="{ active: isActive('/grades') }">
            <i class="pi pi-fw pi-bookmark"></i>
            <span class="menuitem-text">Grades</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/attendance" class="menuitem-link" :class="{ active: isActive('/attendance') }">
            <i class="pi pi-fw pi-calendar"></i>
            <span class="menuitem-text">Attendance</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/create" class="menuitem-link" :class="{ active: isActive('/create') }">
            <i class="pi pi-fw pi-plus"></i>
            <span class="menuitem-text">Create</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/customize" class="menuitem-link" :class="{ active: isActive('/customize') }">
            <i class="pi pi-fw pi-cog"></i>
            <span class="menuitem-text">Customize</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
#app-sidebar {
  width: 300px;
  /* height: 100vh; */
  /* overflow: scroll; */
  background-color: #fff;
  padding: 1rem;
  top: 0;
  left: 0;
}

.menu-root {
  list-style: none;
  padding: 0;
  margin: 0;
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

.menuitem-link {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

.menuitem-link.active {
  background-color: #00C0DD;
  color: white;
}

.menuitem-link:hover {
  background-color: #00C0DD;
  color: white;
}

.menuitem-link i {
  margin-right: 0.5rem;
}
</style>
