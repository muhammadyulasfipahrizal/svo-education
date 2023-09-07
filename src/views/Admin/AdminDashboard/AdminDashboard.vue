<script lang="ts" setup>
import { ref } from 'vue';
import { courseDummyData, instructorDummyData, studentDummyData, activitiesDummyData } from './DashboardDummyData'
import type { Course, Instructor, Student, Activities } from './Dashboard.type'
import { format, parse } from 'date-fns';
import CustomCalendar from '@/views/Admin/CustomCalendar/CustomCalendar.vue';

const courseList = ref<Course[]>(courseDummyData.filter((v) => v.id != 2))
const instructorList = ref<Instructor[]>(instructorDummyData)
const studentList = ref<Student[]>(studentDummyData)
const activitiesList = ref<Activities[]>(activitiesDummyData)
const dummyData = [...activitiesDummyData];
const dataEvent = [{
    date: '2023-09-20',
    data: dummyData.splice(0, Math.random() * 10)
}, {
    date: '2023-09-21',
    data: dummyData.splice(0, Math.random() * 10)
}, {
    date: '2023-09-10',
    data: dummyData.splice(0, Math.random() * 10)
}, {
    date: '2023-09-13',
    data: dummyData.splice(0, Math.random() * 10)
},
{
    date: '2023-09-14',
    data: dummyData.splice(0, Math.random() * 10)
},]

const selectedDate = ref<string>(format(new Date(), 'dd-MMM-yyyy'));
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
    <h1 class="inter-normal black-1 mb-1" style="font-size: 35px; font-weight: 700;">Dashboard</h1>
    <div class="grid">

        <div class="col-12 xl:col-8 flex flex-column gap-3">

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">Ongoing Courses</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="inter-normal black-1 -mr-2" style="font-size: 20px; font-weight: 700;">see
                            all</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                                fill="black" />
                        </svg>
                    </Button>
                </div>
                <DataTable :value="courseList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id"
                    :showGridlines="false" class="shadow-2" tableStyle="min-width: 40rem">
                    <Column field="course">
                        <template #header>
                            <div class="flex justify-content-center w-full dm-sans-normal white-1"
                                style="font-size: 12px; font-weight: 700;">
                                Course
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center justify-content-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    value.data.name }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="instructor">
                        <template #header>
                            <div class="flex justify-content-center w-full dm-sans-normal white-1"
                                style="font-size: 12px; font-weight: 700;">
                                Instructor
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center justify-content-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    value.data.instructor }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="attandance">
                        <template #header>
                            <div class="flex justify-content-center w-full dm-sans-normal white-1"
                                style="font-size: 12px; font-weight: 700;">
                                Attendance
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column gap-0 align-items-center justify-content-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    value.data.attandance }}/100</p>
                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">Students</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>

            </div>

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">Top Courses</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="inter-normal black-1 -mr-2" style="font-size: 20px; font-weight: 700;">see
                            all</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                                fill="black" />
                        </svg>
                    </Button>
                </div>
                <DataTable :value="courseList.sort((a, b) => a.position - b.position).filter((v, k) => k <= 2)" :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id" class="shadow-2">
                    <Column field="position">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Position
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-row justify-content-center align-items-center gap-2">
                                <i class="pi pi-star-fill top-{{ value.data.position }}"
                                    :class="{ 'top-1': value.data.position === 1, 'top-2': value.data.position === 2, 'top-3': value.data.position === 3 }"></i>
                                <p class="poppins-normal black-2" style="font-size: 15px; font-weight: 500;">Top {{
                                    value.data.position }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="course-title">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Course title
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-start gap-4">
                                <img :src="value.data.image" alt="" style="width: 113px; height: 70px;">
                                <div class="flex flex-column justify-content-start align-items-start w-full">
                                    <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                        value.data.name }}</p>
                                    <p class="poppins-normal grey-1" style="font-size: 12px; font-weight: 500;">by {{
                                        value.data.instructor }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="ratings">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Ratings
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <div class="flex flex-row align-items-center justify-content-center gap-2">
                                    <i class="pi pi-star-fill"></i>
                                    <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">Ratings</p>
                                </div>

                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">{{
                                    value.data.rating.rating }}/5 ({{
        Number(value.data.rating.total_rating).toLocaleString() }} ratings)</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="enrolled">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Enrolled
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    Number(value.data.enrolled).toLocaleString() }}</p>
                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">students</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">Top Instructor</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="inter-normal black-1 -mr-2" style="font-size: 20px; font-weight: 700;">see
                            all</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                                fill="black" />
                        </svg>
                    </Button>
                </div>
                <DataTable :value="instructorList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id"
                    class="shadow-2">
                    <Column field="position">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Position
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-center gap-2">
                                <i class="pi pi-star-fill top-{{ value.data.position }}"
                                    :class="{ 'top-1': value.data.position === 1, 'top-2': value.data.position === 2, 'top-3': value.data.position === 3 }"></i>
                                <p class="poppins-normal black-2" style="font-size: 15px; font-weight: 500;">Top {{
                                    value.data.position }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="instructor-name">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Instructor name
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-start gap-4">
                                <img :src="value.data.image" alt="" style="width: 40px; height: 40px;"
                                    class="border-circle">
                                <div class="flex flex-column">
                                    <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                        value.data.name }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="ratings">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Ratings
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    value.data.rating }} %</p>
                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">Overall Grade</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="enrolled">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Enrolled
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    Number(value.data.enrolled).toLocaleString() }}</p>
                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">Courses</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <div class="flex flex-column">
                <div class="flex flex-row justify-content-between py-1">
                    <p class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">Top Students</p>
                    <Button link size="small" class="font-bold text-xl flex gap-2 p-0">
                        <span class="inter-normal black-1 -mr-2" style="font-size: 20px; font-weight: 700;">see
                            all</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                                fill="black" />
                        </svg>
                    </Button>
                </div>
                <DataTable :value="studentList" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="id"
                    class="shadow-2">
                    <Column field="position">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Position
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-center gap-2">
                                <i class="pi pi-star-fill top-{{ value.data.position }}"
                                    :class="{ 'top-1': value.data.position === 1, 'top-2': value.data.position === 2, 'top-3': value.data.position === 3 }"></i>
                                <p class="poppins-normal black-2" style="font-size: 15px; font-weight: 500;">Top {{
                                    value.data.position }}</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="student-name">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Student name
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-row align-items-center justify-content-start gap-4">
                                <img :src="value.data.image" alt="" style="width: 40px; height: 40px;"
                                    class="border-circle">
                                <div class="flex flex-column">
                                    <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                        value.data.name }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="ratings">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Ratings
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    value.data.rating }} %</p>
                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">Overall Grade</p>
                            </div>
                        </template>
                    </Column>
                    <Column field="enrolled">
                        <template #header>
                            <div class="dm-sans-normal white-1" style="font-size: 12px; font-weight: 700;">
                                Enrolled
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <p class="poppins-normal black-2" style="font-size: 18px; font-weight: 500;">{{
                                    value.data.enrolled }}</p>
                                <p class="inter-normal grey-1" style="font-size: 10px; font-weight: 700;">Courses</p>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

        </div>

        <div class="col-12 xl:col-4 flex-column gap-4">

            <div class="flex flex-column">
                <p class="inter-normal black-2" style="font-size: 25px; font-weight: 700;">Calendar</p>
                <div class="flex justify-content-center">
                    <CustomCalendar @date-select="onClickDay" :markers="dataEvent" />
                </div>
            </div>

            <div class="flex flex-column gap-2 py-2">

                <div class="flex flex-row gap-2 text-lg align-items-center">
                    <i class="pi pi-calendar text-xl"></i>
                    <p class="inter-normal black-2" style="font-size: 20px; font-weight: 700;">{{ selectedDate }}</p>
                    <p class="inter-normal black-2" style="font-size: 20px; font-weight: 700;">({{ activitiesList.length }}
                        activities)</p>
                </div>

                <div>
                    <VirtualScroller :items="activitiesList" :itemSize="50" class="h-screen">
                        <template v-slot:item="{ item }">
                            <Card class="border-1 shadow-0 border-round mb-2 p-0 m-0 card mr-3" style="box-shadow: none;">
                                <template #content>
                                    <p class="inter-normal suggested-orange" style="font-size: 16px; font-weight: 700;">{{
                                        item.start_time }} - {{
        item.end_time }}</p>
                                    <p class="poppins-normal black-2"
                                        style="font-size: 18px; font-weight: 500; letter-spacing: 0.54px;">{{ item.activity
                                        }}</p>
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
@import "/src/assets/global.scss";

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
    max-height: 500px;
    border-radius: 20px;
    border: 1px solid #D9D5EC;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    .p-datepicker-calendar table td {
        padding: 0.25rem !important;
    }

    .p-datepicker {
        overflow: hidden;
    }

    table tr th {
        background: rgba(250, 250, 250, 0.50);
    }

    table tr td {
        width: 50px;
        height: 50px;
        padding: 5px;
        margin: 5px;
        background: white;

        >span {
            border-radius: 5px;
            width: 50px;
            height: 55px;
            font-size: 15px;
            background: rgba(250, 250, 250, 0.50);
        }

        >span:focus {
            box-shadow: none;
            background: #E96853;
            color: white;
        }

        >span.p-highlight {
            background: #E96853;
            color: white;
        }

        >span:not(.p-highlight) .badge {
            background: #E96853;
            color: white;
            border-radius: 50%;

            &:hover {
                background: #E96853;
            }
        }

        >span.p-highlight .badge {
            background: white;
            color: #E96853;
            border-radius: 16px;
        }
    }

    &:not(.p-disabled)table td span:not(.p-highlight):not(.p-disabled)table td span:hover {
        background: #E96853 !important;
    }

    .p-datepicker {
        overflow: hidden;
        border-radius: 20px;
    }

    .p-datepicker-header {
        padding: 0 0.5rem;
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
</style>