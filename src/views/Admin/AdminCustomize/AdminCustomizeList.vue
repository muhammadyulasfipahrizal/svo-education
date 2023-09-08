<template>
  <main>
    <section>
      <h1 class="font-bold title">Customize</h1>
      
      <div class="my-5 shadow-5 col-12 border-round-md">
        <div class="grid col-12 align-items-center justify-content-center">
          <h1 class="inter-normal black-2 sm:text-3xl col-6 sm:col-7 md:col-8 lg:col-10" style="font-size: 30px; font-weight: 700;">Badge</h1>
          <Button label="NEW" @click="router.push({ path: '/admin/customize/editor' })" class="btn-new col-6 "></Button>
        </div>
      </div>
      
      <div class="customize-container">
        <div v-for="(item, index) in DummyBadges" :key="index" class="card-badge">
          <div class="flex flex-column align-items-center gap-2">
            <div class="flex w-full">
              <div class="mx-auto relative">
                <span class="inter-normal black-1" style="font-size: 20px; font-weight: 700;">Achieved</span>

                <!-- Edit Icon -->
                <div role="button" class="edit-icon">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64504 0.663183C8.54275 0.558699 8.40401 0.5 8.25934 0.5C8.11468 0.5 7.97594 0.558699 7.87365 0.663183L1.18828 7.49181C1.11975 7.56181 1.07072 7.64919 1.04622 7.74497L0.31895 10.5889C0.270012 10.7803 0.324077 10.9838 0.461004 11.1237C0.597931 11.2636 0.79719 11.3188 0.984548 11.2688L3.76886 10.5259C3.86263 10.5009 3.94818 10.4508 4.0167 10.3808L10.7021 3.55222C10.9151 3.33464 10.9151 2.98188 10.7021 2.7643L8.64504 0.663183ZM2.06432 8.17284L8.25934 1.84506L9.54499 3.15826L3.34996 9.48604L1.60977 9.95032L2.06432 8.17284Z" fill="black"/>
                    <path d="M0.545455 12.3857C0.244208 12.3857 0 12.6352 0 12.9429C0 13.2506 0.244208 13.5 0.545455 13.5H11.4545C11.7558 13.5 12 13.2506 12 12.9429C12 12.6352 11.7558 12.3857 11.4545 12.3857H0.545455Z" fill="black"/>
                  </svg>
                </div>
              </div>
              
            </div>
            <div class="relative">
              <Badge :color="item.color" :word="firstLetterOfWord(item.title)" :width="isMobile ? '150' : undefined" :height="isMobile ? '200': undefined" />
              <span class="title-badge"><em>{{ item.title }}</em></span>
            </div> 
            <p class="title">{{ item.title  }}</p>
            <p class="description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { DummyBadges} from './DummyBadgeList'
import Badge from '@/components/customizeBadge/Badge.vue'
import { useRouter } from 'vue-router';
import {  firstLetterOfWord } from '@/utils/utils'

const router = useRouter()
const isMobile = ref(window.matchMedia('(max-width: 768px)').matches);

watchEffect(() => {
  const handleResize = () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches;
  };


  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

</script>

<style scoped lang="scss">
@import "/src/assets/global.scss";
.title {
  font-family: Inter;
  font-size: 35px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: 0em;
  text-align: left;
  color: #000;
}

.btn-new {
  border: none;
  background-color: #00C0DD;

  &:hover {
    background-color: #00c0ddb0;
  }
}

.card-badge {
  border-radius: 10px;
  border: 1px solid #D9D5EC;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;

  .edit-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    @media screen and (min-width: 576px) {
      left: calc(100% + 2em);
    }
  }

  .title-badge { 
    line-height: .7em;
    top: 44%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    text-align: center;
    width: 100px;

    @media screen and (min-width: 756px) {
      top: 45%;
      line-height: 1.4em;
      width: 150px;
    }

    em {
      color: #123256;
      font-weight: bold !important;
      font-family: Inter;
      font-size: 10px;

      @media screen and (min-width: 756px) {
        font-size: 20px;
      }
    }
  }

  .title {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 24px */
    text-align: center;
  }

  .description {
    color: var(--font-1, #001125);
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 24px */
  }
}

.customize-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>