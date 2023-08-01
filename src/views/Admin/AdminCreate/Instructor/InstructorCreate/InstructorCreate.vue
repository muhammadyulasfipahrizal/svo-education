<script setup lang="ts">
import { ref } from 'vue';

interface InstructorData {
  name: string;
  numCourses: string;
  courses: string[];
  selectedCourse: string[];
}

const instructorData = ref<InstructorData[]>([
  {
    name: 'Xavier Ronda',
    numCourses: '1 course',
    courses: [
      'Sales Management',
      'Sales Analytic',
      'Sales Account Management'
    ],
    selectedCourse: []
  },
]);

const visible = ref(false);
const checked = ref<boolean>(false);
const instructorInput = ref(false)
const userInput = ref('');

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    updateInstructorData();
  }
};

const updateInstructorData = () => {
  if (userInput.value.trim() !== '') {
    const newInstructorData = {
      name: userInput.value,
      numCourses: '0 course',
      courses: [
        'Sales Management',
        'Sales Analytic',
        'Sales Account Management'
      ],
      selectedCourse: []
    };
    instructorData.value.push(newInstructorData);
    instructorInput.value = false;
    userInput.value = '';
  }
};


const showModal = () => {
  visible.value = true;
};

const addInstructor = () => {
  instructorInput.value = true
}

</script>

<template>
  <section class="my-3">
    <p class="title">Assign Instructor</p>

    <!-- table -->
    <DataTable :value="instructorData" selectionMode="single">
      <Column field="courseName">
        <template #header>
          <div>
            <p class="header-text">Instructor name</p>
          </div>
        </template>
        <template #body="{ data }">
          <div class="flex flex-row align-items-center">
            <img src="/assets/svo-academy.png" class="table-image mr-2" />
            <p class="table-text">{{ data.name }}</p>
          </div>
        </template>
      </Column>
      <Column field="enrollment" sortable>
        <template #header>
          <div>
            <p class="header-text">Course</p>
          </div>
        </template>
        <template #body="{ data }">
          <div>
            <p class="table-text">{{ data.numCourses }}</p>
          </div>
        </template>
      </Column>
      <Column field="startDate">
        <template #header>
          <div>
            <p class="header-text">Action</p>
          </div>
        </template>
        <template #body>
          <div>
            <Button size="small" class="btn-table" @click="showModal">
              <i class="pi pi-plus"></i>
              <p class="text-900 font-bold ml-2 text-white">ASSIGN COURSES</p>
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>



    <!-- modal -->
    <Dialog v-model:visible="visible" v-for="(data, index) in instructorData" :key="index" modal header="Header"
      :style="{ width: '50vw' }">
      <template #header>
        <div class="flex flex-row align-items-center">
          <Avatar label="M" class="modal-image mr-2" shape="circle" />
          <p class="modal-student-name">{{ data.name }}</p>
        </div>
      </template>
      <div>
        <div class="flex flex-column" v-for="(item, itemIndex) in data.courses" :key="itemIndex">
          <div class="flex flex-row align-items-center my-4">
            <Checkbox v-model="data.selectedCourse" name="course" class="mr-2" :value="item" />
            <p class="modal-text">{{ item }}</p>
          </div>
          <div class="line"></div>
        </div>
        <Button size="small" label="SAVE" class="w-full my-4 btn-save" />
      </div>
    </Dialog>

    <!-- input instructor -->
    <InputText type="text" v-show="instructorInput" class="w-full" v-model="userInput" @keydown="handleKeyPress" />
    <Button size="small" label="Add new intructor" class="w-full mt-4 btn-add-intructor" @click="addInstructor" />
    <Button size="small" label="SAVE" class="w-full my-4 btn-default" />
  </section>
</template>

<style scoped lang="scss">
.title {
  color: var(--font-1, #001125);
  font-size: 25px;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
}

.table-text {
  color: var(--font-1, #001125);
  font-size: 18px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
}

.btn-table {
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #006785;
  background: transparent !important;

  p {
    color: #006785 !important;
  }

  i {
    color: #006785;
  }

  &:hover,
  &.active {
    background: #006785 !important;

    p {
      color: unset !important;
    }

    i {
      color: white;
    }
  }
}

.table-image {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 40px;
}

.btn-add-intructor {
  background: var(--suggested-orange, #E96853);
  border: none;
}

.btn-save {
  background: var(--primary, #00C0DD);
  border: none;
}

.line {
  background-color: #D9D5EC;
  padding: 1px;
}
</style>