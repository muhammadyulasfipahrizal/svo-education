<template>
  <section class="max-h-full">
    <h1 class="title hidden sm:block">Customize {{ $route.params.label }}</h1>
    <div class="badge-editor flex-col h-full md:flex-row mt-2" :style="`background: ${activeColor};`" style="border-radius: 10px;">
      <div class="bg-white flex justify-content-center align-items-center flex-column" style="gap: 15px;">
        <div class="relative">
          <Badge :color="activeColor" :width="isMobile ? '340' : '400'" :height="isMobile ? '340' : '400'" :word="firstLetterOfWord(form.title)" />
          <span class="title-badge"><em>{{ form.title }}</em></span>
        </div>
        <div class="flex justify-content-center badge-padding" style="gap: 8px;">
          <div v-for="color in colors" :key="color" role="button" :style="`background: ${color};`" @click="activeColor = color" class="button-color"></div>
          <div role="button" style="background: #FFF; border: 1px solid #333;" class="button-color">
            <i class="pi pi-plus"></i>
          </div>
        </div>
      </div>
      <div style="padding: 0px 10px 10px 10px">
        <form class="flex flex-column" style="gap: 10px">
          <div class="flex flex-column gap-2" style="gap: 10px">
            <label for="title" class="form-label">Badge Title</label>
            <InputText type="text" v-model="form.title" name="title" class="form-input" placeholder="title" style="border-radius: 10px;"/>
          </div>
          <div class="flex flex-column" style="gap: 10px">
            <label for="title" class="form-label">Description</label>
            <Textarea type="text" rows="5" v-model="form.description" name="title" auto-resize style="height: 100%; border-radius: 10px;" class="form-input" placeholder="title" />
          </div>
          <div class="flex justify-content-between" style="gap: 10px">
            <button class="button-form">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M18.875 10.125C18.35 10.125 18 10.475 18 11C18 13.5375 16.6875 15.8125 14.5 17.0375C11.175 18.9625 6.8875 17.825 4.9625 14.5C3.0375 11.175 4.175 6.8875 7.5 4.9625C10.3875 3.3 13.8875 3.9125 16.075 6.1875H13.975C13.45 6.1875 13.1 6.5375 13.1 7.0625C13.1 7.5875 13.45 7.9375 13.975 7.9375H17.9125C18.4375 7.9375 18.7875 7.5875 18.7875 7.0625V3.125C18.7875 2.6 18.4375 2.25 17.9125 2.25C17.3875 2.25 17.0375 2.6 17.0375 3.125V4.7C15.375 3.125 13.275 2.25 11 2.25C6.1875 2.25 2.25 6.1875 2.25 11C2.25 15.8125 6.1875 19.75 11 19.75C15.8125 19.75 19.75 15.8125 19.75 11C19.75 10.475 19.4 10.125 18.875 10.125Z" fill="black"/>
                </svg>
              Reset
            </button>
            <button class="button-form">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.05283 5.95712C3.19792 4.71656 4.249 3.78125 5.49801 3.78125H14.8978C15.0572 3.78125 15.2111 3.83923 15.3308 3.94436L17.7463 6.06517C18.2893 6.54197 18.5893 7.23757 18.5633 7.95975L18.2623 16.3364C18.2158 17.6309 17.1529 18.6562 15.8576 18.6562H5.34865C4.18523 18.6562 3.20302 17.7918 3.05528 16.6378C2.62084 13.2443 2.60213 9.81058 2.99955 6.41262L3.05283 5.95712ZM5.49801 5.09375C4.91489 5.09375 4.42418 5.53042 4.35644 6.10959L4.30316 6.56509C3.91815 9.85699 3.93628 13.1836 4.35715 16.4711C4.42103 16.97 4.84567 17.3438 5.34865 17.3438H5.9061V13.625C5.9061 12.7793 6.59167 12.0938 7.43735 12.0938H13.5624C14.408 12.0938 15.0936 12.7793 15.0936 13.625V17.3438H15.8576C16.4464 17.3438 16.9295 16.8777 16.9507 16.2893L17.2517 7.91262C17.2635 7.58436 17.1271 7.26817 16.8803 7.05145L14.6561 5.09856V7.14998C14.6561 7.99566 13.9705 8.68123 13.1249 8.68123H7.87485C7.02917 8.68123 6.3436 7.99566 6.3436 7.14998V5.09375H5.49801ZM7.6561 5.09375V7.14998C7.6561 7.27079 7.75404 7.36873 7.87485 7.36873H13.1249C13.2457 7.36873 13.3436 7.27079 13.3436 7.14998V5.09375H7.6561ZM13.7811 17.3438H7.2186V13.625C7.2186 13.5042 7.31654 13.4062 7.43735 13.4062H13.5624C13.6832 13.4062 13.7811 13.5042 13.7811 13.625V17.3438Z" fill="black" stroke="black"/>
                </svg>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Badge from '@/components/customizeBadge/Badge.vue';
import { DummyBadges } from './DummyBadgeList';
import { computed, ref, watchEffect } from 'vue';
import { firstLetterOfWord } from '@/utils/utils';

const isMobile = ref(window.matchMedia('(max-width: 768px)').matches);
const colors = computed(() => DummyBadges.map((item) => item.color))
const activeColor = ref(colors.value[0])

const form = ref({
  title: '',
  description: ''
})



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

<style lang="scss" scoped>

.title {
  font-family: Inter;
  font-size: 35px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: 0em;
  text-align: left;
  color: #000;
}

.badge-editor {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  padding: 10px;
  gap: 10px;
  min-height: calc(100vh - 139px);

  @media screen and (min-width: 756px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
}


.button-color {
  display: flex;
  justify-content: center;
  align-items: center;
  content: '';
  width: 33px;
  height: 33px;
  border-radius: 5px;
}

.form-input {
  display: flex;
  padding: 9px 8px 9px 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  color: var(--black, #000);
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 40px */
}

.form-label {
  color: #FFF;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 40px */
}

.title-badge { 
    line-height: 1.4em;
    top: 45%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    text-align: center;
    max-width: 200px;
    word-wrap: break-word;

    @media screen and (min-width: 756px) {
      top: 45%;
      line-height: 2em;
      max-width: 300px;
    }

    em {
      color: #123256;
      font-weight: bold !important;
      font-family: Inter;
      font-size: 20px;

      @media screen and (min-width: 756px) {
        font-size: 20px;
      }
    }
  }
  .button-form {
    all: unset;
    border: 1px solid var(--suggested-dark-grey, #808081);
    background: #FFF;
    display: flex;
    height: 40px;
    padding: 0px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    color: #000;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
  }
  .badge-padding {
    padding-bottom: 50px;
  }

  /* Media query for mobile devices with a maximum width of 768px */
  @media (max-width: 768px) {
    .badge-padding {
      padding-bottom: 10px;
    }
  }
</style>
