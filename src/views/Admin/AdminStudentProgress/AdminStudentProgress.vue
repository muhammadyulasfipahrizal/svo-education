<template>
  <div class="flex flex-column ">
    <div class="flex flex-row align-items-center">
        <i class="pi pi-chevron-left mr-3 back-arrow" v-if="showDetail" @click="goBack"></i>
        <h1 class="page-title">Student Progress</h1>
    </div>
    <div v-if="!showDetail">
      <DataTable :value="courseData" selectionMode="single" :selection="selectedCourse" @rowSelect="handleRowSelect">
        <Column field="courseName">
          <template #header>
            <div>
              <p class="header-text">Course Name</p>
            </div>
          </template>
          <template #body="{ data }">
            <div class="flex flex-row align-items-center">
              <img src="/assets/svo-academy.png" class="data-image" />
              <p class="data-text">{{ data.courseName }}</p>
            </div>
          </template>
        </Column>
        <Column field="enrollment">
          <template #header>
            <div>
              <p class="header-text">Enrollment</p>
            </div>
          </template>
          <template #body="{data}">
            <div>
              <p class="data-text">{{ data.enrollment }}</p>
            </div>
          </template>
        </Column>
        <Column field="progress">
          <template #header>
            <div>
              <p class="header-text">Progress</p>
            </div>
          </template>
          <template #body="{ data }">
            <div class="progress-bar-container my-2">
              <div class="progress-bar" :style="{ width: data.progress + '%' }"></div>
            </div>
          </template>
        </Column>
        <Column field="startDate">
          <template #header>
            <div>
              <p class="header-text">Start Date</p>
            </div>
          </template>
          <template #body="{data}">
            <div>
              <p class="data-text">{{ data.startDate }}</p>
            </div>
          </template>
        </Column>
        <Column field="endDate">
          <template #header>
            <div>
              <p class="header-text">End Date</p>
            </div>
          </template>
          <template #body="{data}">
            <div>
              <p class="data-text">{{ data.endDate }}</p>
            </div>
          </template>
        </Column>
        <Column field="duration">
          <template #header>
            <div>
              <p class="header-text">Duration</p>
            </div>
          </template>
          <template #body="{ data }">
            <div class="flex flex-row align-items-center">
              <i class="pi pi-clock mr-2"></i>
              <p class="data-text">{{ data.duration }}</p>
            </div>
          </template>
        </Column>
      </DataTable>
  </div>
    <div v-else>
      <AdminStudentProgressDetail :course="selectedCourse"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminStudentProgressDetail from './AdminStudentProgressDetail.vue';
import type { DataTableRowSelectEvent } from 'primevue/datatable';

const courseData = ref([
  {
    courseName: 'UI UX Design',
    enrollment: '200',
    progress: 50,
    startDate: '27 mar 2023',
    endDate: '3 apr 2023',
    duration: '2 weeks'
  },
]);

const showDetail = ref(false);
const selectedCourse = ref(null);

const goBack = () => {
  showDetail.value = false
}

const handleRowSelect = (event: DataTableRowSelectEvent) => {
  showDetail.value = true;
  selectedCourse.value = event.data;
}

</script>

<style scoped>
.back-arrow {
  cursor: pointer;
}
.page-title {
  color: var(--font-1, #001125);
  font-size: 35px;
  font-family: Inter;
  font-weight: 700;
  line-height: 160%;
}

.header-text {
  color: white;
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
}
.data-text {
  color: var(--fonts-primary, #25213B);
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
}
.progress-bar-container {
  width: 200px;
  height: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #EFAE1C;
  transition: width 0.5s;
}

.data-image {
  width: 50px;
  height: 50px;
}
</style>

<style lang="scss" scoped>
::v-deep(.p-datatable) {
  .p-datatable-thead>tr>th {
      background: #006785;
      color: white;
      color: var(--white, #FFF);
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      svg path {
          fill: white;
      }
      &:hover {
          background: #006785;
          color: var(--white, #FFF);
      }
  }
}
</style>
