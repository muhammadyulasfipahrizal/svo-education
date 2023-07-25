<script lang="ts">
import { ref } from 'vue';
import { courseDummyData, instructorDummyData, studentDummyData } from './DashboardDummyData'
import type { Course, Instructor, Student } from './Dashboard.type'

const courseList = ref<Course[]>(courseDummyData)
const instructorList = ref<Instructor[]>(instructorDummyData)
const studentList = ref<Student[]>(studentDummyData)

export default {
  setup() {
    return {
      courseList,
      instructorList,
      studentList,
    };
  },
};

</script>

<template>
    <section>
        <h1 class="text-900 font-bold text-4xl mb-4">Dashboard</h1>
        <div class="flex flex-row gap-6">
            <div class="flex flex-column">
                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Ongoing Courses</p>

                    <DataTable :value="courseList"  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="max-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="course" header="Course">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900">{{ value.data.name }}</h4>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="instructor" header="Instructor">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900">{{ value.data.instructor }}</h4>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="attandance" header="Attendance">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900">{{ value.data.attandance }}/100</h4>
                                        <p>students</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>

                </div>

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Top Courses</p>
                    <DataTable :value="courseList"  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="position" header="Position">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p>Top {{ value.data.position }}</p>
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
                                            <img :src="value.data.image" alt="" style="width: 150px; height: 100px;">
                                            <div class="flex flex-column">
                                                <p>{{ value.data.name }}</p>
                                                <p>by {{ value.data.instructor }}</p>
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
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p>{{ value.data.name }}</p>
                                        </div>
                                        
                                        <p>{{ value.data.rating.rating }}/5 ({{ value.data.rating.total_rating }} ratings)</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="enrolled" header="Enrolled">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <p>{{ value.data.enrolled }}</p>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Top Instructor</p>
                    <DataTable :value="instructorList"  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="position" header="Position">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p>Top {{ value.data.position }}</p>
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
                                                <p>{{ value.data.name }}</p>
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
                                            <div class="flex flex-column">
                                                <p>{{ value.data.rating }} %</p>
                                                <p>Overall Grade</p>
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
                                        <div class="flex flex-row align-items-center gap-4">
                                            <div class="flex flex-column">
                                                <p>{{ value.data.enrolled }}</p>
                                                <p>Courses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Top Students</p>
                    <DataTable :value="studentList"  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="position" header="Position">
                            <template #body="value">
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <div class="flex flex-row align-items-center gap-2">
                                            <i class="pi pi-star-fill"></i>
                                            <p>Top {{ value.data.position }}</p>
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
                                                <p>{{ value.data.name }}</p>
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
                                            <div class="flex flex-column">
                                                <p>{{ value.data.rating }} %</p>
                                                <p>Overall Grade</p>
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
                                        <div class="flex flex-row align-items-center gap-4">
                                            <div class="flex flex-column">
                                                <p>{{ value.data.enrolled }}</p>
                                                <p>Courses</p>
                                            </div>
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
                    <p class="text-900 font-semibold text-2xl">Calander</p>
                    <div class="flex justify-content-center">
                      <Calendar inline showWeek class="calendar" >
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
                        <p>15-dec-2023</p>
                        <p>(8 activities)</p>
                    </div>

                    <div>
                        <VirtualScroller :items="items" :itemSize="50" class="border-1 surface-border border-round" style="width: 200px; height: 200px">
                            <template v-slot:item="{ item, options }">
                                <div :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]" style="height: 50px">{{ item }}</div>
                            </template>
                        </VirtualScroller>
                        <Card>
                            <template #content>
                                <p class="text-lg text-orange-400">08:00 AM - 09:00 AM</p>
                                <p>Plan CRM training sessions</p>
                            </template>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
::v-deep(.p-datatable) {
    .p-datatable-wrapper {
        border-radius: 10px;
    }
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

::v-deep(.calendar) {
    border-radius: 20px;
  
    .p-datepicker-calendar table td {
      padding: 0.25rem !important;
    }
  
    table td>span {
      border-radius: 5px;
      width: 50px;
      height: 50px;
      font-size: 15px;
    }
  
    table td>span:focus {
      box-shadow: none;
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