<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue';
import { studentGrades } from "./StudentGrade.type";
import type { Course } from '../../AdminDashboard/Dashboard.type';
import { courseDummyData } from '../../AdminDashboard/DashboardDummyData';

const courseList = ref<Course[]>(courseDummyData);
const getStudentCount = (courseId: number) => {
    let count = 0;
    for (const student of studentGrades) {
        const foundStudentWithCourse = student.courses.find((v) => v.course.id === courseId);
        if (foundStudentWithCourse) {
            count++;
        }
    }
    return count;
}
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
            class="grid overflow-hidden flex-column md:flex-row pl-3 pr-3 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 py-2">
            <h1 class="title-head pl-2">Student Grades</h1>
            <div class="col-12">
                <DataTable :value="courseList" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    sortMode="multiple" tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                    <Column field="name">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-lg">Course Name</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center">
                                <img :src="value.data.image" alt="" style="width: 39px; height: 39px;" />
                                <h4 class="text-900 font-bold text-lg">
                                    <RouterLink class="btn-link" :to="'/admin/grade/course/' + value.data.id + '/student'">
                                        {{
                                            value.data.name }}</RouterLink>
                                </h4>
                            </div>
                        </template>
                    </Column>
                    <Column field="student_count">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-lg">Students</p>
                            </div>
                        </template>
                        <template #body="value">
                            <h4 class="text-900 text-center font-semibold">{{ getStudentCount(value.data.id) }}</h4>
                        </template>
                    </Column>
                    <Column field="progress">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-lg">Progress</p>
                            </div>
                        </template>
                        <template #body="{ data }">
                            <div class="flex flex-column">
                                <div class="progress-bar-container my-2 flex flex-column justify-content-center w-full">
                                    <div class="progress-bar"
                                        :style="{ width: data.progress + '%', backgroundColor: getBackgroundColor(data.progress) }">
                                    </div>
                                </div>
                                <p class="progress-text">{{ data.progress }} % completed</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="non" sortable>
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-lg">Non</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-900 font-normal text-center text-sm font-bold">50</p>
                        </template>
                    </Column>
                    <Column field="passed" sortable>
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-lg">Passed</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-900 font-normal text-center text-sm font-bold">80</p>
                        </template>
                    </Column>
                    <Column field="failed" sortable>
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-lg">Failed</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-900 font-normal text-center text-sm font-bold">20</p>
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
    width: 400px;
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

.btn-link {
    text-decoration: none;
    color: black;
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
</style>