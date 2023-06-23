<template>
  <div id="app-header"
    class="flex justify-content-between align-items-center px-5 surface-0 surface-border relative lg:static">
    <div class="flex">
      <div class="card flex justify-content-center">
        <Dropdown v-model="selectedFilter" :options="filterData" optionLabel="name" placeholder="FILTER"
          class="w-full md:w-14rem filter-toggle"></Dropdown>
      </div>
    </div>
    <ul
      class="list-right list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
      <li>
        <div class="card flex flex-wrap justify-content-center gap-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="search" placeholder="Search" class="border-none search" />
          </span>
        </div>
      </li>
      <li>
        <div class="v-border"></div>
      </li>
      <li><a
          class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
            class="pi pi-calendar text-base lg:text-2xl mr-2 lg:mr-0"></i><span
            class="block lg:hidden font-medium">Inbox</span><span class="p-ink" role="presentation"></span></a></li>
      <li><a
          class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
          <i class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"></i><span
            class="block lg:hidden font-medium">Notifications</span><span class="p-ink" role="presentation"></span></a>
      </li>
      <li><a
          class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
            class="pi pi-shopping-cart text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"></i><span
            class="block lg:hidden font-medium">Notifications</span><span class="p-ink" role="presentation"></span></a>
      </li>
      <li class="border-top-1 surface-border lg:border-top-none">
        <a
          class="flex p-3 lg:px-3 lg:py-2 gap-1 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><img
            src="/assets/img/admin-profile-image.png" class="mr-3 lg:mr-0" style="width: 32px; height: 32px;">
          <div class="block">
            <div class="text-900 text-black font-medium">John Toson</div>
          </div>
          <i class="pi pi-angle-right"></i>
          <span class="p-ink" role="presentation" style="height: 64px; width: 64px; top: -7.5px; left: -1px;"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref, onMounted } from "vue";

const selectedFilter = ref();
const filterData = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
const search = ref();
onMounted(() => {

})
</script>

<style>
#app-header {
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.filter-dropdown {
  position: relative;
  margin-left: 0.25rem;
}

.filter-toggle {
  background: #006785;
  border-radius: 6px;
  color: white;
  height: 32px;
}

.filter-toggle>.p-dropdown-label {
  color: white !important;
  padding: 5px 10px 5px 10px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
}

.filter-toggle>.p-dropdown-trigger svg path {
  fill: white;
}

.filter-toggle i {
  margin: 0 0.5rem;
}

.filter-text {
  margin-left: 0.2rem;
}

.filter-options {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f4f4f4;
  padding: 0.5rem;
  display: none;
}

.filter-options.open {
  display: block;
}

.filter-options ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.filter-options li {
  padding: 0.5rem;
}

.header-right {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.header-search,
.header-icon {
  margin-right: 1.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.header-search i {
  margin-right: 0.5rem;
}

.header-profile {
  display: flex;
  align-items: center;
}

.search {
  border: none;
  width: 110px;
  outline: none;
  transition: width 300ms ease-in-out;
}
.search:focus{
  width: 400px;
}

.profile-image {
  width: 25px;
  height: 25px;
  margin-right: 0.5rem;
}

.profile-name {
  font-weight: bold;
  margin-right: 0.25rem;
}

.pi.pi-chevron-right {
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.pi.pi-chevron-down {
  font-size: 0.75rem;
}

.list-right {
  height: 32px;
}

.v-border {
  height: 32px;
  width: 1px;
  border-left: 1px solid #2C52A51A;
}
</style>
