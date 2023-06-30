<script setup lang="ts">
import AdminCreateCourse from './AdminCreateCourse/AdminCreateCourse.vue'
import { ref } from 'vue';
const activeMenu = ref<string>('courses');

</script>

<template>
    <main class="flex px-5 justify-content-between">
        <section class="event-list">
            <h1 class="font-bold mb-2">Admin Create</h1>

            <article class="flex gap-2">
                <header class="flex gap-2">
                    <Button size="small" class="btn-header" @click="activeMenu = 'courses'"
                        :class="{ active: activeMenu === 'courses' }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">ADD COURSES</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="activeMenu = 'question'"
                        :class="{ active: activeMenu === 'question' }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">PREPARE QUESTIONS</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="activeMenu = 'material'"
                        :class="{ active: activeMenu === 'material' }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">MATERIAL SOURCES</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="activeMenu = 'instructor'"
                        :class="{ active: activeMenu === 'instructor' }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">ASSIGN INSTRUCTOR</p>
                    </Button>
                    <Button size="small" class="btn-header" @click="activeMenu = 'task'"
                        :class="{ active: activeMenu === 'task' }">
                        <i class="pi pi-plus"></i>
                        <p class="text-900 font-bold ml-2 text-white">ASSIGN DAILY TASK</p>
                    </Button>
                </header>
            </article>

            <article>
                <AdminCreateCourse v-if="activeMenu === 'courses'" />
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
</style>