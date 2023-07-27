<template>
  <div id="app-header">

    <div v-show="!isMobile">
      <div class="flex justify-content-between mt-2 align-items-center surface-0 surface-border relative md:static">
        <div class="flex">
          <div class="card flex justify-content-center">
            <Dropdown v-model="selectedFilter" :options="filterData" optionLabel="name" placeholder="FILTER"
              class="w-full md:w-14rem filter-toggle"></Dropdown>
          </div>
        </div>
        <ul
          class="list-none p-0 m-0 md:flex md:align-items-center select-none md:flex-row surface-section border-1 md:border-none surface-border right-0 top-100 shadow-2 md:shadow-none md:static">
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
              class="flex p-3 md:px-3 md:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
                class="pi pi-calendar text-base md:text-2xl mr-2 md:mr-0"></i><span
                class="block md:hidden font-medium">Inbox</span><span class="p-ink" role="presentation"></span></a></li>
          <li><a
              class="flex p-3 md:px-3 md:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
              <i class="pi pi-bell text-base md:text-2xl mr-2 md:mr-0 p-overlay-badge"></i><span
                class="block md:hidden font-medium">Notifications</span><span class="p-ink"
                role="presentation"></span></a>
          </li>
          <li><a
              class="flex p-3 md:px-3 md:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
                class="pi pi-shopping-cart text-base md:text-2xl mr-2 md:mr-0 p-overlay-badge"></i><span
                class="block md:hidden font-medium">Notifications</span><span class="p-ink"
                role="presentation"></span></a>
          </li>
          <li class="border-top-1 surface-border md:border-top-none">
            <a
              class="flex p-3 md:px-3 md:py-2 gap-1 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><img
                src="/assets/img/admin-profile-image.png" class="mr-3 md:mr-0" style="width: 32px; height: 32px;">
              <div class="block">
                <div class="text-900 text-black font-medium">John Toson</div>
              </div>
              <i class="pi pi-angle-right"></i>
              <span class="p-ink" role="presentation" style="height: 64px; width: 64px; top: -7.5px; left: -1px;"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-show="isMobile">
      <div class="flex flex-column">

        <div class="flex flex-row align-items-center justify-content-between mx-3">
          <i class="pi pi-align-justify cursor-pointer" @click="visible = true"></i>
          <div class="flex flex-row align-items-center">
            <img src="/assets/img/svo-academy-logo.png" alt="Logo" class="logo-image">
            <h1 class="header-title">Education</h1>
          </div>
          <a
            class="flex p-3 align-items-center hover:surface-100 border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><img
              src="/assets/img/admin-profile-image.png" style="width: 32px; height: 32px;">
          </a>
        </div>
        <Sidebar v-model:visible="visible" class="w-1/2">
          <template #header>
            <div class="flex flex-row align-items-center mr-4">
              <img src="/assets/img/svo-academy-logo.png" alt="Logo" class="logo-image">
              <h1 class="header-title">Education</h1>
            </div>
          </template>
          <SidebarNavigation />
        </Sidebar>

        <div class="flex flex-row align-items-center justify-content-between svo-primary px-2">
          <p class="text-white text-md: font-semibold	ml-2 page-title" id="dynamic-title">{{ dynamicPageTitle }}</p>
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="search" placeholder="Search" class="border-none search svo-primary" />
          </span>
        </div>

        <div class="flex flex-row align-items-center justify-content-between mt-2 px-2">
          <div class="card flex justify-content-center">
            <Dropdown v-model="selectedFilter" :options="filterData" optionLabel="name" placeholder="FILTER"
              class="w-full md:w-14rem filter-toggle"></Dropdown>
          </div>
          <ul
            class="list-right list-none p-0 m-0 hidden flex align-items-center select-none surface-section border-none surface-border right-0 top-100 shadow-none ">
            <li><a
                class="flex px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
                  class="pi pi-calendar text-2xl mr-2 mr-0"></i>
              </a>
            </li>
            <li><a
                class="flex px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-bell text-2xl mr-2 mr-0 p-overlay-badge"></i>
              </a>
            </li>
            <li><a
                class="flex px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"><i
                  class="pi pi-shopping-cart text-2xl mr-2 mr-0 p-overlay-badge"></i>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import SidebarNavigation from './SidebarNavigation.vue';
import { ref, onMounted, watchEffect } from "vue";

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

});

const isMobile = ref(window.matchMedia('(max-width: 768px)').matches);
const visible = ref()

const dynamicPageTitle = ref();

watchEffect(() => {
  const handleResize = () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches;
  };

  const routeUrl = window.location.href;
  // TODO: update pageTitle 
  const pageTitle = routeUrl.split('/').pop() || '';
  dynamicPageTitle.value = pageTitle;

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
});
</script>

<style scoped lang="scss">
.header-left {
  display: flex;
  align-items: center;
}

.filter-dropdown {
  position: relative;
  margin-left: 0.25rem;
}

::v-deep(.filter-toggle) {
  background: #006785;
  border-radius: 6px;
  color: white;
  height: 32px;

  .p-dropdown-label {
    color: white !important;
    padding: 5px 10px 5px 10px;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }

  .p-dropdown-trigger svg path {
    fill: white;
  }

  i {
    margin: 0 0.5rem;
  }
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
  color: white;

  @media screen and (max-width: 768px) {
    margin: 10px 0;
  }
}

.search:focus {
  width: 400px;
  outline: none;

  @media screen and (max-width: 768px) {
    width: 200px;
  }
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

.svo-primary {
  background-color: #006785;
}</style>
