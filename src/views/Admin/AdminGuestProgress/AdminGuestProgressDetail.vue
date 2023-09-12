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
  <section>
    <section
      class="grid overflow-hidden flex-column md:flex-row" style="padding: 10px;">
      <div class="col-12 flex flex-row align-items-center">
        <i class="pi pi-chevron-left back-arrow cursor-pointer" style="padding: 10px" @click="$router.push('/admin/progress/guest')"></i>
        <h1 class="title-head">Guest Progress</h1>
      </div>
      <div class="grid col-12 p-0 m-0">
        <div class="col-12">
          <Dropdown optionLabel="courseName" :options="courses" v-model="selectedCourse" placeholder="Course Name"
            class="w-full md:flex dropdown-course" :class="{ 'selected': selectedCourse }">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <img :alt="slotProps.value.courseName" :src="slotProps.value.image"  style="width: 55px; margin-right: 10px" />
                <h1>{{ slotProps.value.courseName }}</h1>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <img :alt="slotProps.option.courseName" :src="slotProps.option.image"  style="width: 55px; margin-right: 10px" />
                <div class="text-900 font-bold text-lg">{{ slotProps.option.courseName }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="col-12 flex flex-row align-items-center justify-content-between filter-search px-0 sm:px-3 py-0 ml-2 sm:ml-0">
          <div class="col-12 md:col-10 lg:col-10 lg:col-10 grid grid-nogutter gap-2 align-items-center filter-container ">
            <div class="instructor flex mt-1 mr-1 align-items-center gap-2 col-12 justify-content-center sm:col-1"
              v-if="selectedGuest">
              <img :src="selectedGuest.image" class="w-2rem h-2rem border-circle" />
              <p>{{ selectedGuest.code }}</p>
            </div>
            <Button size="small" class="filter-button sm:col-1 md:col-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_2726_4798)">
                  <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#808081" />
                </g>
                <defs>
                  <clipPath id="clip0_2726_4798">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>Filter</p>
            </Button>
            <div class="p-input-icon-left sm:w-7 w-6 col-5 mt-1 sm:mt-0 p-0 search-input">
              <i class="pi pi-search search-icon ml-2" />
              <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm w-full h-full" />
            </div>
            <Button size="small" class="col-2 download ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.73798 0.25C5.96436 0.25 5.31904 0.841231 5.25148 1.61189C5.11024 3.22317 5.0745 4.84164 5.14436 6.45693C5.06003 6.46258 4.97571 6.46847 4.8914 6.47462L3.4019 6.5832C2.44985 6.6526 1.91764 7.71416 2.43163 8.51854C3.5278 10.2341 4.94026 11.7254 6.59369 12.9132L7.19043 13.3418C7.67425 13.6894 8.32591 13.6894 8.80972 13.3418L9.40646 12.9132C11.0599 11.7254 12.4724 10.2341 13.5685 8.51855C14.0825 7.71416 13.5503 6.6526 12.5983 6.5832L11.1088 6.47462C11.0245 6.46847 10.9401 6.46258 10.8558 6.45693C10.9257 4.84164 10.8899 3.22317 10.7487 1.61188C10.6811 0.841229 10.0358 0.25 9.26219 0.25H6.73798ZM6.68157 7.11473C6.56786 5.3275 6.58909 3.53417 6.74513 1.75H9.25503C9.41106 3.53417 9.4323 5.3275 9.31859 7.11473C9.30584 7.31509 9.37396 7.51221 9.5077 7.66195C9.64144 7.8117 9.82964 7.90156 10.0302 7.91144C10.3535 7.92737 10.6767 7.94711 10.9997 7.97065L12.0815 8.04951C11.1219 9.46281 9.92044 10.6971 8.53133 11.6949L8.00008 12.0765L7.46882 11.6949C6.07972 10.6971 4.87824 9.4628 3.9187 8.04951L5.00046 7.97065C5.32345 7.94711 5.64664 7.92737 5.96999 7.91144C6.17052 7.90156 6.35871 7.81169 6.49246 7.66195C6.6262 7.51221 6.69432 7.31509 6.68157 7.11473Z"
                  fill="white" />
                <path
                  d="M1.75 14C1.75 13.5858 1.41421 13.25 1 13.25C0.585786 13.25 0.25 13.5858 0.25 14V16C0.25 16.9665 1.0335 17.75 2 17.75H14C14.9665 17.75 15.75 16.9665 15.75 16V14C15.75 13.5858 15.4142 13.25 15 13.25C14.5858 13.25 14.25 13.5858 14.25 14V16C14.25 16.1381 14.1381 16.25 14 16.25H2C1.86193 16.25 1.75 16.1381 1.75 16V14Z"
                  fill="white" />
              </svg>
              <p>DOWNLOAD</p>
            </Button>
            <Button size="small" class="col-2 download block md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.73798 0.25C5.96436 0.25 5.31904 0.841231 5.25148 1.61189C5.11024 3.22317 5.0745 4.84164 5.14436 6.45693C5.06003 6.46258 4.97571 6.46847 4.8914 6.47462L3.4019 6.5832C2.44985 6.6526 1.91764 7.71416 2.43163 8.51854C3.5278 10.2341 4.94026 11.7254 6.59369 12.9132L7.19043 13.3418C7.67425 13.6894 8.32591 13.6894 8.80972 13.3418L9.40646 12.9132C11.0599 11.7254 12.4724 10.2341 13.5685 8.51855C14.0825 7.71416 13.5503 6.6526 12.5983 6.5832L11.1088 6.47462C11.0245 6.46847 10.9401 6.46258 10.8558 6.45693C10.9257 4.84164 10.8899 3.22317 10.7487 1.61188C10.6811 0.841229 10.0358 0.25 9.26219 0.25H6.73798ZM6.68157 7.11473C6.56786 5.3275 6.58909 3.53417 6.74513 1.75H9.25503C9.41106 3.53417 9.4323 5.3275 9.31859 7.11473C9.30584 7.31509 9.37396 7.51221 9.5077 7.66195C9.64144 7.8117 9.82964 7.90156 10.0302 7.91144C10.3535 7.92737 10.6767 7.94711 10.9997 7.97065L12.0815 8.04951C11.1219 9.46281 9.92044 10.6971 8.53133 11.6949L8.00008 12.0765L7.46882 11.6949C6.07972 10.6971 4.87824 9.4628 3.9187 8.04951L5.00046 7.97065C5.32345 7.94711 5.64664 7.92737 5.96999 7.91144C6.17052 7.90156 6.35871 7.81169 6.49246 7.66195C6.6262 7.51221 6.69432 7.31509 6.68157 7.11473Z"
                  fill="white" />
                <path
                  d="M1.75 14C1.75 13.5858 1.41421 13.25 1 13.25C0.585786 13.25 0.25 13.5858 0.25 14V16C0.25 16.9665 1.0335 17.75 2 17.75H14C14.9665 17.75 15.75 16.9665 15.75 16V14C15.75 13.5858 15.4142 13.25 15 13.25C14.5858 13.25 14.25 13.5858 14.25 14V16C14.25 16.1381 14.1381 16.25 14 16.25H2C1.86193 16.25 1.75 16.1381 1.75 16V14Z"
                  fill="white" />
              </svg>
            </Button>
          </div>
        </div>

        <!-- table -->
        <div class="col-12 pt-0">
          <DataTable :value="guestListData" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortMode="multiple" tableStyle="min-width: 50rem" dataKey="id" v-model:selection="checkedStudent"
            class="shadow-2 detail-table" :paginatorTemplate="{
              '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
              '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            }" :pageLinkSize="3" currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
            <Column selectionMode="multiple" headerStyle="width: 0rem"></Column>
            <Column field="name" class="text-white" headerStyle="width: 20%">
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
                <div class="flex justify-content-center align-items-center">
                  <p class="header-text">Progress</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-column">
                  <div class="progress-bar-container flex flex-column justify-content-center w-full">
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
                <div class="flex justify-content-center">
                  <p class="header-text">Percentage</p>
                </div>
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
            <Column headerStyle="width: 15%">
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

          </DataTable>
        </div>
      </div>
    </section>

  </section>

  <!-- modal -->
  <Dialog :dismissable-mask="true" v-model:visible="visible" :value="guestListData" modal header="Header" :style="{ width: '40vw' }"
    :breakpoints="{ '764px': '90vw' }">
    <template #header>
      <div class="flex flex-row align-items-center" style="padding: 0px 10px;">
        <img :src="currentStudent?.image || '/assets/img/avatar-black.png'" class="modal-image border-circle" style="margin-right: 10px"/>
        <p class="modal-student-name">{{ currentStudent?.name }}</p>
      </div>
    </template>
    <div class="flex" style="padding: 15px 10px 5px 10px; gap: 20px">
      <p class="font-bold text-lg">
        Agile Business Analyst
      </p>
    </div>
    <div class="flex flex-column" style="padding: 10px; gap: 20px">
      <div class="flex flex-row align-items-center" style="gap: 10px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="#659872" />
          <path
            d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
            fill="white" />
        </svg>
        <p class="modal-text">You have completed all of the assessment</p>
      </div>
      <div class="flex flex-row align-items-center" style="gap: 10px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 14H8C7.73478 14 7.48043 14.1054 7.29289 14.2929C7.10536 14.4804 7 14.7348 7 15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16H16C16.2652 16 16.5196 15.8946 16.7071 15.7071C16.8946 15.5196 17 15.2652 17 15C17 14.7348 16.8946 14.4804 16.7071 14.2929C16.5196 14.1054 16.2652 14 16 14ZM16 10H10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11C9 11.2652 9.10536 11.5196 9.29289 11.7071C9.48043 11.8946 9.73478 12 10 12H16C16.2652 12 16.5196 11.8946 16.7071 11.7071C16.8946 11.5196 17 11.2652 17 11C17 10.7348 16.8946 10.4804 16.7071 10.2929C16.5196 10.1054 16.2652 10 16 10ZM20 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4ZM19 19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H11V7C11 7.26522 11.1054 7.51957 11.2929 7.70711C11.4804 7.89464 11.7348 8 12 8C12.2652 8 12.5196 7.89464 12.7071 7.70711C12.8946 7.51957 13 7.26522 13 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19V19Z" fill="black"/>
          </svg>
        <div class="modal-text mr-1">You passed the course! Your overall grade</div>
        <p class="modal text correct-color font-bold">100%</p>
      </div>
      <div class="flex flex-row align-items-center">
        <div class="flex flex-row align-items-center" style="gap: 10px;">
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
      <div class="flex flex-row align-items-center">
        <div class="flex flex-row align-items-center" style="gap: 10px;">
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
      <div class="flex flex-row align-items-center">
        <div class="flex flex-row align-items-center" style="gap: 10px;">
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

      <div class="flex flex-row align-items-center">
        <div class="flex flex-row align-items-center" style="gap: 10px;">
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
      <div class="flex flex-row align-items-center">
        <div class="flex flex-row align-items-center" style="gap: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="#659872" />
            <path
              d="M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z"
              fill="white" />
          </svg>
          <p class="modal-text">Final Exam</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="flex flex-row align-items-center">
        <div class="flex flex-row align-items-center" style="gap: 10px;">
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
:deep(.p-paginator) {}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  color: #6D5BD0;
  text-align: center;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  background-color: white;
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
}
</style>
