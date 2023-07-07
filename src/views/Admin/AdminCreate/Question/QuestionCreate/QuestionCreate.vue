<script setup lang="ts">
import { ref } from 'vue';
import QuizInput from '../../Course/CourseCreate/Components/QuizInput/QuizInput.vue';
const access = ref<number>(3);

const selectedDue = ref<string>();
const dueList = ref([
    { name: 'No Limit', code: 'NL' },
]);

interface IAssesment {
    question: string;
    points: string;
    answerType: 'text' | 'radio';
    answerText: string;
    answerRadio: number[];
}
const assesments = ref<IAssesment[]>([
    {
        question: 'Assessment question 1: What are the key principles of user-centered design, and how do they inform UI UX design decisions? Provide examples of how you have applied these principles in your own design work. ',
        points: '0/1',
        answerType: 'text',
        answerText: '',
        answerRadio: [],
    }
])
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
                        <label for="access1" class="ml-2 font-bold">View</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access2" name="access" :value="2" />
                        <label for="access2" class="ml-2 font-bold">Marketing</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="access" inputId="access3" name="access" :value="3" />
                        <label for="access3" class="ml-2 font-bold">View & Marking</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-column gap-2 px-3">
                <h4 class="font-bold text-md">Assesment (2 questions)</h4>
                <div class="grid align-items-center">
                    <h4 class="font-bold text-lg col-10">Assesment</h4>
                    <div class="flex gap-2 col-2 align-items-center justify-content-center">
                        <h5 class="font-bold text-900 text-lg">Due</h5>
                        <Dropdown v-model="selectedDue" :options="dueList" optionLabel="name" placeholder="Select Limit"
                            class="w-full md:w-14rem h-3rem" />
                    </div>
                </div>
            </div>
            <div class="flex flex-column gap-2 px-3">
                <template v-for="asses in assesments">
                    <div class="flex w-full mb-3">
                        <QuizInput title="test" />
                    </div>
                </template>
                <!-- ADD more quiz -->
                <div class="grid pl-3">
                    <div class="col">
                        <Button label="Add new assesment question" class="btn-orange w-full" icon="pi pi-plus" size="small" @click="assesments.push({
                            question: 'New Assesment',
                            points: '0/1',
                            answerType: 'text',
                            answerText: '',
                            answerRadio: [],
                        })" />
                    </div>
                </div>
            </div>
        </div>

        <Button size="small" label="SAVE" class="w-full my-4 btn-default" />
    </section>
</template>

<style scoped lang="scss"></style>