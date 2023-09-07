<script setup lang="ts">
import { format } from 'date-fns';
import { ref, onMounted, watchEffect } from "vue";
import { eventDummyData } from './EventDummyData';
import type { Event } from './Event.type'
import { useEventsStore, type IEventItem } from '@/stores/events';
import router from '@/router';
import { useRoute } from 'vue-router';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const config: Partial<any> = ref({
    inline: true,
    mode: "range",
});


const eventList = ref<Event[]>(eventDummyData)

const date = ref();
const visible = ref(false);
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
const eventStore = useEventsStore();
const route = useRoute();
const selectedEvent = ref<IEventItem>();
const location = ref();
const name = ref();
const description = ref();
const indexEvent = ref<number | null>(null)
onMounted(() => {
    const selectedId = (route.params['id'] as string) as unknown as number;
    if (selectedId) {
        const findEventIndex = eventStore.allEvent.findIndex((v) => v.id == selectedId)
        if (findEventIndex > -1) {
            const findEvent = eventStore.allEvent[findEventIndex];
            indexEvent.value = findEventIndex
            selectedEvent.value = findEvent;
            name.value = selectedEvent.value.name;
            description.value = selectedEvent.value.description;
            location.value = selectedEvent.value.location;
            date.value = new Date();
            time.value = format(new Date(selectedEvent.value.date), "'Starts at ' hh:mm b");

            ticketType.value = 'Gold - Early Bird';
            ticketPricePerItem.value = findEvent.ticket_prize;
            ticketCount.value = 1;
        }
    }
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

const onSave = () => {
    if (indexEvent.value !== null) {
        eventStore.updateEvent(indexEvent.value, { ...eventStore.allEvent[indexEvent.value], location: location.value, name: name.value, description: description.value })
        router.push('/admin/event');
    }
}
</script>

<template>
    <section class="grid flex-column md:flex-row pr-2 pl-2 md:pl-2 lg:pl-0 xl:pl-0">
        <div class="event-list col-12 md:col-8 lg:col-8">
            <div class="flex gap-1 align-items-center px-3">
                <Button @click="$router.push('/admin/event')" link class="btn-back" size="small" icon="pi pi-angle-left" />
                <h1 class="inter-normal black-2" style="font-size: 35px; font-weight: 700;">Ongoing Event</h1>
            </div>
            <div class="flex gap-2 flex-column md:w-full ">
                <Carousel :value="eventList" :numVisible="1" :numScroll="1">
                    <template #item="value">
                        <div class="flex flex-row">
                            <img :src="value.data.image" alt="certifications" class="w-full">
                        </div>
                    </template>
                </Carousel>
                <InputText v-model="name" class="inter-normal black-2 mx-3" style="font-size: 25px; font-weight: 700;" />
                <Textarea v-model="description" rows="8" class="inter-normal black-2 mx-3" style="font-size: 14px; font-weight: 400;"/>
            </div>
        </div>

        <div class="col-12 md:col-4 lg:col-4">
            
            <div class="calendar">
                <h1 class="inter-normal black-2" style="font-size: 25px; font-weight: 700;">Calendar</h1>
                <flat-pickr v-model="date" :config="config" class="flex w-full border-round"/>
            </div>

            <!-- Information -->
            <h1 class="inter-normal black-2 mb-2 mt-3" style="font-size: 20px; font-weight: 700;">Event Information</h1>
            <div>
                <div class="w-full flex flex-column align-items-center ">
                    <img src="/assets/img/ticket.png" alt="ticket" class="mb-3" style="width: 185px" />
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
                        <InputText class="p-inputtext-sm w-full" type="text" v-model="location" placeholder="Location" />
                    </span>
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-calendar ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" v-model="calendar" placeholder="Calendar"
                            @click="showCalendar" />
                        <Calendar v-model="calendar" id="calendar" placeholder="Calendars"
                            @date-select="onDateSelectCalendarRef" class="calendarRef" ref="calendarRef" />
                    </span>
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-clock ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" v-model="time" placeholder="Time"
                            @click="showTimepicker" />
                        <Calendar id="time-picker" placeholder="Time" @date-select="onTimeSelect" timeOnly class="timeRef"
                            ref="timeRef" />
                    </span>
                    <span class="p-input-icon-left col-12 md:col-6 lg:col-6 xl:col-6 py-1">
                        <i class="pi pi-ticket ml-1"></i>
                        <InputText class="p-inputtext-sm w-full" type="text" v-model="ticketPrice"
                            placeholder="Ticket price" />
                    </span>
                </div>

                <Button class="btn-add my-2 inter-normal justify-content-center" style="font-size: 10px; font-weight: 600;">Add to cart for RM {{ ticketPrice
                }}</Button>
            </div>
        </div>
        <div class="col-12">
            <Button label="Save" @click="onSave" class="w-full inter-normal btn-save" style="font-size: 13px; font-weight: 700;"></Button>
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
.inter-normal {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }
  
  .dm-sans-normal {
    font-family: DM Sans;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.12px;
  }
  
  .poppins-normal {
    font-family: Poppins;
    font-style: normal;
    line-height: 160%;
  }
  
  .black-1 {
    color: var(--font-1, #001125);
  }
  
  .black-2 {
    color: #000;
  }
  
  .white-1 {
    color: var(--White, #FFF);
  }
  
  .grey-1 {
    color: #9F9F9F;
  }
  
  .grey-2 {
    color: #6E6893;
  }
  
  .grey-3 {
    color: var(--Suggested-dark-grey, #808081);
  }
.btn-save {
    background-color: #00C0DD;
    border: none;
    border-radius: 0px;
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

::v-deep(.flatpickr-input[readonly]) {
    display: none !important;
}

::v-deep(.flatpickr-day.selected){
    border-radius: 5px;
    background: var(--Suggested-orange, #E96853);
}

::v-deep(.flatpickr-day:hover){
    border-radius: 5px;
    background: var(--Suggested-orange, #E96853);
}

::v-deep(.flatpickr-day.selected.startRange){
    border-radius: 5px;
    background: var(--Suggested-orange, #E96853);
}

::v-deep(.flatpickr-day.selected.endRange){
    border-radius: 5px;
    background: var(--Suggested-orange, #E96853);
}

::v-deep(.flatpickr-monthDropdown-months) {
    text-align: center;
    border-radius: 5px;
    border: 1px solid #D9D5EC;
    background: #FFF;
    color: #000;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.6px;
    margin-right: 10px;
}

::v-deep(.flatpickr-current-month input.cur-year) {
    border-radius: 5px;
    border: 1px solid #D9D5EC;
    background: #FFF;
    color: #000;
    font-weight: 500;
}

::v-deep(.flatpickr-prev-month) {
    margin-left: 5%;
}

::v-deep(.flatpickr-next-month) {
    margin-right: 5%;
}

::v-deep(.flatpickr-rContainer){
    width: 100%;
    border-radius: 0px 0px 20px 20px;
    border-bottom: 1px solid #D9D5EC;
    border-left: 1px solid #D9D5EC;
    border-right: 1px solid #D9D5EC;
}

::v-deep(.flatpickr-weekdays) {
    width: 100%;
    margin: 14px 0px;
}

::v-deep(.flatpickr-month) {
    max-width: 100%;
    height: 38px;
    border-radius: 20px 20px 0 0;
    border-top: 1px solid #D9D5EC;
    border-left: 1px solid #D9D5EC;
    border-right: 1px solid #D9D5EC;
}

::v-deep(.flatpickr-days) {
    width: 100%;
}

::v-deep(.dayContainer) {
    width: 100%;
    max-height: 350px;
    height: 250px;
    max-width: 100%;
}

::v-deep(.flatpickr-months) {
    width: 100%;
    max-width: 100%;
}

@media (min-width: 320px) and (max-width: 540px) {
    ::v-deep(.flatpickr-day) {
        margin: 0px 14px
    }
}

@media (min-width: 540px) and (max-width: 768px) {
    ::v-deep(.flatpickr-day) {
        margin: 0px 25px
    }
}

@media (min-width: 768px) and (max-width: 1440px) {
    ::v-deep(.flatpickr-day) {
        margin: 0px 5px
    }
}

@media (min-width: 1440px) and (max-width: 1720px) {
    ::v-deep(.flatpickr-day) {
        margin: 0px 10px
    }
}

@media (min-width: 1720px) and (max-width: 2040px) {
    ::v-deep(.flatpickr-day) {
        margin: 0px 15px
    }
}
</style>

