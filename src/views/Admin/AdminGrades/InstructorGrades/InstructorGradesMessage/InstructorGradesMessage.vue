<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Instructor } from '../Instructor.type'
import { instructorDummyData } from '../instructorDummyData'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})
const selectedProfile = ref<Instructor>()
const message = ref<string>()
onMounted(() => {
    const findInstructor = instructorDummyData.find((v) => v.id == props.id);
    if (findInstructor) {
        selectedProfile.value = findInstructor;
        message.value = `Hi ${findInstructor.name}, I hope this message finds you well. I wanted to check in and see how you're doing in the UI UX Design class. Have you made any progress lately? I'm curious to hear your thoughts on the course so far and any challenges or successes you've experienced.`
    }
})

</script>

<template>
    <section class="flex gap-2 flex-column px-3">
        <div class="flex gap-5">
            <Button icon="pi pi-angle-left" size="small" link @click="$router.push('/admin/instructor-grade')"></Button>
            <h1 class="text-900 font-bold text-5xl">Instructor Grades</h1>
        </div>
        <div class="flex flex-column gap-3">
            <div class="flex flex-column md:flex-row gap-3 align-items-center justify-content-center w-full">
                <h1 class="text-900 font-bold text-3xl">
                    Leave a message for instructor
                </h1>
                <h1 class="text-900 font-bold text-3xl text-orange-400">
                    {{ selectedProfile?.name }}
                </h1>
            </div>
            <div class="flex justify-content-center w-full">
                <img :src="selectedProfile?.image" alt="" class="w-5rem " />
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