<template>
    <VueDatePicker v-model="date" inline auto-apply :day-names="['S', 'M', 'T', 'W', 'T', 'F', 'S']" :markers="markers"
        :highlight="highlightedDates" :pickerOptions="{ timePicker: false }" @update:model-value="onChangeDate"
        :range="range" :month-change-on-scroll="false">
        <template #day="{ day, date }">
            <div class="flex">
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
console.log('props', props);

const onChangeDate = (v: Date) => emit('date-select', v)
const date = ref();
const markers = ref([
    {
        date: addDays(new Date(), 1),
        type: 'dot',
        // tooltip: [{ text: 'Dot with tooltip', color: 'green' }],
    },
    {
        date: addDays(new Date(), 2),
        type: 'line',
        // tooltip: [
        //     { text: 'First tooltip', color: 'blue' },
        //     { text: 'Second tooltip', color: 'yellow' },
        // ],
    },
    {
        date: addDays(new Date(), 3),
        type: 'dot',
        color: 'yellow',
    },
])

const highlightedDates = ref([
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 3),
])

const range = ref<boolean>(false)


onMounted(() => {
    if (props.markers && props.markers.length > 0) {
        markers.value = props.markers
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
</style>