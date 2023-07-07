<script setup lang="ts">
import UploadVideo from './Components/UploadVideo/UploadVideo.vue'
import UploadImage from './Components/UploadImage/UploadImage.vue'
import QuizInput from './Components/QuizInput/QuizInput.vue'
import { ref } from 'vue';

const title = ref<string>('');

// instructor
const selectedInstructor = ref<string>();
const instructorList = ref([
    { name: 'Instructor 1', code: 'I1' },
    { name: 'Instructor 2', code: 'I2' },
    { name: 'Instructor 3', code: 'I3' },
    { name: 'Instructor 4', code: 'I4' },
    { name: 'Instructor 5', code: 'I5' },
    { name: 'Instructor 6', code: 'I6' },
]);
const totalHour = ref<number>(0);
const totalMinute = ref<number>(0);
const selectedLanguage = ref<string>();
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
    { name: 'All', key: 'all' },
    { name: 'SVO ID', key: 'svo' },
    { name: 'Non-SVO ID', key: 'non-svo' },
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
</script>

<template>
    <section class="my-3">
        <Accordion :activeIndex="0">
            <AccordionTab header="Who can access the course">
                <div>
                    <div class="flex flex-column gap-3">
                        <div v-for="role in roleList" :key="role.key" class="flex align-items-start">
                            <RadioButton v-model="selectedRole" :inputId="role.key" name="roles" :value="role.name" />
                            <label :for="role.key" class="ml-2">{{ role.name }}</label>
                            <div class="flex flex-column gap-3 my-5" v-if="selectedRole === role.name">
                                <template v-for="subrole in dataRoles" :key="subrole.id">
                                    <div class="flex align-items-center gap-2">
                                        <Checkbox v-model="subrole.title" :inputId="subrole.title" name="subrole"
                                            :value="subrole.title" />
                                        <label :for="subrole.title">{{ subrole.title }}</label>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>
                </div>
            </AccordionTab>
        </Accordion>

        <h2 class="text-900 font-bold">
            Add Courses
        </h2>

        <div class="card card-container p-2">
            <div class="card-content">
                <div class="grid ">
                    <div class="col-7">
                        <div class="flex flex-column align-items-start justify-content-start gap-3">
                            <InputText type="text" label="Title" v-model="title" class="p-inputtext-lg w-full" required
                                placeholder="Title" />

                            <div class="flex gap-2 align-items-center">
                                <h1 class="instructor text-2xl text-900 font-bold">
                                    Instructor By
                                </h1>
                                <Dropdown v-model="selectedInstructor" :options="instructorList" optionLabel="name"
                                    placeholder="Select Instructor" class="w-full md:w-14rem p-inputtext-sm" size="small" />
                                <div class="flex gap-1">
                                    <i class="pi-thumbs-up pi mt-1"></i>
                                    <p class="text-900 font-normal">0%</p>
                                    <p>|</p>
                                    <i class="pi-thumbs-down pi mt-1"></i>
                                    <p class="text-900 font-normal">0%</p>
                                </div>
                            </div>

                            <div class="grid w-full gap-3 p-2">
                                <div class="col card shadow-1 flex flex-column">
                                    <div class="flex gap-1 align-items-center">
                                        <i class="pi-star-fill pi"></i>
                                        <h3 class="text-sm text-900">Ratings</h3>
                                    </div>
                                    <p class="text-900 text-xs">
                                        0/5 (0 ratings)
                                    </p>
                                    <p class="text-900 text-xs">
                                        0 already enroll
                                    </p>
                                </div>
                                <div class="col card shadow-1 flex flex-column gap-1">
                                    <div class="flex gap-1 align-items-center">
                                        <img src="/assets/icon/stopwatch.png" class="w-1rem" />
                                        <h3 class="text-sm text-900">Total Hours</h3>
                                    </div>
                                    <div class="flex justify-content-start align-items-center gap-2">
                                        <InputNumber v-model="totalHour" inputId="withoutgrouping" :useGrouping="false"
                                            class="instructor-total-input" />
                                        <p class="text-bold textxs">hour</p>
                                        <InputNumber v-model="totalMinute" class="instructor-total-input"
                                            inputId="withoutgrouping" :useGrouping="false" />
                                        <p class="text-bold textxs">min</p>
                                    </div>
                                </div>
                                <div class="col card shadow-1 flex flex-column gap-1">
                                    <div class="flex gap-1 align-items-center">
                                        <img src="/assets/icon/chat.png" class="w-1rem" />
                                        <h3 class="text-sm text-900">Language</h3>
                                    </div>
                                    <div class="flex align-items-center">
                                        <Dropdown v-model="selectedLanguage" :options="languageList" optionLabel="name"
                                            placeholder="Select Language" class="w-full md:w-14rem p-inputtext-sm"
                                            size="small" />
                                    </div>
                                </div>

                            </div>

                            <Button label="ENROLL" class="btn-default" />
                        </div>
                    </div>
                    <div class="col-5">
                        <UploadImage />
                        <div class="flex justify-content-center align-items-center gap-2 my-2">
                            <div class="card-price flex justify-content-center align-items-center flex-column p-2">
                                <h4 class="text-900 font-bold text-md">Original Price</h4>
                                <InputNumber v-model="originalPrice" inputId="integeronly" placeholder="0.00" />
                            </div>
                            <div class="card-price flex justify-content-center align-items-center flex-column p-2">
                                <h4 class="text-900 font-bold text-md">Discount Price</h4>
                                <InputNumber v-model="discountPrice" inputId="integeronly" placeholder="0.00" />
                            </div>
                        </div>
                        <div class="flex justify-content-center align-items-center gap-2 my-2 btn-buy-container">
                            <Button label="ADD TO CART" size="small" />
                            <Button label="BUY NOW" size="small" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- STEP SECTION -->
        <div class="flex justify-content-start align-items-center gap-2 my-3">
            <Button label="ABOUT" :class="{ 'btn-default': steps === 'about' }" outlined class=""
                @click="steps = 'about'" />
            <Button label="INSTRUCTOR" :class="{ 'btn-default': steps === 'instructor' }" outlined
                @click="steps = 'instructor'" />
            <Button label="SYLLABUS" :class="{ 'btn-default': steps === 'syllabus' }" outlined
                @click="steps = 'syllabus'" />
            <Button label="REVIEWS" :class="{ 'btn-default': steps === 'reviews' }" outlined @click="steps = 'reviews'" />
        </div>

        <div class="flex flex-column">
            <!-- ABOUT -->
            <template v-if="steps === 'about'">
                <div class="card p-1 border-1 surface-border flex w-fit">
                    <table class="table-grade-system">
                        <thead>
                            <tr>
                                <th>Grade System</th>
                                <th><span class="divider"></span></th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, key) in gradeSystem">
                                <tr>
                                    <td>
                                        <p contenteditable
                                            @input="(e: any) => onChangeGradeSystemTitle(e.target.innerText, key)"
                                            v-html="item.title">
                                        </p>
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
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <tr>
                                <td colspan="3">
                                    <Button size="small" icon="pi pi-plus" label="Add More Grading"
                                        class="btn-orange w-full" @click="addMoreGrading()" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="card py-3">
                    <div class="row">
                        <div class="col-4">
                            <UploadVideo />
                            <h4 class="text-900 text-xl font-bold my-3 text-center">
                                Course Preview
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="flex flex-column gap-2">
                    <label for="about-description" class="text-900 text-lg font-bold">About</label>
                    <InputText id="about-description" size="small" v-model="aboutDescription"
                        aria-describedby="about-description-help" placeholder="Course Detail..." class="p-inputtext-sm" />
                </div>
            </template>

            <!-- INSTRUCTOR -->
            <template v-if="steps === 'instructor'">
                <div class="card p-1 flex flex-column gap-3 my-3">
                    <h1 class="text-900 text-xl font-bold">Instructor</h1>
                    <img src="/assets/img/avatar.png" alt="" class="w-5rem" />
                    <InputText label="Instructor Name" placeholder="Instructor Name" v-model="instructorName"
                        class="p-inputtext-sm w-2" />
                    <InputText label="Instructor Profile..." placeholder="Instructor Profile" v-model="instructorProfile"
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
                            <Button icon="pi pi-fullscreen" size="small" link />
                        </div>
                    </div>

                    <!-- ACCORDION SYLLABUS -->
                    <template v-for="(syllabus, key) in syllabusAccordion">
                        <div class="card flex-column flex gap-2 card-accordion">
                            <!-- title -->
                            <div class="grid gap-2 header w-full my-2">
                                <Button :icon="syllabus ? 'pi pi-angle-up' : 'pi pi-angle-down'" size="small" link
                                    class="col-1" @click="syllabusAccordion[key] = !syllabusAccordion[key]" />
                                <InputText label="Title" class="p-inputtext-sm col-9" placeholder="Title" />
                                <div class="col-2 flex justify-content-start align-items-center gap-2">
                                    <InputNumber v-model="syllabusLectures" inputId="withoutgrouping" :useGrouping="false"
                                        class="instructor-total-input" />
                                    <p class="font-bold text-2xl text-900">lectures</p>
                                    <InputNumber v-model="syllabusHour" inputId="withoutgrouping" :useGrouping="false"
                                        class="instructor-total-input" />
                                    <p class="font-bold text-2xl text-900">min</p>
                                    <Button icon="pi pi-fullscreen" size="small" link />
                                </div>
                            </div>

                            <!-- content -->
                            <div class=" flex-column gap-2 my-3" :class="{ 'flex': syllabus, 'hidden': !syllabus }">
                                <template v-for="(syllabusData, key) in syllabusAccordionData">
                                    <div class="grid align-items-center gap-2">
                                        <img src="/assets/icon/video.png" alt="video" class="col-1 w-3rem" />
                                        <h1 class="text-lg text-900 font-bold col-10" contenteditable
                                            @input="(e: any) => onChangeSyllabusTitle(e.target.innerText, key)"
                                            v-html="syllabusData.title"></h1>
                                        <p contenteditable
                                            @input="(e: any) => onChangeSyllabusDuration(e.target.innerText, key)"
                                            v-html="syllabusData.duration" @keydown="(event) => {
                                                if (
                                                    event.code.includes('Digit') ||
                                                    event.code === 'Backspace' ||
                                                    event.code === 'Period'
                                                ) {
                                                    console.log(event)
                                                } else {
                                                    event.preventDefault()
                                                }
                                            }" class="text-900 text-lg font-md"></p>
                                        <span class="text-900 text-lg font-md">min</span>
                                    </div>
                                </template>
                                <Button label="Add more syllabus" icon="pi pi-plus" size="small" class="btn-orange w-full"
                                    @click="syllabusAccordionData.push({ title: 'New Syllabus', duration: 5 })" />
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Quiz -->
                <div class="flex flex-column gap-2 my-3">
                    <template v-for="quiz in quizList">
                        <QuizInput :title="quiz.title" />
                    </template>
                    <!-- ADD more quiz -->
                    <div class="grid pl-3">
                        <div class="col">
                            <Button label="Add More Quiz" class="btn-orange w-full" icon="pi pi-plus" size="small"
                                @click="quizList.push({ title: 'New Quiz', })" />
                        </div>
                    </div>
                </div>
            </template>

            <!-- REVIEW -->
            <template v-if="steps === 'reviews'">
                <div class="flex flex-column gap-2">
                    <h1 class="font-bold text-2xl text-900">
                        Reviews
                    </h1>

                    <h2 class="text-900 font-bold text-xl">
                        Developer Instructor
                    </h2>

                    <div class="flex gap-1 align-items-center">
                        <i class="pi pi-star"></i>
                        <p class="font-bold text-md">0 overall course rating (0 ratings)</p>
                    </div>

                    <!-- avatar  -->
                    <div class="card shadow-1 flex p-3 gap-3 justify-content-start align-items-center">
                        <img src="/assets/img/avatar.png" alt="" class="w-5rem" />
                        <div class="flex gap-2 flex-column justify-content-center align-items-start">
                            <h1 class="text-900 font-bold text-3xl">Name</h1>
                            <div class="flex gap-1 align-items-center">
                                <div class="flex gap-1">
                                    <template v-for="star in  Array.from({ length: 5 }, (_, index) => index + 1)">
                                        <i class="pi pi-star"></i>
                                    </template>
                                </div>
                                <p class="font-bold text-">2 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <Button size="small" label="SAVE" class="w-full my-4 btn-default" />
    </section>
</template>

<style scoped lang="scss">
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

.p-inputtext-sm,
.p-inputtext-lg {
    background: #D9D9D9;
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

    .header {
        background: var(--suggested-light-grey, #EEE);
        padding: 10px;
    }
}
</style>