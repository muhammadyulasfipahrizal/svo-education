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
        <p class="text text-2xl font-bold">Assigned daily task</p>
        <div class="flex flex-column mx-auto mt-3 wrapper">
            <p class="text text-lg mb-3 font-semibold">Monday</p>
            <Card>
                <template #content>
                    <div class="flex flex-column" v-for="(task, taskindex) in taskData" :key="taskindex">
                        <div class="flex flex-row align-items-center mb-3">
                            <div class="flex flex-column ">
                                <p contenteditable class="text font-medium mb-2">{{ task.taskName }}</p>
                                <p contenteditable class="text text-desc">{{ task.taskDesc }}</p>
                            </div>
                            <Button label="go" class="btn-orange ml-auto" />
                        </div>
                        <div class="line mb-5"></div>
                    </div>
                </template>
            </Card>
            <Button size="small" label="Add new columns" class="w-full mt-4 btn-orange" @click="addNewTask"/>
        </div>
            <Button size="small" label="SAVE" class="w-full my-4 btn-default" />
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

.line {
    background-color: #D9D5EC;
    padding: 1px;
}

@media only screen and (min-width: 768px) {
    .wrapper{
      width: 65vw;
    }
  }
</style>