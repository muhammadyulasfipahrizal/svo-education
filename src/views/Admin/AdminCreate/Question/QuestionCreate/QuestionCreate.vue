<script setup lang="ts">
import { ref } from 'vue';
import QuizInput from '../../Course/CourseCreate/Components/QuizInput/QuizInput.vue';
import type { IAssesment } from './AssesmentInterface';
const access = ref<number>(3);

const selectedDue = ref<string>();
const dueList = ref([
    { name: 'No Limit', code: 'NL' },
]);


const calendar = ref({
    month: null,
    year: null,
    day: null
})
const monthList = [{ name: 'Jan', code: 'Jan' }, { name: 'Feb', code: 'Feb' }, { name: 'Mar', code: 'Mar' }, { name: 'Apr', code: 'Apr' }, { name: 'May', code: 'May' }, { name: 'Jun', code: 'Jun' }, { name: 'Jul', code: 'Jul' }, { name: 'Aug', code: 'Aug' }, { name: 'Sep', code: 'Sep' }, { name: 'Oct', code: 'Oct' }, { name: 'Nov', code: 'Nov' }, { name: 'Dec', code: 'Dec' }];
const yearList = [...Array(40).keys()].map((value) => ({ name: 1990 + value, code: 1990 + value }))
const dayList = [...Array(30).keys()].map((v) => ({ name: v + 1, code: v + 1 }))
const timeLimit = ref<{ time: string; type: string }>({
    time: '0',
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
const attempts = ref('0')
const tryAgainAttempt = ref('0')
const tryAgainAttemptList = ref([{
    name: 'Hours',
    code: 'hours',
},
{
    name: 'Minutes',
    code: 'Minutes',
}, {
    name: 'Seconds',
    code: 'seconds',
}])
const tryAgainAttemptType = ref();
const questions = ref(0)

const quizList = ref<{ title: string; assesment: IAssesment[] }[]>([
    {
        title: '',
        assesment: [
            {
                question: '',
                points: '0/1',
                answerType: 'text',
                answerText: '',
                answerRadio: [],
            }
        ]
    }
]);
const addQuiz = () => {
    quizList.value.push({
        title: '',
        assesment: [
            {
                question: '',
                points: '0/1',
                answerType: 'text',
                answerText: '',
                answerRadio: [],
            }
        ]
    })
}

const onDeleteAssesment = (quizIndex: number, assesIndex: number) => quizList.value[quizIndex].assesment = quizList.value[quizIndex].assesment.filter((v, k) => k !== assesIndex)
const deleteQuiz = (quizIndex: number) => quizList.value = quizList.value.filter((v, k) => k !== quizIndex)
</script>

<template>
    <section style="margin-top: 10px">
        <!-- Content -->
        <div class="flex flex-column" style="gap: 20px; padding: 10px">
            <h1 class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">Prepare Questions</h1>
            <div class="flex flex-column sm:flex-row sm:align-items-center" style="gap: 10px; padding: 0px 10px">
                <h4 class="inter-normal black-1 mr-3" style="font-size: 20px; font-weight: 700;">
                    Give instructor access to
                </h4>
                <div class="flex flex-column sm:flex-row sm:align-items-center sm:flex-wrap"
                    style="gap: 17px; margin-top: 10px">
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access1" name="access" :value="1" />
                        <label for="access1" class="ml-2 inter-normal black-4"
                            style="font-size: 20px; font-weight: 700; letter-spacing: 0.2px;">View</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access2" name="access" :value="2" />
                        <label for="access2" class="ml-2 inter-normal black-4"
                            style="font-size: 20px; font-weight: 700; letter-spacing: 0.2px;">Marking</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access3" name="access" :value="3" />
                        <label for="access3" class="ml-2 inter-normal black-4"
                            style="font-size: 20px; font-weight: 700; letter-spacing: 0.2px;">View & Marking</label>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="col-12 sm:col-4">
                    <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Calendar</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1 w-20rem xl:w-full">
                        <Dropdown v-model="calendar.month" v-bind:class="{ selected: calendar.month }" :options="monthList"
                            optionLabel="name" placeholder="MM"
                            class="h-2rem border-none border-noround w-7rem xl:w-10rem flex align-items-center"
                            size="small" />
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
                <div class="col-12 sm:col-3">
                    <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Time Limit</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1">
                        <InputText class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem"
                            v-model="timeLimit.time" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Dropdown v-model="timeLimit.type" v-bind:class="{ selected: timeLimit.type }" :options="timeTypes"
                            optionLabel="name" placeholder="Time Limit"
                            class="h-2rem border-none border-noround flex align-items-center w-full" size="small" />
                    </div>
                </div>
                <div class="col-12 sm:col-2">
                    <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Attempt</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1">
                        <InputText class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem"
                            v-model="attempts" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <p>Attempts</p>
                    </div>
                </div>
                <div class="col-12 sm:col-3">
                    <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Try Again After Attempts</p>
                    <div class="flex bg-transparent gap-1 p-1 align-items-center border-300 border-1">
                        <InputText class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem"
                            v-model="tryAgainAttempt" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                            <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Dropdown v-model="tryAgainAttemptType" v-bind:class="{ selected: tryAgainAttemptType }"
                            :options="tryAgainAttemptList" optionLabel="name" placeholder="Time Limit"
                            class="h-2rem border-none border-noround flex align-items-center w-full" size="small" />
                    </div>
                </div>
            </div>
            <template v-for="(quiz, quizIndex) in quizList">
                <div class="grid">
                    <div class="col-12 sm:col-9">
                        <InputText placeholder="Title..." class="p-inputtext-sm w-full h-full" v-model="quiz.title" />
                    </div>
                    <div class="col-12 sm:col-3 flex grid align-items-center gap-2 m-0">
                        <div
                            class="flex bg-transparent col gap-1 p-1 align-items-center justify-content-around border-300 border-1">
                            <InputNumber size="small"
                                class="p-0 m-0 border-noround p-inputtext-sm border-none text-center h-2rem w-3rem text-questions"
                                :model-value="quiz.assesment.length" readonly />
                            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="18" viewBox="0 0 2 18" fill="none">
                                <path opacity="0.1" d="M1.33398 1V17" stroke="#001125" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <p class="inter-normal black-1" style="font-size: 14px; font-weight: 400;">Questions</p>
                        </div>
                        <Button size="small" link title="delete" class="p-0 m-0 col-1" style="height: 16px; width: 16px;"
                            @click="deleteQuiz(quizIndex)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M8.53553 1.46522L1.46447 8.53629M8.53553 8.53629L1.46447 1.46522" stroke="#001125"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div class="flex flex-column gap-2 border-1 border-200 p-3 border-round-lg">
                    <!-- <template > -->
                    <div v-for="(asses, assesIndex) in quiz.assesment" :key="asses.question" class="flex w-full mb-3"
                        style="padding-left: 10px">
                        <QuizInput :question="asses.question" :points="asses.points"
                            :answerType="asses.answerType ?? 'text'" :answerText="asses.answerText"
                            :answerRadio="asses.answerRadio" @on-update="(e: any) => {
                                quiz.assesment[assesIndex] = e
                            }" @on-delete="onDeleteAssesment(quizIndex, assesIndex)" />
                    </div>
                    <Button
                        class="w-14rem border-rounded-sm mx-auto px-0 m-0 flex align-items-center justify-content-center btn-default px-3 py-2"
                        style="border-radius: 10px" @click="quiz.assesment.push({
                            question: '',
                            points: '0/1',
                            answerType: 'text',
                            answerText: '',
                            answerRadio: [],
                        })">
                        <div class="flex flex-row align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M11 15.375V6.625" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M6.625 11L15.375 11" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            <p class="font-medium ml-1 lowercase"><span class="capitalize font-medium">Add</span> new
                                content
                            </p>
                        </div>
                    </Button>
                    <!-- </template> -->
                </div>
            </template>

            <!-- ADD more quiz -->
            <div class="grid">
                <div class="col">
                    <Button class="btn-orange w-full border-noround" size="small" @click="addQuiz">
                        <template #default>
                            <div class="flex flex-row align-items-center gap-3">
                                <i class="pi pi-plus align-self-center justify-content-center font-bold text-sm"></i>
                                <p class="font-medium text text-sm lowercase"><span class="capitalize">Add</span> new
                                    assesment question</p>
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </div>

        <Button size="small" label="Save" class="w-full my-4 border-none border-noround" style="background: #00C0DD" />
    </section>
</template>

<style scoped lang="scss">
@import "/src/assets/global.scss";

::v-deep(.p-dropdown) {
    .p-dropdown-label {
        width: 55px;
    }

    .p-dropdown-trigger {
        width: 30px;
        margin-left: 0px;
        padding-left: 0px;
    }
}

::v-deep(.text-questions) {
    input {
        border: none;
    }
}
</style>