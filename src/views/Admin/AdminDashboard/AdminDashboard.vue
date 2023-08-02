<script lang="ts">
import { ref } from 'vue';
import { courseDummyData, instructorDummyData, studentDummyData, activitiesDummyData } from './DashboardDummyData'
import type { Course, Instructor, Student, Activities } from './Dashboard.type'

const courseList = ref<Course[]>(courseDummyData)
const instructorList = ref<Instructor[]>(instructorDummyData)
const studentList = ref<Student[]>(studentDummyData)
const activitiesList = ref<Activities[]>(activitiesDummyData)

const items = ref(Array.from({ length: 100000 }).map((_, i) => `Item #${i}`));

export default {
  setup() {
    return {
      courseList,
      instructorList,
      studentList,
      activitiesList,
      items,
    };
  },
};

</script>

<template>
    <section class="px-2 sm:px-5">
        <h1 class="font-medium font-bold text-4xl mb-4">Dashboard</h1>
        <div class="flex flex-column lg:flex-row gap-6">

            <div class="flex flex-column gap-6">

                <div class="flex flex-column">
                    <div class="flex flex-row justify-content-between">
                        <p class="font-bold text-2xl">Ongoing Courses</p>
                        <p class="font-bold text-xl">See all <i class="font-medium pi pi-arrow-right"></i></p>
                    </div>
                    <DataTable :value="courseList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    dataKey="id" class="shadow-2" tableStyle="min-width: 40rem">
                        <Column field="course" header="Course">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <p class="text-lg font-medium">{{ value.data.name }}</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="instructor" header="Instructor">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <p class="text-lg font-medium">{{ value.data.instructor }}</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="attandance" header="Attendance">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <p class="text-lg font-medium">{{ value.data.attandance }}/100</p>
                                        <p class="text-sm font-medium text-gray">students</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>

                </div>

                <div class="flex flex-column">
                    <div class="flex flex-row justify-content-between">
                        <p class="font-bold text-2xl">Top Courses</p>
                        <p class="font-bold text-xl">See all <i class="font-medium pi pi-arrow-right"></i></p>
                    </div>
                    <DataTable :value="courseList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    dataKey="id" class="shadow-2">
                        <Column field="position" header="Position">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p class="font-medium">Top {{ value.data.position }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="course-title" header="Course title">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-4">
                                            <img :src="value.data.image" alt="" style="width: 113px; height: 70px;">
                                            <div class="flex flex-column">
                                                <p class="text-base font-medium">{{ value.data.name }}</p>
                                                <p class="text-sm font-medium text-gray">by {{ value.data.instructor }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="ratings" header="Ratings">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p class="font-medium">{{ value.data.name }}</p>
                                        </div>
                                        
                                        <p class="text-sm font-medium text-gray">{{ value.data.rating.rating }}/5 ({{ value.data.rating.total_rating }} ratings)</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="enrolled" header="Enrolled">
                            <template #body="value">
                                <div class="flex flex-column align-items-center">
                                    <p class="font-medium">{{ value.data.enrolled }}</p>
                                    <p class="text-sm font-medium text-gray">students</p>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <div class="flex flex-row justify-content-between">
                        <p class="font-bold text-2xl">Top Instructor</p>
                        <p class="font-bold text-xl">See all <i class="font-medium pi pi-arrow-right"></i></p>
                    </div>
                    <DataTable :value="instructorList"  :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    dataKey="id" class="shadow-2">
                        <Column field="position" header="Position">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p class="font-medium">Top {{ value.data.position }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="instructor-name" header="Instructor name">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-4">
                                            <img :src="value.data.image" alt="" style="width: 40px; height: 40px;">
                                            <div class="flex flex-column">
                                                <p class="text-lg font-medium">{{ value.data.name }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="ratings" header="Ratings">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-4">
                                            <div class="flex flex-column align-items-center">
                                                <p class="text-lg font-medium">{{ value.data.rating }} %</p>
                                                <p class="text-sm font-meidum text-gray font-medium">Overall Grade</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="enrolled" header="Enrolled">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                            <div class="flex flex-column align-items-center">
                                                <p class="text-lg font-medium">{{ value.data.enrolled }}</p>
                                                <p class="text-sm font-medium text-gray font-medium">Courses</p>
                                            </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <div class="flex flex-row justify-content-between">
                        <p class="font-bold text-2xl">Top Students</p>
                        <p class="font-bold text-xl">See all <i class="font-medium pi pi-arrow-right"></i></p>
                    </div>
                    <DataTable :value="studentList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    dataKey="id" class="shadow-2">
                        <Column field="position" header="Position">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p class="font-medium">Top {{ value.data.position }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="student-name" header="Student name">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-4">
                                            <img :src="value.data.image" alt="" style="width: 40px; height: 40px;">
                                            <div class="flex flex-column">
                                                <p class="text-lg font-medium">{{ value.data.name }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="ratings" header="Ratings">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                            <div class="flex flex-column align-items-center">
                                                <p class="text-lg font-medium">{{ value.data.rating }} %</p>
                                                <p class="text-sm font-meidum text-gray font-medium">Overall Grade</p>
                                            </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="enrolled" header="Enrolled">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                            <div class="flex flex-column align-items-center">
                                                <p class="text-lg font-medium">{{ value.data.enrolled }}</p>
                                                <p class="text-sm font-meidum text-gray font-medium">Courses</p>
                                            </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>

            <div class="flex flex-column gap-4">

                <div class="flex flex-column">
                    <p class="font-medium font-semibold text-2xl">Calander</p>
                    <div class="flex justify-content-center">
                        <Calendar inline showWeek class="calendar">
                            <!-- for badge calendar -->
                            <template #date="slotProps">
                              <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15"
                                class="flex flex-column justify-content-center align-items-center gap-0">
                                <p>{{ slotProps.date.day }}</p>
                                <Badge value="2" class="badge text-xs flex justify-content-center align-items-center"></Badge>
                              </strong>
                              <template v-else>{{ slotProps.date.day }}</template>
                            </template>
                          </Calendar>
                    </div>
                  </div>

                <div class="flex flex-column gap-2">

                    <div class="flex flex-row gap-2 text-lg align-items-center">
                        <i class="pi pi-calendar text-xl"></i>
                        <p class="font-bold">15-dec-2023</p>
                        <p class="font-bold">(8 activities)</p>
                    </div>

                    <div>
                        <VirtualScroller :items="activitiesList" :itemSize="50" style=" height: 450px">
                            <template v-slot:item="{ item }">
                                <Card class="border-1 surface-border border-round mb-4">
                                    <template #content>
                                        <p class="text-lg font-bold text-orange-400">{{ item.start_time }} - {{ item.end_time }}</p>
                                        <p class="font-medium">{{ item.activity }}</p>
                                    </template>
                                </Card>
                            </template>
                        </VirtualScroller>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

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

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #E96853; 
    border-radius: 10px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #E96853; 
  }

  @media (min-width: 1400px){
    ::v-deep(.calendar) {
        width: 450px;
        table td>span {
            width: 50px;
            height: 50px;
            font-size: 15px;
          }
    }
  }

.text-gray {
    color: #9F9F9F;
}

::v-deep(.calendar) {
    border: 1px solid #D9D5EC;
    background: #FFF;
    max-height: 500px;
  
    .p-datepicker-calendar table td {
      padding: 0.25rem !important;
    }
  
    .p-datepicker {
      overflow: hidden;
    }
  
    .p-datepicker-header {
      padding: 0.5rem;
    }
  
    table tr td {
      width: 50px;
      height: 50px;
      padding: 5px;
      margin: 5px;
      background: rgba(250, 250, 250, 0.50);
    }
  
    table td>span {
      border-radius: 5px;
      width: 50px;
      height: 50px;
      font-size: 15px;
    }
  
    table td>span:focus {
      box-shadow: none;
      background: #E96853;
      color: white;
    }
  
    table td>span.p-highlight {
      background: #E96853;
      color: white;
    }
  
    table td>span:not(.p-highlight) .badge {
      background: #E96853;
      color: white;
      border-radius: 50%;
    }
  
    table td>span.p-highlight .badge {
      background: white;
      color: #E96853;
      border-radius: 16px;
    }
  
    &:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled) span:hover {
      background: #E96853 !important;
    }
  }
</style>