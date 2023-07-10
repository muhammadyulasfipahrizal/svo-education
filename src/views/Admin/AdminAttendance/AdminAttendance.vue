<template>
    <main class="flex flex-column px-5 justify-content-between">
        <h1 class="font-bold mb-2">My Attendance</h1>
        <div class=" flex flex-row align-items-center mb-3 filter-search">
            <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mr-3"/>
            <span class="p-input-icon-left">
                <i class="pi pi-search search-icon" />
                <InputText  placeholder="Search by class" class="search-bar h-10 w-96 p-input text-sm"/>
            </span>
            <Button label="DOWNLOAD" icon="pi pi-download" size="small" class="download-button ml-auto"/>
        </div>
        <div class="flex flex-column flex-wrap md:flex-row">
          <div class="flex flex-row mb-3">
            <Dropdown optionLabel="name" placeholder="December" class="w-10rem mr-2" />
            <Dropdown optionLabel="name" placeholder="2022" class="w-8rem mr-2" />
          </div>
            <Dropdown 
              v-model="selectedCity" 
              :options="cities" 
              optionLabel="name" 
              placeholder="Select a City" 
              class="w-14rem mb-3" />
        </div>
        <div class="flex flex-row flex-wrap ">
          <AttendanceCalendar v-for="(card, index) in cardData" :key="index" :card="card" />
        </div>
        <Paginator 
          :rows="10" 
          :totalRecords="120" 
          :template="{
            '768px': 'CurrentPageReport PrevPageLink  NextPageLink',
            default: 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
          }"
          currentPageReportTemplate='Showing data {first} to {last} of {totalRecords} entries'
        />
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AttendanceCalendar from './AttendanceCalander.vue';

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const cardData = ref([
  {
    label: 'P',
    name: 'jackson',
    currentDay: 'Day 5',
    progress: 20,
    attendance: 4,
    percent: 20,
    iconMarkup: '<i class="pi pi-thumbs-up"></i>'
  },
  {
    label: 'W',
    name: 'chris',
    currentDay: 'Day 3',
    progress: 40,
    attendance: 2,
    percent: 40,
    iconMarkup: '<i class="pi pi-thumbs-down"></i>'
  },
  {
    label: 'M',
    name: 'john',
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
    border-radius: 6px;
    border: 1px solid var(--suggested-dark-grey, #808081);
    background: var(--backgrounds-primary, #FFF);
    color: #808081;
    display: flex;
    padding: 10px;
    align-items: flex-end;
}
.search-bar {
    border-radius: 6px;
    background: var(--suggested-light-grey, #EEE);
  }
  
  .search-bar::placeholder {
    color: #808081;
    font-size: 14px;
    font-family: Inter;
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

</style>

<style lang="scss" scoped>
::v-deep(.p-button:active),
    ::v-deep(.p-button:hover) {
      background: #006785;
      color: white;
      border: none;
    }

::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-right: auto;
  }

  .p-paginator-pages > .p-paginator-page {
    border-radius: 4px;
    border: 1px solid #EEE;
    background: #F5F5F5;
  }
  .p-paginator-pages > .p-paginator-page:active {
    border-radius: 4px;
    border: 1px solid var(--primary, #00C0DD);
    background: var(--primary, #00C0DD);
    color: white;
  }

  .p-paginator-prev {
    border-radius: 4px;
    border: 1px solid #EEE;
    background: #F5F5F5;
  }
  .p-paginator-prev:active {
    border-radius: 4px;
    border: 1px solid var(--primary, #00C0DD);
    background: var(--primary, #00C0DD);
    color: white;
  }
  .p-paginator-next {
    border-radius: 4px;
    border: 1px solid #EEE;
    background: #F5F5F5;
  }
  .p-paginator-next:active {
    border-radius: 4px;
    border: 1px solid var(--primary, #00C0DD);
    background: var(--primary, #00C0DD);
    color: white;
  }
}
</style>