<template>
    <VueDatePicker v-model="date" inline auto-apply :day-names="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']"
        :markers="markerList" :highlight="highlightedDates" :pickerOptions="{ timePicker: false }"
        @update:model-value="onChangeDate" :range="range" :month-change-on-scroll="false" class="cal">
        <template #day="{ day, date }">
            <div class="flex" :class="{ 'big-font': hasMarker(date) }">
                {{ day }}
            </div>
        </template>
        <template #marker="{ marker, day, date }">
            <span v-if="marker.data && marker.data.length > 0" class="custom-marker">{{ marker?.data?.length ?? 0 }}</span>
        </template>
    </VueDatePicker>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import addDays from 'date-fns/addDays';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['date-select'])
const props = defineProps(['markers', 'highlight', 'range'])

const onChangeDate = (v: Date) => emit('date-select', v)
const date = ref();
const markerList = ref();

const hasMarker = (date: Date) => {
    const t = markerList.value.findIndex((v: any) => {
        return v.date === `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}` && v.data.length > 0
    })
    console.log('t', t, date.toISOString(), markerList.value);
    return t > -1;
}

const highlightedDates = ref([
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 3),
])

const range = ref<boolean>(false)


onMounted(() => {
    if (props.markers && props.markers.length > 0) {
        markerList.value = props.markers
    }
    if (props.highlight && props.highlight.lenght > 0) {
        highlightedDates.value = props.highlight
    }
    if (props.range) {
        range.value = props.range
    }
})


</script>

<style lang="scss" scoped>
.custom-marker {
    width: 20px;
    height: 20px;
    border-radius: 16px;
    border: 1px solid var(--White, #FFF);
    background: var(--Suggested-orange, #E96853);
    color: var(--White, #FFF);
    text-align: center;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.3px;
}

::v-deep(.dp__calendar_header) {
    .dp__calendar_header_item {
        color: var(--Black, #000);
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.6px;
        height: 90px;
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

::v-deep(.dp__calendar_header_separator) {
    display: none;
}

::v-deep(.dp__menu) {
    border-radius: 5px;
    border: 1px solid #D9D5EC;
    background: #FFF;
}

::v-deep(.dp__calendar) {
    .dp__calendar_row {
        padding: 0;
        margin: 0;

        .dp__calendar_item {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #D9D5EC;
            background: rgba(250, 250, 250, 0.50);
            color: var(--Black, #000);
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.6px;

            .dp__cell_inner {
                width: 100%;
                height: 100%;
                border-radius: 0;
                font-family: Poppins;
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 0.6px;

                &.dp__today {
                    border: none;
                }

                &:not(.dp__cell_offset) {
                    color: var(--Black, #000);
                }

                &.dp__active_date {
                    .big-font {
                        font-size: 35px;

                        color: var(--White, #FFF);
                        text-align: center;
                        font-family: Poppins;
                        font-size: 35px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 1.2;
                        letter-spacing: 1.05px;
                    }

                    .custom-marker {
                        border-radius: 5px;
                        border: 1px solid var(--White, #FFF);
                        background: #FFF;
                        height: 15px;
                    }
                }
            }
        }
    }
}

::v-deep(.dp__month_year_row) {
    .dp__month_year_wrap {
        display: flex;
        justify-content: center;

        .dp__btn.dp__month_year_select {
            border-radius: 5px;
            border: 1px solid #D9D5EC;
            background: #FFF;
            display: flex;
            padding: 10px;
            align-items: center;
            gap: 5px;
            width: 218px;
            color: #000;
            font-family: Poppins;
            font-size: 30px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.9px;
            text-transform: uppercase;
        }
    }
}
</style>