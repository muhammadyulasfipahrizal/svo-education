<script setup lang="ts">
import EventItem from './EventItem/EventItem.vue';
import EventAdd from './EventAdd/EventAdd.vue';
import { format } from 'date-fns'
import { ref } from "vue";
import {useEventsStore, type IEventItem} from '@/stores/events'
const date = ref();
const visible = ref(false);

const fileUpload = ref();
const fileUploadPreview = ref();
const emit = defineEmits(['files-dropped'])

// Create `active` state and manage it with functions
let active = ref(false)

function setActive() {
  active.value = true
}
function setInactive() {
  active.value = false
}

function onDrop(e: any) {
  setInactive();
  fileUpload.value = e.dataTransfer.files[0];
  fileUploadPreview.value = URL.createObjectURL(fileUpload.value);
}

const title = ref();
const location = ref();
const calendar = ref();
const calendarRef = ref(null);
const time = ref();
const ticketPrice = ref();


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

const onUpload = (e: any) => {
  setInactive();
  fileUpload.value = e.target.files[0];
  fileUploadPreview.value = URL.createObjectURL(fileUpload.value);
}

const eventStore = useEventsStore();
const eventList = ref<IEventItem[]>(eventStore.allEvent);
</script>

<template>
  <section class="px-2">
    <section
      class="grid overflow-hidden flex-column md:flex-row pl-4 pr-4 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 px-2 min-h-full">
      <div class="col-12 md:col-8 lg:col-8 xl:col-8 px-2 bg-white">
        <div class="flex justify-content-between align-items-center">
          <h1 class="inter-normal black-1 mb-2" style="font-size: 35px; font-weight: 700;">Ongoing Event</h1>
          <button @click="onAddEvent" class="btn-orange w-5rem p-0 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M10.5 14.1693V5.83594" stroke="white" stroke-width="1.5" stroke-linecap="round" />
              <path d="M6.33268 10L14.666 10" stroke="white" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <span class="inter-normal white-1" style="font-size: 16px; font-weight: 600;">ADD</span>
          </button>
        </div>
        <div class="grid justify-center flex-wrap gap-2 flex-column md:flex-row px-2">
          <template v-for="item in eventList">
            <EventItem :item="item" />
          </template>
        </div>
      </div>
      <div class="col-12 md:col-4 lg:col-4 xl:col-4">
        <h1 class="inter-normal black-2" style="font-size: 25px; font-weight: 700;">Calendar</h1>
        <div class="flex justify-content-start">
          <Calendar v-model="date" inline class="calendar">
            <!-- for badge calendar -->
            <template #date="slotProps">
              <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15"
                class="flex flex-column justify-content-center align-items-center gap-0">
                <p>{{ slotProps.date.day }}</p>
                <Badge value="2" class="badge flex justify-content-center align-items-center"></Badge>
              </strong>
              <template v-else>{{ slotProps.date.day }}</template>
            </template>
          </Calendar>
        </div>
      </div>

      <div class="col-12 md:hidden lg:hidden xl:hidden py-2">
        <div class="flex gap-2 align-items-center my-3">
          <i class="pi pi-calendar"></i>
          <p class="text-md font-grey-500 font-bold">
            {{ format(new Date(), 'dd-MMM-yyyy') }}
          </p>
        </div>
        <div class="grid surface-0 p-2 border-300 border-1 border-round gap-2">
          <div class="border-round border-1 p-2 flex flex-column w-full">
            <p class="text-sm font-bold text-orange-400">
              {{ format(new Date(), 'HH:mm aa') }} - {{ format(new Date(), 'HH:mm aa') }}
            </p>
            <p class="text-sm font-bold">Plan CRM training sessions</p>
          </div>
          <div class="border-round border-1 p-2 flex flex-column w-full">
            <p class="text-sm font-bold text-orange-400">
              {{ format(new Date(), 'HH:mm aa') }} - {{ format(new Date(), 'HH:mm aa') }}
            </p>
            <p class="text-sm font-bold">Plan CRM training sessions</p>
          </div>
          <div class="border-round border-1 p-2 flex flex-column w-full">
            <p class="text-sm font-bold text-orange-400">
              {{ format(new Date(), 'HH:mm aa') }} - {{ format(new Date(), 'HH:mm aa') }}
            </p>
            <p class="text-sm font-bold">Plan CRM training sessions</p>
          </div>
          <div class="border-round border-1 p-2 flex flex-column w-full">
            <p class="text-sm font-bold text-orange-400">
              {{ format(new Date(), 'HH:mm aa') }} - {{ format(new Date(), 'HH:mm aa') }}
            </p>
            <p class="text-sm font-bold">Plan CRM training sessions</p>
          </div>
        </div>
      </div>
    </section>
  </section>


  <!-- MODAL Upload -->
  <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '90vw' }">
    <template #header>
      <h1 class="inter-normal black-1" style="font-size: 35px; font-weight: 700;">Upload new Media</h1>
    </template>
    <div class="flex flex-column gap-2 pb-2">
      <!-- FILE Upload -->
      <div
        class="flex justify-content-center align-items-center border-1 border-dashed surface-0 surface-border flex-column px-3 py-5 gap-2 h-14rem border-round-xl"
        :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive"
        @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>

        <img v-if="fileUploadPreview" :src="fileUploadPreview" class="w-full h-20rem" />
        <template v-if="!fileUploadPreview">
          <input type="file" ref="fileUpload" class="hidden" accept="image/*" @change="onUpload" />
          <h2 class="inter-normal grey-3" style="font-size: 20px; font-weight: 400;">Drop files here</h2>
          <p class="inter-normal grey-3" style="font-size: 15px; font-weight: 400;">or</p>
          <div class="flex">
            <Button size="small" plain outlined @click="fileUpload.click()">
              <template #default>
                <div class="mx-auto">
                  <p class="inter-normal grey-3" style="font-size: 12px; font-weight: 600;">Select File</p>
                </div>
              </template>
            </Button>
          </div>
        </template>
      </div>
      <div class="flex">
        <p class="inter-normal black-2" style="font-size: 15px; font-weight: 400;">Maximum upload file size: 8 MB</p>
      </div>
      <div class="grid">
        <h1 class="inter-normal black-1 col-12 p-0 pl-2" style="font-size: 30px; font-weight: 700;">Ongoing Event Details</h1>
        <div class="flex gap-0 align-items-center col-12 pt-0">
          <InputText class="p-inputtext-sm" v-model="title" placeholder="Title" />
          <p class="text-500 pl-2">at</p>
          <span class="p-input-icon-left col-12 md:col-4 lg:col-4 xl:col-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8.0009 6.66623C7.82409 6.66623 7.65452 6.73647 7.52949 6.8615C7.40447 6.98652 7.33423 7.15609 7.33423 7.3329V8.66623C7.33423 8.84304 7.40447 9.01261 7.52949 9.13764C7.65452 9.26266 7.82409 9.3329 8.0009 9.3329C8.17771 9.3329 8.34728 9.26266 8.4723 9.13764C8.59733 9.01261 8.66756 8.84304 8.66756 8.66623V7.3329C8.66756 7.15609 8.59733 6.98652 8.4723 6.8615C8.34728 6.73647 8.17771 6.66623 8.0009 6.66623ZM13.6409 6.4529C13.5525 5.47597 13.212 4.53872 12.6528 3.73284C12.0935 2.92696 11.3347 2.28005 10.4504 1.8554C9.5662 1.43075 8.58687 1.24291 7.60827 1.31025C6.62967 1.37759 5.6853 1.6978 4.86756 2.23957C4.16703 2.708 3.57893 3.32577 3.14553 4.04849C2.71212 4.77122 2.44416 5.58097 2.3609 6.41957C2.27922 7.25267 2.38401 8.09351 2.66768 8.88108C2.95134 9.66865 3.40676 10.3832 4.0009 10.9729L7.53423 14.5129C7.59621 14.5754 7.66994 14.625 7.75118 14.6588C7.83242 14.6927 7.91956 14.7101 8.00756 14.7101C8.09557 14.7101 8.18271 14.6927 8.26395 14.6588C8.34519 14.625 8.41892 14.5754 8.4809 14.5129L12.0009 10.9729C12.595 10.3832 13.0505 9.66865 13.3341 8.88108C13.6178 8.09351 13.7226 7.25267 13.6409 6.41957V6.4529ZM11.0676 10.0329L8.0009 13.0996L4.93423 10.0329C4.48229 9.58093 4.1361 9.03445 3.92054 8.43274C3.70499 7.83103 3.62542 7.18903 3.68756 6.5529C3.75011 5.90697 3.95541 5.28301 4.28861 4.72613C4.62182 4.16925 5.0746 3.69337 5.61423 3.3329C6.32153 2.86306 7.15177 2.61243 8.0009 2.61243C8.85003 2.61243 9.68027 2.86306 10.3876 3.3329C10.9256 3.69198 11.3773 4.16575 11.7105 4.72019C12.0436 5.27463 12.2498 5.89597 12.3142 6.53957C12.3784 7.17785 12.2998 7.82242 12.0842 8.4266C11.8686 9.03078 11.5213 9.57946 11.0676 10.0329ZM8.61423 5.04623C8.60092 5.00528 8.58062 4.96693 8.55423 4.9329L8.47423 4.8329C8.39464 4.75733 8.29762 4.70258 8.19179 4.6735C8.08596 4.64443 7.97459 4.64193 7.86756 4.66623H7.74756L7.62756 4.72623L7.52756 4.8129L7.44756 4.9129C7.42118 4.94693 7.40088 4.98528 7.38756 5.02623C7.36726 5.06593 7.35374 5.10874 7.34756 5.1529C7.33651 5.21223 7.33204 5.27259 7.33423 5.3329C7.33191 5.4225 7.35016 5.51145 7.38756 5.5929C7.42153 5.67158 7.4689 5.74377 7.52756 5.80623C7.59102 5.86853 7.66566 5.91829 7.74756 5.9529C7.91076 6.0149 8.09103 6.0149 8.25423 5.9529C8.33525 5.91666 8.40962 5.86708 8.47423 5.80623C8.5329 5.74377 8.58027 5.67158 8.61423 5.5929C8.64925 5.51068 8.66739 5.42227 8.66756 5.3329C8.67083 5.29074 8.67083 5.24839 8.66756 5.20623C8.66136 5.14972 8.64318 5.09517 8.61423 5.04623Z"
                fill="#808081" />
            </svg>
            <InputText class="p-inputtext-sm" v-model="location" placeholder="Location" />
          </span>
        </div>
        <div class="grid pl-2 w-full md:w-auto lg:w-auto">
          <span class="p-input-icon-left col-12 md:col-4 lg:col-4 xl:col-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4.66667 1.33398C4.29848 1.33398 4 1.63246 4 2.00065V2.66732H3.33333C2.59695 2.66732 2 3.26427 2 4.00065V5.33398H14V4.00065C14 3.26427 13.403 2.66732 12.6667 2.66732H12V2.00065C12 1.63246 11.7015 1.33398 11.3333 1.33398H10.6667C10.2985 1.33398 10 1.63246 10 2.00065V2.66732H6V2.00065C6 1.63246 5.70152 1.33398 5.33333 1.33398H4.66667Z"
                fill="#808081" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M14 6.66732H2V12.6673C2 13.4037 2.59695 14.0007 3.33333 14.0007H12.6667C13.403 14.0007 14 13.4037 14 12.6673V6.66732ZM4 8.66732C4 8.29913 4.29848 8.00065 4.66667 8.00065H6C6.36819 8.00065 6.66667 8.29913 6.66667 8.66732V9.33398C6.66667 9.70217 6.36819 10.0007 6 10.0007H4.66667C4.29848 10.0007 4 9.70217 4 9.33398V8.66732Z"
                fill="#808081" />
            </svg>
            <InputText class="p-inputtext-sm" v-model="calendar" placeholder="Calendar" @click="showCalendar" />
            <Calendar v-model="calendar" id="calendar" placeholder="Calendars" @date-select="onDateSelectCalendarRef"
              class="calendarRef" ref="calendarRef" />
          </span>
          <span class="p-input-icon-left -ml-2 col-12 md:col-4 lg:col-4 xl:col-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346627 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 6.94942 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 0 8 0ZM8 14.4C6.7342 14.4 5.49683 14.0246 4.44435 13.3214C3.39188 12.6182 2.57157 11.6186 2.08717 10.4492C1.60277 9.27973 1.47603 7.9929 1.72298 6.75142C1.96992 5.50994 2.57946 4.36957 3.47452 3.47452C4.36958 2.57946 5.50995 1.96992 6.75142 1.72297C7.9929 1.47603 9.27973 1.60277 10.4492 2.08717C11.6186 2.57157 12.6182 3.39188 13.3214 4.44435C14.0246 5.49682 14.4 6.7342 14.4 8C14.4 9.69738 13.7257 11.3252 12.5255 12.5255C11.3253 13.7257 9.69739 14.4 8 14.4ZM8 3.2C7.78783 3.2 7.58435 3.28429 7.43432 3.43431C7.28429 3.58434 7.2 3.78783 7.2 4V7.536L5.52 8.504C5.36589 8.59133 5.24512 8.72734 5.17663 8.8907C5.10814 9.05406 5.0958 9.23554 5.14156 9.40666C5.18731 9.57779 5.28857 9.72889 5.42945 9.83627C5.57033 9.94365 5.74287 10.0012 5.92 10C6.06014 10.001 6.19808 9.9651 6.32 9.896L8.4 8.696L8.472 8.624L8.6 8.52C8.63128 8.4804 8.65811 8.43747 8.68 8.392C8.70607 8.34905 8.72753 8.30346 8.744 8.256C8.76576 8.20513 8.77926 8.15112 8.784 8.096L8.8 8V4C8.8 3.78783 8.71572 3.58434 8.56569 3.43431C8.41566 3.28429 8.21218 3.2 8 3.2Z"
                fill="#808081" />
            </svg>
            <InputText class="p-inputtext-sm" v-model="time" placeholder="Time" @click="showTimepicker" />
            <Calendar id="time-picker" placeholder="Time" @date-select="onTimeSelect" timeOnly class="timeRef"
              ref="timeRef" />
          </span>
          <span class="p-input-icon-left -ml-2 col-12 md:col-4 lg:col-4 xl:col-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clip-path="url(#clip0_2023_355774)">
                <path
                  d="M13.334 7.99935C13.334 7.26602 13.934 6.66602 14.6673 6.66602V3.99935C14.6673 3.26602 14.0673 2.66602 13.334 2.66602H2.66732C1.93398 2.66602 1.33398 3.26602 1.33398 3.99935V6.66602C2.06732 6.66602 2.66732 7.26602 2.66732 7.99935C2.66732 8.73268 2.06732 9.33268 1.33398 9.33268V11.9993C1.33398 12.7327 1.93398 13.3327 2.66732 13.3327H13.334C14.0673 13.3327 14.6673 12.7327 14.6673 11.9993V9.33268C13.934 9.33268 13.334 8.73268 13.334 7.99935Z"
                  fill="#808081" />
              </g>
              <defs>
                <clipPath id="clip0_2023_355774">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <InputText class="p-inputtext-sm" type="number" v-model="ticketPrice" placeholder="Ticket price" />
          </span>
        </div>
        
        <div class="grid px-3 w-full py-3">
          <Button class="w-full btn-save" @click="visible = false">
            <template #default>
              <div class="mx-auto">
                <p class="inter-normal white-1" style="font-size: 13px; font-weight: 700;">Save</p>
              </div>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<style scoped lang="scss">
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

.suggested-orange {
  color: var(--Suggested-orange, #E96853);
}

.card-row {
  width: 750px;
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
    padding: 10px 5px !important;
    width: 50px;
    height: 50px;
    margin: 5px;
  }

  table tr th {
    background: rgba(250, 250, 250, 0.50);
  }

  table td>span {
    border-radius: 5px;
    width: 50px;
    height: 50px;
    font-size: 15px;
    width: 100%;
    min-width: 50px;
    background: rgba(250, 250, 250, 0.50);
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
    font-size: 10px;
    max-width: 30px;
    max-height: 20px;
  }

  table td>span.p-highlight .badge {
    background: white;
    color: #E96853;
    border-radius: 16px;
    font-size: 10px;
    max-width: 30px;
    max-height: 20px;
  }

  &:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled) span:hover {
    background: #E96853 !important;
  }
}

.btn-save {
  background-color: #00C0DD;
  border: none;
}

.p-inputtext-sm {
  background-color: #D9D9D9;
  width: 139px;
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

.title {
  color: var(--font-1, #001125);
  font-family: Inter, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
}

.title-text {
  color: #000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
}
</style>