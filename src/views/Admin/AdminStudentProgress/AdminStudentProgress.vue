<template>
  <section>
    <section
      class="grid overflow-hidden flex-column md:flex-row pl-4 pr-4 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2">
      <div class="flex flex-row align-items-center col-12">
        <h1 class="title-head">Student Progress</h1>
      </div>
      <div class="col-12">
        <DataTable :value="courseData" class="shadow-2" selectionMode="single" :selection="selectedCourse"
          @rowSelect="handleRowSelect">
          <Column field="courseName">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Course Name</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex flex-row align-items-center w-full">
                <img :src="data.image" class="data-image mr-2" style="width: 58px; height: 39px;" />
                <p class="data-text">{{ data.name }}</p>
              </div>
            </template>
          </Column>
          <Column field="enrollment">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Enrollment</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex justify-content-center w-full">
                <p class="data-text">{{ Number(data.enrollment).toLocaleString() }}</p>
              </div>
            </template>
          </Column>
          <Column field="progress">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Progress</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex flex-column">
                <div class="progress-bar-container my-2 flex flex-column justify-content-center w-full">
                  <div class="progress-bar"
                    :style="{ width: data.progress + '%', backgroundColor: getBackgroundColor(data.progress) }"></div>
                </div>
                <p class="progress-text">{{ data.progress }} % completed</p>
              </div>
            </template>
          </Column>
          <Column field="startDate">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Start Date</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex justify-content-center w-full">
                <p class="data-text">{{ data.startDate }}</p>
              </div>
            </template>
          </Column>
          <Column field="endDate">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">End Date</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex justify-content-center w-full">
                <p class="data-text">{{ data.endDate }}</p>
              </div>
            </template>
          </Column>
          <Column field="duration">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Duration</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex justify-content-center align-items-center w-full">
                <i class="pi pi-clock mr-2"></i>
                <p class="data-text">{{ data.duration }}</p>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import type { DataTableRowSelectEvent } from 'primevue/datatable';
import { courseDummyData } from '../AdminDashboard/DashboardDummyData';

const courseData = ref(courseDummyData);
const selectedCourse = ref(null);


const handleRowSelect = (event: DataTableRowSelectEvent) => {
  router.push('/admin/progress/student/' + event.data.id)
}
const getBackgroundColor = (progress: number) => {
  if (progress > 70) {
    return '#659872';
  }
  return '#EFAE1C';
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
  text-align: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
