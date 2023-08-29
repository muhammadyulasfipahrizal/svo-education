<template>
  <section class="px-2">
    <section class="grid overflow-hidden flex-column md:flex-row px-2 md:px-0 lg:px-0 xl:px-0 py-2">
      <h1 class="text-900 font-bold text-3xl col-12">Student Attendance</h1>
      <div class="pl-2 col-12 flex flex-column gap-2 my-2">
        <!-- FILTER -->
        <div class="flex justify-content-start md:justify-content-between align-items-center w-full">
          <div class="flex flex-row align-items-center filter-search align-items-center">
            <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mr-3" />
            <span class="p-input-icon-left mr-3">
              <i class="pi pi-search search-icon" />
              <InputText placeholder="Search by name" class="search-bar p-inputtext-sm w-25rem" />
            </span>
          </div>
          <Button label="DOWNLOAD" size="small" icon="pi pi-download" class="btn-orange"></Button>
        </div>
      </div>
      <div class="col-12 flex flex-column flex-wrap md:flex-row md:p-0 md:m-0">
        <div class="flex flex-row mb-3 px-0 md:px-2 lg:px-0">
          <Dropdown optionLabel="name" v-model="selectedMonth" placeholder="Month" :options="monthList"
            class="w-10rem mr-2" style="height: 52px">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div class="text-900 font-bold text-lg">{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div class="text-900 font-bold text-lg">{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown optionLabel="name" v-model="selectedYear" placeholder="Year" :options="yearList" class="w-8rem mr-2"
            style="height: 52px">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div class="text-900 font-bold text-lg">{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div class="text-900 font-bold text-lg">{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <Dropdown optionLabel="courseName" :options="courseList" v-model="selectedCourse" placeholder="Course Name"
          class="w-full md:w-15rem md:flex" style="height: 52px">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <img :alt="slotProps.value.courseName" :src="slotProps.value.image" class="mr-2"
                style="width: 55px; height: 30px" />
              <div class="text-900 font-bold text-lg">{{ slotProps.value.courseName }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img :alt="slotProps.option.courseName" :src="slotProps.option.image" class="mr-2"
                style="width: 55px; height: 30px" />
              <div class="text-900 font-bold text-lg">{{ slotProps.option.courseName }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="col-12 grid-5 p-0 m-0">
        <div class="item-flex py-0 px-0 m-0 px-1 w-full" v-for="(card, index) in cardData">
          <AttendanceCalendar :key="index" :card="card" />
        </div>
      </div>
      <Paginator :rows="10" :totalRecords="mockAttendance.length" :template="{
        '992px': 'CurrentPageReport PrevPageLink  NextPageLink',
        default: 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
      }" currentPageReportTemplate='Showing data {first} to {last} of {totalRecords} entries' class="col-12"
        @page="pageChanged" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AttendanceCalendar from './AttendanceCalander.vue';
import { courseDataMock } from '../AdminStudentProgress/Course.mock';
import { mockAttendance } from './mockAttendance';
import type { PageState } from 'primevue/paginator';
const selectedMonth = ref();
const selectedYear = ref();
function generateArrayOfYears() {
  var max = new Date().getFullYear()
  var min = max - 50
  var years = []

  for (var i = max; i >= min; i--) {
    years.push({ name: i, id: i })
  }
  return years
}

const monthList = ref(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => ({ name: month, id: month })))
const yearList = ref(generateArrayOfYears());
const selectedCourse = ref();
const courseList = ref(courseDataMock);
const cardData = ref(mockAttendance);
const perPage = ref(10);
const pageChanged = (page: PageState) => {
  const startIndex = page.page * perPage.value;
  const endIndex = startIndex + perPage.value;
  const data = [...mockAttendance];
  const filteredData = data.slice(startIndex, endIndex);
  cardData.value = filteredData;
}
onMounted(() => {
  pageChanged({
    first: 10,
    page: 0,
    pageCount: mockAttendance.length,
    rows: 10,
  })
})
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

:deep(.p-paginator) {
  height: 50px;
}

:deep(.p-paginator) {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 50px !important;
  gap: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin: 0 7.5px !important;
  }


  .p-paginator-pages {
    display: flex;
    flex-direction: row;
    gap: 0 !important;
    display: flex;

    .p-paginator-page {
      color: #6D5BD0;
      text-align: center;
      font-size: 16px;
      font-family: Inter;
      font-weight: 600;
      background-color: white;
    }
  }

  .p-paginator-first {
    margin-left: auto !important;
  }

  .p-link {
    width: 27px;
    height: 27px;
    color: #404B52 !important;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.14px;
    border-radius: 4px;
    border: 1px solid #EEE !important;
    background: #F5F5F5 !important;
    border-radius: 4px;
    border: 1px solid #EEE;
    background: #F5F5F5;
    min-width: unset;

    &.p-highlight {
      color: white !important;
      border: 1px solid var(--svo-dark-color, #006785) !important;
      background: var(--svo-dark-color, #006785) !important;
    }

    svg {
      width: 9px;
      height: 14px;

      path {
        fill: #404B52;
      }
    }
  }

  .p-dropdown {
    height: 27px;
    align-items: center;
    background: transparent;
  }

  .p-paginator-current {
    text-align: left;
    margin-right: auto;
    display: flex;
    justify-content: flex-start;
    cursor: default;

    background: white;
    height: 21px !important;
    font-size: 14px !important;
    color: #B5B7C0 !important;
  }
  .p-paginator-prev {
    margin-left: auto;
  }

  @media screen and (max-width: 767px) {
    height: 100px !important;
    gap: 2px !important;


    .p-paginator-pages {
      gap: 2px !important;
    }
  }
}

.grid-5 {
  grid-template-columns: repeat(5, 220px);
  display: grid;

  @media screen and (min-width: 1025px) and (max-width: 1280px) {
    grid-template-columns: repeat(4, 25%);
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 33%);
  }

  @media screen and (min-width: 466px) and (max-width: 768px) {
    grid-template-columns: repeat(3, 33%);
  }

  @media screen and (max-width: 465px) {
    grid-template-columns: repeat(2, 50%);
  }
}
</style>