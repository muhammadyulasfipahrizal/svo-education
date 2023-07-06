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

const addNewTask = () => {
    taskData.value.push({
        taskName: 'Daily task 1',
        taskDesc: 'your task'
  });
};

</script>

<template>
    <section class="my-3">
        <p class="title">Assigned daily task</p>
        <div class="flex flex-column mx-auto mt-3 list">
            <p class="text-day mb-3">Monday</p>
            <Card>
                <template #content>
                    <div class="flex flex-column" v-for="(task, taskindex) in taskData" :key="taskindex">
                        <div class="flex flex-row align-items-center mb-3">
                            <div class="flex flex-column ">
                                <p contenteditable class="text-task mb-2">{{ task.taskName }}</p>
                                <p contenteditable class="text-desc">{{ task.taskDesc }}</p>
                            </div>
                            <Button label="go" class="go-button ml-auto" />
                        </div>
                        <div class="line mb-5"></div>
                    </div>
                </template>
            </Card>
            <Button size="small" label="Add new columns" class="w-full mt-4 btn-add-columns" @click="addNewTask"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
.list {
    width: 50vw;
}
.title {
    color: var(--font-1, #001125);
    font-size: 25px;
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
}

.text-day {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
}

.text-task {
    color: var(--fonts-primary, #25213B);
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.text-desc {
    color: var(--fonts-primary-variant, #6E6893);
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
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

.line {
    background-color: #D9D5EC;
    padding: 1px;
}
</style>