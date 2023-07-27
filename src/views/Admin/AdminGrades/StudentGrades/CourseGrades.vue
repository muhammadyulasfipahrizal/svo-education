<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue';
import type { ICourse } from "./CourseInterface";
import { courses, studentGrades } from "./StudentGrade.type";

const courseList = ref<ICourse[]>(courses);
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
</script>

<template>
    <section class="grid overflow-hidden flex-column md:flex-row pl-3 pr-3 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 py-2">
        <h1 class="text-900 font-bold text-3xl pl-2">Student Grades</h1>
        <div class="col-12">
            <DataTable :value="courseList" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" sortMode="multiple"
                tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                <Column field="name" header="Course Name">
                    <template #body="value">
                        <div class="flex gap-2 align-items-center">
                            <img :src="value.data.image" alt="" style="width: 39px; height: 39px;" />
                            <h4 class="text-900 font-semibold">
                                <RouterLink class="btn-link" :to="'/admin/course-grade/' + value.data.id + '/student'">{{
                                    value.data.name }}</RouterLink>
                            </h4>
                        </div>
                    </template>
                </Column>
                <Column field="student_count" header="Students">
                    <template #body="value">
                        <div class="flex gap-1 flex-column align-items-start">
                            <h4 class="text-900 font-semibold">{{ getStudentCount(value.data.id) }}</h4>
                        </div>
                    </template>
                </Column>
                <Column field="progress" header="Progress">
                    <template #body="value">
                        <div class="flex flex-column gap-2">
                            <div class="flex border-round" style="border-radius: 8px; background: #D9D9D9; height: 10px;">
                                <div class="flex border-round" style="width: 30%; background: #EFAE1C"></div>
                            </div>
                            <h4 class="text-900 font-bold text-sm">
                                30% completed
                            </h4>
                        </div>
                    </template>
                </Column>
                <Column field="non" header="Non" sortable>
                    <template #body="value">
                        <p class="text-900 font-normal text-sm font-bold">50</p>
                    </template>
                </Column>
                <Column field="passed" header="Passed" sortable>
                    <template #body="value">
                        <p class="text-900 font-normal text-sm font-bold">80</p>
                    </template>
                </Column>
                <Column field="failed" header="Failed" sortable>
                    <template #body="value">
                        <p class="text-900 font-normal text-sm font-bold">20</p>
                    </template>
                </Column>
            </DataTable>
        </div>
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

.btn-link {
    text-decoration: none;
    color: black;
}
</style>