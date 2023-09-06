<template>
  <section class="px-2">
    <section class="grid overflow-hidden flex-column md:flex-row px-2 md:px-0 lg:px-0 xl:px-0 py-2">
      <h1 class="col-12 inter-normal black-1" style="font-size: 35px; font-weight: 700;">Student Attendance</h1>
      <div class="pl-2 col-12 flex flex-column gap-2 my-2">
        <!-- FILTER -->
        <div class="flex justify-content-start md:justify-content-between align-items-center w-full">
          <div class="flex flex-row align-items-center filter-search align-items-center">
            <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mr-3 inter gap-2">
              <template #icon>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_2563_130347)">
                      <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#808081" />
                    </g>
                    <defs>
                      <clipPath id="clip0_2563_130347">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </template>
            </Button>
            <span class="p-input-icon-left mr-3">
              <i class="pi pi-search search-icon" />
              <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm w-25rem" />
            </span>
          </div>
          <Button label="DOWNLOAD" size="small" class="btn-orange btn-download gap-2">
            <template #icon>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.73798 0.25C5.96436 0.25 5.31904 0.841231 5.25148 1.61189C5.11024 3.22317 5.0745 4.84164 5.14436 6.45693C5.06003 6.46258 4.97571 6.46847 4.8914 6.47462L3.4019 6.5832C2.44985 6.6526 1.91764 7.71416 2.43163 8.51854C3.5278 10.2341 4.94026 11.7254 6.59369 12.9132L7.19043 13.3418C7.67425 13.6894 8.32591 13.6894 8.80972 13.3418L9.40646 12.9132C11.0599 11.7254 12.4724 10.2341 13.5685 8.51855C14.0825 7.71416 13.5503 6.6526 12.5983 6.5832L11.1088 6.47462C11.0245 6.46847 10.9401 6.46258 10.8558 6.45693C10.9257 4.84164 10.8899 3.22317 10.7487 1.61188C10.6811 0.841229 10.0358 0.25 9.26219 0.25H6.73798ZM6.68157 7.11473C6.56786 5.3275 6.58909 3.53417 6.74513 1.75H9.25503C9.41106 3.53417 9.4323 5.3275 9.31859 7.11473C9.30584 7.31509 9.37396 7.51221 9.5077 7.66195C9.64144 7.8117 9.82964 7.90156 10.0302 7.91144C10.3535 7.92737 10.6767 7.94711 10.9997 7.97065L12.0815 8.04951C11.1219 9.46281 9.92044 10.6971 8.53133 11.6949L8.00008 12.0765L7.46882 11.6949C6.07972 10.6971 4.87824 9.4628 3.9187 8.04951L5.00046 7.97065C5.32345 7.94711 5.64664 7.92737 5.96999 7.91144C6.17052 7.90156 6.35871 7.81169 6.49246 7.66195C6.6262 7.51221 6.69432 7.31509 6.68157 7.11473Z"
                    fill="white" />
                  <path
                    d="M1.75 14C1.75 13.5858 1.41421 13.25 1 13.25C0.585786 13.25 0.25 13.5858 0.25 14V16C0.25 16.9665 1.0335 17.75 2 17.75H14C14.9665 17.75 15.75 16.9665 15.75 16V14C15.75 13.5858 15.4142 13.25 15 13.25C14.5858 13.25 14.25 13.5858 14.25 14V16C14.25 16.1381 14.1381 16.25 14 16.25H2C1.86193 16.25 1.75 16.1381 1.75 16V14Z"
                    fill="white" />
                </svg>
              </div>
            </template>
          </Button>
        </div>
      </div>
      <div class="col-12 flex flex-column flex-wrap md:flex-row md:p-0 md:m-0">
        <div class="flex flex-row mb-3 px-0 md:px-2 lg:px-0">
          <Dropdown optionLabel="name" v-model="selectedMonth" placeholder="Month" :options="monthList"
            class="w-10rem mr-2" style="height: 52px">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div class="inter-normal black-2" style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div class="inter-normal black-2" style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown optionLabel="name" v-model="selectedYear" placeholder="Year" :options="yearList" class="w-8rem mr-2"
            style="height: 52px">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div class="inter-normal black-2" style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div class="inter-normal black-2" style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <Dropdown optionLabel="courseName" :options="courseList" v-model="selectedCourse" placeholder="Course Name"
          class="w-full md:w-16rem md:flex" style="height: 52px">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <img :alt="slotProps.value.courseName" :src="slotProps.value.image" class="mr-2"
                style="width: 55px; height: 30px" />
              <div class="inter-normal black-2" style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{ slotProps.value.courseName }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img :alt="slotProps.option.courseName" :src="slotProps.option.image" class="mr-2"
                style="width: 55px; height: 30px" />
              <div class="inter-normal black-2" style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{ slotProps.option.courseName }}</div>
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
        '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
        '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
      }" :pageLinkSize="3" currentPageReportTemplate='Showing data {first} to {last} of {totalRecords} entries'
        class="col-12" @page="pageChanged" />
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
@import "/src/assets/global.scss";
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
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
::v-deep(.filter-button) {
  align-items: center;
  .p-button-label {
    color: var(--Suggested-dark-grey, #808081);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}

::v-deep(.btn-download) {
  align-items: center;
  .p-button-label {
    color: var(--backgrounds-primary, #FFF);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }
}

::v-deep(.p-dropdown) {
  background: white;

  .p-dropdown-label {
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.6px;
  }
}
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
  grid-template-columns: repeat(5, 216px);
  display: grid;

  @media screen and (min-width: 1281px) and (max-width: 1560px) {
    grid-template-columns: repeat(5, 216px);
  }

  @media screen and (min-width: 1025px) and (max-width: 1280px) {
    grid-template-columns: repeat(4, 216px);
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 216px);
  }

  @media screen and (min-width: 466px) and (max-width: 768px) {
    grid-template-columns: repeat(3, 33%);
  }

  @media screen and (max-width: 465px) {
    grid-template-columns: repeat(2, 50%);
  }
}</style>