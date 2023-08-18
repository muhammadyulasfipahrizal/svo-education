<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { courseDataMock } from '../AdminStudentProgress/Course.mock';
import { guestProgressDataMock, type IGuest, guestListDataMock } from './GuestProgress.mock';

const guestListData = ref<IGuest[]>(guestListDataMock);

const visible = ref(false);
const currentStudent = ref<IGuest | null>(null);
const displayedDays = ref<string[]>([]);
const columns: { field: string; header: string; value: string }[] = [];
const showModal = (data: IGuest) => {
  currentStudent.value = data;
  displayedDays.value = data.days.slice(0, 1);
  visible.value = true;
  data.days.map((value, index) => {
    columns.push({ field: 'day_' + (index + 1), header: 'Day ' + (index + 1), value })
  })
};
const showNextDays = () => {
  //
}
const checkedStudent = ref();

onMounted(() => {
  const route = useRoute();
  const courseId: string = route.params.courseId as unknown as string;
  const course = courseDataMock.find((v) => v.id === courseId)
  if (course) {
    selectedCourse.value = course;
  }

  if ('filter-guest' in route.query) {
    selectedGuest.value = guestProgressDataMock.find((v) => v.id = route.query['filter-guest']?.toString() ?? '')
  }


})

const courses = ref(courseDataMock);
const selectedCourse = ref();
const selectedGuest = ref();
const getBackgroundColor = (progress: number) => {
  if (progress > 70) {
    return '#659872';
  }
  return '#EFAE1C';
}
</script>

<template>
  <section class="px-2">
    <section
      class="grid overflow-hidden flex-column md:flex-row pl-4 pr-4 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2">
      <div class="col-12 flex flex-row align-items-center my-2">
        <i class="pi pi-chevron-left mr-3 back-arrow cursor-pointer" @click="$router.push('/admin/progress/guest')"></i>
        <h1 class="title-head">Guest Progress</h1>
      </div>
      <div class="grid col-12">
        <div class="col-12">
          <Dropdown optionLabel="courseName" :options="courses" v-model="selectedCourse" placeholder="Course Name"
            class="w-full md:w-15rem md:flex">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <img :alt="slotProps.value.courseName" :src="slotProps.value.image" class="mr-2" style="width: 53px" />
                <div class="text-900 font-bold text-lg">{{ slotProps.value.courseName }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <img :alt="slotProps.option.courseName" :src="slotProps.option.image" class="mr-2" style="width: 53px" />
                <div class="text-900 font-bold text-lg">{{ slotProps.option.courseName }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="col-12 flex flex-row align-items-center justify-content-between filter-search pr-3">
          <div class="col-10 md:col-10 lg:col-10 lg:col-10 grid gap-2 align-items-center">
            <div class="grid mt-1 mr-1 align-items-center gap-2" v-if="selectedGuest">
              <img :src="selectedGuest.image" class="w-2rem h-2rem border-circle" />
              <p class="font-semibold text-lg">{{ selectedGuest.code }}</p>
            </div>
            <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button col-1 h-3rem" />
            <span class="p-input-icon-left w-7 col-5 mt-1 sm:mt-0 p-0 h-3rem">
              <i class="pi pi-search search-icon ml-2" />
              <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm w-full h-full" />
            </span>
          </div>
          <Button label="DOWNLOAD" icon="pi pi-download" size="small" class="btn-orange hidden md:block" />
          <Button icon="pi pi-download" size="small" class="btn-orange col-2 block md:hidden" />
        </div>

        <!-- table -->
        <div class="col-12 pr-3">
          <DataTable :value="guestListData" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortMode="multiple" tableStyle="min-width: 50rem" dataKey="id" v-model:selection="checkedStudent"
            class="shadow-2 detail-table">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="name" class="text-white" headerStyle="width: 4rem">
              <template #header>
                <div class="w-full text-center">
                  <p class="header-text">Name</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-row align-items-center">
                  <img :src="data.image || '/assets/img/avatar-black.png'" class="w-4rem px-2 border-circle"
                    alt="avatar" />
                  <div class="flex flex-column">
                    <p class="name-text">{{ data.name }}</p>
                    <p class="name-email">{{ data.email }}</p>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="progress" sortable class="text-white">
              <template #header>
                <div class="w-full text-center">
                  <p class="header-text">Progress</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-column justify-content-center">
                  <div class="progress-bar-container my-2 flex flex-column justify-content-center w-full">
                    <div class="progress-bar"
                      :style="{ width: data.progress + '%', backgroundColor: getBackgroundColor(data.progress) }"></div>
                  </div>
                  <p class="progress-text">{{ data.progress }} % completed</p>
                </div>
              </template>
            </Column>
            <Column field="percentage" sortable>
              <template #header>
                <div class="w-full text-center">
                  <p class="header-text">Percentage</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="justify-content-center flex">
                  <p class="percatage-text">{{ data.percentage }}%</p>
                </div>
              </template>
            </Column>
            <Column field="passFail" sortable>
              <template #header>
                <div class="w-full text-center">
                  <p class="header-text">P/F</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex justify-content-center w-full align-items-center">
                  <template v-if="data.passFail === 'pass'">
                    <p class="mr-3 pass-text">Passed</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <rect y="0.5" width="24" height="24" rx="12" fill="#659872" />
                      <path
                        d="M18.7104 7.70986C18.6175 7.61613 18.5069 7.54174 18.385 7.49097C18.2632 7.4402 18.1324 7.41406 18.0004 7.41406C17.8684 7.41406 17.7377 7.4402 17.6159 7.49097C17.494 7.54174 17.3834 7.61613 17.2904 7.70986L9.84044 15.1699L6.71044 12.0299C6.61392 11.9366 6.49998 11.8633 6.37512 11.8141C6.25026 11.7649 6.11694 11.7408 5.98276 11.7431C5.84858 11.7454 5.71617 11.7741 5.59309 11.8276C5.47001 11.8811 5.35868 11.9583 5.26544 12.0549C5.1722 12.1514 5.09889 12.2653 5.04968 12.3902C5.00048 12.515 4.97635 12.6484 4.97867 12.7825C4.98099 12.9167 5.00972 13.0491 5.06321 13.1722C5.1167 13.2953 5.19392 13.4066 5.29044 13.4999L9.13044 17.3399C9.2234 17.4336 9.334 17.508 9.45586 17.5588C9.57772 17.6095 9.70843 17.6357 9.84044 17.6357C9.97245 17.6357 10.1032 17.6095 10.225 17.5588C10.3469 17.508 10.4575 17.4336 10.5504 17.3399L18.7104 9.17986C18.8119 9.08622 18.893 8.97257 18.9484 8.84607C19.0038 8.71957 19.0324 8.58296 19.0324 8.44486C19.0324 8.30676 19.0038 8.17015 18.9484 8.04365C18.893 7.91715 18.8119 7.8035 18.7104 7.70986Z"
                        fill="white" />
                    </svg>
                  </template>
                  <template v-if="data.passFail === 'fail'">
                    <p class="mr-3 pass-text">Failed</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <rect y="0.5" width="24" height="24" rx="12" fill="#BE2F00" />
                      <path
                        d="M12.8806 12.4995L16.8153 8.57065C16.9329 8.45303 16.9989 8.29351 16.9989 8.12717C16.9989 7.96083 16.9329 7.80131 16.8153 7.68369C16.6977 7.56608 16.5381 7.5 16.3718 7.5C16.2055 7.5 16.046 7.56608 15.9284 7.68369L12 11.6188L8.0716 7.68369C7.95399 7.56608 7.79449 7.5 7.62817 7.5C7.46185 7.5 7.30234 7.56608 7.18474 7.68369C7.06714 7.80131 7.00107 7.96083 7.00107 8.12717C7.00107 8.29351 7.06714 8.45303 7.18474 8.57065L11.1194 12.4995L7.18474 16.4283C7.1262 16.4864 7.07974 16.5554 7.04803 16.6316C7.01632 16.7077 7 16.7893 7 16.8718C7 16.9542 7.01632 17.0359 7.04803 17.112C7.07974 17.1881 7.1262 17.2572 7.18474 17.3152C7.2428 17.3738 7.31188 17.4203 7.38798 17.452C7.46409 17.4837 7.54572 17.5 7.62817 17.5C7.71062 17.5 7.79225 17.4837 7.86836 17.452C7.94446 17.4203 8.01354 17.3738 8.0716 17.3152L12 13.3802L15.9284 17.3152C15.9865 17.3738 16.0555 17.4203 16.1316 17.452C16.2078 17.4837 16.2894 17.5 16.3718 17.5C16.4543 17.5 16.5359 17.4837 16.612 17.452C16.6881 17.4203 16.7572 17.3738 16.8153 17.3152C16.8738 17.2572 16.9203 17.1881 16.952 17.112C16.9837 17.0359 17 16.9542 17 16.8718C17 16.7893 16.9837 16.7077 16.952 16.6316C16.9203 16.5554 16.8738 16.4864 16.8153 16.4283L12.8806 12.4995Z"
                        fill="white" />
                    </svg>
                  </template>
                  <template v-if="data.passFail === 'none'">
                    <p class="mr-3 pass-text">Non</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="#D9D9D9" />
                      <path
                        d="M18.625 11.5H6.375C6.14294 11.5 5.92038 11.6054 5.75628 11.7929C5.59219 11.9804 5.5 12.2348 5.5 12.5C5.5 12.7652 5.59219 13.0196 5.75628 13.2071C5.92038 13.3946 6.14294 13.5 6.375 13.5H18.625C18.8571 13.5 19.0796 13.3946 19.2437 13.2071C19.4078 13.0196 19.5 12.7652 19.5 12.5C19.5 12.2348 19.4078 11.9804 19.2437 11.7929C19.0796 11.6054 18.8571 11.5 18.625 11.5Z"
                        fill="white" />
                    </svg>
                  </template>
                </div>
              </template>
            </Column>
            <Column>
              <template #header>
                <div class="w-full text-center">
                  <p class="header-text">Student Profile</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex justify-content-center">
                  <Button label="Info" class="btn-orange" @click="showModal(data)" />
                </div>
              </template>
            </Column>
            <template #footer>
              <div class="flex flex-row align-items-center justify-content-between">
                <p>Showing data 1 to 10 of 256K entries</p>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </section>

  </section>

  <!-- modal -->
  <Dialog v-model:visible="visible" :value="guestListData" modal header="Header" :style="{ width: '40vw' }"
    :breakpoints="{ '764px': '90vw' }">
    <template #header>
      <div class="flex flex-row align-items-center my-2">
        <img :src="currentStudent?.image || '/assets/img/avatar-black.png'" class="modal-image mr-2 border-circle" />
        <p class="modal-student-name">{{ currentStudent?.name }}</p>
      </div>
    </template>
    <div class="flex pt-2">
      <p class="font-bold text-lg">
        Agile Business Analyst
      </p>
    </div>
    <div>
      <div class="flex flex-row align-items-center my-4 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="#659872" />
          <path
            d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
            fill="white" />
        </svg>
        <p class="modal-text">You have completed all of the assessment</p>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="modal-text mr-1">You passed the course! Your overall grade</div>
        <p class="modal text correct-color font-bold">100%</p>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Daily Task</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Quiz</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Assessment</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>

      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Midterm exam</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Final exam</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Overall Grade</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
    </div>
  </Dialog>
</template>
  
<style scoped>
:deep(.p-paginator) {
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  color: #6D5BD0;
  text-align: center;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  background-color: white;
}

.filter-button {
  border-radius: 6px;
  color: #808081;
  border: 1px solid var(--suggested-dark-grey, #808081);
  background: var(--backgrounds-primary, #fff);
}

.search-bar {
  border-radius: 6px;
  background: var(--suggested-light-grey, #EEE);
}

.download-button {
  border-radius: 6px;
  background: var(--suggested-pass-color, #E26954);
}

.paginator-arrow {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.header-text {
  color: white;
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
}

.progress-bar-container {
  width: 200px;
  height: 10px;
  background-color: #D9D9D9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #659872;
  transition: width 0.5s;
}

.progress-text {
  color: #000;
  font-size: 14px;
  font-family: Inter;
  font-weight: 700;
  letter-spacing: 0.7px;
}

.percatage-text {
  color: #000;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 160%;
}

.pass-text {
  color: var(--fonts-primary, #25213B);
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
}

.pass-icon {
  color: #659872;
}

.attendance-text {
  color: var(--fonts-primary, #25213B);
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
}

.info-button {
  border-radius: 6px;
  background: var(--suggested-pass-color, #E26954);
  color: white;
  width: 99px;
  height: 39px;
  flex-shrink: 0;
}

.data-image {
  width: 39px;
  height: 39px;
  flex-shrink: 0;
}

.name-text {
  color: var(--fonts-primary, #25213B);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
}

.name-email {
  color: var(--fonts-primary-variant, #6E6893);
  font-size: 14px;
  font-family: Inter;
  letter-spacing: 0.7px;
}

/* Modal Style */
.modal-image {
  width: 39px;
  height: 39px;
}

.modal-student-name {
  color: var(--font-1, #001125);
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 160%;
}

.modal-text {
  color: var(--font-1, #001125);
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 160%;
}

.correct-color {
  color: #659872;
}

.next-button {
  border-radius: 0px 5px 5px 0px;
  background: var(--suggested-light-grey, #EEE);
  border: none;
}

.line {
  background-color: #D9D5EC;
  padding: 1px;
}
</style>



<style lang="scss" scoped>
::v-deep(.detail-table) {
  .p-datatable-wrapper {
    border-radius: 5px;
  }

  .p-datatable-thead>tr>th {
    background: #006785;

    .header-text {
      color: var(--white, #FFF);
      text-align: center;
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    svg path {
      fill: white;
    }

    &:hover {
      background: #006785;
      color: var(--white, #FFF);
    }
  }
}

::v-deep(.p-datatable) {
  .p-datatable-footer {
    background: white;
    height: 55px;
    font-size: 14px;
    color: #B5B7C0;
    font-weight: 500;
  }

  .p-paginator-bottom {
    min-height: 3rem;

    .p-paginator {
      justify-content: flex-end;
      gap: 15px;
    }

    .p-paginator-pages {
      gap: 15px;
      display: flex;
    }

    .p-link {
      width: 27px;
      height: 27px;
      color: #404B52;
      font-family: Poppins;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
      letter-spacing: -0.14px;
      border-radius: 4px;
      border: 1px solid #EEE;
      background: #F5F5F5;
      border-radius: 4px;
      border: 1px solid #EEE;
      background: #F5F5F5;
      min-width: unset;

      &.p-highlight {
        color: white;
        border: 1px solid var(--svo-dark-color, #006785);
        background: var(--svo-dark-color, #006785);
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
    }
  }
}
</style>
