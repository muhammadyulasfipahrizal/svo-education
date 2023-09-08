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
    <section class="grid-nogutter">
        <div class="my-5 shadow-5 col-12 h-5rem border-round">
            <div class="grid col-12 align-items-center justify-content-between">
                <h1 class="title text-2xl sm:text-3xl col-6 ml-3">Assign Instructor</h1>
                <Button label="NEW" @click="$router.push('/admin/create/instructor/add')"
                    class="btn-new col-6 mr-3"></Button>
            </div>
        </div>

        <article class="list-container col-12 p-0 m-0 gap-2">
            <div v-for="(event, idx) of dataList" class="item-flex py-0 px-0 mx-0 my-3 md:my-3">
                <div class="grid cursor-pointer list-item align-items-center justify-content-center p-0 m-0">
                    <img :src="event.image" :alt="event.title" class="col-10" />
                    <div class="event-title">
                        <h3 class="card-title">{{ event.title }}</h3>
                        <Button size="small" link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9.14504 0.663183C9.04275 0.558699 8.90401 0.5 8.75934 0.5C8.61468 0.5 8.47594 0.558699 8.37365 0.663183L1.68828 7.49181C1.61975 7.56181 1.57072 7.64919 1.54622 7.74497L0.81895 10.5889C0.770012 10.7803 0.824077 10.9838 0.961004 11.1237C1.09793 11.2636 1.29719 11.3188 1.48455 11.2688L4.26886 10.5259C4.36263 10.5009 4.44818 10.4508 4.5167 10.3808L11.2021 3.55222C11.4151 3.33464 11.4151 2.98188 11.2021 2.7643L9.14504 0.663183ZM2.56432 8.17284L8.75934 1.84506L10.045 3.15826L3.84996 9.48604L2.10977 9.95032L2.56432 8.17284Z"
                                    fill="black" />
                                <path
                                    d="M1.04545 12.3857C0.744208 12.3857 0.5 12.6352 0.5 12.9429C0.5 13.2506 0.744208 13.5 1.04545 13.5H11.9545C12.2558 13.5 12.5 13.2506 12.5 12.9429C12.5 12.6352 12.2558 12.3857 11.9545 12.3857H1.04545Z"
                                    fill="black" />
                            </svg>
                        </Button>
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