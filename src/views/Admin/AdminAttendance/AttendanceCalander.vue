<template>
  <div class="border-2 surface-border flex flex-column align-items-center justify-content-center container mr-3 mb-3">
    <div class="flex align-items-center justify-content-center avatar-container mb-1">
      <Avatar :label="card.label" class="my-1" size="xlarge" shape="circle" />
      <span v-html="card.iconMarkup" :class="getIconClass(card.iconMarkup)"></span>
    </div>
    <p :class="getStatusClass(card.status)">{{ card.status }}</p>
    <p class="font-bold text-xl">{{ card.title }}</p>
    <div class="flex flex-row align-items-center">
      <p class="font-semibold">Current Day:</p>
      <p class="current-day">{{ card.currentDay }}</p>
    </div>
    <div class="progress-bar-container my-2">
      <div class="progress-bar" :style="{ width: card.progress + '%' }"></div>
    </div>
    <div class="flex flex-row align-items-center text-sm">
      <P>Attendance: </P>
      <p class="ml-1">{{ card.attendance }}/5 days</p>
      <p class="ml-7">{{ card.percent }}%</p>
    </div>
    <Calendar borderless :locale="calendarLocale" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';


const props = defineProps({
  card: {
    type: Object,
    default: () => ({
      label: '',
      status: '',
      title: '',
      currentDay: '',
      progress: 0,
      attendance: 0,
      percent: 0,
    }),
  },
});

const calendarLocale = ref({
  masks: {
    weekdays: 'WWW',
  },
});

const getIconClass = (iconMarkup: string) => {
  if (iconMarkup.includes('pi-thumbs-up')) {
    return 'avatar-icon-thumb-up';
  } else if (iconMarkup.includes('pi-thumbs-down')) {
    return 'avatar-icon-thumb-down';
  }
  
  return '';
};

const getStatusClass = (status: string) => {
  if (status.includes('COMPLETED')) {
    return 'attendance-status-completed';
  } else if (status.includes('IN-PROGRESS')) {
    return 'attendance-status-in-progress';
  }
  
  return '';
};

</script>


<style scoped>
.container {
  border-radius: 15px;
  width: 300px;
}

.attendance-status-completed {
  background-color: #649a6d;
  border-radius: 5px;
  padding: 0 5px;
  color: white;
}

.attendance-status-in-progress {
  background-color: #EFAE1C;
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

.avatar-icon-thumb-up {
  z-index: 1;
  position: absolute;
  top: 65%;
  left: 65%;
  background-color: #649a6d;
  padding: 5px 5px 0 5px;
  border-radius: 50%;
  color: white;
}

.avatar-icon-thumb-down {
  z-index: 1;
  position: absolute;
  top: 65%;
  left: 65%;
  background-color: #BD3000;
  padding: 5px 5px 0 5px;
  border-radius: 50%;
  color: white;
}
</style>
