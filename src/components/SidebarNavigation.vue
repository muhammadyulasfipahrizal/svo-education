<template>
  <div>
    <nav>
      <div class="px-3">
        <div class="grid align-items-center gap-2 border-bottom-3 border-noround">
          <img src="/assets/img/svg/admin.svg" />
          <span class="menuitem-text">Admin</span>
        </div>
      </div>
      <ul class="menu-root">
        <li>
          <router-link to="/dashboard" class="grid gap-2 menuitem-link" :class="{ active: isActive('/dashboard') }">
            <img src="/assets/img/svg/home.svg" />
            <span class="menuitem-text">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/event" class="grid gap-2 menuitem-link" :class="{ active: isActive('/admin/event') }">
            <img src="/assets/img/svg/calendar.svg" />
            <span class="menuitem-text">Event</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/live" class="grid gap-2 menuitem-link" :class="{ active: isActive('/admin/live') }">
            <img src="/assets/img/svg/live.svg" />
            <span class="menuitem-text">Live</span>
          </router-link>
        </li>

        <li>
          <router-link to="" @click="openProgress('progress')" class="grid gap-2 menuitem-link"
            :class="{ active: isActive('/admin/progress') }">
            <img src="/assets/img/svg/progress.svg" />
            <span class="menuitem-text">Progress</span>
          </router-link>
          <ul
            class="list-none py-0 pl-3 pr-0 m-0 overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
            :class="{ hidden: !subMenuState['progress'] }">
            <li>
              <router-link to="/admin/progress/student" class="grid gap-2 menuitem-link"
                :class="{ active: isActive('/admin/progress/student') }">
                <span class="menuitem-text">Student</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/progress/guest" class="grid gap-2 menuitem-link"
                :class="{ active: isActive('/admin/progress/guest') }">
                <span class="menuitem-text">Guest</span>
              </router-link>
            </li>
          </ul>
        </li>


        <li>
          <router-link to="" @click="openSub('grades')" class="grid gap-2 menuitem-link"
            :class="{ active: isActive('/admin/grades') }">
            <img src="/assets/img/svg/grade.svg" />
            <span class="menuitem-text">Grades</span>
          </router-link>
          <ul
            class="list-none py-0 pl-3 pr-0 m-0 overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
            :class="{ hidden: !subMenuState['grades'] }">
            <li>
              <router-link to="/admin/instructor-grade" class="grid gap-2 menuitem-link"
                :class="{ active: isActive('/admin/instructor-grade') }">
                <span class="menuitem-text">Instructors</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/course-grade" class="grid gap-2 menuitem-link"
                :class="{ active: isActive('/admin/course-grade') }">
                <span class="menuitem-text">Students</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/admin/attendance" class="grid gap-2 menuitem-link"
            :class="{ active: isActive('/attendance') }">
            <img src="/assets/img/svg/attendance.svg" />
            <span class="menuitem-text">Attendance</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/create" class="grid gap-2 menuitem-link" :class="{ active: isActive('/admin/create') }">
            <img src="/assets/img/svg/add.svg" />
            <span class="menuitem-text">Create</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/customize" class="grid gap-2 menuitem-link"
            :class="{ active: isActive('/admin/customize') }">
            <img src="/assets/img/svg/customize.svg" />
            <span class="menuitem-text">Customize</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const isActive = (routePath: string) => route.path === routePath;
const subMenuState = ref({
  'grades': false,
  'progress': false,
})
const openSub = (menu: 'grades') => {
  subMenuState.value = {
    ...subMenuState.value,
    [menu]: !subMenuState.value[menu]
  }
}

const openProgress = (menu: 'progress') => {
  subMenuState.value = {
    ...subMenuState.value,
    [menu]: !subMenuState.value[menu]
  }
}

</script>

<style scoped>
.menu-root {
  list-style: none;
  padding: 0;
  margin: 0;
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
}</style>
