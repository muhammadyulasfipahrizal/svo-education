<template>
    <main class="flex flex-column px-5 justify-content-between">
        <h1 class="font-bold mb-2">My Attendance</h1>
        <div class=" flex flex-row align-items-center mb-3 filter-search">
            <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mr-3"/>
            <span class="p-input-icon-left">
                <i class="pi pi-search search-icon" />
                <InputText  placeholder="Search by class" class="search-bar p-inputtext-sm"/>
            </span>
            <Button label="DOWNLOAD" icon="pi pi-download" class="download-button to-right"/>
        </div>
        <div>
            <Dropdown optionLabel="name" placeholder="December" class="w-full md:w-10rem mr-2" />
            <Dropdown optionLabel="name" placeholder="2022" class="w-full md:w-8rem" />
        </div>
        <div class="flex flex-row ">
            <div class="flex flex-row mr-3 my-3">
                <div class="p-2 border-2 surface-border flex flex-row align-items-center">
                    <i class="pi pi-thumbs-up thumb-up-icon mr-1"></i>
                    <p>Pass</p>
                </div>
                <div class="p-2 border-2 surface-border flex flex-row align-items-center">
                    <i class="pi pi-thumbs-down thumb-down-icon mr-1"></i>
                    <p>Pass</p>
                </div>
            </div>
            <div class="flex flex-row my-3">
                <div class="p-2 border-2 surface-border flex flex-row align-items-center">
                    <div class="attended-box mr-1"> </div>
                    <p>Attended</p>
                </div>
                <div class="p-2 border-2 surface-border flex flex-row align-items-center">
                    <div class="absent-box mr-1"></div>
                    <p>Absent</p>
                </div>
                <div class="p-2 border-2 surface-border flex flex-row align-items-center">
                    <div class="not-started-box mr-1"></div>
                    <p>Not Yet Started</p>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap">
          <AttendanceCalendar v-for="(card, index) in cardData" :key="index" :card="card" />
        </div>
        <div class="flex justify-between align-items-center my-3">
            <p class="mr-4">Showing data 1 to 10 of 256k entries</p>
            <div class="flex align-items-center to-right">
                <Button icon="pi pi-arrow-left" class="nav-button mx-1" />
                <Button label="1" class="nav-button mx-1" />
                <Button label="2" class="nav-button mx-1" />
                <Button label="3" class="nav-button mx-1" />
                <Button label="4" class="nav-button mx-1" />
                <p class="nav-dot">...</p>
                <Button label="20" class="nav-button mx-1" />
                <Button icon="pi pi-arrow-right" class="nav-button mx-1" />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AttendanceCalendar from './AttendanceCalander.vue';

const cardData = ref([
  {
    label: 'P',
    status: 'COMPLETED',
    title: 'UI UX Design',
    currentDay: 'Day 5',
    progress: 20,
    attendance: 4,
    percent: 20,
    iconMarkup: '<i class="pi pi-thumbs-up"></i>'
  },
  {
    label: 'W',
    status: 'IN-PROGRESS',
    title: 'Web Developer',
    currentDay: 'Day 3',
    progress: 40,
    attendance: 2,
    percent: 40,
    iconMarkup: '<i class="pi pi-thumbs-down"></i>'
  },
  {
    label: 'M',
    status: 'COMPLETED',
    title: 'Marketing',
    currentDay: 'Day 7',
    progress: 70,
    attendance: 6,
    percent: 70,
    iconMarkup: '<i class="pi pi-thumbs-up"></i>'
  },
]);

</script>

<style scoped>
.to-right {
    margin-left: auto;
}
.filter-button {
    background-color: #fff;
    color: #8B83BA;
    border: 0.5px solid #8B83BA;
}
.search-bar {
    background-color: rgba(139, 131, 186, 0.1);
    color: #8B83BA;
    width: 400px;
  }
  
  .search-bar::placeholder {
    color: #8B83BA;
  }
  
  .search-icon {
    color: #8B83BA;
  }
.download-button {
    background-color: #e26954;
}
.thumb-up-icon {
    background-color: #649A6D;
    padding: 5px;
    border-radius: 50%;
    color: white;
  }

  .thumb-down-icon {
    background-color: #BD3000;
    padding: 5px;
    border-radius: 50%;
    color: white;
  }

  .attended-box {
    background-color: #649A6D;
    padding: 8px;
    border-radius: 2px;
  }

  .absent-box {
    background-color: #BD3000;
    padding: 8px;
    border-radius: 2px;
  }

  .not-started-box {
    border: 0.5px solid gray;
    padding: 8px;
    border-radius: 2px;
  }
  .nav-button {
    width: 50px;
    height: 30px;
    background-color: #EEEEEE;
    color: #404B52;
    border: none;
  }

  .nav-button:hover {
    color: white;
    background-color: #00C0DD;
  }
  .nav-button:active {
    border: none;
  }

  .nav-dot {
    font-size: 28px;    
  }
</style>