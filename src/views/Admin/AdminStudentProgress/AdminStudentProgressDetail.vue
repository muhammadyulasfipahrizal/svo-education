<script setup lang="ts">
import { ref } from 'vue';

interface IStudent {
  name: string;
  email: string;
  progress: number;
  percentage: string;
  passFail: string;
  attendance: string;
  days: string[];
}

const studentData = ref<IStudent[]>([
  {
    name: 'John Tason',
    email: 'JohnToson@gmail.com',
    progress: 50,
    percentage: '80%',
    passFail: 'Passed',
    attendance: '5/10',
    days: [
      'passed',
      'passed',
      'passed',
      'passed',
      'not passed',
      'not passed',
      'not passed',
      'not passed',
      'not passed',
      'not passed',
    ],
  },
  {
    name: 'Isabel Tray',
    email: 'IsabelT@gmail.com',
    progress: 80,
    percentage: '100%',
    passFail: 'Passed',
    attendance: '9/10',
    days: [
      'passed',
      'passed',
      'passed',
      'passed',
      'not passed',
      'not passed',
      'not passed',
      'not passed',
      'not passed',
      'not passed',
    ],
  },
]);

const visible = ref(false);
const currentStudent = ref<IStudent | null>(null);
const displayedDays = ref<string[]>([]);

const showModal = (data: IStudent) => {
  currentStudent.value = data;
  displayedDays.value = data.days.slice(0, 1);
  visible.value = true;
};
const showNextDays = () => {
  //
}
</script>

<template>
  <div class="flex flex-column">
    <Dropdown optionLabel="name" placeholder="Course Name" class="w-18rem md:w-16rem md:h-3rem mr-2 mt-1 mb-3" />
    <div class=" flex flex-row align-items-center mb-3 filter-search">
      <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mr-3" />
      <span class="p-input-icon-left">
        <i class="pi pi-search search-icon" />
        <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm" />
      </span>
      <Button label="DOWNLOAD" icon="pi pi-download" size="small" class="download-button ml-auto" />
    </div>

    <!-- table -->
    <DataTable class="detail-table" :value="studentData" paginator :rows="5">
      <template #paginatorfirstpagelinkicon></template>
      <template #paginatorprevpagelinkicon>
        <i class="pi pi-chevron-left"></i>
      </template>
      <template #paginatornextpagelinkicon>
        <p>99</p>
      </template>
      <template #paginatorlastpagelinkicon>
        <i class="pi pi-chevron-right"></i>
      </template>
      <Column selectionMode="multiple"></Column>
      <Column field="name" style="text-white">
        <template #header>
          <div>
            <p class="header-text">Name</p>
          </div>
        </template>
        <template #body="{ data }">
          <div class="flex flex-row align-items-center">
            <Avatar label="M" class="data-image mr-2" shape="circle" />
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
            <p class="mr-2 pass-text">{{ data.passfail }}</p>
            <i class="pi pi-check-circle pass-icon"></i>
          </div>
        </template>
      </Column>
      <Column field="attendance">
        <template #header>
          <div>
            <p class="header-text">Attendance</p>
          </div>
        </template>
        <template #body="{ data }">
          <div>
            <p class="attendance-text">{{ data.attendance }}</p>
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

    <!-- modal -->
    <Dialog v-model:visible="visible" :value="studentData" modal header="Header">
      <template #header>
        <div class="flex flex-row align-items-center">
          <Avatar label="M" class="modal-image mr-2" shape="circle" />
          <p class="modal-student-name">{{ currentStudent?.name }}</p>
        </div>
      </template>
      <div class="flex flex-row">
        <DataTable class="w-full modal-table" :value="displayedDays">
          <template #header>
            <div class="flex justify-content-center margin-auto">
              <p>attendance {{ currentStudent?.attendance }} (90%)</p>
            </div>
          </template>
          <Column field="status" header="Day 1">
            <template #body="{ data }">
              <i v-if="data.day1 === 'passed'" class="pi pi-check-circle correct-color"></i>
              <i v-else class="pi pi-exclamation-circle correct-color"></i>
            </template>
          </Column>
          <Column field="status" header="Day 2">
            <template #body="{ data }">
              <i v-if="data.day1 === 'passed'" class="pi pi-check-circle correct-color"></i>
              <i v-else class="pi pi-exclamation-circle correct-color"></i>
            </template>
          </Column>
          <Column field="status" header="Day 3">
            <template #body="{ data }">
              <i v-if="data.day1 === 'passed'" class="pi pi-check-circle correct-color"></i>
              <i v-else class="pi pi-exclamation-circle correct-color"></i>
            </template>
          </Column>
          <Column field="status" header="Day 4">
            <template #body="{ data }">
              <i v-if="data.day1 === 'passed'" class="pi pi-check-circle correct-color"></i>
              <i v-else class="pi pi-exclamation-circle correct-color"></i>
            </template>
          </Column>
          <Column field="status" header="Day 5">
            <template #body="{ data }">
              <i v-if="data.day1 === 'passed'" class="pi pi-check-circle correct-color"></i>
              <i v-else class="pi pi-exclamation-circle correct-color"></i>
            </template>
          </Column>
        </DataTable>
        <button class="next-button cursor-pointer" @click="showNextDays">></button>
      </div>
      <div>
        <div class="flex flex-row align-items-center my-4">
          <i class="pi pi-check mr-3 correct-color"></i>
          <p class="modal-text">You have completed all of the assessment</p>
        </div>
        <div class="flex flex-row align-items-center my-4">
          <i class="pi pi-align-justify mr-3 "></i>
          <p class="modal-text mr-1">You passed the course! Your overall grade</p>
          <p class="modal text correct-color">100%</p>
        </div>
        <div class="flex flex-row align-items-center my-4">
          <div class="flex flex-row align-items-center">
            <i class="pi pi-check mr-3 correct-color"></i>
            <p class="modal-text">Daily Task</p>
          </div>
          <div class="flex flex-row ml-auto">
            <p class="modal-text mr-1">Grade:</p>
            <p class="modal text correct-color">100%</p>
          </div>
        </div>
        <div class="flex flex-row align-items-center my-4">
          <div class="flex flex-row align-items-center">
            <i class="pi pi-check mr-3 correct-color"></i>
            <p class="modal-text">Quiz</p>
          </div>
          <div class="flex flex-row ml-auto">
            <p class="modal-text mr-1">Grade:</p>
            <p class="modal text correct-color">100%</p>
          </div>
        </div>
        <div class="flex flex-row align-items-center my-4">
          <div class="flex flex-row align-items-center">
            <i class="pi pi-check mr-3 correct-color"></i>
            <p class="modal-text">Assessment</p>
          </div>
          <div class="flex flex-row ml-auto">
            <p class="modal-text mr-1">Grade:</p>
            <p class="modal text correct-color">100%</p>
          </div>
        </div>

        <div class="flex flex-row align-items-center my-4">
          <div class="flex flex-row align-items-center">
            <i class="pi pi-check mr-3 correct-color"></i>
            <p class="modal-text">Midterm exam</p>
          </div>
          <div class="flex flex-row ml-auto">
            <p class="modal-text mr-1">Grade:</p>
            <p class="modal text correct-color">100%</p>
          </div>
        </div>
        <div class="flex f  lex-row align-items-center my-4">
          <div class="flex flex-row align-items-center">
            <i class="pi pi-check mr-3 correct-color"></i>
            <p class="modal-text">Final exam</p>
          </div>
          <div class="flex flex-row ml-auto">
            <p class="modal-text mr-1">Grade:</p>
            <p class="modal text correct-color">100%</p>
          </div>
        </div>
        <div class="line"></div>
        <div class="flex flex-row align-items-center my-4">
          <div class="flex flex-row align-items-center">
            <i class="pi pi-check mr-3 correct-color"></i>
            <p class="modal-text">Overall Grade</p>
          </div>
          <div class="flex flex-row ml-auto">
            <p class="modal-text mr-1">Grade:</p>
            <p class="modal text correct-color">100%</p>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
:deep(.p-paginator) {
  position: absolute;
  right: 0;
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
::v-deep(.modal-table) {
  .p-datatable {
    .p-datatable-thead>tr>th {
      background: white;
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
}

::v-deep(.detail-table) {
  .p-datatable {
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
}

::v-deep(.p-checkbox > .p-component) {
  display: flex;
  margin-top: 3px;
  width: 12px;
  height: 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #000;
}

::v-deep(.p-paginator) {
  .p-paginator-pages>.p-paginator-page {
    color: black;
    text-align: center;
    font-size: 16px;
    font-family: Inter;
    font-weight: 600;
  }
}

::v-deep(.p-paginator) {
  .p-paginator-next>p {
    color: black;
    text-align: center;
    font-size: 16px;
    font-family: Inter;
    font-weight: 600;
  }
}

::v-deep(.p-button:active),
::v-deep(.p-button:hover) {
  background: #006785;
  color: white;
  border: none;
}

@media (max-width: 768px) {
  ::v-deep(.p-button .p-button-label) {
    display: none;
    margin: 0;
    padding: 0;
  }
}
</style>

