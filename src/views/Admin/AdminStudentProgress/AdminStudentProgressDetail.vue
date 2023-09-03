<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { courseDataMock } from './Course.mock';
import router from '@/router';
import { useRoute } from 'vue-router';
import { type IStudent, mockStudentProgress } from './mockStudentProgress';

const studentData = ref<IStudent[]>(mockStudentProgress);

const visible = ref(false);
const currentStudent = ref<IStudent | null>(null);
const displayedDays = ref<string[]>([]);
const columns: { field: string; header: string; value: string }[] = [];
const showModal = (data: IStudent) => {
  currentStudent.value = data;
  displayedDays.value = data.days.slice(0, 1);
  visible.value = true;
  data.days.map((value, index) => {
    columns.push({ field: 'day_' + (index + 1), header: 'Day ' + (index + 1), value })
  })
};
const showButton = ref<{ prev: boolean; next: boolean }>({
  prev: false,
  next: false
})
const showNextDays = () => {
  let t = document.querySelector('.modal-table > .p-datatable-wrapper');
  if (t) {
    t.scrollTo(1000, 0)
    setTimeout(() => {
      showButton.value = { next: false, prev: true }
    }, 300)
  }
}
const showPrevDays = () => {
  const t = document.querySelector('.modal-table > .p-datatable-wrapper');
  if (t) {
    t.scrollTo(0, 0)
    setTimeout(() => {
      showButton.value = { next: true, prev: false }
    }, 300)
  }
}
const initialTable = () => {
  setTimeout(() => {
    // showNextDays();
    showButton.value = { next: true, prev: false }
  }, 300)
}
const checkedStudent = ref();

onMounted(() => {
  const route = useRoute();
  const courseId: string = route.params.courseId as unknown as string;
  const course = courseDataMock.find((v) => v.id === courseId)
  if (course) {
    selectedCourse.value = course;
  }
})

const courses = ref(courseDataMock);
const selectedCourse = ref();

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
      class="grid overflow-hidden flex-column md:flex-row pl-0 pr-0 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2">
      <div class="col-12 flex flex-row align-items-center my-2">
        <i class="pi pi-chevron-left mr-3 back-arrow cursor-pointer" @click="$router.push('/admin/progress/student')"></i>
        <h1 class="title-head">Student Progress</h1>
      </div>
      <div class="grid col-12 p-0 m-0">
        <div class="col-12">
          <Dropdown optionLabel="courseName" :options="courses" v-model="selectedCourse" placeholder="Course Name"
            class="w-full md:w-20rem md:flex" :class="{ 'selected': selectedCourse }">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <img :alt="slotProps.value.courseName" :src="slotProps.value.image" class="mr-2" style="width: 60px;" />
                <div class="text-900 font-medium text-2xl mx-4">{{ slotProps.value.courseName }}</div>
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
        <div class="col-12 flex flex-row justify-content-between filter-search pr-3">
          <div class="col-10 md:col-10 lg:col-10 lg:col-10 grid gap-2">
            <Button label="Filter" icon="pi pi-filter-fill" size="small"
              class="filter-button sm:mr-3 col-1 h-3rem w-auto" />
            <span class="p-input-icon-left w-7 col-8 p-0 h-3rem">
              <i class="pi pi-search search-icon" />
              <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm w-full h-full"
                style="width: 450px;" />
            </span>
          </div>
          <Button label="DOWNLOAD" icon="pi pi-download" size="small" class="btn-orange hidden md:block"
            style="width: 150px; height:50px" />
          <Button icon="pi pi-download" size="small" class="btn-orange col-2 block md:hidden" />
        </div>

        <!-- table -->
        <div class="col-12 pr-3">
          <DataTable :value="studentData" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem" sortMode="multiple" dataKey="id" v-model:selection="checkedStudent"
            class="shadow-2 detail-table"
            :paginatorTemplate="{
                '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
                '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            }"
            :pageLinkSize="3"
            apaginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="name" class="text-white" headerStyle="width: 4rem">
              <template #header>
                <div class="flex justify-content-center">
                  <p class="header-text">Name</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-row align-items-center">
                  <img :src="data.image" alt="" class="mr-3 w-3rem h-3rem border-circle object-cover">
                  <div class="flex flex-column">
                    <p class="name-text">{{ data.name }}</p>
                    <p class="name-email">{{ data.email }}</p>
                  </div>
                </div>
              </template>
            </Column>
            <Column sortable field="progress" class="text-white center">
              <template #sorticon="{ sorted, sortOrder }">
                <div class="flex justify-content-center align-items-center">
                  <template v-if="!sorted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                      <path
                        d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                        fill="white" />
                    </svg>
                  </template>
                  <template v-else>
                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0" xmlns="http://www.w3.org/2000/svg"
                      width="10.033" height="5">
                      <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                    </svg>
                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0" xmlns="http://www.w3.org/2000/svg"
                      width="10.033" height="5">
                      <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                    </svg>
                  </template>
                </div>
              </template>
              <template #header>
                <p class="header-text">Progress</p>
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
            <Column sortable field="percentage" class="center">
              <template #sorticon="{ sorted, sortOrder }">
                <div class="flex justify-content-center align-items-center">
                  <template v-if="!sorted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                      <path
                        d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                        fill="white" />
                    </svg>
                  </template>
                  <template v-else>
                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0" xmlns="http://www.w3.org/2000/svg"
                      width="10.033" height="5">
                      <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                    </svg>
                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0" xmlns="http://www.w3.org/2000/svg"
                      width="10.033" height="5">
                      <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                    </svg>
                  </template>
                </div>
              </template>
              <template #header>
                <p class="header-text">Percentage</p>
              </template>
              <template #body="{ data }">
                <div class="flex justify-content-center w-full">
                  <p class="percatage-text">{{ data.percentage }}%</p>
                </div>
              </template>
            </Column>
            <Column sortable field="passFail" class="center">
              <template #sorticon="{ sorted, sortOrder }">
                <div class="flex justify-content-center align-items-center">
                  <template v-if="!sorted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                      <path
                        d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                        fill="white" />
                    </svg>
                  </template>
                  <template v-else>
                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0" xmlns="http://www.w3.org/2000/svg"
                      width="10.033" height="5">
                      <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                    </svg>
                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0" xmlns="http://www.w3.org/2000/svg"
                      width="10.033" height="5">
                      <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                    </svg>
                  </template>
                </div>
              </template>
              <template #header>
                <p class="header-text">P/F</p>
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
            <Column field="attendance" class="center">
              <template #header>
                <p class="header-text">Attendance</p>
              </template>
              <template #body="{ data }">
                <div>
                  <p class="attendance-text">{{ data.attendance }}/5</p>
                </div>
              </template>
            </Column>
            <Column>
              <template #header>
                <div class="flex justify-content-center">
                  <p class="header-text">Student Profile</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex justify-content-center w-full align-items-center">
                  <Button label="Info" class="btn-orange" @click="showModal(data)" style="width: 120px; heigth: 39px" />
                </div>
              </template>
            </Column>

          </DataTable>
        </div>
      </div>
    </section>
  </section>

  <!-- modal -->
  <Dialog v-model:visible="visible" @show="initialTable" :value="studentData" modal header="Header"
    :style="{ width: '40vw' }" :breakpoints="{ '764px': '90vw' }">
    <template #header>
      <div class="flex flex-row align-items-center">
        <Avatar :image="currentStudent?.image" class="modal-image mr-2" shape="circle" />
        <p class="modal-student-name">{{ currentStudent?.name }}</p>
      </div>
    </template>
    <div class="flex flex-row py-4 pr-4 mr-2">
      <!-- PREV BUTTON -->
      <button class="prev-button cursor-pointer" v-bind:class="{ 'hidden': !showButton.prev }" @click="showPrevDays">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M9.26896 4.66854C9.45201 4.8516 9.45201 5.1484 9.26896 5.33146L7.10041 7.5L9.26896 9.66854C9.45201 9.8516 9.45201 10.1484 9.26896 10.3315C9.0859 10.5145 8.7891 10.5145 8.60604 10.3315L6.10604 7.83146C5.92299 7.6484 5.92299 7.3516 6.10604 7.16854L8.60604 4.66854C8.7891 4.48549 9.0859 4.48549 9.26896 4.66854Z"
            fill="black" />
        </svg></button>
      <DataTable class="w-full modal-table" :value="[{}]">
        <template #header>
          <div class="flex justify-content-center margin-auto">
            <p class="p-0 m-0 text-md font-bold">Attendance {{ currentStudent?.attendance }}/{{
              currentStudent?.days.length }} ({{
    ((currentStudent?.attendance || 0) / 10) * 100 }}%)</p>
          </div>
        </template>
        <template v-for="col of columns">
          <Column field="status">
            <template #header>
              <div class="w-5rem flex justify-content-center align-items-center font-medium">
                {{ col.header }}
              </div>
            </template>
            <template #body>
              <div class="w-5rem flex justify-content-center align-items-center">
                <svg v-if="col.value === 'passed'" xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                  viewBox="0 0 15 15" fill="none">
                  <rect width="15" height="15" rx="7.5" fill="#659872" />
                  <path
                    d="M11.6938 4.50519C11.6357 4.44661 11.5666 4.40011 11.4904 4.36838C11.4142 4.33665 11.3325 4.32031 11.25 4.32031C11.1675 4.32031 11.0858 4.33665 11.0097 4.36838C10.9335 4.40011 10.8644 4.44661 10.8063 4.50519L6.15003 9.16769L4.19378 7.20519C4.13345 7.14691 4.06224 7.10109 3.98421 7.07034C3.90617 7.03959 3.82284 7.0245 3.73898 7.02596C3.65512 7.02741 3.57236 7.04536 3.49544 7.07879C3.41851 7.11223 3.34893 7.16049 3.29065 7.22081C3.23238 7.28114 3.18656 7.35235 3.15581 7.43039C3.12505 7.50842 3.10997 7.59175 3.11142 7.67561C3.11287 7.75947 3.13083 7.84223 3.16426 7.91915C3.1977 7.99608 3.24595 8.06566 3.30628 8.12394L5.70628 10.5239C5.76438 10.5825 5.83351 10.629 5.90967 10.6607C5.98583 10.6925 6.06752 10.7088 6.15003 10.7088C6.23254 10.7088 6.31423 10.6925 6.39039 10.6607C6.46655 10.629 6.53568 10.5825 6.59378 10.5239L11.6938 5.42394C11.7572 5.36541 11.8078 5.29438 11.8425 5.21532C11.8771 5.13625 11.895 5.05088 11.895 4.96456C11.895 4.87825 11.8771 4.79287 11.8425 4.71381C11.8078 4.63475 11.7572 4.56371 11.6938 4.50519Z"
                    fill="white" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect width="15" height="15" rx="7.5" fill="#BE2F00" />
                  <path
                    d="M8.05038 7.49967L10.5095 5.04415C10.583 4.97064 10.6243 4.87094 10.6243 4.76698C10.6243 4.66302 10.583 4.56332 10.5095 4.48981C10.436 4.4163 10.3363 4.375 10.2324 4.375C10.1284 4.375 10.0288 4.4163 9.95525 4.48981L7.5 6.94923L5.04475 4.48981C4.97125 4.4163 4.87155 4.375 4.76761 4.375C4.66366 4.375 4.56397 4.4163 4.49046 4.48981C4.41696 4.56332 4.37567 4.66302 4.37567 4.76698C4.37567 4.87094 4.41696 4.97064 4.49046 5.04415L6.94962 7.49967L4.49046 9.95518C4.45388 9.99147 4.42484 10.0346 4.40502 10.0822C4.3852 10.1298 4.375 10.1808 4.375 10.2324C4.375 10.2839 4.3852 10.3349 4.40502 10.3825C4.42484 10.4301 4.45388 10.4732 4.49046 10.5095C4.52675 10.5461 4.56992 10.5752 4.61749 10.595C4.66506 10.6148 4.71608 10.625 4.76761 10.625C4.81914 10.625 4.87016 10.6148 4.91772 10.595C4.96529 10.5752 5.00846 10.5461 5.04475 10.5095L7.5 8.05011L9.95525 10.5095C9.99154 10.5461 10.0347 10.5752 10.0823 10.595C10.1298 10.6148 10.1809 10.625 10.2324 10.625C10.2839 10.625 10.3349 10.6148 10.3825 10.595C10.4301 10.5752 10.4732 10.5461 10.5095 10.5095C10.5461 10.4732 10.5752 10.4301 10.595 10.3825C10.6148 10.3349 10.625 10.2839 10.625 10.2324C10.625 10.1808 10.6148 10.1298 10.595 10.0822C10.5752 10.0346 10.5461 9.99147 10.5095 9.95518L8.05038 7.49967Z"
                    fill="white" />
                </svg>
              </div>
            </template>
          </Column>
        </template>
      </DataTable>
      <!-- NEXT BUTTON -->
      <button class="next-button cursor-pointer" v-bind:class="{ 'hidden': !showButton.next }" @click="showNextDays">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M6.73104 4.66854C6.9141 4.48549 7.2109 4.48549 7.39396 4.66854L9.89396 7.16854C10.077 7.3516 10.077 7.6484 9.89396 7.83146L7.39396 10.3315C7.2109 10.5145 6.9141 10.5145 6.73104 10.3315C6.54799 10.1484 6.54799 9.8516 6.73104 9.66854L8.89959 7.5L6.73104 5.33146C6.54799 5.1484 6.54799 4.8516 6.73104 4.66854Z"
            fill="black" />
        </svg></button>
    </div>
    <div class="px-2">
      <div class="flex flex-row align-items-center -mt-3 mb-2 gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="#659872" />
          <path
            d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
            fill="white" />
        </svg>
        <p class="modal-text">You have completed all of the assessment</p>
      </div>
      <div class="flex flex-row align-items-center my-4 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 14H8C7.73478 14 7.48043 14.1054 7.29289 14.2929C7.10536 14.4804 7 14.7348 7 15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16H16C16.2652 16 16.5196 15.8946 16.7071 15.7071C16.8946 15.5196 17 15.2652 17 15C17 14.7348 16.8946 14.4804 16.7071 14.2929C16.5196 14.1054 16.2652 14 16 14ZM16 10H10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11C9 11.2652 9.10536 11.5196 9.29289 11.7071C9.48043 11.8946 9.73478 12 10 12H16C16.2652 12 16.5196 11.8946 16.7071 11.7071C16.8946 11.5196 17 11.2652 17 11C17 10.7348 16.8946 10.4804 16.7071 10.2929C16.5196 10.1054 16.2652 10 16 10ZM20 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4ZM19 19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H11V7C11 7.26522 11.1054 7.51957 11.2929 7.70711C11.4804 7.89464 11.7348 8 12 8C12.2652 8 12.5196 7.89464 12.7071 7.70711C12.8946 7.51957 13 7.26522 13 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19V19Z"
            fill="black" />
        </svg>
        <p class="modal-text mr-1">You passed the course! Your overall grade</p>
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
      <div class="flex f  lex-row align-items-center my-4">
        <div class="flex flex-row align-items-center gap-2">
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
      <div class="flex flex-row align-items-center mt-3 mb-4">
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
  



<style lang="scss" scoped>
:deep(.p-paginator) {
  height: 70px;
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
  background-color: #EFAE1C;
  transition: width 0.5s;
}

.progress-text {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.7px;
}

.percatage-text {
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
}

.pass-text {
  color: var(--fonts-primary, #25213B);
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.pass-icon {
  color: #659872;
}

.attendance-text {
  color: var(--fonts-primary, #25213B);
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
  font-size: 16px;
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
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
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

.prev-button {
  border-radius: 5px 0px 0px 5px;
  background: var(--suggested-light-grey, #EEE);
  border: none;
}


.line {
  background-color: #D9D5EC;
  padding: 1px;
}

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

  .p-sortable-column-icon {
    background: url("/assets/icon/plus.png");
    // background: red;
  }
}

::v-deep(.modal-table) {
  border-radius: 5px;
  border: 1px solid var(--suggested-light-grey, #EEE);
  background: #FFF;

  .p-datatable-header {
    width: max-content;
    min-width: 100%;
    padding: 5px;
    background: rgba(250, 250, 250, 0.50);
  }

  .p-datatable-tbody {
    overflow: hidden;
  }

  .p-datatable-wrapper {
    overflow: hidden;
    scroll-behavior: smooth;
  }
}
</style>
