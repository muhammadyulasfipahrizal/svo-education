<template>
    <div class="border-2 surface-border grid align-items-center justify-content-center w-full p-0 m-0 mb-3 border-round-xl">
      <div class="flex align-items-center justify-content-center avatar-container col-12 p-0">
        <Avatar :label="card.label" class="my-1" size="xlarge" shape="circle" />
        <span v-html="card.iconMarkup" :class="getIconClass(card.iconMarkup)" class="absolute"></span>
      </div>
      <p class="font-bold text-base col-12 text-center p-0">{{ card.name }}</p>
      <div class="flex justify-content-center align-items-center col-12 text-center py-0">
        <p class="font-semibold text-xs">Current Day:</p>
        <p class="current-day text-xs">{{ card.currentDay }}</p>
      </div>
      <ProgressBar class="w-full mx-2 progressbar" :value="50"></ProgressBar>
      <div class="flex justify-content-between align-items-center text-xs col-12 py-0">
        <p class="">Attendance: {{ card.attendance }}/5 days</p>
        <p class="">{{ card.percent }}%</p>
      </div>
      <div class="col-12 p-0">
        <Calendar borderless :locale="calendarLocale" :attributes="attributes" class="w-full" />
      </div>
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
        name: '',
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
  
  const attributes = ref([
    {
      // Boolean
      dot: 'green',
      dates: [
        new Date(2018, 0, 1),
        new Date(2018, 0, 10),
        new Date(2018, 0, 22),
      ],
    },
    {
      dot: 'red',
      dates: [
        new Date(2018, 0, 4),
        new Date(2018, 0, 10),
        new Date(2018, 0, 15),
      ],
    },
    {
      dot: {
        style: {
          backgroundColor: 'brown',
        },
      },
      dates: [
        new Date(2018, 0, 12),
        new Date(2018, 0, 26),
        new Date(2018, 0, 15),
      ],
    },
  ]);
  
  </script>
  
  
  <style scoped lang="scss">
  .container {
    border-radius: 15px;
    max-width: 187px;
  
    @media screen and (min-width: 769px) {
      max-width: 216px;
    }
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
    height: 8px;
    background-color: #f2f2f2;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: inherit;
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
    left: 55%;
    bottom: 5%;
    background-color: #649a6d;
    padding: 5px 5px 0 5px;
    border-radius: 50%;
    color: white;
  }
  
  .avatar-icon-thumb-down {
    z-index: 1;
    position: absolute;
    left: 55%;
    bottom: 5%;
    background-color: #BD3000;
    padding: 5px 5px 0 5px;
    border-radius: 50%;
    color: white;
  }
  
  .progressbar {
    height: 8px;
  }
  
  ::v-deep(.p-progressbar) {
    .p-progressbar-value {
      background: #659872;
    }
  
    .p-progressbar-label {
      display: none;
    }
  }
  
  ::v-deep(.vc-container) {
    border-radius: 1rem;
  
    .vc-day {
      width: 30px;
      height: 30px;
  
      .vc-day-content {
        font-size: 10px;
      }
  
      @media screen and (max-width: 768px) {
        width: 26px;
        height: 26px;
        min-height: 26px;
  
        .vc-day-content {
          font-size: 8.9px;
        }
      }
    }
  
    .vc-header {
      padding: 0;
      margin: 0;
      width: 100%;
  
      button {
        background: transparent;
        border: 0;
        font-size: 10px;
      }
  
      .vc-arrow svg {
        width: 10px;
        height: 10px;
      }
  
      .vc-title {
        text-transform: uppercase;
      }
    }
  
    .vc-week,
    .vc-weekdays {
      max-width: 204px;
  
      @media screen and (max-width: 768px) {
        max-width: 183px;
      }
    }
  
    .vc-pane {
      min-width: 0;
      width: 100%;
  
      max-width: 214px;
  
      @media screen and (max-width: 768px) {
        max-height: 183px;
      }
    }
  
    .vc-weeks {
      padding: 0px;
  
      .vc-weekday {
        font-size: 10px;
        width: 30px;
        height: 20px;
        padding: 0px;
  
        @media screen and (max-width: 768px) {
          font-size: 8.9px;
          width: 26px;
        }
      }
    }
  }
  </style>
  