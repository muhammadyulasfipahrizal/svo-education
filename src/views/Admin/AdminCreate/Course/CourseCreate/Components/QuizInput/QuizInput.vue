<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
const props = defineProps({
    question: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    },
    answerType: {
        type: String,
        required: true
    },
    answerText: {
        type: String,
        required: true
    },
    answerRadio: {
        type: Array<Number>,
        required: true
    },
});
const title = ref<string>(props.question);
const selectedType = ref<{ name: string; code: string } | null>(null);
const typeList = ref<{ name: string; code: string }[]>([
    { name: 'Radio Button', code: 'radio' },
    { name: 'Text Box', code: 'text' },
]);
const points = ref(props.points);

const radioSelected = ref('model')
const answerList = ref<{ title: string; isCorrect: boolean }[]>([
    {
        title: 'To make the product visually appealing',
        isCorrect: true,
    }, {
        title: 'To create a seamless user experience',
        isCorrect: false,
    },
    {
        title: 'To optimize the product for search engines',
        isCorrect: false,
    },
    {
        title: 'To increase website traffic',
        isCorrect: false
    }
]);

const numberToChar = (number: number) => {
    if (!Number.isInteger(number) || number < 0 || number > 25) {
        throw new Error("Number must be an integer between 1 and 26");
    }

    return String.fromCharCode((number + 1) + 'A'.charCodeAt(0) - 1);
}
watchEffect(() => {
    console.log('selectedType', selectedType.value);

})
</script>

<template>
    <div class="flex flex-column gap-2 w-full">
        <div class="grid">
            <InputText label="Title" v-model="title" class="col-11 square-input" />
                <div class="flex flex-row text-900 text-sm font-bold col-1 align-items-center gap-1">
                    <InputText size="small" class="instructor-total-input py-0 m-0 w-3rem p-inputtext-sm h-2rem surface-200" inputId="withoutgrouping"
                    :useGrouping="false" v-model="points" /> 
                    <p class="font-bold text-sm">points</p>
                </div>
        </div>
        <div class="grid">
            <div class="col-4 px-0">
                <Dropdown v-model="selectedType" :options="typeList" optionLabel="name" placeholder="Select Type"
                    class="w-full md:w-14rem selected h-3rem border-noround">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center gap-2">
                            <RadioButton v-if="slotProps.value.code === 'radio'" value="model" />
                            <Checkbox v-if="slotProps.value.code === 'text'">
                            </Checkbox>
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center gap-2">
                            <RadioButton v-if="slotProps.option.code === 'radio'" />
                            <Checkbox v-if="slotProps.option.code === 'text'" selected="true">
                                <template #icon="{ checked }">
                                    <svg v-if="!checked" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        viewBox="0 0 18 18" fill="none">
                                        <path d="M0.5 17.5V0.5H17.5V17.5H0.5Z" fill="white" stroke="#ECEEF5" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                        viewBox="0 0 22 22" fill="none">
                                        <rect width="22" height="22" rx="11" fill="#659872" />
                                        <path
                                            d="M17.1501 6.60904C17.0649 6.52312 16.9635 6.45493 16.8518 6.40839C16.7401 6.36185 16.6203 6.33789 16.4993 6.33789C16.3783 6.33789 16.2584 6.36185 16.1467 6.40839C16.035 6.45493 15.9336 6.52312 15.8484 6.60904L9.01926 13.4474L6.1501 10.569C6.06162 10.4836 5.95717 10.4164 5.84272 10.3713C5.72827 10.3262 5.60606 10.304 5.48306 10.3062C5.36006 10.3083 5.23868 10.3346 5.12586 10.3837C5.01304 10.4327 4.91098 10.5035 4.82551 10.592C4.74004 10.6804 4.67284 10.7849 4.62774 10.8993C4.58263 11.0138 4.56051 11.136 4.56264 11.259C4.56477 11.382 4.5911 11.5034 4.64014 11.6162C4.68917 11.729 4.75995 11.8311 4.84843 11.9165L8.36843 15.4365C8.45364 15.5225 8.55503 15.5907 8.66673 15.6372C8.77844 15.6837 8.89825 15.7077 9.01926 15.7077C9.14027 15.7077 9.26009 15.6837 9.37179 15.6372C9.4835 15.5907 9.58488 15.5225 9.6701 15.4365L17.1501 7.95654C17.2431 7.8707 17.3174 7.76652 17.3682 7.65056C17.419 7.5346 17.4452 7.40938 17.4452 7.28279C17.4452 7.1562 17.419 7.03097 17.3682 6.91502C17.3174 6.79906 17.2431 6.69488 17.1501 6.60904Z"
                                            fill="white" />
                                    </svg>
                                </template>
                            </Checkbox>
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>

        <div class="flex flex-column gap-2" v-if="selectedType?.code === 'radio'">
            <!-- Question list -->
            <template v-for="(answer, key) in answerList">
                <div class="grid pl-3">
                    <div class="col-11">
                        <div class="flex align-items-center gap-2">
                            <RadioButton :inputId="'answer_radio' + key" name="answer_radio" v-model="radioSelected"
                                :value="answer.title" />
                            <label :for="'answer_radio' + key" class="ml-2">{{ numberToChar(key) }}.</label>
                            <InputText v-model="answer.title" class="border-0 w-full" />
                        </div>
                    </div>
                    <div class="col-1 flex gap-2 align-items-center">
                        <Checkbox v-model="answer.isCorrect" :binary="true">
                            <template #icon="{ checked }">
                                <svg v-if="!checked" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 18 18" fill="none">
                                    <path d="M0.5 17.5V0.5H17.5V17.5H0.5Z" fill="white" stroke="#ECEEF5" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                    fill="none">
                                    <rect width="22" height="22" rx="11" fill="#659872" />
                                    <path
                                        d="M17.1501 6.60904C17.0649 6.52312 16.9635 6.45493 16.8518 6.40839C16.7401 6.36185 16.6203 6.33789 16.4993 6.33789C16.3783 6.33789 16.2584 6.36185 16.1467 6.40839C16.035 6.45493 15.9336 6.52312 15.8484 6.60904L9.01926 13.4474L6.1501 10.569C6.06162 10.4836 5.95717 10.4164 5.84272 10.3713C5.72827 10.3262 5.60606 10.304 5.48306 10.3062C5.36006 10.3083 5.23868 10.3346 5.12586 10.3837C5.01304 10.4327 4.91098 10.5035 4.82551 10.592C4.74004 10.6804 4.67284 10.7849 4.62774 10.8993C4.58263 11.0138 4.56051 11.136 4.56264 11.259C4.56477 11.382 4.5911 11.5034 4.64014 11.6162C4.68917 11.729 4.75995 11.8311 4.84843 11.9165L8.36843 15.4365C8.45364 15.5225 8.55503 15.5907 8.66673 15.6372C8.77844 15.6837 8.89825 15.7077 9.01926 15.7077C9.14027 15.7077 9.26009 15.6837 9.37179 15.6372C9.4835 15.5907 9.58488 15.5225 9.6701 15.4365L17.1501 7.95654C17.2431 7.8707 17.3174 7.76652 17.3682 7.65056C17.419 7.5346 17.4452 7.40938 17.4452 7.28279C17.4452 7.1562 17.419 7.03097 17.3682 6.91502C17.3174 6.79906 17.2431 6.69488 17.1501 6.60904Z"
                                        fill="white" />
                                </svg>
                            </template>
                        </Checkbox>
                        <button class="w-1rem border-none cursor-pointer p-1 bg-white hover:text-white hover:surface-700"
                            @click="answerList.splice(0, key)">&times;</button>
                    </div>
                </div>
            </template>
        </div>

        <div class="flex flex-column gap-2" v-if="selectedType?.code === 'text'">
            <Textarea rows="4" class="w-full" placeholder="Please fill description" />
        </div>
    </div>
</template>

<style lang="scss">
.square-input {
    border-radius: 0;
}
</style>
<style scoped lang="scss">
::v-deep(.p-checkbox) {

    .p-checkbox-box,
    .p-checkbox-box:hover {
        border: none !important;
        background: none !important;
    }
}
</style>