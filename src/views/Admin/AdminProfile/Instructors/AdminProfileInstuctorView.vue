<template>
  <section class=" py-4">
    <div class="grid overflow-hidden flex-column px-2 md:px-3 lg:pl-0 lg:px-3 instructor-container">
      <div class="flex flex-column col-12 gap-2 md:gap-0 justify-content-between">
        <div class="flex flex-row gap-2 align-items-center">
          <RouterLink to="/admin/profile/instructors" style="color: black;" class="text-black flex align-items-center">
            <i class="pi pi-angle-left" style="font-size: 1.4rem;" />
          </RouterLink>
          <h1 class="inter-normal black-1" style="font-size: 35px; font-weight: 700;">Instructor Profile</h1>
        </div>

        <div class="instructor mt-3 flex flex-column md:flex-row-reverse md:justify-content-between gap-2 xl:gap-4">
          <div class="flex flex-column justify-content-center align-items-center md:justify-content-start gap-3">
            <img :src="instructor.image" alt="instructor" class="profile-image border-circle">
            <div class="flex flex-row gap-3">
              <i class="pi pi-facebook border-1 border-circle p-6px" style="color: #337FFF;"></i>
              <i class="pi pi-instagram border-1 border-circle p-6px" style="color: #D82D7E;"></i>
              <i class="pi pi-twitter border-1 border-circle p-6px" style="color: #3CF;"></i>
              <i class="pi pi-linkedin border-1 border-circle p-6px" style="color: #069;"></i>
            </div>
          </div>

          <div class="flex flex-column gap-2 w-full">
            <p class="title">Instructor</p>
            <p class="name">{{ instructor.name }}</p>
            <InputText class="role p-inputtext-sm" placeholder="Specialist" v-model="instructor.role" />

            <div class="flex gap-4 align-items-start">
              <div class="flex flex-column gap-1 total-students">
                <h1>Total students</h1>
                <h2>200,000</h2>
              </div>
              <div class="flex flex-column gap-1 total-students">
                <h1>Overall reviews</h1>
                <div class="flex flex-row gap-2 star-container">
                  <h2>
                    3.0
                  </h2>
                  <Rating :modelValue="3" :cancel="false" readonly>
                    <template #onicon>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 16 14" fill="none">
                          <path
                            d="M8 0L9.68386 5.18237H15.1329L10.7245 8.38525L12.4084 13.5676L8 10.3647L3.59161 13.5676L5.27547 8.38525L0.867076 5.18237H6.31614L8 0Z"
                            fill="#F1644C" />
                        </svg>
                      </div>
                    </template>
                    <template #officon>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 16 14" fill="none">
                          <path
                            d="M8 0L9.68386 5.18237H15.1329L10.7245 8.38525L12.4084 13.5676L8 10.3647L3.59161 13.5676L5.27547 8.38525L0.867076 5.18237H6.31614L8 0Z"
                            fill="#D9D9D9" />
                        </svg>
                      </div>
                    </template>
                  </Rating>
                </div>

              </div>
            </div>

            <div class="flex flex-column about-container">
              <label for="about">About Me</label>
              <Textarea placeholder="about me" v-model="instructor.about" name="about" class="p-inputtext-sm"
                autoResize />
            </div>

            <p class="text-xl font-bold">My Courses ({{ instructor.course.length }})</p>
            <div class="courses">
              <div v-for="course in instructor.course" :key="course.name"
                class="course-card p-1 border-1 surface-border flex flex-column gap-1">
                <img :src="course.image" :alt="course.name" class="image-course">
                <h1>{{ course.name }}</h1>

                <div class="flex gap-1 align-items-center instructor">
                  <img :src="instructor.image" :alt="instructor.name" class="border-circle w-1rem h-1rem">
                  <h2 style="font-size: 8px;">{{ instructor.name }}</h2>
                </div>

                <div class="flex align-items-center flex-wrap gap-1 rating">
                  <h1>
                    {{ course.rating }}
                  </h1>
                  <StarRating class="star-container" active-color="#333" v-model:rating="course.rating" :increment="0.01"
                    :round-star-rating="false" :show-rating="false" :star-size="10" read-only />
                  <h2>
                    ({{ course.review }} Reviews)
                  </h2>
                </div>

                <h1 class="completed"> <span class="font-bold text-orange-400">{{
                  course.totalCompleted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }}</span>
                  completed the course</h1>
                <h1 class="hours"> {{ course.totalHour }} total hours | {{ course.lecturers }} lectures | {{
                  course.level }}</h1>
                <div class="flex gap-1 price-container">
                  <h1 class="price">
                    RM 99.99
                  </h1>
                  <h1 class="price-discount">
                    RM 200.00
                  </h1>
                </div>
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
@import "/src/assets/global.scss";
.instructor-container {
  color: var(--font-1, #001125);
  font-family: Inter;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
}

.instructor {
  .title {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }

  .name {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }

  .role {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
  }

  .total-students {
    h1 {
      color: var(--font-1, #001125);
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 160%;
    }

    h2 {
      color: var(--Suggested-dark-grey, #808081);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 160%;
    }
  }

  .star-container {
    height: 29px;

    h2 {
      color: var(--Suggested-dark-grey, #808081);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 160%;
    }

    :deep(.p-rating) {
      gap: 5px;

      .p-rating-item div {
        display: flex;
        align-items: center;

        svg {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

  .about-container {
    label {
      color: var(--font-1, #001125);
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 160%;
      /* 32px */
    }
  }

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

  @media screen and (min-width: 360px) and (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }

  .course-card {
    max-width: 236px;
    padding: 5px;

    h1 {
      color: var(--font-1, #001125);
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 160%;
    }

    .instructor {
      img {
        width: 13px;
        height: 13px;
      }

      h2 {
        color: var(--fonts-primary, #25213B);
        font-family: Inter;
        font-size: 8px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .rating {
      h1 {
        color: #000;
        font-family: Inter;
        font-size: 8px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      h2 {
        color: #000;
        font-family: Inter;
        font-size: 8px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      :deep(.vue-star-rating) {
        height: 10px;

        .vue-star-rating-star {
          height: 10px;
          display: flex;

          svg {
            width: 10px;
            height: 10px;
          }
        }
      }
    }

    h1.completed {
      color: var(--font-1, #001125);
      font-family: Inter;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
    }

    h1.hours {
      color: var(--font-1, #001125);
      font-family: Inter;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
    }

    .price-container {
      .price {
        color: var(--Suggested-orange, #E96853);
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%;
      }

      .price-discount {
        color: #D9D9D9;
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
        text-decoration-line: strikethrough;
      }
    }

    @media screen and (min-width: 576px) {
      max-width: 100%;
    }
  }
}

.p-6px {
  padding: 6px;
}

::v-deep(.p-rating) {
  .p-rating-item {
    color: #F1644C;
  }
}
</style>