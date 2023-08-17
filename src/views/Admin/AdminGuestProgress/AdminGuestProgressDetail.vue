<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { courseDataMock } from '../AdminStudentProgress/Course.mock';
import { guestProgressDataMock } from './GuestProgress.mock';
import { guestListData } from './AdminGuestProgressDetailData/GuestProgressDetailDummyData'
import type { IGuest } from './AdminGuestProgressDetailData/GuestProgressDetail.type'

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

</script>

<template>
  <section class="px-2 sm:px-2">
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
            <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mt-1" />
            <span class="p-input-icon-left w-7 col-5 mt-1">
              <i class="pi pi-search search-icon ml-2" />
              <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm w-full" />
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
                <div>
                  <p class="header-text">Name</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-row align-items-center gap-2">
                  <img src="/assets/img/avatar.png" alt="" style="width: 40px; height: 40px">
                  <div class="flex flex-column">
                    <p class="name-text">{{ data.name }}</p>
                    <p class="name-email">{{ data.email }}</p>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="progress" sortable class="text-white">
              <template #header>
                <div>
                  <p class="header-text">Progress</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-column">
                  <div class="progress-bar-container my-2 flex flex-column">
                    <div class="progress-bar" :style="{ width: data.progress + '%' }"></div>
                  </div>
                  <p class="progress-text">{{ data.progress }} % completed</p>
                </div>
              </template>
            </Column>
            <Column field="percentage" sortable>
              <template #header>
                <div>
                  <p class="header-text">Percentage</p>
                </div>
              </template>
              <template #body="{ data }">
                <p class="percatage-text">{{ data.percentage }}</p>
              </template>
            </Column>
            <Column field="passFail" sortable>
              <template #header>
                <div>
                  <p class="header-text">Pass-Fail</p>
                </div>
              </template>
              <template #body="{ data }">
                <div class="flex flex-row align-items-center">
                  <p class="mr-2 pass-text">{{ data.passFail }}</p>
                  <img src="/assets/img/svg/correct.svg" alt="correct" />
                </div>
              </template>
            </Column>
            <Column>
              <template #header>
                <div>
                  <p class="header-text">Student Profile</p>
                </div>
              </template>
              <template #body="{ data }">
                <Button label="Info" class="btn-orange" @click="showModal(data)" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </section>

  </section>

  <!-- modal -->
  <Dialog v-model:visible="visible" :value="guestListData" modal header="Header" :style="{ width: '40vw' }"
    :breakpoints="{ '764px': '90vw' }">
    <template #header>
      <div class="flex flex-row align-items-center">
        <Avatar label="M" class="modal-image mr-2" shape="circle" />
        <p class="modal-student-name">{{ currentStudent?.name }}</p>
      </div>
    </template>
    <div class="flex pt-2">
      <p class="font-bold text-lg">
        Agile Business Analyst
      </p>
    </div>
    <div>
      <div class="flex flex-row align-items-center my-4">
        <i class="pi pi-check-circle mr-3 correct-color"></i>
        <p class="modal-text">You have completed all of the assessment</p>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <i class="pi pi-align-justify mr-3 "></i>
        <p class="modal-text mr-1">You passed the course! Your overall grade</p>
        <p class="modal text correct-color font-bold">100%</p>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <i class="pi pi-check-circle mr-3 correct-color"></i>
          <p class="modal-text">Daily Task</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <i class="pi pi-check-circle mr-3 correct-color"></i>
          <p class="modal-text">Quiz</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <i class="pi pi-check-circle mr-3 correct-color"></i>
          <p class="modal-text">Assessment</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>

      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <i class="pi pi-check-circle mr-3 correct-color"></i>
          <p class="modal-text">Midterm exam</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="flex f  lex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <i class="pi pi-check-circle mr-3 correct-color"></i>
          <p class="modal-text">Final exam</p>
        </div>
        <div class="flex flex-row ml-auto">
          <p class="modal-text mr-1">Grade:</p>
          <p class="modal text correct-color font-bold">100%</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="flex flex-row align-items-center my-4">
        <div class="flex flex-row align-items-center">
          <i class="pi pi-check-circle mr-3 correct-color"></i>
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

  .p-datatable-footer {
    background: white;
    height: 55px;
    font-size: 14px;
    color: #B5B7C0;
    font-weight: 500;
  }

  .p-paginator-bottom {
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
