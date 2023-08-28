<script lang="ts" setup>
import { ref } from 'vue';
import { courseDummyData, instructorDummyData, studentDummyData, activitiesDummyData } from './DashboardDummyData'
import type { Course, Instructor, Student, Activities } from './Dashboard.type'
import { format, parse } from 'date-fns';

const courseList = ref<Course[]>(courseDummyData.filter((v) => v.id != 2))
const instructorList = ref<Instructor[]>(instructorDummyData)
const studentList = ref<Student[]>(studentDummyData)
const activitiesList = ref<Activities[]>(activitiesDummyData)
const dummyData = [...activitiesDummyData];
const dataEvent = [{
    date: '2023-08-20',
    data: dummyData.splice(0, Math.random() * 10)
}, {
    date: '2023-08-21',
    data: dummyData.splice(0, Math.random() * 10)
}, {
    date: '2023-08-10',
    data: dummyData.splice(0, Math.random() * 10)
}, {
    date: '2023-08-13',
    data: dummyData.splice(0, Math.random() * 10)
},
{
    date: '2023-08-14',
    data: dummyData.splice(0, Math.random() * 10)
},]

const selectedDate = ref<string>(format(new Date(), 'yyyy-MM-dd'));
const onClickDay = (v: Date) => {
    const date = format(v, 'yyyy-MM-dd').toString();
    selectedDate.value = date;
    const selected = dataEvent.find((event) => event.date === date);
    activitiesList.value = selected ? selected.data : []
}

const checkIfEventExist = (date: string) => {
    const r = dataEvent.find((v) => v.date === date)
    if (r && r.data.length > 0) {
        return {
            valid: true,
            length: r.data.length
        }
    }
    return {
        valid: false,
        length: 0
    }
}
</script>

<template>
    <h1 class="font-medium font-bold text-4xl mb-1">Dashboard</h1>
    <div class="grid">

        <div class="col-12 md:col-8 flex flex-column gap-3">

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="font-bold text-2xl">Ongoing Courses</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="text-900 font-bold">see all</span> <i class="font-medium pi pi-arrow-right"></i>
                    </Button>
                </div>
                <DataTable :value="courseList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id"
                    :showGridlines="false" class="shadow-2" tableStyle="min-width: 40rem">
                    <Column field="course" header="Course">
                        <template #body="value">
                            <div class="flex gap-2 align-items-center justify-content-center">
                                <p class="text-lg font-medium text-content-table">{{ value.data.name }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="instructor">
                        <template #header>
                            <div class="flex justify-content-center w-full text-white title-header">
                                Instructor
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center justify-content-center">
                                <p class="text-lg font-medium text-content-table">{{ value.data.instructor }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="attandance" header="Attendance">
                        <template #body="value">
                            <div class="flex flex-column gap-0 align-items-center justify-content-center">
                                <p class="text-lg font-medium text-content-table">{{ value.data.attandance }}/100</p>
                                <p class="text-xs font-medium text-600">Students</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>

            </div>

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="font-bold text-2xl">Top Courses</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="text-900 font-bold">see all</span> <i class="font-medium pi pi-arrow-right"></i>
                    </Button>
                </div>
                <DataTable :value="courseList.sort((a, b) => a.position - b.position).filter((v, k) => k <= 2)" :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id" class="shadow-2">
                    <Column field="position" header="Position">
                        <template #body="value">
                            <div class="flex flex-row justify-content-center align-items-center gap-2">
                                <i class="pi pi-star-fill top-{{ value.data.position }}"
                                    :class="{ 'top-1': value.data.position === 1, 'top-2': value.data.position === 2, 'top-3': value.data.position === 3 }"></i>
                                <p class="font-medium">Top {{ value.data.position }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="course-title" header="Course title">
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-start gap-4">
                                <img :src="value.data.image" alt="" style="width: 113px; height: 70px;">
                                <div class="flex flex-column justify-content-start align-items-start w-full">
                                    <p class="title-name">{{ value.data.name }}</p>
                                    <p class="subtitle-name">by {{ value.data.instructor }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="ratings" header="Ratings">
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <div class="flex flex-row align-items-center justify-content-center gap-2">
                                    <i class="pi pi-star-fill"></i>
                                    <p class="font-medium text-900">Ratings</p>
                                </div>

                                <p class="text-xs font-medium text-600">{{ value.data.rating.rating }}/5 ({{
                                    Number(value.data.rating.total_rating).toLocaleString() }} ratings)</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="enrolled" header="Enrolled">
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="font-medium">{{ Number(value.data.enrolled).toLocaleString() }}</p>
                                <p class="text-xs font-medium text-600">students</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="font-bold text-2xl">Top Instructor</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="text-900 font-bold">see all</span> <i class="font-medium pi pi-arrow-right"></i>
                    </Button>
                </div>
                <DataTable :value="instructorList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id"
                    class="shadow-2">
                    <Column field="position" header="Position">
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-center gap-2">
                                <i class="pi pi-star-fill top-{{ value.data.position }}"
                                    :class="{ 'top-1': value.data.position === 1, 'top-2': value.data.position === 2, 'top-3': value.data.position === 3 }"></i>
                                <p class="font-medium">Top {{ value.data.position }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="instructor-name" header="Instructor name">
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-start gap-4">
                                <img :src="value.data.image" alt="" style="width: 40px; height: 40px;"
                                    class="border-circle">
                                <div class="flex flex-column">
                                    <p class="text-lg font-medium">{{ value.data.name }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="ratings" header="Ratings">
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="text-lg font-medium">{{ value.data.rating }} %</p>
                                <p class="text-xs font-medium text-600">Overall Grade</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="enrolled" header="Enrolled">
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="text-lg font-medium">{{ Number(value.data.enrolled).toLocaleString() }}</p>
                                <p class="text-xs font-medium text-600">Courses</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="font-bold text-2xl">Top Students</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="text-900 font-bold">see all</span> <i class="font-medium pi pi-arrow-right"></i>
                    </Button>
                </div>
                <DataTable :value="studentList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id"
                    class="shadow-2">
                    <Column field="position" header="Position">
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-center gap-2">
                                <i class="pi pi-star-fill top-{{ value.data.position }}"
                                    :class="{ 'top-1': value.data.position === 1, 'top-2': value.data.position === 2, 'top-3': value.data.position === 3 }"></i>
                                <p class="font-medium">Top {{ value.data.position }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="student-name" header="Student name">
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-start gap-4">
                                <img :src="value.data.image" alt="" style="width: 40px; height: 40px;"
                                    class="border-circle">
                                <div class="flex flex-column">
                                    <p class="text-lg font-medium">{{ value.data.name }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="ratings" header="Ratings">
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="text-lg font-medium">{{ value.data.rating }} %</p>
                                <p class="text-xs font-medium text-600">Overall Grade</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="enrolled" header="Enrolled">
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="text-lg font-medium">{{ value.data.enrolled }}</p>
                                <p class="text-xs font-medium text-600">Courses</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

        </div>

        <div class="col-12 md:col-4 flex-column gap-4">

            <div class="flex flex-column">
                <p class="font-medium font-semibold text-2xl">Calendar</p>
                <div class="flex justify-content-center">
                    <Calendar inline class="calendar" @date-select="onClickDay">
                        <!-- for badge calendar -->
                        <template #date="slotProps">
                            <strong
                                v-if="checkIfEventExist(`${slotProps.date.year}-${(slotProps.date.month + 1).toString().padStart(2, '0')}-${slotProps.date.day.toString().padStart(2, '0')}`).valid"
                                class="flex flex-column justify-content-center align-items-center gap-0">
                                <p>{{ slotProps.date.day }}</p>
                                <Badge
                                    :value="checkIfEventExist(`${slotProps.date.year}-${(slotProps.date.month + 1).toString().padStart(2, '0')}-${slotProps.date.day.toString().padStart(2, '0')}`).length"
                                    class="badge text-xs flex justify-content-center align-items-center">
                                </Badge>
                            </strong>
                            <template v-else>{{ slotProps.date.day }}</template>
                        </template>
                    </Calendar>
                </div>
            </div>

            <div class="flex flex-column gap-2 py-2">

                <div class="flex flex-row gap-2 text-lg align-items-center">
                    <i class="pi pi-calendar text-xl"></i>
                    <p class="font-bold">{{ selectedDate }}</p>
                    <p class="font-bold">({{ activitiesList.length }} activities)</p>
                </div>

                <div>
                    <VirtualScroller :items="activitiesList" :itemSize="50" class="h-screen">
                        <template v-slot:item="{ item }">
                            <Card class="border-1 shadow-0 border-round mb-2 p-0 m-0 card mr-3" style="box-shadow: none;">
                                <template #content>
                                    <p class="text-lg font-bold text-orange-400">{{ item.start_time }} - {{
                                        item.end_time }}</p>
                                    <p class="font-medium">{{ item.activity }}</p>
                                </template>
                            </Card>
                        </template>
                    </VirtualScroller>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
::v-deep(.p-datatable) {
    .p-datatable-thead>tr>th {
        height: 30px;
        background: #006785;
        padding: 0 1rem;

        &:nth-child(2) {
            .p-column-header-content {
                display: flex;
                justify-content: flex-start;
            }
        }

        .p-column-header-content {
            display: flex;
            justify-content: center;

            .p-column-title {
                color: var(--white, #FFF);
                font-family: DM Sans, sans-serif;
                font-size: 12px;
                font-style: normal;
                font-weight: 700 !important;
                line-height: normal;
                letter-spacing: 0.12px;
            }
        }

        svg path {
            fill: white;
        }

        &:hover {
            background: #006785;
            color: var(--white, #FFF);
        }
    }

    .p-datatable-tbody>tr>td {
        padding: 10px 10px;
    }

    .text-content-table {
        color: #000;
        text-align: center;
        font-family: Poppins;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 160%;
    }

    .pi-star-fill {
        &.top-1 {
            &::before {
                color: #F8BB19;
            }
        }

        &.top-2 {
            &::before {
                color: #D4DADD;
            }
        }

        &.top-3 {
            &::before {
                color: #D0A87C;
            }
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

@media (min-width: 1400px) {
    ::v-deep(.calendar) {
        width: 450px;

        table td>span {
            width: 50px;
            height: 50px;
            font-size: 15px;
        }
    }
}

.pi-arrow-right::before {
    color: black;
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

::v-deep(.calendar) {
    border-radius: 20px;
    border: 1px solid #D9D5EC;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    max-height: 400px;

    .p-datepicker-calendar table td {
        // padding: 0.25rem !important;
    }

    .p-datepicker {
        overflow: hidden;
        border-radius: 20px;
    }

    .p-datepicker-header {
        padding: 0 0.5rem;
    }

    table tr td {
        width: 50px;
        height: 50px;
        padding: 0px;
        margin: 5px;
        background: rgba(250, 250, 250, 0.50);
    }

    table td>span {
        border-radius: 5px;
        width: 36px;
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

::v-deep(.card) {
    .p-card-body {
        padding: 0;

        .p-card-content {
            padding: 10px;
        }
    }
}

.title-header {
    color: var(--white, #FFF);
    font-family: DM Sans;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.12px;
}

.title-name {
    color: var(--black, #000);
    text-align: center;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
}

.subtitle-name {
    color: #9F9F9F;
    text-align: center;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
}
</style>