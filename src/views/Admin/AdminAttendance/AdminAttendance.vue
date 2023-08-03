<template>
  <section class="grid overflow-hidden flex-column md:flex-row px-2 md:px-2 lg:px-2 xl:px-2 py-2">
    <h1 class="text-900 font-bold text-3xl col-12">My Attendance</h1>
    <div class="col-12 grid align-items-center filter-search px-3 lg:px-0">
      <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button col-3 md:col-2" />
      <span class="p-input-icon-left col-5">
        <i class="pi pi-search search-icon pl-1" />
        <InputText placeholder="Search by class" class="search-bar h-10 w-96 md:w-full p-input text-sm" />
      </span>
      <Button size="small" class="btn-orange ml-auto col-2">
        <i class="block pi pi-download md:mr-2"></i>
        <p class="hidden sm:block md:block lg:block xl:block">DOWNLOAD</p>
      </Button>
    </div>
    <div class="col-12 flex flex-column flex-wrap md:flex-row md:p-0 md:m-0">
      <div class="flex flex-row mb-3 px-0 md:px-2 lg:px-0">
        <Dropdown optionLabel="name" v-model="selectedMonth" placeholder="Month" :options="monthList" class="w-10rem mr-2"
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
    <div class="col-12 grid p-0 m-0">
      <div class="item-flex col-6 sm:col-4 md:col-4 lg:col-4 xl:col-4 py-0 px-0 m-0 px-2"
        v-for="(card, index) in cardData">
        <AttendanceCalendar :key="index" :card="card" />
      </div>
    </div>
    <Paginator :rows="10" :totalRecords="120" :template="{
      '992px': 'CurrentPageReport PrevPageLink  NextPageLink',
      default: 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
    }" currentPageReportTemplate='Showing data {first} to {last} of {totalRecords} entries' class="col-12" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AttendanceCalendar from './AttendanceCalander.vue';
import { courseDataMock } from '../AdminStudentProgress/Course.mock';
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
  {
    label: 'M',
    name: 'john',
    currentDay: 'Day 7',
    progress: 70,
    attendance: 6,
    percent: 70,
    iconMarkup: '<i class="pi pi-thumbs-up"></i>'
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

  .p-paginator-pages>.p-paginator-page {
    border-radius: 4px;
    border: 1px solid #EEE;
    background: #F5F5F5;
  }

  .p-paginator-pages>.p-paginator-page:active {
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