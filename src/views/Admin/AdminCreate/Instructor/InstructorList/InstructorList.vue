<script setup lang="ts">
import { ref } from 'vue';

interface ICourse {
    id: number;
    image: string;
    title: string;
}
const dataList = ref<ICourse[]>([{
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
    <section class="grid">
        <div class="my-5 shadow-5 col-12 h-5rem border-round">
            <div class="grid col-12 align-items-center justify-content-center">
                <h1 class="title text-2xl sm:text-3xl col-7 md:col-8 lg:col-10">Assign Instructor</h1>
                <Button label="NEW" @click="$router.push('/admin/create/instructor/add')"
                    class="btn-new col-5 md:col-4 lg:col-2"></Button>
            </div>
        </div>

        <article class="grid col-12 p-0 m-0 gap-2">
            <div v-for="(event, idx) of dataList"
                class="item-flex col-6 sm:col-4 md:col-4 lg:col-4 xl:col-4 py-0 px-0 mx-0 my-3 md:my-3" style="max-width: 210px;">
                <div class="grid cursor-pointer list-item align-items-center justify-content-center p-0 m-0">
                    <img :src="event.image" :alt="event.title" class="col-10" />
                    <div class="grid">
                        <h3 class="card-title">{{ event.title }}</h3>
                        <Button size="small" link icon="pi pi-pencil"></Button>
                    </div>
                </div>
            </div>
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
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: left;
}
</style>