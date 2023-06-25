<script setup lang="ts">
import EventItem from './EventItem/EventItem.vue';
import EventAdd from './EventAdd/EventAdd.vue';
import { format } from 'date-fns'
import { ref } from "vue";
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

</script>

<template>
  <main class="flex px-5 justify-content-between">
    <div class="event-list">
      <h1 class="font-bold mb-2">Ongoing Event</h1>

      <div class="flex gap-2">
        <EventItem />
        <EventItem />
        <EventAdd @on-add="onAddEvent" />
      </div>
    </div>
    <div class="calendar">
      <h1 class="font-bold mb-2">Calendar</h1>
      <div class="card flex justify-content-center">
        <Calendar v-model="date" inline showWeek class="calendar">
          <!-- for badge calendar -->
          <template #date="slotProps">
            <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15"
              class="flex flex-column justify-content-center align-items-center gap-0">
              <p>{{ slotProps.date.day }}</p>
              <Badge value="2" class="badge text-xs flex justify-content-center align-items-center"></Badge>
            </strong>
            <template v-else>{{ slotProps.date.day }}</template>
          </template>
        </Calendar>
      </div>
    </div>
  </main>


  <!-- MODAL Upload -->
  <Dialog v-model:visible="visible" modal header="Upload new Media" :style="{ width: '50vw' }">
    <div class="flex flex-column gap-2">
      <!-- FILE Upload -->
      <div
        class="flex justify-content-center align-items-center border-1 border-dashed surface-0 surface-border flex-column p-3 gap-2 w-full"
        :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive"
        @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>

        <img v-if="fileUploadPreview" :src="fileUploadPreview" class="w-full h-20rem" />
        <template v-if="!fileUploadPreview">
          <input type="file" ref="fileUpload" class="hidden" accept="image/*" @change="onUpload" />
          <h2 class="text-700 font-medium text-sm">Drop files here</h2>
          <p class="text-500">or</p>
          <div class="flex">
            <Button label="Select" size="small" plain outlined @click="fileUpload.click()"></Button>
          </div>
        </template>
      </div>
      <div class="flex">
        <p class="text-500 text-xs">Maximum upload file size: 8 MB</p>
      </div>
      <div class="flex flex-column gap-2">
        <h1 class="text-900 font-bold">Ongoing Event Details</h1>
        <div class="flex pl-3  gap-2 align-items-center">
          <InputText class="p-inputtext-sm" v-model="title" placeholder="Title" />
          <p class="text-500">at</p>
          <InputText class="p-inputtext-sm" v-model="location" placeholder="Location" />
        </div>
        <div class="flex pl-3  gap-2 align-items-center">
          <span class="p-input-icon-left">
            <i class="pi pi-calendar"></i>
            <InputText class="p-inputtext-sm" v-model="calendar" placeholder="Calendar" @click="showCalendar" />
            <Calendar v-model="calendar" id="calendar" placeholder="Calendars" @date-select="onDateSelectCalendarRef"
              class="calendarRef" ref="calendarRef" />
          </span>
          <span class="p-input-icon-left">
            <i class="pi pi-clock"></i>
            <InputText class="p-inputtext-sm" v-model="time" placeholder="Time" @click="showTimepicker" />
            <Calendar id="time-picker" placeholder="Time" @date-select="onTimeSelect" timeOnly class="timeRef"
              ref="timeRef" />
          </span>
          <span class="p-input-icon-left">
            <i class="pi pi-ticket"></i>
            <InputText class="p-inputtext-sm" type="number" v-model="ticketPrice" placeholder="Ticket price" />
          </span>
        </div>
        <div class="flex">
          <Button label="SAVE" class="w-full btn-save" @click="visible = false"></Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<style scoped lang="scss">
::v-deep(.calendar > .p-datepicker) {
  border-radius: 20px;

  .p-datepicker-calendar table td {
    padding: 0.25rem !important;
  }

  table td>span {
    border-radius: 5px;
    width: 50px;
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
</style>