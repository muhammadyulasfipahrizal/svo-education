<script setup lang="ts">
import { ref } from 'vue';
import QuizInput from '../../Course/CourseCreate/Components/QuizInput/QuizInput.vue';
import type { IAssesment } from './AssesmentInterface';
const access = ref<number>(3);

const selectedDue = ref<string>();
const dueList = ref([
    { name: 'No Limit', code: 'NL' },
]);

const assesments = ref<IAssesment[]>([
    {
        question: 'Assessment question 1: What are the key principles of user-centered design, and how do they inform UI UX design decisions? Provide examples of how you have applied these principles in your own design work. ',
        points: '0/1',
        answerType: 'text',
        answerText: '',
        answerRadio: [],
    }
])
const calendar = ref({
    month: null,
    year: null,
    day: null
})
const monthList = [{ name: 'Jan', code: 'Jan' }, { name: 'Feb', code: 'Feb' }, { name: 'Mar', code: 'Mar' }, { name: 'Apr', code: 'Apr' }, { name: 'May', code: 'May' }, { name: 'Jun', code: 'Jun' }, { name: 'Jul', code: 'Jul' }, { name: 'Aug', code: 'Aug' }, { name: 'Sep', code: 'Sep' }, { name: 'Oct', code: 'Oct' }, { name: 'Nov', code: 'Nov' }, { name: 'Dec', code: 'Dec' }];
const yearList = [...Array(40).keys()].map((value) => ({ name: 1990 + value, code: 1990 + value }))
const dayList = [...Array(30).keys()].map((v) => ({ name: v + 1, code: v + 1 }))
const timeLimit = ref<{ time: string; type: string }>({
    time: '60',
    type: 'minutes'
})
const timeTypes = ref([{
    name: 'Minutes',
    code: 'minutes',
}, {
    name: 'Seconds',
    code: 'seconds',
}, {
    name: 'Hours',
    code: 'hours',
}])
const attempts = ref('3')
const tryAgainAttempt = ref('24')
const tryAgainAttemptList = ref([{
    name: 'Hours',
    code: 'hours',
},
{
    name: 'Minutes',
    code: 'Minutes',
},{
    name: 'Seconds',
    code: 'seconds',
}])
const tryAgainAttemptType = ref();
</script>

<template>
    <section class="my-3">
        <!-- Content -->
        <div class="flex flex-column gap-3">
            <h1 class="text-900 text-2xl font-bold">Prepare Questions</h1>
            <div class="flex gap-2 align-items-center">
                <h4 class="font-bold text-xl text-900 mr-3">
                    Give instructor access to
                </h4>
                <div class="flex flex-wrap gap-4">
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access1" name="access" :value="1" />
                        <label for="access1" class="ml-2 text-xl font-bold">View</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access2" name="access" :value="2" />
                        <label for="access2" class="ml-2 text-xl font-bold">Marking</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access3" name="access" :value="3" />
                        <label for="access3" class="ml-2 text-xl font-bold">View & Marking</label>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="col-4">
                    <p class="text-lg">Calendar</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1 w-20rem xl:w-full">
                        <Dropdown v-model="calendar.month" v-bind:class="{ selected: calendar.month }" :options="monthList"
                            optionLabel="name" placeholder="MM"
                            class="h-2rem border-none border-noround w-7rem xl:w-10rem flex align-items-center" size="small" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Dropdown v-model="calendar.day" v-bind:class="{ selected: calendar.day }" :options="dayList"
                            optionLabel="name" placeholder="DD" class="h-2rem border-none border-noround flex align-items-center
                            w-7rem xl:w-10rem" size="small" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Dropdown v-model="calendar.year" v-bind:class="{ selected: calendar.year }" :options="yearList"
                            optionLabel="name" placeholder="YY" class="h-2rem border-none border-noround flex align-items-center
                            w-7rem xl:w-10rem" size="small" />
                    </div>
                </div>
                <div class="col-3">
                    <p class="text-lg">Time Limit</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1">
                        <InputText size="small" class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem" v-model="timeLimit.time" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Dropdown v-model="timeLimit.type" v-bind:class="{ selected: timeLimit.type }" :options="timeTypes"
                            optionLabel="name" placeholder="Time Limit" class="h-2rem border-none border-noround flex align-items-center w-full"
                            size="small" />
                    </div>
                </div>
                <div class="col-2">
                    <p class="text-lg">Attempt</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1">
                        <InputText size="small" class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem" v-model="attempts" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <p>Attempts</p>
                    </div>
                </div>
                <div class="col-3">
                    <p class="text-lg">Try Again After Attempts</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1">
                        <InputText size="small" class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem" v-model="tryAgainAttempt" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Dropdown v-model="tryAgainAttemptType" v-bind:class="{ selected: tryAgainAttemptType }" :options="tryAgainAttemptList"
                            optionLabel="name" placeholder="Time Limit" class="h-2rem border-none border-noround flex align-items-center w-full"
                            size="small" />
                    </div>
                </div>
            </div>
            <div class="flex flex-column gap-2">
                <h4 class="font-bold text-xl">Assesment</h4>
                <div class="grid align-items-center w-full">
                    <h4 class="font-bold text-lg col-12 md:col-9 lg:col-9 xl:col-9">Assesment (2 questions)</h4>
                    <div class="col-12 md:col-3 lg:col-3 xl:col-3 flex gap-2 col-2 align-items-center justify-content-end">
                        <h5 class="font-bold text-900 text-lg">Due</h5>
                        <Dropdown v-model="selectedDue" :options="dueList" optionLabel="name" placeholder="Select Limit"
                            class="w-full md:w-10rem h-2rem flex align-items-center " :class="{ selected: selectedDue }" />
                    </div>
                </div>
            </div>
            <div class="flex flex-column gap-2">
                <template v-for="asses in assesments">
                    <div class="flex w-full mb-3">
                        <QuizInput :question="asses.question" :points="asses.points" :answerType="asses.answerType"
                            :answerText="asses.answerText" :answerRadio="asses.answerRadio" />
                    </div>
                </template>
                <!-- ADD more quiz -->
                <div class="grid">
                    <div class="col">
                        <Button class="btn-orange w-full" size="small"
                            @click="assesments.push({
                                question: 'New Assesment',
                                points: '0/1',
                                answerType: 'text',
                                answerText: '',
                                answerRadio: [],
                            })">
                        <template #default>
                            <div class="flex flex-row align-items-center gap-3">
                                <i class="pi pi-plus align-self-center justify-content-center font-bold"></i>
                                <p class="font-bold">Add new assesment question</p>
                            </div>
                        </template>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <Button size="small" label="SAVE" class="w-full my-4 btn-default" />
    </section>
</template>

<style scoped lang="scss">
::v-deep(.p-dropdown) {
    .p-dropdown-label {
        width: 55px;
    }
    .p-dropdown-trigger	{
        width: 30px;
        margin-left: 0px;
        padding-left: 0px;
    }
}
</style>