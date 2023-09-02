<template>
  <div class="border-2 surface-border grid align-items-center justify-content-center w-full p-0 m-0 mb-3 border-round-xl">
    <div class="flex align-items-center justify-content-center avatar-container col-12 px-0">
      <img :src="card.image" class="border-circle w-4rem h-4rem object-cover" style="object-fit: cover" />
      <span v-html="card.iconMarkup" :class="getIconClass(card.iconMarkup)" class="absolute"></span>
    </div>
    <p class="font-semibold text-base col-12 text-center p-0 inter text-color">{{ card.name }}</p>
    <div class="flex justify-content-center align-items-center col-12 text-center py-2">
      <p class="font-semibold text-xs inter text-color">Current Day:</p>
      <p class="current-day text-xs inter">DAY {{ card.currentDay }}</p>
    </div>
    <ProgressBar class="w-full mx-2 progressbar" :value="card.attendance / 30 * 100"></ProgressBar>
    <div class="flex justify-content-between align-items-center text-xs col-12 py-0">
      <p class="poppins text-color-2">Attendance: {{ card.attendance }}/30 days</p>
      <p class="poppins text-color-2">{{ Math.round(card.attendance / 30 * 100) }}%</p>
    </div>
    <div class="col-12 p-0 ">
      <Calendar borderless :locale="calendarLocale" :attributes="attributes" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

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
const currentDate = new Date();
const firstDayOfMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);
const daysOfMonthArray = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
const greenDays = []
const redDays = []
for (const day of daysOfMonthArray) {
  if (day.getDate() > 1 && day.getDate() < 15) {
    greenDays.push(day)
  } else {
    redDays.push(day)
  }
}
const attributes = ref([
  {
    // Boolean
    dot: 'green',
    content: 'green',
    dates: greenDays,
  },
  {
    dot: 'red',
    content: 'red',
    dates: redDays
  },
]);

</script>


<style scoped lang="scss">
.inter {
  font-family: Inter;
}

.poppins {
  font-family: Poppins;
}

.text-color {
  color: #001125;
}

.text-color-2 {
  color: #292D32;
}
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
      &:hover {
        background: unset;
      }
      &.vc-red {
        color: #BE2F00;
      }
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

    button>span {
      color: var(--Black, #000);
      text-align: center;
      font-family: Poppins;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: 100%; /* 10px */
      letter-spacing: -0.1px;
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
    // max-width: 204px;

    @media screen and (max-width: 768px) {
      // max-width: 183px;
    }
  }

  .vc-pane {
    min-width: 0;
    width: 100%;

    // max-width: 214px;

    @media screen and (max-width: 768px) {
      // max-height: 183px;
    }
  }

  .vc-weeks {
    padding: 0px;
    min-width: unset;

    .vc-weekday {
      color: var(--Black, #000);
      font-family: Poppins;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: 100%; /* 10px */
      letter-spacing: -0.1px;
      width: 30px;
      height: 20px;
      padding: 0px;

      @media screen and (max-width: 768px) {
        font-size: 8.9px;
        width: 26px;
      }
    }
    .vc-week:last-child {
      .vc-day:first-child {
        border-bottom-left-radius: 10px;
      }
      .vc-day:last-child {
        border-bottom-right-radius: 10px;
      }
    }
  }

  .vc-weekend {
    background-color: #f7f7f7;
  }

  /**
   * change style of sat (7) and sun (1)
   */

  .vc-day {
    border: 1px solid #EEE;
    background: var(--white, #FFF);
    align-items: flex-start;

    .vc-day-content {
      color: var(--correct-color, #659872);
      font-family: Poppins;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
      /* 10px */
      letter-spacing: -0.1px;
    }

    .vc-day-layer {
      margin-bottom: 4px;

      .vc-dots {
        width: 2px;
        height: 2px;

        .vc-dot {
          width: inherit;
          height: inherit;
        }
      }
    }

    &.weekday-position-1,
    &.weekday-position-7 {
      border: 1px solid #EEE;
      background: var(--suggested-grey, #D9D9D9);

      .vc-day-content {
        color: white !important;
      }

      .vc-dots {
        display: none;
      }
    }
  }
}
</style>
