<script setup lang="ts">
import AttendanceCalendar from './AttendanceCalander.vue';
</script>

<template>
    <main class="flex px-5 justify-content-between">
        <h1 class="font-bold mb-2">Admin Attendance</h1>
        <div class="flex flex-column">
            <AttendanceCalendar/>
        </div>
    </main>
</template>