<script setup lang="ts">
import { ref } from 'vue';

interface ICourse {
    id: number;
    image: string;
    title: string;
}
const dataList = ref<ICourse[]>([{
    title: 'Assesment',
    id: 1,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Quiz',
    id: 2,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Midterm Exam',
    id: 3,
    image: '/assets/img/course/course-quiz.png',
}, {
    title: 'Final Exam',
    id: 4,
    image: '/assets/img/course/course-quiz.png',
}])
</script>

<template>
    <section>
        <Card class="my-5 shadow-5">
            <template #content>
                <div class="flex justify-content-between align-items-center">
                    <h1 class="title">Prepare Questions</h1>
                    <Button label="NEW" @click="$router.push('/admin/create/question/add')" class="btn-new"></Button>
                </div>
            </template>
        </Card>

        <article class="grid gap-4 justify-content-start">
            <template v-for="(event, idx) of dataList">
                <div
                    class="col-2 flex justify-content-center align-items-center gap-2 flex-column cursor-pointer list-item">
                    <img :src="event.image" :alt="event.title" />
                    <div class="flex gap-1 justify-content-center align-items-center">
                        <h3 class="card-title">{{ event.title }}</h3>
                        <Button size="small" link icon="pi pi-pencil"></Button>
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

.list-item {
    box-sizing: border-box;
    transition: all 200ms ease-in-out;

    &:hover {
        border-radius: 6px;
        box-shadow: 0px 0px 0px 5px rgb(0, 192, 221, 0.3);
    }

    .card-title {
        font-family: Inter;
        font-size: 14px;
        font-weight: 700;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
    }

    button {
        width: 22px;
        height: 22px;
    }
}

.title {
    font-family: Inter;
    font-size: 30px;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
}
</style>