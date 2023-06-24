<template>
  <div class="border-2 surface-border flex flex-column align-items-center justify-content-center container mr-3 mb-3">
    <div class="flex align-items-center justify-content-center avatar-container mb-1">
      <Avatar label="P" class="my-1" size="xlarge" shape="circle" />
      <i class="pi pi-thumbs-up avatar-icon"></i>
    </div>
    <p class="attendance-status">COMPLETED</p>
    <p class="font-bold text-xl">UI UX Design</p>
    <div class="flex flex-row align-items-center">
      <p class="font-semibold">Current Day:</p>
      <p class="current-day">Day 5</p>
    </div>
    <div class="progress-bar-container my-2">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="flex flex-row align-items-center text-sm">
      <P>Attendance: </P>
      <p class="ml-1">4/5 days</p>
      <p class="ml-7">80%</p>
    </div>
    <Calendar borderless :locale="calendarLocale" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    Calendar,
  },
  setup() {
    const calendarLocale = ref({
      masks: {
        weekdays: 'WWW',
      },
    });
    const progress = ref(20);

    return {
      calendarLocale,
      progress,
    };
  },
};
</script>

<style scoped>
.container {
  border-radius: 15px;
  width: 300px;
}

.attendance-status {
  background-color: #649a6d;
  border-radius: 5px;
  padding: 0 5px;
  color: white;
}

.progress-bar-container {
  width: 280px;
  height: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #649A6D;
  transition: width 0.5s;
}

.current-day {
  margin-left: 2px;
  padding: 2px 5px;
  color: white;
  background-color: #00c0dd;
  border-radius: 5px;
}

.progress-bar {
  color: #649a6d;
}

.avatar-container {
  position: relative;
}

.avatar-icon {
  z-index: 1;
  position: absolute;
  top: 65%;
  left: 65%;
  background-color: #649a6d;
  padding: 5px;
  border-radius: 50%;
  color: white;
}
</style>
