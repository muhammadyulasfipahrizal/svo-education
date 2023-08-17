<template>
  <section>
    <h1 class="title">Customize New</h1>

    <div class="badge-editor flex-col h-full md:flex-row mt-2" :style="`background: ${activeColor};`">
      <div class="bg-white py-5 flex justify-content-center align-items-center flex-column gap-5">
        <div class="relative">
          <Badge :color="activeColor" :width="isMobile ? '340' : '700'" :height="isMobile ? '340' : '700'" :word="firstLetterOfWord(form.title)" />
          <span class="title-badge"><em>{{ form.title }}</em></span>
        </div>
        <div class="flex gap-1 justify-content-center">
          <div v-for="color in colors" :key="color" role="button" :style="`background: ${color};`" @click="activeColor = color" class="button-color"></div>
          <div role="button" style="background: #FFF; border: 1px solid #333;" class="button-color">
            <i class="pi pi-plus"></i>
          </div>
        </div>
      </div>
      <div class="p-2">
        <form class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="title" class="form-label">Badge Title</label>
            <InputText type="text" v-model="form.title" name="title" class="form-input" placeholder="title" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="title" class="form-label">Description</label>
            <Textarea type="text" rows="5" v-model="form.description" name="title" auto-resize style="height: 100%;" class="form-input" placeholder="title" />
          </div>
          <div class="flex justify-content-between gap-3">
            <button class="button-form">
              <i class="pi pi-replay"></i>
              Reset
            </button>
            <button class="button-form">
              <i class="pi pi-save"></i>
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
        font-size: 35px;
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
  }
</style>
