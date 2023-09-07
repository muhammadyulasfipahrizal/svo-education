<script setup lang="ts">
import UploadVideo from './Components/UploadVideo/UploadVideo.vue'
import UploadImage from './Components/UploadImage/UploadImage.vue'
import QuizInput from './Components/QuizInput/QuizInput.vue'
import { ref } from 'vue';
import type { InputNumberBlurEvent } from 'primevue/inputnumber';
import { instructorDummyData } from '@/views/Admin/AdminGrades/InstructorGrades/instructorDummyData';
import type { Instructor } from '@/views/Admin/AdminGrades/InstructorGrades/Instructor.type';

const types = [{
    name: 'Website',
    code: "website"
}, {
    name: 'Video',
    code: "video"
}, {
    name: 'PDF',
    code: "pdf"
}];
const title = ref<string>('');

// instructor
const selectedInstructor = ref<Instructor | null>(null);
const instructorList = ref(instructorDummyData);
const totalHour = ref<number>(0);
const totalMinute = ref<number>(0);
const selectedLanguage = ref<string>('');
const languageList = ref([
    { name: 'Melayu', code: 'I1' },
    { name: 'English', code: 'I2' },
    { name: 'Espanol', code: 'I3' },
    { name: 'German', code: 'I4' },
    { name: 'Japan', code: 'I5' },
    { name: 'Korea', code: 'I6' },
]);
// end instructor

// roles
const selectedRole = ref<string>('All');
const roleList = ref([
    { name: 'All', key: 'all', subrole: [] },
    { name: 'SVO ID', key: 'svo', subrole: [] },
    { name: 'Non-SVO ID', key: 'non-svo', subrole: [] },
]);
const dataRoles = ref<{ title: string; id: number }[]>([
    {
        title: '(EC): Elite Coach',
        id: 1
    },
    {
        title: '(DE): Digital Enterpreneur',
        id: 2
    },
    {
        title: '(DI): Digital Influencer',
        id: 3
    },
    {
        title: '(JD): Junior Dealer',
        id: 4
    },
    {
        title: '(SE): Sales Expert',
        id: 5
    },
    {
        title: '(PA): Personal Assistant',
        id: 6
    },
    {
        title: '(AD): Apprentice Dealer',
        id: 7
    },
])
// end roles

const discountPrice = ref<number>()
const originalPrice = ref<number>()

const steps = ref<'about' | 'instructor' | 'syllabus' | 'reviews'>('about');

interface GradeSystem {
    title: string;
    weight: number;
}
const gradeSystem = ref<GradeSystem[]>([{
    title: 'Daily Task',
    weight: 0
},
{
    title: 'Quiz',
    weight: 0
}])
const onChangeGradeSystemTitle = (e: string, key: number) => {
    gradeSystem.value[key].title = e;
}
const onChangeGradeSystemWeight = (e: number, key: number) => {
    gradeSystem.value[key].weight = e;
}

const addMoreGrading = () => {
    gradeSystem.value.push({
        title: 'New Grading',
        weight: 0
    })
}

const aboutDescription = ref<string>('');

const instructorName = ref<string>('');
const instructorProfile = ref<string>('');

// syllabus
const syllabusLectures = ref<number>(0);
const syllabusHour = ref<number>(0);
const syllabusMinute = ref<number>(0);


interface ISyllabusAccordion {
    title: string;
    duration: number;
}
const syllabusAccordion = ref<boolean[]>([false])
const syllabusAccordionData = ref<ISyllabusAccordion[]>([{
    title: 'Start by learning the fundamentals of design',
    duration: 5
}])

const resizeInput = (e: InputNumberBlurEvent, className: string) => {
    const inputEl = document.querySelector(className) as HTMLElement
    if (!e.value || String(e.value).length < 2) inputEl.style.width = '18px !important'
    else inputEl.style.width = (String(e.value).length * 10) + 'px'
}

const onChangeSyllabusTitle = (e: string, key: number) => {
    syllabusAccordionData.value[key].title = e;
}
const onChangeSyllabusDuration = (e: number, key: number) => {
    syllabusAccordionData.value[key].duration = e;
}
const quizList = ref<{ title: string; }[]>([
    {
        title: 'What is the purpose of UI Design?'
    }
])
// END syllabus

const onChangeInstructor = (value: Instructor) => {
    instructorName.value = value.name;
    instructorProfile.value = value.work_as;
}

const deleteGradeSystem = (index: number) => {
    gradeSystem.value = gradeSystem.value.filter((v, x) => x !== index);
}
const deleteSyllabus = (index: number) => {
    syllabusAccordion.value = syllabusAccordion.value.filter((v, x) => x !== index);
}
const syllabusAddList = ref<{ title: string; duration: string; selectedType: string }[]>([])
</script>

<template>
    <section class="my-3">
        <Accordion>
            <AccordionTab header="Who can access the course">
                <div>
                    <div class="flex flex-column gap-3">
                        <div v-for="role in roleList" :key="role.key" class="grid p-0 m-0">
                            <div class="flex justify-content-between align-items-center w-full col-12">
                                <div class="flex justify-content-start">
                                    <RadioButton v-model="selectedRole" :inputId="role.key" name="roles"
                                        :value="role.name" />
                                    <label :for="role.key" class="ml-2">{{ role.name }}</label>
                                </div>
                                <svg v-if="role.key !== 'all'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M13.7746 11.6932C13.5305 11.9373 13.1348 11.9373 12.8907 11.6932L9.99935 8.80185L7.10796 11.6932C6.86388 11.9373 6.46815 11.9373 6.22407 11.6932C5.98 11.4492 5.98 11.0534 6.22407 10.8094L9.55741 7.47603C9.80149 7.23195 10.1972 7.23195 10.4413 7.47603L13.7746 10.8094C14.0187 11.0534 14.0187 11.4492 13.7746 11.6932Z"
                                        fill="black" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="flex flex-column gap-3 w-full col-12 pl-5"
                                v-if="selectedRole === role.name && role.key !== 'all'">
                                <template v-for="subrole in dataRoles" :key="subrole.id">
                                    <div class="flex align-items-center gap-2">
                                        <Checkbox v-model="role.subrole" :name="subrole.title" :value="subrole.id">
                                            <template #icon="{ checked }">
                                                <svg v-if="!checked" xmlns="http://www.w3.org/2000/svg" width="18"
                                                    height="18" viewBox="0 0 18 18" fill="none">
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
                                        <label :for="subrole.title">{{ subrole.title }}</label>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>
                </div>
            </AccordionTab>
        </Accordion>

        <h2 class="inter-normal black-1 my-2" style="font-size: 25px; font-weight: 700;">
            Add Courses
        </h2>

        <div class="card card-container p-2">
            <div class="card-content">
                <div class="grid">
                    <div class="col-12 lg:col-7">
                        <div class="flex flex-column align-items-start justify-content-start gap-3 ">
                            <InputText type="text" label="Title" v-model="title"
                                class="p-inputtext-lg w-full text-6xl mt-6 h-4rem" required placeholder="Title" />

                            <div class="grid gap-2 align-items-start md:align-items-center w-full justify-content-between">
                                <div class="flex align-items-center">
                                    <h1 class="col-5 md:col-2 lg:col-2 inter-normal black-1 min-w-max"
                                        style="font-size: 25px; font-weight: 700;">
                                        Instructor By
                                    </h1>
                                    <Dropdown v-model="selectedInstructor" v-bind:class="{ selected: selectedInstructor }"
                                        :options="instructorList" optionLabel="name" placeholder="Select Instructor" class="md:w-full md:w-18rem 
                                         col-6 md:col-5 h-2rem flex align-items-center" size="small"
                                        @change="(value: any) => onChangeInstructor(value.value)" />
                                </div>
                                <div class="col-12 md:col-2 flex gap-1">
                                    <i class="pi-thumbs-up pi mt-1"></i>
                                    <p class="text-900 font-normal">0%</p>
                                    <p>|</p>
                                    <i class="pi-thumbs-down pi mt-1"></i>
                                    <p class="text-900 font-normal">0%</p>
                                </div>
                            </div>

                            <div class="w-full mx-2 ratings-container">
                                <div class="w-full p-2 card shadow-1 flex flex-column">
                                    <div
                                        class="flex flex-row md:flex-column gap-2 md:gap-0 align-items-center md:align-items-start mb-1">
                                        <div class="flex gap-1 align-items-center mb-2">
                                            <i class="pi-star-fill pi"></i>
                                            <h3 class="inter-normal black-2" style="font-size: 18px; font-weight: 400;">
                                                Ratings</h3>
                                        </div>
                                        <p class="inter-normal black-2" style="font-size: 15px; font-weight: 400;">
                                            0/5 (0 ratings)
                                        </p>
                                    </div>
                                    <p class="inter-normal black-2" style="font-size: 10px; font-weight: 400;">
                                        0 already enroll
                                    </p>
                                </div>
                                <div class="w-full p-2 card shadow-1 gap-1">
                                    <div class="flex gap-1 align-items-center mb-2">
                                        <img src="/assets/icon/stopwatch.png" class="w-1rem" />
                                        <h3 class="inter-normal black-2" style="font-size: 18px; font-weight: 400;">Total
                                            Hours</h3>
                                    </div>
                                    <div class="flex justify-content-start align-items-center gap-2">
                                        <InputNumber v-model="totalHour" inputId="withoutgrouping"
                                            @input="e => resizeInput(e, '.instructor-total-input.hour')"
                                            :useGrouping="false" class="instructor-total-input hour"
                                            id="instructor-total-input-hour" />
                                        <p class="inter-normal black-2" style="font-size: 15px; font-weight: 400;">hour</p>
                                        <InputNumber v-model="totalMinute"
                                            @input="e => resizeInput(e, '.instructor-total-input.min')"
                                            class="instructor-total-input min" inputId="withoutgrouping"
                                            :useGrouping="false" />
                                        <p class="inter-normal black-2" style="font-size: 15px; font-weight: 400;">min</p>
                                    </div>
                                </div>
                                <div class="w-full p-2 card shadow-1 flex flex-column gap-1">
                                    <div class="flex gap-1 align-items-center mb-2">
                                        <img src="/assets/icon/chat.png" class="w-1rem" />
                                        <h3 class="inter-normal black-2" style="font-size: 18px; font-weight: 400;">Language
                                        </h3>
                                    </div>
                                    <div class="flex align-items-center">
                                        <Dropdown v-model="selectedLanguage" :options="languageList" optionLabel="name"
                                            placeholder="Select Language"
                                            class="w-full p-inputtext-sm h-2rem flex align-items-center"
                                            v-bind:class="{ selected: selectedLanguage !== '' }" size="small" />
                                    </div>
                                </div>
                            </div>

                            <Button class="btn-default md:w-max mb-3 md:mb-0">
                                <template #default>
                                    <div class="inter-normal px-2" style="font-size: 20px; font-weight: 500;">
                                        Enroll
                                    </div>
                                </template>
                            </Button>
                        </div>
                    </div>
                    <div class="col-12 lg:col-5">
                        <div class="col-12">
                            <UploadImage class="w-full upload-image " style="height: 257px" />
                        </div>
                        <div class="flex justify-content-center align-items-center gap-2 my-2 col-12">
                            <div class="card-price flex justify-content-center align-items-center flex-column p-2">
                                <h4 class="inter-normal black-2" style="font-size: 15px; font-weight: 700;">Original Price
                                </h4>
                                <InputNumber v-model="originalPrice" inputId="integeronly" placeholder="0.00" />
                            </div>
                            <div class="card-price flex justify-content-center align-items-center flex-column p-2">
                                <h4 class="inter-normal black-2" style="font-size: 15px; font-weight: 700;">Discount Price
                                </h4>
                                <InputNumber v-model="discountPrice" inputId="integeronly" placeholder="0.00" />
                            </div>
                        </div>
                        <div class="flex justify-content-center align-items-center gap-2 my-2 btn-buy-container col-12">
<<<<<<< HEAD
                            <Button label="ADD TO CART" size="small" class="inter-normal" style="font-size: 15px; font-weight: 500;"/>
                            <Button label="BUY NOW" size="small" class="inter-normal" style="font-size: 15px; font-weight: 500;"/>
=======
                            <Button label="ADD TO CART" size="small" class="inter-normal"
                                style="font-size: 15px; font-weight: 500;" />
                            <Button label="BUY NOW" size="small" class="inter-normal"
                                style="font-size: 15px; font-weight: 500;" />
            </div>
        </div>

        <!-- STEP SECTION -->
<<<<<<< HEAD
            <Button :class="{ 'btn-default': steps === 'about' }" outlined class=""
                @click="steps = 'about'">
                <template #default>
                    <div class="inter-normal" style="font-size: 20px; font-weight: 500;">
                        About
                    </div>
                </template>
=======
            <Button label="ABOUT" :class="{ 'btn-default': steps === 'about' }" outlined class="" @click="steps = 'about'">
>>>>>>> 67962325428ad235d35864a68fef874f0eeb37c5
            </Button>
            <Button label="INSTRUCTOR" :class="{ 'btn-default': steps === 'instructor' }" outlined
                @click="steps = 'instructor'" />
            <Button label="SYLLABUS" :class="{ 'btn-default': steps === 'syllabus' }" outlined
                @click="steps = 'syllabus'; syllabusAccordion[0] = true" />
            <Button label="REVIEWS" :class="{ 'btn-default': steps === 'reviews' }" outlined @click="steps = 'reviews'" />
        </div>

        <div class="flex flex-column">
            <!-- ABOUT -->
            <template v-if="steps === 'about'">
                <div class="card p-1 border-1 surface-border justify-content-center flex md:w-fit">
                    <table class="table-grade-system">
                        <thead>
                            <tr>
                                <th class="inter-normal" style="font-size: 20px; font-weight: 700;">Grade System</th>
                                <th><span class="divider"></span></th>
                                <th class="inter-normal" style="font-size: 20px; font-weight: 700;">Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, key) in gradeSystem">
                                <tr>
                                    <td>
                                        <InputText v-model="item.title"
                                            class="p-0 m-0 bg-transparent border-none input-grade" />
                                    </td>
                                    <td><span class="divider"></span></td>
                                    <td>
                                        <div class="flex">
                                            <p style="width: 80%" contenteditable @keydown="(event) => {
                                                if (
                                                    event.code.includes('Digit') ||
                                                    event.code === 'Backspace' ||
                                                    event.code === 'Period'
                                                ) {
                                                    console.log(event)
                                                } else {
                                                    event.preventDefault()
                                                }
                                            }" @input="(e: any) => onChangeGradeSystemWeight(e.target.innerText, key)"
                                                v-html="item.weight">
                                            </p><span>%</span>
                                            <Button size="small" class="p-0 m-0" link @click="deleteGradeSystem(key)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30"
                                                    viewBox="0 0 31 30" fill="none">
                                                    <path
                                                        d="M21.75 5V6.25H19.25V5H11.75V6.25H9.25V5C9.25 4.33696 9.51339 3.70107 9.98223 3.23223C10.4511 2.76339 11.087 2.5 11.75 2.5H19.25C19.913 2.5 20.5489 2.76339 21.0178 3.23223C21.4866 3.70107 21.75 4.33696 21.75 5Z"
                                                        fill="#006785" />
                                                    <path
                                                        d="M25.5 7.5H5.5C5.16848 7.5 4.85054 7.6317 4.61612 7.86612C4.3817 8.10054 4.25 8.41848 4.25 8.75C4.25 9.08152 4.3817 9.39946 4.61612 9.63388C4.85054 9.8683 5.16848 10 5.5 10H6.75V25C6.75 25.663 7.01339 26.2989 7.48223 26.7678C7.95107 27.2366 8.58696 27.5 9.25 27.5H21.75C22.413 27.5 23.0489 27.2366 23.5178 26.7678C23.9866 26.2989 24.25 25.663 24.25 25V10H25.5C25.8315 10 26.1495 9.8683 26.3839 9.63388C26.6183 9.39946 26.75 9.08152 26.75 8.75C26.75 8.41848 26.6183 8.10054 26.3839 7.86612C26.1495 7.6317 25.8315 7.5 25.5 7.5ZM14.25 21.25C14.25 21.5815 14.1183 21.8995 13.8839 22.1339C13.6495 22.3683 13.3315 22.5 13 22.5C12.6685 22.5 12.3505 22.3683 12.1161 22.1339C11.8817 21.8995 11.75 21.5815 11.75 21.25V13.75C11.75 13.4185 11.8817 13.1005 12.1161 12.8661C12.3505 12.6317 12.6685 12.5 13 12.5C13.3315 12.5 13.6495 12.6317 13.8839 12.8661C14.1183 13.1005 14.25 13.4185 14.25 13.75V21.25ZM19.25 21.25C19.25 21.5815 19.1183 21.8995 18.8839 22.1339C18.6495 22.3683 18.3315 22.5 18 22.5C17.6685 22.5 17.3505 22.3683 17.1161 22.1339C16.8817 21.8995 16.75 21.5815 16.75 21.25V13.75C16.75 13.4185 16.8817 13.1005 17.1161 12.8661C17.3505 12.6317 17.6685 12.5 18 12.5C18.3315 12.5 18.6495 12.6317 18.8839 12.8661C19.1183 13.1005 19.25 13.4185 19.25 13.75V21.25Z"
                                                        fill="#006785" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <tr>
                                <td colspan="3">
<<<<<<< HEAD
                                    <Button size="small"
                                        class="btn-orange w-full"  @click="addMoreGrading()">
                                        <template #default>
                                            <div class="flex flex-row align-items-center gap-3">
                                                <i class="pi pi-plus"></i>
                                                <p class="inter-normal" style="font-size: 13px; font-weight: 600;">Add More Grading</p>
=======
                                    <Button size="small" class="btn-orange w-full" @click="addMoreGrading()">
                                        <template #default>
                                            <div class="flex flex-row align-items-center gap-3">
                                                <i class="pi pi-plus"></i>
                                                <p class="inter-normal" style="font-size: 13px; font-weight: 600;">Add More
                                                    Grading</p>
>>>>>>> 67962325428ad235d35864a68fef874f0eeb37c5
                                            </div>
                                        </template>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="card py-3">
                    <div class="row">
                        <div class="col-12 md:col-8 lg:col-6 xl:col-4">
                            <UploadVideo class="upload-video w-full" />
                            <h4 class="inter-normal black-1 my-3 text-center" style="font-size: 25px; font-weight: 700;">
                                Course Preview
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="flex flex-column gap-2">
<<<<<<< HEAD
                    <label for="about-description" class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">About</label>
=======
                    <label for="about-description" class="inter-normal black-1"
                        style="font-size: 25px; font-weight: 700;">About</label>
>>>>>>> 67962325428ad235d35864a68fef874f0eeb37c5
                    <Textarea id="about-description" size="small" v-model="aboutDescription"
                        aria-describedby="about-description-help" placeholder="Course Detail..." class="p-inputtext-sm" />
                </div>
            </template>

            <!-- INSTRUCTOR -->
            <template v-if="steps === 'instructor'">
                <div class="card p-1 flex flex-column gap-3 my-3">
                    <h1 class="text-900 text-xl font-bold">Instructor</h1>
                    <img :src="selectedInstructor?.image" alt="" class="w-5rem" />
                    <InputText label="Instructor Name" placeholder="Instructor Name" v-model="instructorName"
                        class="p-inputtext-sm w-2" />
                    <Textarea label="Instructor Profile..." placeholder="Instructor Profile" v-model="instructorProfile"
                        class="p-inputtext-sm w-full" />
                </div>
            </template>

            <!-- SYLLABUS -->
            <template v-if="steps === 'syllabus'">
                <div class="card flex flex-column gap-2">
                    <div class="flex justify-content-between">
                        <h1 class="text-2xl font-bold text-900">Syllabus</h1>
                        <div class="flex justify-content-start align-items-center gap-2">
                            <InputNumber v-model="syllabusLectures" inputId="withoutgrouping" :useGrouping="false"
                                class="instructor-total-input" />
                            <p class="font-bold text-lg text-900">lectures</p>
                            <InputNumber v-model="syllabusHour" inputId="withoutgrouping" :useGrouping="false"
                                class="instructor-total-input" />
                            <p class="font-bold text-lg text-900">hour</p>
                            <InputNumber v-model="syllabusMinute" class="instructor-total-input" inputId="withoutgrouping"
                                :useGrouping="false" />
                            <p class="font-bold text-lg text-900">min</p>
                            <Button size="small" link class="p-0 m-0">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M11.0811 1.92969C11.0811 2.44745 11.5008 2.86719 12.0186 2.86719L15.1344 2.86719V5.98299C15.1344 6.50076 15.5541 6.92049 16.0719 6.92049C16.5896 6.92049 17.0094 6.50076 17.0094 5.98299V1.92969C17.0094 1.41192 16.5896 0.992189 16.0719 0.992188L12.0186 0.992188C11.5008 0.992187 11.0811 1.41192 11.0811 1.92969Z"
                                            fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M16.0718 11.081C15.5541 11.081 15.1343 11.5008 15.1343 12.0185L15.1343 15.1343L12.0185 15.1343C11.5008 15.1343 11.081 15.5541 11.081 16.0718C11.081 16.5896 11.5008 17.0093 12.0185 17.0093L16.0718 17.0093C16.5896 17.0093 17.0093 16.5896 17.0093 16.0718V12.0185C17.0093 11.5008 16.5896 11.081 16.0718 11.081Z"
                                            fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M1.92972 11.081C2.44749 11.081 2.86722 11.5008 2.86722 12.0185L2.86722 15.1343L5.98302 15.1343C6.50079 15.1343 6.92052 15.5541 6.92052 16.0718C6.92052 16.5896 6.50079 17.0093 5.98302 17.0093L1.92972 17.0093C1.41195 17.0093 0.992221 16.5896 0.992221 16.0718L0.992221 12.0185C0.992221 11.5008 1.41195 11.081 1.92972 11.081Z"
                                            fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.92049 1.92969C6.92049 2.44745 6.50076 2.86719 5.98299 2.86719L2.86719 2.86719L2.86719 5.98299C2.86719 6.50076 2.44745 6.92049 1.92969 6.92049C1.41192 6.92049 0.992188 6.50076 0.992188 5.98299L0.992189 1.92969C0.992189 1.41192 1.41192 0.992188 1.92969 0.992188L5.98299 0.992188C6.50076 0.992188 6.92049 1.41192 6.92049 1.92969Z"
                                            fill="black" />
                                    </g>
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <!-- ACCORDION SYLLABUS -->
                    <template v-for="(syllabus, key) in syllabusAccordion">
                        <div
                            class="card flex-column flex gap-2 card-accordion border-round px-0 py-0 align-items-start border-1 border-300 bg-white">
                            <!-- title -->
                            <div class="grid gap-2 header w-full p-0 m-0 py-2 align-items-center" style="background: #EEE;">
                                <Button :icon="syllabus ? 'pi pi-angle-up' : 'pi pi-angle-down'" size="small" link
                                    class="col-2" @click="syllabusAccordion[key] = !syllabusAccordion[key]" />
                                <InputText label="Title" class="p-inputtext-sm col-9 text-xl syllabus-title"
                                    placeholder="Title" />
                                <div class="col-2 flex justify-content-start align-items-center gap-2 p-0 ml-1">
                                    <InputNumber v-model="syllabusLectures" inputId="withoutgrouping" :useGrouping="false"
                                        class="instructor-total-input" />
                                    <p class="font-bold text-2xl text-900">lectures</p>
                                    <InputNumber v-model="syllabusHour" inputId="withoutgrouping" :useGrouping="false"
                                        class="instructor-total-input" />
                                    <p class="font-bold text-2xl text-900">min</p>
                                    <Button size="small" link class="px-0 m-0" @click="deleteSyllabus(key)">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path id="Vector"
                                                d="M8.53553 1.46522L1.46447 8.53629M8.53553 8.53629L1.46447 1.46522"
                                                stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>

                            <!-- content -->
                            <div class="flex-column gap-2 w-full p-2" :class="{ 'flex': syllabus, 'hidden': !syllabus }">
                                <Textarea class="p-inputtext-lg" placeholder="Enter a description">
                                                                                    Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero 
                                                                                    et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad 
                                                                                    litora torquent per conubia nostra, per inceptos himenaeos. 
                                                                                    Curabitur tempus urna at turpis condimentum lobortis. Ut commodo 
                                                                                    efficitur neque. Ut diam quam, semper iaculis condimentum ac, 
                                                                                    vestibulum eu nisl.
                                                                                </Textarea>
                                <template v-for="(syllabusData, key) in syllabusAccordionData">
                                    <div class="flex justify-content-between align-items-center">
                                        <div class="grid align-items-center gap-2 w-full">
                                            <img src="/assets/icon/video.png" alt="video" class="col-1 w-3rem" />
                                            <h1 class="text-lg  col-10">{{ syllabusData.title }}</h1>
                                        </div>
                                        <div class="flex gap-3">
                                            <div class="flex gap-1">
                                                <p contenteditable class="text-900 text-lg font-md">
                                                    {{ syllabusData.duration }}
                                                </p>
                                                <span class="text-900 text-lg font-md">min</span>
                                            </div>
                                            <Button size="small" link class="px-0 m-0"
                                                @click="syllabusAccordionData = syllabusAccordionData.filter((v, k) => k !== key)">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path id="Vector"
                                                        d="M8.53553 1.46522L1.46447 8.53629M8.53553 8.53629L1.46447 1.46522"
                                                        stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </template>

                                <!-- adding -->
                                <template v-for="(addData, key) in syllabusAddList">
                                    <div class="flex justify-content-between align-items-center gap-0">
                                        <div class="grid align-items-center gap-2 w-full p-0 m-0">
                                            <Dropdown optionLabel="name" style="height: 36px" v-model="addData.selectedType"
                                                v-bind:class="{ selected: addData.selectedType !== 'none' }"
                                                :options="types" placeholder="Select"
                                                class="mr-3 w-min p-0 flex align-items-center col-2">
                                                <template #value="slotProps">
                                                    <div v-if="slotProps.value" class="flex align-items-center gap-2">
                                                        <div class="flex gap-2 align-items-center"
                                                            v-if="slotProps.value.code === 'website'">
                                                            <img class="w-1rem" src="/assets/img/world.png" />
                                                            <p>{{ slotProps.value.name }}</p>
                                                        </div>
                                                        <div v-if="slotProps.value.code === 'video'"
                                                            class="flex gap-2 align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    d="M17.5938 3.6543H2.55273C1.94531 3.6543 1.61328 3.95703 1.61328 4.59375V15.5605C1.61328 16.1973 1.94531 16.5 2.55273 16.5H17.5938C18.2305 16.5 18.5332 16.168 18.5332 15.5605V4.5957C18.5332 3.98633 18.2305 3.6543 17.5938 3.6543ZM3.80664 15.5625H3.17969C2.67383 15.5625 2.55273 15.2559 2.55273 14.9355V13.6816H3.80664V15.5625ZM3.80664 12.7422H2.55273V10.5488H3.80664V12.7422ZM3.80664 9.60937H2.55273V7.41602H3.80664V9.60937ZM3.80664 6.47461H2.55273V5.2207C2.55273 4.71484 2.85938 4.59375 3.17969 4.59375H3.80664V6.47461ZM15.4004 15.5625H4.74609V4.5957H15.4004V15.5625ZM17.5938 14.9355C17.5938 15.2559 17.4727 15.5625 16.9668 15.5625H16.3398V13.6816H17.5938V14.9355ZM17.5938 12.7422H16.3398V10.5488H17.5938V12.7422ZM17.5938 9.60937H16.3398V7.41602H17.5938V9.60937ZM17.5938 6.47461H16.3398V4.59375H16.9668C17.2871 4.59375 17.5938 4.71484 17.5938 5.2207V6.47461ZM7.74219 13.2656C7.82227 13.3301 7.92188 13.3672 8.03125 13.3691H8.03906C8.12305 13.3691 8.20703 13.3496 8.28516 13.3066L13.1895 10.5254C13.4199 10.3965 13.498 10.1074 13.3652 9.88281V9.88086C13.3262 9.79687 13.2617 9.72266 13.1738 9.67187L8.28711 6.85156C8.20898 6.80664 8.125 6.78711 8.04102 6.78906H8.03711C7.77734 6.78906 7.56641 7 7.56641 7.25977V12.8398C7.55273 12.9395 7.57227 13.043 7.62695 13.1348C7.65625 13.1855 7.69727 13.2305 7.74219 13.2656ZM8.50586 8.06445L12.0254 10.0957L8.50586 12.0937V8.06445Z"
                                                                    fill="#5B99EE" />
                                                            </svg>
                                                            <p>{{ slotProps.value.name }}</p>
                                                        </div>
                                                        <div class="flex gap-2 align-items-center"
                                                            v-if="slotProps.value.code === 'pdf'">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    d="M14.8343 13.0481C14.5906 13.1201 14.2328 13.1281 13.8492 13.0725C13.4375 13.0128 13.0175 12.8869 12.6048 12.7015C13.3408 12.5944 13.9118 12.6274 14.4002 12.8005C14.5159 12.8415 14.706 12.9511 14.8343 13.0481ZM10.7276 12.3729C10.6976 12.3811 10.6681 12.3888 10.6388 12.3969C10.4407 12.4508 10.248 12.5035 10.0623 12.5503L9.81195 12.6138C9.30825 12.7412 8.79325 12.8714 8.2846 13.0265C8.4779 12.5603 8.6575 12.089 8.83335 11.6282C8.96355 11.2871 9.0965 10.9387 9.234 10.5947C9.30375 10.7099 9.37655 10.8251 9.4523 10.9407C9.7974 11.4663 10.2312 11.9522 10.7276 12.3729ZM9.44635 7.1163C9.479 7.6915 9.3549 8.24485 9.17285 8.7757C8.9486 8.1193 8.8441 7.39445 9.12445 6.80925C9.19635 6.65925 9.25525 6.57905 9.29345 6.5372C9.35245 6.6283 9.43005 6.8321 9.44635 7.1163ZM6.81673 14.4027C6.69074 14.6281 6.56213 14.8391 6.43031 15.0384C6.11221 15.5177 5.59196 16.031 5.3247 16.031C5.2984 16.031 5.26658 16.0268 5.22007 15.9777C5.19014 15.9463 5.18534 15.9238 5.18679 15.8931C5.1958 15.7168 5.42933 15.403 5.76763 15.1119C6.07469 14.8479 6.42176 14.6131 6.81673 14.4027ZM15.6853 13.073C15.6444 12.4859 14.6561 12.1093 14.6464 12.1058C14.2643 11.9703 13.8493 11.9045 13.3776 11.9045C12.8726 11.9045 12.3282 11.9776 11.6291 12.141C11.007 11.7 10.4696 11.1479 10.0681 10.5366C9.8908 10.2666 9.7314 9.99705 9.59245 9.73375C9.93165 8.9227 10.2371 8.05065 10.1816 7.07395C10.1368 6.2908 9.7837 5.76475 9.30345 5.76475C8.974 5.76475 8.69035 6.00875 8.4597 6.49065C8.04825 7.34935 8.1564 8.4481 8.781 9.7592C8.55605 10.2875 8.34705 10.8353 8.14475 11.3656C7.89305 12.0249 7.6337 12.7052 7.3414 13.3523C6.52167 13.6766 5.84824 14.07 5.28701 14.5528C4.91935 14.8686 4.47611 15.3514 4.45081 15.8553C4.43846 16.0927 4.51984 16.3104 4.68522 16.4848C4.86091 16.6699 5.08165 16.7674 5.32435 16.7677C6.12594 16.7677 6.89744 15.6663 7.0438 15.4454C7.33835 15.0014 7.61405 14.5062 7.8842 13.9349C8.5646 13.689 9.2897 13.5055 9.9925 13.3281L10.2442 13.2641C10.4334 13.216 10.63 13.1628 10.8317 13.1076C11.0452 13.0499 11.2648 12.9901 11.488 12.9333C12.2096 13.3922 12.9857 13.6916 13.7425 13.8014C14.38 13.8941 14.9462 13.8403 15.3294 13.6405C15.6743 13.4609 15.6933 13.1838 15.6853 13.073ZM17.2377 18.1214C17.2377 19.1966 16.2901 19.2629 16.0989 19.2651H3.87243C2.80112 19.2651 2.73661 18.3109 2.73456 18.1214L2.73442 1.87821C2.73442 0.80195 3.68381 0.7367 3.87228 0.73454H12.1315L12.1359 0.7389V3.96198C12.1359 4.60882 12.5269 5.83345 14.0079 5.83345H17.2101L17.2376 5.8609L17.2377 18.1214ZM16.4786 5.0988H14.0084C12.9374 5.0988 12.8726 4.14985 12.8712 3.96209V1.47653L16.4786 5.0988ZM17.9723 18.1214V5.55785L12.8712 0.435511V0.411678H12.8468L12.4371 0H3.87245C3.22477 0 2 0.392668 2 1.87856V18.1217C2 18.7714 2.39148 20 3.87245 20H16.1C16.7476 19.9998 17.9723 19.6072 17.9723 18.1214Z"
                                                                    fill="#EB5757" />
                                                            </svg>
                                                            <p>{{ slotProps.value.name }}</p>
                                                        </div>
                                                    </div>
                                                    <span v-else>
                                                        {{ slotProps.placeholder }}
                                                    </span>
                                                </template>
                                                <template #option="slotProps">
                                                    <div class="flex gap-2 align-items-center"
                                                        v-if="slotProps.option.code === 'website'">
                                                        <img class="w-1rem" src="/assets/img/world.png" />
                                                        <p>{{ slotProps.option.name }}</p>
                                                    </div>
                                                    <div v-if="slotProps.option.code === 'video'"
                                                        class="flex gap-2 align-items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                            viewBox="0 0 20 20" fill="none">
                                                            <path
                                                                d="M17.5938 3.6543H2.55273C1.94531 3.6543 1.61328 3.95703 1.61328 4.59375V15.5605C1.61328 16.1973 1.94531 16.5 2.55273 16.5H17.5938C18.2305 16.5 18.5332 16.168 18.5332 15.5605V4.5957C18.5332 3.98633 18.2305 3.6543 17.5938 3.6543ZM3.80664 15.5625H3.17969C2.67383 15.5625 2.55273 15.2559 2.55273 14.9355V13.6816H3.80664V15.5625ZM3.80664 12.7422H2.55273V10.5488H3.80664V12.7422ZM3.80664 9.60937H2.55273V7.41602H3.80664V9.60937ZM3.80664 6.47461H2.55273V5.2207C2.55273 4.71484 2.85938 4.59375 3.17969 4.59375H3.80664V6.47461ZM15.4004 15.5625H4.74609V4.5957H15.4004V15.5625ZM17.5938 14.9355C17.5938 15.2559 17.4727 15.5625 16.9668 15.5625H16.3398V13.6816H17.5938V14.9355ZM17.5938 12.7422H16.3398V10.5488H17.5938V12.7422ZM17.5938 9.60937H16.3398V7.41602H17.5938V9.60937ZM17.5938 6.47461H16.3398V4.59375H16.9668C17.2871 4.59375 17.5938 4.71484 17.5938 5.2207V6.47461ZM7.74219 13.2656C7.82227 13.3301 7.92188 13.3672 8.03125 13.3691H8.03906C8.12305 13.3691 8.20703 13.3496 8.28516 13.3066L13.1895 10.5254C13.4199 10.3965 13.498 10.1074 13.3652 9.88281V9.88086C13.3262 9.79687 13.2617 9.72266 13.1738 9.67187L8.28711 6.85156C8.20898 6.80664 8.125 6.78711 8.04102 6.78906H8.03711C7.77734 6.78906 7.56641 7 7.56641 7.25977V12.8398C7.55273 12.9395 7.57227 13.043 7.62695 13.1348C7.65625 13.1855 7.69727 13.2305 7.74219 13.2656ZM8.50586 8.06445L12.0254 10.0957L8.50586 12.0937V8.06445Z"
                                                                fill="#5B99EE" />
                                                        </svg>
                                                        <p>{{ slotProps.option.name }}</p>
                                                    </div>
                                                    <div class="flex gap-2 align-items-center"
                                                        v-if="slotProps.option.code === 'pdf'">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                            viewBox="0 0 20 20" fill="none">
                                                            <path
                                                                d="M14.8343 13.0481C14.5906 13.1201 14.2328 13.1281 13.8492 13.0725C13.4375 13.0128 13.0175 12.8869 12.6048 12.7015C13.3408 12.5944 13.9118 12.6274 14.4002 12.8005C14.5159 12.8415 14.706 12.9511 14.8343 13.0481ZM10.7276 12.3729C10.6976 12.3811 10.6681 12.3888 10.6388 12.3969C10.4407 12.4508 10.248 12.5035 10.0623 12.5503L9.81195 12.6138C9.30825 12.7412 8.79325 12.8714 8.2846 13.0265C8.4779 12.5603 8.6575 12.089 8.83335 11.6282C8.96355 11.2871 9.0965 10.9387 9.234 10.5947C9.30375 10.7099 9.37655 10.8251 9.4523 10.9407C9.7974 11.4663 10.2312 11.9522 10.7276 12.3729ZM9.44635 7.1163C9.479 7.6915 9.3549 8.24485 9.17285 8.7757C8.9486 8.1193 8.8441 7.39445 9.12445 6.80925C9.19635 6.65925 9.25525 6.57905 9.29345 6.5372C9.35245 6.6283 9.43005 6.8321 9.44635 7.1163ZM6.81673 14.4027C6.69074 14.6281 6.56213 14.8391 6.43031 15.0384C6.11221 15.5177 5.59196 16.031 5.3247 16.031C5.2984 16.031 5.26658 16.0268 5.22007 15.9777C5.19014 15.9463 5.18534 15.9238 5.18679 15.8931C5.1958 15.7168 5.42933 15.403 5.76763 15.1119C6.07469 14.8479 6.42176 14.6131 6.81673 14.4027ZM15.6853 13.073C15.6444 12.4859 14.6561 12.1093 14.6464 12.1058C14.2643 11.9703 13.8493 11.9045 13.3776 11.9045C12.8726 11.9045 12.3282 11.9776 11.6291 12.141C11.007 11.7 10.4696 11.1479 10.0681 10.5366C9.8908 10.2666 9.7314 9.99705 9.59245 9.73375C9.93165 8.9227 10.2371 8.05065 10.1816 7.07395C10.1368 6.2908 9.7837 5.76475 9.30345 5.76475C8.974 5.76475 8.69035 6.00875 8.4597 6.49065C8.04825 7.34935 8.1564 8.4481 8.781 9.7592C8.55605 10.2875 8.34705 10.8353 8.14475 11.3656C7.89305 12.0249 7.6337 12.7052 7.3414 13.3523C6.52167 13.6766 5.84824 14.07 5.28701 14.5528C4.91935 14.8686 4.47611 15.3514 4.45081 15.8553C4.43846 16.0927 4.51984 16.3104 4.68522 16.4848C4.86091 16.6699 5.08165 16.7674 5.32435 16.7677C6.12594 16.7677 6.89744 15.6663 7.0438 15.4454C7.33835 15.0014 7.61405 14.5062 7.8842 13.9349C8.5646 13.689 9.2897 13.5055 9.9925 13.3281L10.2442 13.2641C10.4334 13.216 10.63 13.1628 10.8317 13.1076C11.0452 13.0499 11.2648 12.9901 11.488 12.9333C12.2096 13.3922 12.9857 13.6916 13.7425 13.8014C14.38 13.8941 14.9462 13.8403 15.3294 13.6405C15.6743 13.4609 15.6933 13.1838 15.6853 13.073ZM17.2377 18.1214C17.2377 19.1966 16.2901 19.2629 16.0989 19.2651H3.87243C2.80112 19.2651 2.73661 18.3109 2.73456 18.1214L2.73442 1.87821C2.73442 0.80195 3.68381 0.7367 3.87228 0.73454H12.1315L12.1359 0.7389V3.96198C12.1359 4.60882 12.5269 5.83345 14.0079 5.83345H17.2101L17.2376 5.8609L17.2377 18.1214ZM16.4786 5.0988H14.0084C12.9374 5.0988 12.8726 4.14985 12.8712 3.96209V1.47653L16.4786 5.0988ZM17.9723 18.1214V5.55785L12.8712 0.435511V0.411678H12.8468L12.4371 0H3.87245C3.22477 0 2 0.392668 2 1.87856V18.1217C2 18.7714 2.39148 20 3.87245 20H16.1C16.7476 19.9998 17.9723 19.6072 17.9723 18.1214Z"
                                                                fill="#EB5757" />
                                                        </svg>
                                                        <p>{{ slotProps.option.name }}</p>
                                                    </div>
                                                </template>
                                            </Dropdown>
                                            <InputText class="text-lg col-10" style="height: 36px"
                                                v-model="addData.title" />
                                        </div>
                                        <div class="flex gap-3 p-0 m-0">
                                            <div class="flex gap-1 align-items-center">
                                                <InputText type="number" v-model="addData.duration" style="height: 36px"
                                                    class="w-4rem" />
                                                <span class="text-900 text-lg font-md">min</span>
                                            </div>
                                            <Button size="small" link class="px-0 m-0"
                                                @click="syllabusAddList = syllabusAddList.filter((v, k) => k !== key)">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path id="Vector"
                                                        d="M8.53553 1.46522L1.46447 8.53629M8.53553 8.53629L1.46447 1.46522"
                                                        stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </template>
                                <div class="flex justify-content-center">
                                    <Button
                                        class="w-14rem border-rounded-sm px-0 m-0 flex align-items-center justify-content-center btn-default px-3 py-2"
                                        style="border-radius: 10px" @click="syllabusAddList.push({
                                            title: '',
                                            duration: '0',
                                            selectedType: ''
                                        })">
                                        <div class="flex flex-row align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 22 22" fill="none">
                                                <path d="M11 15.375V6.625" stroke="white" stroke-width="1.5"
                                                    stroke-linecap="round" />
                                                <path d="M6.625 11L15.375 11" stroke="white" stroke-width="1.5"
                                                    stroke-linecap="round" />
                                            </svg>
                                            <p class="font-medium ml-1 lowercase"><span
                                                    class="capitalize font-medium">Add</span> new content</p>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <Button size="small" class="btn-new-section btn-orange w-full" @click="syllabusAccordion.push(false)">
                        <div class="flex flex-row align-items-center gap-3">
                            <i class="pi pi-plus text-xs"></i>
                            <span>Add new section</span>
                        </div>
                    </Button>
                </div>
            </template>

            <!-- REVIEW -->
            <template v-if="steps === 'reviews'">
                <div class="flex flex-column gap-2">
                    <h2 class="text-900 font-bold text-3xl">
                        Developer Instructor reviews
                    </h2>

                    <div class="flex gap-1 align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                fill="black" />
                        </svg>
                        <p class="font-bold text-md">0 overall course rating (0 ratings)</p>
                    </div>

                    <!-- avatar  -->
                    <div class="flex justify-content-center h-16rem">
                        <div
                            class="shadow-1 grid gap-3 justify-content-center align-items-center w-6 border-2 border-round border-300 border-orange-500 p-5">
                            <img src="/assets/img/avatar.png" alt="" class="w-5rem col-12" />
                            <div class="flex gap-2 flex-column justify-content-center align-items-center col-12">
                                <div class="flex gap-1 align-items-center">
                                    <div class="flex gap-1">
                                        <template v-for="star in  Array.from({ length: 5 }, (_, index) => index + 1)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 22 22" fill="none">
                                                <path
                                                    d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                                                    fill="#D9D9D9" />
                                            </svg>
                                        </template>
                                    </div>
                                </div>
                                <p class="text-600 text-xl font-900">Comments...</p>
                                <h1 class="text-900 font-bold text-3xl">Name</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <Button size="small" label="Save" class="w-full my-4 border-none border-noround" style="background: #00C0DD" />
    </section>
</template>

<style scoped lang="scss">
@import "/src/assets/global.scss";
<<<<<<< HEAD
=======

>>>>>>> 67962325428ad235d35864a68fef874f0eeb37c5
.upload-image {
    height: 350px;
}

.upload-video {
    height: 300px;
}

.title {
    font-family: Inter;
    font-size: 35px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
}

.pi-thumbs-up {
    color: #659872;
    fill: #659872;
}

.pi-thumbs-down {
    color: #BE2F00;
    fill: #BE2F00;
}

::v-deep(.instructor-total-input) {
    width: 18px;
    height: 24px;

    input.p-inputnumber-input {
        border-radius: 5px;
        background: #EEE;
        text-align: center;

        padding: 0;
        margin: 0;
        color: #808081;
        width: inherit;
        height: inherit;
    }
}

.p-inputtext-lg {
    height: 100px;
}

.card-container {
    border-radius: 10px;
    border: 1px solid #E5E5E5;
    background: #FFF;
}

.card-price {
    border: 1px solid #E5E5E5;
    background: var(--bg-1, #FFF);
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    ::v-deep(.p-inputnumber) {
        width: 168px;
        padding: 3px 0px;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
            max-width: 110px;
            height: 56px;
            border: none;
            color: var(--suggested-dark-grey, #808081);
            font-size: 35px;
            font-family: Inter;
            font-style: normal;
            font-weight: 700;
            line-height: 160%;
        }
    }
}

.btn-buy-container {
    button {
        width: 100%;
        border-radius: 4px;
        background: var(--suggested-orange, #E96853);
        padding: 10px;
        border: none;
    }
}

.table-grade-system {
    color: var(--white, #FFF);
    text-align: left;
    font-size: 20px;
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    border-spacing: 0;

    thead {
        background: var(--suggested-dark-grey, #808081);

        tr th {
            padding: 10px;
            border-bottom: 1px solid #D9D5EC;
        }
    }

    tbody {

        tr {
            td {
                border-bottom: 1px solid #D9D5EC;
                color: black;
                padding: 10px;

                .input-grade {
                    color: #000;
                    text-align: left;
                    font-family: Inter;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 160%;
                }
            }

            &:last-child {
                td {
                    border: none
                }
            }
        }

    }

    .divider {
        display: block;
        width: 1px;
        padding: 0px;
        border: 1px solid rgb(217, 213, 236);
        height: 30px;
    }
}

.card-accordion {
    background: var(--suggested-light-grey, #EEE);

    .header {
        padding: 10px;
        color: var(--font-1, #001125);
        height: 60px;

        .syllabus-title {
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 160%;
            border-radius: 5px;
            padding: 9px 16px;
            height: 40px;
        }
    }
}

::v-deep(.p-accordion) {
    border: 1px solid #D9D5EC;
    background: #FFF;

    .p-accordion-tab {
        margin: 0;

        .p-accordion-header {
            background: transparent;

            a {
                display: flex;
                justify-content: space-between;
                padding: 5px 10px;
                border-radius: 0;
                background: transparent;

                svg {
                    order: 2
                }
            }
        }

        .p-accordion-header-text {
            color: var(--font-1, #001125);
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 160%;
        }
    }
}

::v-deep(.p-checkbox) {

    .p-checkbox-box,
    .p-checkbox-box:hover {
        border: none !important;
        background: none !important;
    }
}

.btn-content {
    .p-button {
        border-radius: 10px;
        background: var(--SVO-Dark-Color, #006785);
    }
}

.ratings-container {
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(3, 33%);
}

.btn-new-section {
    span {
        color: var(--bg-1, #FFF);
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%;
        text-transform: initial;
    }
}
</style>