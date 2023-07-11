<script setup lang="ts">
import type router from '@/router';
import { format } from 'date-fns';
import { ref, onMounted } from "vue";

const date = ref();
const visible = ref(false);

const fileUpload = ref();
const fileUploadPreview = ref();


const title = ref();
const description = ref();
const location = ref();
const calendar = ref();
const calendarRef = ref(null);
const time = ref();
const ticketPrice = ref();
const addImage = ref();
const ticketType = ref();
const ticketPricePerItem = ref();
const ticketCount = ref();


const showCalendar = () => {
    const calendarEl = document.querySelector('#calendar > input') as HTMLElement
    if (calendarEl) {
        calendarEl.click();
    }
};

const showTimepicker = () => {
    const timeEl = document.querySelector('#time-picker > input') as HTMLElement
    if (timeEl) {
        timeEl.click();
    }
};

const onAddEvent = () => {
    console.log('adding');
    visible.value = true;
}

const onDateSelectCalendarRef = (value: Date) => {
    calendar.value = format(value, 'dd/MM/yyyy');
}

const onTimeSelect = (value: Date) => {
    time.value = format(value, 'HH:mm')
}

onMounted(() => {
    date.value = new Date();
    location.value = 'Bukit bintang';
    ticketPrice.value = 'Start from RM9.99';
    title.value = "Network Technology Seminar";
    description.value = 'The world of network technology is constantly evolving, with new advancements and innovations being introduced every year. To stay up-to-date with the latest trends, it is essential to attend a seminar that covers the most recent developments in this field. Our network technology seminar is designed to do just that!|';
    time.value = format(new Date(), "'Starts at ' hh:mm b");

    ticketType.value = 'Gold - Early Bird';
    ticketPricePerItem.value = 9.99;
    ticketCount.value = 1;
})

</script>

<template>
    <section class="grid px-5 md:justify-content-between flex-column md:flex-row" >
        <div class="event-list col-8">
            <div class="flex gap-1 align-items-center">
                <Button @click="$router.push('/admin/event')" link class="btn-back" size="small" icon="pi pi-angle-left" />
                <h1 class="font-bold">Ongoing Event</h1>
            </div>

            <div class="flex gap-2 flex-column width md:w-full">
                <img src="/assets/img/event/innovations.png" alt=""/>
                <InputText v-model="title" class="title" />
                <Textarea v-model="description" rows="5" />
                <div class="flex">
                    <Button label="SAVE" @click="$router.push('/admin/event')" class="w-full btn-save"></Button>
                </div>
            </div>
        </div>
        <div class="calendar w-screen md:w-fit">
            <h1 class="font-bold mb-2">Calendar</h1>
            <div class="flex">
                <Calendar v-model="date" inline showWeek class="calendar width md:w-max" >
                </Calendar>
            </div>

            <!-- Information -->
            <h1 class="font-bold mb-2 mt-3">Event Information</h1>
            <div class="flex flex-column gap-2">
                <div class="flex gap-2">
                    <span class="p-input-icon-left">
                        <i class="pi pi-map-marker"></i>
                        <InputText class="p-inputtext-sm" type="text" v-model="location" placeholder="Location" />
                    </span>
                    <span class="p-input-icon-left">
                        <i class="pi pi-calendar"></i>
                        <InputText class="p-inputtext-sm" v-model="calendar" placeholder="Calendar" @click="showCalendar" />
                        <Calendar v-model="calendar" id="calendar" placeholder="Calendars"
                            @date-select="onDateSelectCalendarRef" class="calendarRef" ref="calendarRef" />
                    </span>
                </div>
                <div class="flex gap-2">
                    <span class="p-input-icon-left">
                        <i class="pi pi-clock"></i>
                        <InputText class="p-inputtext-sm" v-model="time" placeholder="Time" @click="showTimepicker" />
                        <Calendar id="time-picker" placeholder="Time" @date-select="onTimeSelect" timeOnly class="timeRef"
                            ref="timeRef" />
                    </span>
                    <span class="p-input-icon-left">
                        <i class="pi pi-ticket"></i>
                        <InputText class="p-inputtext-sm" type="text" v-model="ticketPrice" placeholder="Ticket price" />
                    </span>
                </div>
            </div>
            <!-- TICKETS -->
            <div class="grid mt-2">
                <div class="col-4 flex flex-column gap-2 cursor-pointer p-5 border-round justify-content-center align-items-center border-1 surface-0 surface-border"
                    @click="addImage.click()">
                    <input type="file" class="hidden" ref="addImage" />
                    <i class="pi pi-image"></i>
                    <p class="text-xs font-normal text-900">Add Image</p>
                </div>
                <div class="col-8 flex flex-column gap-1 pt-0">
                    <InputText v-model="ticketType" />
                    <div class="flex gap-1">
                        <p>Price: RM
                            <InputText class="ticket-type" v-model="ticketPricePerItem" />
                        </p>
                        <p>per ticket
                            <InputText v-model="ticketCount" class="p-inputtext-sm ticket-count" type="number" />
                        </p>
                    </div>
                    <p class="text-xs text-900">Include 4% online processing fee + RM 4 ticket fee</p>
                    <Button class="btn-add">Add to cart for RM 15.00</Button>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
.width {
    width: calc(100vw - 100px);
}
.calendar>.p-datepicker {
    border-radius: 20px;
    width: 100%;
}

.calendar>.p-datepicker-calendar table td {
    padding: 0.25rem !important;
}

.calendar>.p-datepicker table td>span {
    border-radius: 5px;
    width: 30px;
    height: 30px;
    font-size: 15px;
}

.calendar>.p-datepicker table td>span:focus {
    box-shadow: none;
}

.calendar>.p-datepicker table td>span.p-highlight {
    background: #E96853;
    color: white;
}

.calendar>.p-datepicker table td>span:not(.p-highlight) .badge {
    background: #E96853;
    color: white;
    border-radius: 50%;
}

.calendar>.p-datepicker table td>span.p-highlight .badge {
    background: white;
    color: #E96853;
    border-radius: 16px;
}

.p-datepicker:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled) span:hover {
    background: #E96853 !important;
}

.title {
    height: 50px;
    padding: 5px;
    border: 1px;
    gap: 5px;
    /* border-radius: 0; */
}
</style>
<style scoped>
.btn-save {
    background-color: #00C0DD;
    border: none;
}

.btn-back {
    width: 40px;
    height: 40px;
}

.btn-add {
    border-radius: 0;
    width: 100%;
    background-color: #E26954;
    border: 0;
}

.p-inputtext-sm {
    /* background-color: #D9D9D9; */
    width: 182px;
    height: 30px;
}

.calendarRef,
.timeRef {
    width: 0px;
    height: 0px;
    visibility: hidden;
    left: 0;
    position: absolute;
}

.ticket-type,
.ticket-count {
    width: 40px;
    height: 34px;
    border-radius: 0;
    padding: 5px;
    font-size: 12px;
}
</style>

