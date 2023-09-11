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
    <section class="bg-white">
        <section
            class="grid overflow-hidden flex-column md:flex-row">
            <div class="flex align-items-center col-12 p-0 m-0">
                <Button size="small" link @click="$router.back()">
                    <template #icon>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3845 12.4481C23.8727 12.9363 23.8727 13.7278 23.3845 14.2159L17.6018 19.9987L23.3845 25.7815C23.8727 26.2696 23.8727 27.0611 23.3845 27.5492C22.8964 28.0374 22.1049 28.0374 21.6168 27.5492L14.9501 20.8826C14.4619 20.3944 14.4619 19.603 14.9501 19.1148L21.6168 12.4481C22.1049 11.96 22.8964 11.96 23.3845 12.4481Z" fill="black"/>
                            </svg>
                        </div>
                    </template>
                </Button>
                <h1 class="inter-normal black-1" style="font-size: 35px; font-weight: 700; ">Student Grades</h1>
            </div>
            <div class="flex flex-column col-12" style="gap: 10px">
                <div class="flex flex-column md:flex-row gap-2 align-items-center justify-content-center w-full">
                    <h1 class="md:hidden inter-normal black-1 text-center" style="font-size: 25px; font-weight: 700;">
                        Leave a message for student 
                        <span class="inter-normal suggested-orange text-center" style="font-size: 25px; font-weight: 700;">{{ selectedProfile?.name }}</span>
                    </h1>
                    <h1 class="hidden md:block inter-normal black-1 text-center" style="font-size: 35px; font-weight: 700;">
                        Leave a message for student 
                        <span class="inter-normal suggested-orange text-center" style="font-size: 35px; font-weight: 700;">{{ selectedProfile?.name }}</span>
                    </h1>
                </div>
                <div class="flex justify-content-center w-full">
                    <img :src="selectedProfile?.image" alt="" class="w-12rem"
                        style="border-radius: 50%; object-fit: cover;" />
                </div>
                <div class="flex flex-column gap-3 w-full px-3">
                    <h1 class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">
                        Message
                    </h1>
                    <Textarea class="message p-inputtext-sm" placeholder="Write a message" v-model="message" autoResize
                        rows="5"></Textarea>
                    <Button size="small" class="btn-send">
                        <template #default>
                            <div class="flex gap-2 justify-content-center align-items-center w-full">
                                <h1 class="text-900 font-bold text-lg text-white">SEND MESSAGE</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M21.2428 12.4371C21.4016 12.3489 21.5 12.1816 21.5 12C21.5 11.8184 21.4016 11.6511 21.2428 11.5629L18.9605 10.295C14.464 7.79689 9.72391 5.76488 4.81421 4.2306L4.14914 4.02276C3.99732 3.97532 3.83198 4.00294 3.70383 4.09716C3.57568 4.19138 3.5 4.34094 3.5 4.5V10.25C3.5 10.5159 3.70816 10.7353 3.97372 10.7493L4.98336 10.8025C7.44497 10.932 9.89156 11.2659 12.2979 11.8006L12.5362 11.8536C12.5892 11.8654 12.6122 11.887 12.625 11.9042C12.6411 11.926 12.6536 11.9594 12.6536 12C12.6536 12.0406 12.6411 12.0741 12.625 12.0958C12.6122 12.113 12.5892 12.1347 12.5362 12.1464L12.2979 12.1994C9.89157 12.7341 7.44496 13.068 4.98334 13.1976L3.97372 13.2507C3.70816 13.2647 3.5 13.4841 3.5 13.75V19.5C3.5 19.6591 3.57568 19.8086 3.70383 19.9029C3.83198 19.9971 3.99732 20.0247 4.14914 19.9772L4.81422 19.7694C9.72391 18.2351 14.464 16.2031 18.9605 13.705L21.2428 12.4371Z" fill="white"/>
                                </svg>
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </section>
    </section>
</template>

<style scoped lang="scss">
@import "/src/assets/global.scss";
.btn-send {
    background: #E26954;
    border: none;
}

.message {
    border-radius: 10px;
    border: 1px solid #808081;
    color: #000;
    font-size: 14px;
    line-height: 160%;
}

.title-container {
    h1 {
        color: #001125;
        text-align: center;
        font-family: Inter;
        font-size: 35px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%;
    }

    h2 {
        color: #E96853;
        font-family: Inter;
        font-size: 35px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%;
    }
}
</style>