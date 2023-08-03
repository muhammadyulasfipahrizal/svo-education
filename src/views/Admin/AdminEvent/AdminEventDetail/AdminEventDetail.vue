<script setup lang="ts">
import type router from '@/router';
import { format } from 'date-fns';
import { ref, onMounted, watchEffect } from "vue";

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
    ticketPrice.value = 9.99;
    title.value = "Network Technology Seminar";
    description.value = 'The world of network technology is constantly evolving, with new advancements and innovations being introduced every year. To stay up-to-date with the latest trends, it is essential to attend a seminar that covers the most recent developments in this field. Our network technology seminar is designed to do just that!|';
    time.value = format(new Date(), "'Starts at ' hh:mm b");

    ticketType.value = 'Gold - Early Bird';
    ticketPricePerItem.value = 9.99;
    ticketCount.value = 1;
})


const isLargeScreen = ref(false);
const attributes = ref([
  {
    highlight: {
      color: 'gray',
    },
    dates: [
      [new Date(2022, 10, 7), new Date(2022, 10, 9)],
    ],
  },
]);

watchEffect(() => {
    const handleResize = () => {
        isLargeScreen.value = window.innerWidth >= 765;
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
});
const decrementTicketCount = () => ticketCount.value - 1 < 1 ? ticketCount.value : ticketCount.value--;
</script>

<template>
    <section class="grid flex-column md:flex-row pr-2 pl-2 md:pl-2 lg:pl-0 xl:pl-0">
        <div class="event-list col-12 md:col-8 lg:col-8">
            <div class="flex gap-1 align-items-center">
                <Button @click="$router.push('/admin/event')" link class="btn-back" size="small" icon="pi pi-angle-left" />
                <h1 class="font-bold">Ongoing Event</h1>
            </div>

            <div class="flex gap-2 flex-column md:w-full ">
                <img src="/assets/img/event/innovations.png" alt="" class="w-full" />
                <InputText v-model="title" class="title text-2xl font-bold" />
                <Textarea v-model="description" rows="10" />
            </div>
        </div>

        <div class="col-12 md:col-4 lg:col-4">
            <div class="calendar">
                <h1 class="font-bold">Calendar</h1>
                <div class="flex">
                    <VDatePicker v-model.range="attributes" disabled mode="date" class="datepicker w-full" :attributes="attributes"/>
                </div>
            </div>

            <!-- Information -->
            <h1 class="font-bold mb-2 mt-3">Event Information</h1>
            <div>
                <div class="w-full flex flex-column align-items-center ">
                    <img src="/assets/img/ticket.png" alt="ticket" class="mb-3" style="width: 185px"/>
                    <div class="grid">
                        <div class="col-7">
                            <InputText v-model="ticketType" class="border-noround w-full font-bold" />
                        </div>
                        <div class="col-5">
                            <div class="flex border-red-500 border-1 align-items-center p-1 border-round gap-1">
                                <button class="bg-white text-red-500 border-none cursor-pointer"
                                    @click="decrementTicketCount">
                                    <img src="/assets/icon/minus.svg" alt="minus" />
                                </button>
                                <span class="border-1 border-solid border-300 w-1px" style="height: 30px;"></span>
                                <InputText v-model="ticketCount" class="border-none ticket-count" type="number" min="1" />
                                <span class="border-1 border-solid border-300 w-1px" style="height: 30px;"></span>
                                <button class="bg-white text-red-500 border-none cursor-pointer" @click="ticketCount++">
                                    <img src="/assets/icon/plus.svg" alt="plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid py-2">
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-map-marker ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" type="text" v-model="location" placeholder="Location" 
                        style="background: #D9D9D9; height: 35px;"/>
                    </span>
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-calendar ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" v-model="calendar" placeholder="Calendar"
                            @click="showCalendar" style="background: #D9D9D9; height: 35px;"/>
                        <Calendar v-model="calendar" id="calendar" placeholder="Calendars"
                            @date-select="onDateSelectCalendarRef" class="calendarRef" ref="calendarRef" 
                            style="background: #D9D9D9; height: 35px;"/>
                    </span>
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-clock ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" v-model="time" placeholder="Time"
                            @click="showTimepicker" style="background: #D9D9D9; height: 35px;"/>
                        <Calendar id="time-picker" placeholder="Time" @date-select="onTimeSelect" timeOnly class="timeRef"
                            ref="timeRef" />
                    </span>
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-ticket ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" type="text" v-model="ticketPrice"
                            placeholder="Ticket price" style="background: #D9D9D9; height: 35px;"/>
                    </span>
                </div>

                <Button class="btn-add my-2 text-center justify-content-center">Add to cart for RM {{ ticketPrice }}</Button>
            </div>
        </div>
        <div class="col-12 pr-2">
            <Button label="SAVE" @click="$router.push('/admin/event')" class="w-full  btn-save"></Button>
        </div>
    </section>
</template>
<style>
.width {
    width: calc(100vw - 100px);
}

.calendar .datepicker {
    border-radius: 20px;
    border: 1px solid #D9D5EC;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.calendar .vc-day { 
    pointer-events: none
}

.title {
    height: 50px;
    padding: 5px;
    border: 1px;
    gap: 5px;
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
    -moz-appearance: textfield;
    -o-appearance: none;
    appearance: none;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    &:focus {
        outline: none;
    }
}
</style>

