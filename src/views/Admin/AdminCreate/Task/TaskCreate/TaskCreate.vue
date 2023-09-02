<script setup lang="ts">
import { ref } from 'vue';

interface TaskData {
    taskName: string,
    taskDesc: string
}

const taskData = ref<TaskData[]>([
    {
        taskName: 'Daily task 1',
        taskDesc: 'Watch 1 Module',
    },
])

const addColumn = () => tasks.value.push({
    title: 'Tuesday',
    subtasks: [{
        title: 'Daily Task 1',
        subtitle: ['Watch 1 module']
    }]
});

const addSubtask = (index: number) => tasks.value[index].subtasks.push({
    title: 'Daily Task 1',
    subtitle: ['Watch 1 module']
});

const removeColumn = (index: number) => tasks.value.length > 1 ? tasks.value = tasks.value.filter((v, i) => i !== index) : undefined;

const removeSubtask = (index: number, subtaskIndex: number) => tasks.value[index].subtasks.length > 1 ? tasks.value[index].subtasks = tasks.value[index].subtasks.filter((v, i) => i !== subtaskIndex) : undefined;

const addSubtaskSubtitle = (index: number, subtaskIndex: number) => tasks.value[index].subtasks[subtaskIndex].subtitle.push('Watch 1 module');

const tasks = ref<{ title: string; subtasks: { title: string; subtitle: string[]; }[] }[]>([{
    title: 'Monday',
    subtasks: [{
        title: 'Daily Task 1',
        subtitle: ['Watch 1 module']
    }]
}])

const changeSubtitle = (mainTaskIndex: number, taskIndex: number, subtitleIndex: number, value: any) => {
    tasks.value[mainTaskIndex].subtasks[taskIndex].subtitle[subtitleIndex] = value;
}

</script>

<template>
    <section class="my-3">
        <p class="text text-2xl font-bold">Assigned daily task</p>
        <div class="grid w-full mt-3 wrapper gap-2">
            <div v-for="(mainTask, mainTaskIndex) in tasks" :key="mainTaskIndex" class="col-12 grid gap-2">
                <div class="flex gap-1 w-full">
                    <InputText v-model="mainTask.title" class="w-full" />
                    <Button link size="small" class="p-0 m-0" @click="removeColumn(mainTaskIndex)">
                        <i class="pi pi-times text-900 pl-2 text-sm"></i>
                    </Button>
                </div>
                <div v-for="(task, taskIndex) in mainTask.subtasks"
                    class="p-2 border-round-lg surface-border border-1 w-full">
                    <div
                        class="flex justify-content-between py-0 px-1 m-0 gap-2 w-full align-items-center surface-200 border-round-lg border-600 border-1">
                        <div class="flex flex-column col-9 grid">
                            <InputText class="text font-medium mb-2 p-0 m-0 bg-transparent border-transparent col-12 pt-2"
                                v-model="task.title" />
                            <template v-for="(subtitle, subtitleIndex) in task.subtitle">
                                <InputText class="text text-desc mb-2 p-0 m-0 bg-transparent border-transparent col-12"
                                    :value="subtitle"
                                    @update:modelValue="(v) => changeSubtitle(mainTaskIndex, taskIndex, subtitleIndex, v)" />
                            </template>
                        </div>
                        <div class="flex gap-1">
                            <Button link size="small" class="p-0 m-0" v-if="taskIndex === mainTask.subtasks.length - 1" @click="addSubtask(mainTaskIndex)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M15 27.5C8.0965 27.5 2.5 21.9035 2.5 15C2.5 8.09644 8.0965 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9035 21.9036 27.5 15 27.5ZM14.0625 11.25C14.0625 10.7322 14.4823 10.3125 15 10.3125C15.5178 10.3125 15.9375 10.7322 15.9375 11.25V14.0625H18.75C19.2678 14.0625 19.6875 14.4822 19.6875 15C19.6875 15.5177 19.2678 15.9375 18.75 15.9375H15.9375V18.75C15.9375 19.2677 15.5178 19.6875 15 19.6875C14.4823 19.6875 14.0625 19.2677 14.0625 18.75V15.9375H11.25C10.7323 15.9375 10.3125 15.5177 10.3125 15C10.3125 14.4822 10.7323 14.0625 11.25 14.0625H14.0625V11.25Z"
                                        fill="#006785" />
                                </svg>
                            </Button>
                            <Button link size="small" class="p-0 m-0" @click="removeSubtask(mainTaskIndex, taskIndex)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                    fill="none">
                                    <path
                                        d="M21.25 5V6.25H18.75V5H11.25V6.25H8.75V5C8.75 4.33696 9.01339 3.70107 9.48223 3.23223C9.95107 2.76339 10.587 2.5 11.25 2.5H18.75C19.413 2.5 20.0489 2.76339 20.5178 3.23223C20.9866 3.70107 21.25 4.33696 21.25 5Z"
                                        fill="#006785" />
                                    <path
                                        d="M25 7.5H5C4.66848 7.5 4.35054 7.6317 4.11612 7.86612C3.8817 8.10054 3.75 8.41848 3.75 8.75C3.75 9.08152 3.8817 9.39946 4.11612 9.63388C4.35054 9.8683 4.66848 10 5 10H6.25V25C6.25 25.663 6.51339 26.2989 6.98223 26.7678C7.45107 27.2366 8.08696 27.5 8.75 27.5H21.25C21.913 27.5 22.5489 27.2366 23.0178 26.7678C23.4866 26.2989 23.75 25.663 23.75 25V10H25C25.3315 10 25.6495 9.8683 25.8839 9.63388C26.1183 9.39946 26.25 9.08152 26.25 8.75C26.25 8.41848 26.1183 8.10054 25.8839 7.86612C25.6495 7.6317 25.3315 7.5 25 7.5ZM13.75 21.25C13.75 21.5815 13.6183 21.8995 13.3839 22.1339C13.1495 22.3683 12.8315 22.5 12.5 22.5C12.1685 22.5 11.8505 22.3683 11.6161 22.1339C11.3817 21.8995 11.25 21.5815 11.25 21.25V13.75C11.25 13.4185 11.3817 13.1005 11.6161 12.8661C11.8505 12.6317 12.1685 12.5 12.5 12.5C12.8315 12.5 13.1495 12.6317 13.3839 12.8661C13.6183 13.1005 13.75 13.4185 13.75 13.75V21.25ZM18.75 21.25C18.75 21.5815 18.6183 21.8995 18.3839 22.1339C18.1495 22.3683 17.8315 22.5 17.5 22.5C17.1685 22.5 16.8505 22.3683 16.6161 22.1339C16.3817 21.8995 16.25 21.5815 16.25 21.25V13.75C16.25 13.4185 16.3817 13.1005 16.6161 12.8661C16.8505 12.6317 17.1685 12.5 17.5 12.5C17.8315 12.5 18.1495 12.6317 18.3839 12.8661C18.6183 13.1005 18.75 13.4185 18.75 13.75V21.25Z"
                                        fill="#006785" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button size="small" label="Add new columns" class="w-full mt-4 btn-orange" @click="addColumn" />
        </div>

        <Button size="small" label="Save" class="w-full my-4 border-none border-noround" style="background: #00C0DD" />
    </section>
</template>

<style scoped lang="scss">
.text {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-style: normal;
    line-height: 160%;
}

.text-desc {
    color: var(--fonts-primary-variant, #6E6893);
    line-height: normal;
    letter-spacing: 0.7px;
}

.go-button {
    border-radius: 6px;
    background: var(--suggested-pass-color, #E26954);
    color: white;
    width: 99px;
    height: 39px;
    flex-shrink: 0;
}

.btn-add-columns {
    background: var(--suggested-orange, #E96853);
    border: none;
}

.border-card {
    border: 1px solid #D9D5EC;
}

.line {
    background-color: #D9D5EC;
    padding: 1px;
}

@media only screen and (min-width: 768px) {
    .wrapper {
        width: 65vw;
    }
}
</style>