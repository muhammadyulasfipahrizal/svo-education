<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { students } from '../StudentGrade.type'
import type { Student } from '../StudentGrade.type'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})
const selectedProfile = ref<Student>()
const message = ref<string>()
onMounted(() => {
    const findInstructor = students.find((v) => v.id == props.id);
    if (findInstructor) {
        selectedProfile.value = findInstructor;
        message.value = `Hi ${selectedProfile.value.name}, I hope this message finds you well. I wanted to check in and see how you're doing in the UI UX Design class as a student. Could you share with me how the class is going for you so far? Have you been able to make progress in your coursework? I am really interested to hear your thoughts about the class and the challenges or successes you have experienced. Please let me know if you have any questions or concerns that I can help you with.`
    }
})

</script>

<template>
    <section class="px-0 -mx-2 bg-white">
        <section
            class="grid overflow-hidden flex-column md:flex-row pl-3 pr-3 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 py-2">
            <div class="flex align-items-center col-12">
                <Button icon="pi pi-angle-left" size="small" link @click="$router.back()"></Button>
                <h1 class="title-head">Student Grades</h1>
            </div>
            <div class="flex flex-column gap-3 col-12">
                <div class="flex flex-column md:flex-row gap-3 align-items-center justify-content-center w-full">
                    <h1 class="text-900 font-bold text-xl">
                        Leave a message for instructor
                    </h1>
                    <h1 class="text-900 font-bold text-3xl text-orange-400">
                        {{ selectedProfile?.name }}
                    </h1>
                </div>
                <div class="flex justify-content-center w-full">
                    <img :src="selectedProfile?.image" alt="" class="w-12rem" style="border-radius: 50%; object-fit: cover;"/>
                </div>
                <div class="flex flex-column gap-3 w-full px-3">
                    <h1 class="text-900 font-bold text-3rem">
                        Message
                    </h1>
                    <Textarea class="message" disabled v-model="message" autoResize rows="5"></Textarea>
                    <Button size="small" class="btn-send">
                        <template #default>
                            <div class="flex gap-2 justify-content-center align-items-center w-full">
                                <h1 class="text-900 font-bold text-lg text-white">SEND MESSAGE</h1>
                                <i class="pi pi-send"></i>
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </section>
    </section>
</template>

<style scoped lang="scss">
.btn-send {
    background: #E26954;
    border: none;
}

.message {
    border-radius: 10px;
    border: 1px solid var(--suggested-dark-grey, #808081);
    background: var(--suggested-grey, #D9D9D9);
    color: #000;
    font-size: 14px;
    line-height: 160%;
}
</style>