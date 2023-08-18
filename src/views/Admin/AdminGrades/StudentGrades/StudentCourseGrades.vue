<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { onMounted, ref } from 'vue';
import { studentGrades, type IStudentGrade } from "./StudentGrade.type";
import { useRoute } from 'vue-router';
import { courseDataMock } from '../../AdminStudentProgress/Course.mock';
import type { Course } from '../../AdminDashboard/Dashboard.type';
import { courseDummyData } from '../../AdminDashboard/DashboardDummyData';

const courseList = ref<Course[]>(courseDummyData);
const selectedCourse = ref();
const checkedInstructor = ref();
const listCheckedData = ref<{ icon: 'check' | 'note'; label: string; grade?: number | null; }[]>([])
const onSelectProfile = (v: IStudentGrade) => {
    modalProfile.value = true
    selectedProfile.value = v;
    listCheckedData.value = [{
        icon: 'check',
        label: 'You have completed all of the assessment'
    }, {
        icon: 'note',
        label: 'You passed the course! Your overall grade',
        grade: 100
    },
    {
        icon: 'check',
        label: 'Daily Task',
        grade: 100
    },
    {
        icon: 'check',
        label: 'Quiz',
        grade: 100
    },
    {
        icon: 'check',
        label: 'Assesment',
        grade: 100
    },
    {
        icon: 'check',
        label: 'Midterm Exam',
        grade: 100
    },
    {
        icon: 'check',
        label: 'Final Exam',
        grade: 100
    }
    ]
}
const studentList = ref<IStudentGrade[]>(studentGrades)


const modalProfile = ref<boolean>(false);
const selectedProfile = ref<IStudentGrade | null>(null);

onMounted(() => {
    const route = useRoute();
    const courseId: string = route.params.course as unknown as string;
    const course = courseDummyData.find((v) => v.id.toString() === courseId)
    console.log('course', course);

    if (course) {
        selectedCourse.value = course;
    }
})
</script>

<template>
    <section class="px-2">
        <section
            class="grid overflow-hidden flex-column md:flex-row pl-3 pr-3 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 py-2">
            <h1 class="title-head px-2 md:px-3">Student Grades</h1>
            <div class="px-2 md:px-3 col-12 flex flex-column gap-2 my-2">
                <!-- FILTER -->
                <div class="card flex justify-content-start">
                    <Dropdown v-model="selectedCourse" :options="courseList" optionLabel="name"
                        placeholder="Select a course" class="w-full md:w-17rem hidden md:flex">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <img :alt="slotProps.value.name" :src="slotProps.value.image" class="mr-2"
                                    style="width: 53px" />
                                <div class="text-900 font-bold text-lg">{{ slotProps.value.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <img :alt="slotProps.option.name" :src="slotProps.option.image" class="mr-2"
                                    style="width: 53px" />
                                <div class="text-900 font-bold text-lg">{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div class="grid w-full px-2 md:px-3 align-items-center justify-content-between">
                    <div
                        class="col-10 md:col-11 lg:col-10 xl:col-10 grid align-items-center filter-search align-items-center py-0 my-2 px-0">
                        <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button col-2 md:col-1" />
                        <span class="p-input-icon-left col-10 md:col-6 xl:col-6 py-0">
                            <i class="pi pi-search search-icon ml-2" />
                            <InputText placeholder="Search by name" class="search-bar w-full p-inputtext-sm" />
                        </span>
                    </div>
                    <div class="col-2 align-items-end flex justify-content-end">
                        <Button label="DOWNLOAD " size="small" icon="pi pi-download"
                            class="download-button flex text-right justify-content-center align-items-center "></Button>
                    </div>
                </div>

                <DataTable :value="studentList" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    sortMode="multiple" tableStyle="min-width: 50rem" dataKey="id" v-model:selection="checkedInstructor"
                    class="shadow-2">
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="name" header="Name">
                        <template #body="value">
                            <div class="flex gap-2 align-items-center">
                                <img :src="value.data.student.image" alt="" style="width: 39px; height: 39px;"
                                    class="border-circle" />
                                <div class="flex gap-1 flex-column align-items-start">
                                    <h4 class="text-900 font-semibold">{{ value.data.student.name }}</h4>
                                    <p class="text-500 font-normal">
                                        {{ value.data.student.email }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="course" header="Course" sortable>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-start">
                                <h4 class="text-900 font-semibold">{{ value.data.courses[0].course.name }}</h4>
                            </div>
                        </template>
                    </Column>
                    <Column field="upline" header="Upline" sortable>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-start">
                                <h4 class="text-900 font-semibold">{{ value.data.student.upline }}</h4>
                            </div>
                        </template>
                    </Column>
                    <Column field="branch" header="Branch" sortable>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-start">
                                <h4 class="text-900 font-semibold">{{ value.data.student.city_branch }}</h4>
                            </div>
                        </template>
                    </Column>
                    <Column field="profile" header="Profile">
                        <template #body="value">
                            <Button class="btn-orange" @click="onSelectProfile(value.data)" size="small">
                                <span class="text-md font-bold">Profile</span>
                            </Button>
                        </template>
                    </Column>
                    <Column field="message" header="Message">
                        <template #body="value">
                            <Button link size="small"
                                @click="$router.push('/admin/grade/student/' + value.data.id + '/message')">
                                <img src="/assets/icon/reply.png" class="w-2rem" />
                            </Button>
                        </template>
                    </Column>
                    <template #footer>
                        <div class="flex flex-row align-items-center justify-content-between">
                            <p>Showing data 1 to 10 of 256K entries</p>
                        </div>
                    </template>
                </DataTable>
            </div>
        </section>
    </section>

    <!-- MODAL Profile -->
    <Dialog v-model:visible="modalProfile" modal :style="{ width: '40vw' }" :breakpoints="{ '764px': '90vw' }">
        <template #header>
            <div class="flex flex-row align-items-center my-2">
                <img :src="selectedProfile?.student.image || '/assets/img/avatar-black.png'"
                    class="modal-image mr-2 border-circle" />
                <p class="modal-student-name">{{ selectedProfile?.student?.name }}</p>
            </div>
        </template>
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
            <div class="flex flex-row align-items-center my-4 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M16 14H8C7.73478 14 7.48043 14.1054 7.29289 14.2929C7.10536 14.4804 7 14.7348 7 15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16H16C16.2652 16 16.5196 15.8946 16.7071 15.7071C16.8946 15.5196 17 15.2652 17 15C17 14.7348 16.8946 14.4804 16.7071 14.2929C16.5196 14.1054 16.2652 14 16 14ZM16 10H10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11C9 11.2652 9.10536 11.5196 9.29289 11.7071C9.48043 11.8946 9.73478 12 10 12H16C16.2652 12 16.5196 11.8946 16.7071 11.7071C16.8946 11.5196 17 11.2652 17 11C17 10.7348 16.8946 10.4804 16.7071 10.2929C16.5196 10.1054 16.2652 10 16 10ZM20 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2C11.7348 2 11.4804 2.10536 11.2929 2.29289C11.1054 2.48043 11 2.73478 11 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4ZM19 19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H11V7C11 7.26522 11.1054 7.51957 11.2929 7.70711C11.4804 7.89464 11.7348 8 12 8C12.2652 8 12.5196 7.89464 12.7071 7.70711C12.8946 7.51957 13 7.26522 13 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19V19Z"
                        fill="black" />
                </svg>
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

<style lang="scss" scoped>
.filter-button {
    background-color: #fff;
    color: #8B83BA;
    border: 0.5px solid #8B83BA;
}

.search-bar {
    background-color: rgba(139, 131, 186, 0.1);
    color: #8B83BA;
    width: 240px;
}

.search-bar::placeholder {
    color: #8B83BA;
}

.search-icon {
    color: #8B83BA;
}

.download-button {
    background-color: #e26954;
    border: none;

    &:hover,
    &:active,
    &:focus {
        background-color: #e26954;
    }
}

:deep(.p-paginator) {
    height: 50px;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
    color: #6D5BD0;
    text-align: center;
    font-size: 16px;
    font-family: Inter;
    font-weight: 600;
    background-color: white;
}

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

.btn-orange {
    background-color: #e26954;
    border: none;

    &:hover,
    &:active,
    &:focus {
        background-color: #e26954;
    }
}

@media (max-width: 768px) {
    ::v-deep(.p-button .p-button-label) {
        display: none;
        margin: 0;
        padding: 0;
    }
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

.line {
    background-color: #D9D5EC;
    padding: 1px;
}
</style>