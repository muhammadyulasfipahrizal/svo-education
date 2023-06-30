<script setup lang="ts">
import { ref } from 'vue';
interface ICourse {
    id: number;
    image: string;
    title: string;
}
const courseList = ref<ICourse[]>([{
    title: 'Event 1',
    id: 1,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Event 2',
    id: 2,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Event 3',
    id: 3,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Event 4',
    id: 4,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Event 5',
    id: 5,
    image: '/assets/img/course/course-quiz.png',
}])
</script>

<template>
    <section>
        <Card class="my-5 shadow-5">
            <template #content>
                <div class="flex justify-content-between align-items-center">
                    <h1 class="text-900 font-bold">Courses</h1>
                    <Button label="NEW" class="btn-new"></Button>
                </div>
            </template>
        </Card>

        <article class="row gap-2">
            <template v-for="event of courseList">
                <div class="col flex justify-content-center align-items-center gap-2 flex-column">
                    <img :src="event.image" :alt="event.title" />
                    <div class="flex gap-1 justify-content-center align-items-center">
                        <h3 class="text-900 font-bold">{{ event.title }}</h3>
                        <Button size="small" link icon="pi pi-pencil"></Button>
                        <Button size="small" link icon="pi pi-trash"></Button>
                    </div>
                </div>
            </template>
        </article>
    </section>
</template>

<style scoped lang="scss">
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.col {
    flex: 1 0 230px;
}

.btn-new {
    border: none;
    background-color: #00C0DD;
}
</style>