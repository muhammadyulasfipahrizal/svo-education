<template>
  <section class=" py-4 sm:px-3">
    <div
      class="grid overflow-hidden flex-column px-2 md:px-3 lg:pl-0 lg:px-3">
      <div class="flex flex-column col-12 gap-2 md:gap-0 justify-content-between">
        <div class="flex flex-row gap-2 align-items-center">
          <RouterLink to="/admin/profile/instructors" style="color: black;" class="text-black flex align-items-center">
            <i class="pi pi-angle-left" style="font-size: 1.4rem;"/>
          </RouterLink>
          <h1 class="text-4xl font-bold">Instructor Profile</h1>
        </div>

        <div class="instructor mt-3 flex flex-column md:flex-row-reverse md:justify-content-between gap-8">
          <div class="flex flex-column justify-content-center align-items-center md:justify-content-start gap-3">
            <img :src="instructor.image" alt="instructor" class="profile-image border-circle">
            <div class="flex flex-row gap-3">
              <i class="pi pi-facebook border-1 border-circle p-2" style="color: #337FFF;"></i>
              <i class="pi pi-instagram border-1 border-circle p-2" style="color: #D82D7E;"></i>
              <i class="pi pi-twitter border-1 border-circle p-2" style="color: #3CF;"></i>
              <i class="pi pi-linkedin border-1 border-circle p-2" style="color: #069;"></i>
            </div>
          </div>

          <div class="flex flex-column gap-2 w-full">
            <p class="text-xl font-bold">Instructor</p>
            <p class="text-4xl font-bold">{{ instructor.name }}</p>
            <InputText class="p-inputtext-sm" placeholder="Specialist" v-model="instructor.role" />

            <div class="flex flex-column gap-2">
              <div class="flex flex-column gap-1">
                <p class="text-xl font-bold">Total students</p>
                <p class="text-xl font-bold text-600">200,000</p>
              </div>
              <div class="flex flex-column">
                <p class="text-xl font-bold">Overall reviews</p>
                <p class="flex gap-1 text-xl font-bold text-600">
                  3.0
                  <Rating :modelValue="3" :cancel="false" readonly :pt="{
                      onIcon: { class: 'text-800' }
                  }"/>
                </p>
              </div>
            </div>

            <label class="text-xl font-bold" for="about">About Me</label>
            <Textarea placeholder="about me" v-model="instructor.about" name="about" class="p-inputtext-sm" autoResize />

            <p class="text-xl font-bold">My Courses (4)</p>
            <div class="courses">
              <div v-for="course in instructor.course" :key="course.name" style="padding: 4px;" class="course-card p-1 border-1 surface-border flex flex-column gap-1">
                <img :src="course.image" :alt="course.name" class="image-course">
                <p class="text-sm font-bold">{{  course.name  }}</p>
                
                <div class="flex gap-1 align-items-center">
                  <img :src="instructor.image" :alt="instructor.name" class="border-circle w-1rem h-1rem">
                  <p style="font-size: 0.5em;">{{ instructor.name }}</p>
                </div>

                <p style="font-size: 0.5em;" class="flex align-items-center flex-wrap gap-1">
                  {{ course.rating }}
                  <StarRating v-model:rating="course.rating" :increment="0.01" :round-star-rating="false" :show-rating="false" :star-size="10" read-only />
                  ({{ course.review }} Reviews)  
                </p>

                <p style="font-size: 0.5em;"> <span class="font-bold text-orange-400">{{ course.totalCompleted }}</span> completed the course</p>
                <p style="font-size: 0.5em;"> {{ course.totalHour }} total hours | {{ course.lecturers}} lectures | {{ course.level}}</p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { instructorsDummy } from './instructorsDummy';
import { useRoute } from 'vue-router';
import StarRating from 'vue-star-rating'

const route = useRoute()
const instructor = computed(() => instructorsDummy.filter(instructor => instructor.id === +route.params.id)[0])
</script>

<style scoped lang="scss">
.instructor {
  .profile-image {
    width: 122px;
    height: 122px;
    object-fit: cover;
  }
  .image-course {
    height: 119px;
    object-fit: cover;
  }
}

.p-inputtext-sm {
  &:placeholder-shown {
    background-color: #D9D9D9;
  }
}

.courses {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  padding-right: 1rem;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }

  .course-card {
    max-width: 100%;
  }
}

</style>