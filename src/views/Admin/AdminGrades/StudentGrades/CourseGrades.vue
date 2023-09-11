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
    <section>
        <section
            class="grid overflow-hidden flex-column md:flex-row" style="padding: 10px">
            <h1 class="title-head pl-2">Student Grades</h1>
            <div class="col-12">
                <DataTable :value="courseList" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    sortMode="multiple" tableStyle="min-width: 50rem" dataKey="id" class="shadow-2" :paginatorTemplate="{
                        '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
                        '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                    }" :pageLinkSize="3"
                    currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
                    <Column field="name">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="text-header">Course Name</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center">
                                <img :src="value.data.image" alt="" style="width: 39px; height: 39px;" />
                                <RouterLink class="btn-link text-name"
                                    :to="'/admin/grade/course/' + value.data.id + '/student'">
                                    {{
                                        value.data.name }}</RouterLink>
                            </div>
                        </template>
                    </Column>
                    <Column field="student_count">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="text-header">Students</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-name p-0">{{ getStudentCount(value.data.id) }}</p>
                        </template>
                    </Column>
                    <Column field="progress" sortable class="center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Progress</p>
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
                    <Column field="non" sortable class="center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Non</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-name p-0">50</p>
                        </template>
                    </Column>
                    <Column field="passed" sortable class="center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Passed</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-name p-0">80</p>
                        </template>
                    </Column>
                    <Column field="failed" sortable class="center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Failed</p>
                            </div>
                        </template>
                        <template #body="value">
                            <p class="text-name p-0">20</p>
                        </template>
                    </Column>
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


}

.progress-bar-container {
    width: 200px;
    height: 10px;
    background-color: #D9D9D9;
    border-radius: 8px;
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