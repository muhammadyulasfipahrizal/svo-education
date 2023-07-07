<script setup lang="ts">
import router from '@/router';
import { ref, onMounted } from 'vue';

const activeMenu = ref<string>('/admin/create/course');

const goToLocation = (location: string) => router.push(location);

onMounted(() => {
    activeMenu.value = router.currentRoute.value.fullPath;
})
router.afterEach((to, from) => {
    activeMenu.value = to.fullPath;
});
</script>

<template>
    <main class="flex px-5 justify-content-between py-5">
        <section class="event-list">
            <h1 class="font-bold mb-2 title">Admin Create</h1>

            <article class="flex gap-2">
                <header class="flex gap-2">
                    <Button size="small" class="btn-header" @click="goToLocation('/admin/create/course')"
                        :class="{ active: activeMenu.startsWith('/admin/create/course') }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">ADD COURSES</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="goToLocation('/admin/create/question')"
                        :class="{ active: activeMenu.startsWith('/admin/create/question') }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">PREPARE QUESTIONS</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="goToLocation('/admin/create/material')"
                        :class="{ active: activeMenu.startsWith('/admin/create/material') }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">MATERIAL SOURCES</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="goToLocation('/admin/create/instructor')"
                        :class="{ active: activeMenu.startsWith('/admin/create/instructor') }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">ASSIGN INSTRUCTOR</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="goToLocation('/admin/create/task')"
                        :class="{ active: activeMenu.startsWith('/admin/create/task') }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">ASSIGN DAILY TASK</p>
                    </Button>
                </header>
            </article>

            <article>
                <router-view></router-view>
            </article>
        </section>
    </main>
</template>
<style scoped lang="scss">
.btn-header {
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #006785;
    background: transparent !important;

    p {
        color: #006785 !important;
    }

    i {
        color: #006785;
    }

    &:hover,
    &.active {
        background: #006785 !important;

        p {
            color: unset !important;
        }

        i {
            color: white;
        }
    }
}

.title {
    font-family: Inter;
    font-size: 35px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
}

</style>