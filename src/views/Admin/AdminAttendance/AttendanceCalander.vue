<script>
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
      Calendar 
  },
};
</script>

<template>
    <div class="border-2 surface-border flex flex-column gap-1 align-items-center justify-content-center container">
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
      <div class="flex flex-row align-items-center text-sm">
        <ProgressBar :value="20" class="progress-bar"></ProgressBar>
        <P>Attendance: </P>
        <p class="ml-1">4/5 days</p>
        <p class="ml-7">80%</p>
      </div>
      <Calendar :borderless="true" :locale="{ masks: { weekdays: 'WWW' } }"/>
    </div>
    
</template>

<style scoped>
.container {
  border-radius: 15px;
}

.attendance-status {
  background-color: #649A6D;
  border-radius: 5px;
  padding: 0 5px;
  color: white;
}

.current-day {
  margin-left: 2px;
  padding: 2px 5px;
  color: white;
  background-color: #00C0DD;
  border-radius: 5px;
}

.progress-bar {
  color: #649A6D;
}

.avatar-container {
  position: relative;
}

.avatar-icon {
  z-index: 1;
  position: absolute;
  top: 65%;
  left: 65%;
  background-color: #649A6D;
  padding: 5px;
  border-radius: 50%;
  color: white;
}
</style>