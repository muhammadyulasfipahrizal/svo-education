<script setup lang="ts">
import router from '@/router';
import { isElementOverflown } from '@/utils/utils';
import { ref, onMounted, computed, watch, onUpdated } from 'vue';
const activeMenu = ref<string>('/admin/create/course');

interface CategoryData {
  title: string;
  location: string;
}

const categoryData = ref<CategoryData[]>([
  {
    title: "ADD COURSE",
    location: "/admin/create/course",
  },
  {
    title: "PREPARE QUESTIONS",
    location: "/admin/create/question",
  },
  {
    title: "MATERIAL SOURCES",
    location: "/admin/create/material",
  },
  // { 
  //   title: "ASSIGN INSTRUCTOR",
  //   location: "/admin/create/instructor",
  // },
  {
    title: "ASSIGN DAILY TASK",
    location: "/admin/create/task",
  },
]);
interface EditableCategoryData extends CategoryData {
  editmode?: boolean;
}
const dialogData = ref<EditableCategoryData[]>([...categoryData.value]);

const userInput = ref('');

const addDialog = () => {
  if (userInput.value.trim() !== '') {
    const newDialogData = {
      title: userInput.value,
      location: ""
    };
    dialogData.value.push(newDialogData);
    userInput.value = '';
  }
};

const addCategory = () => {
  categoryData.value = [...dialogData.value, {
    location: userInput.value.toLowerCase().replace(/ /g, '-'),
    title: userInput.value
  }];
  visible.value = false;
};

const removeDialog = (event: MouseEvent, index: number) => {
  event.stopPropagation();
  dialogData.value.splice(index, 1);
};

const goToLocation = (location: string) => router.push(location);

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};

onMounted(() => {
  activeMenu.value = router.currentRoute.value.fullPath;
})
router.afterEach((to, from) => {
  activeMenu.value = to.fullPath;
});
const onCancel = () => {
  visible.value = false;
  dialogData.value = categoryData.value
}
const categoryEl = ref<HTMLElement | null>(null)
const isCategoryOverflown = computed(() => {
  if (!categoryEl.value) return
  const { clientWidth, clientHeight, scrollHeight, scrollWidth } = categoryEl.value
  return isElementOverflown({ clientHeight, clientWidth, scrollHeight, scrollWidth })
})

const posXCategoryScroll = ref(0)
const scrollWidthCategory = ref(0)
const categoryScrollWidthClient = ref(0)
const scrollCategory = (isIncrement: boolean) => {
  const categoryEl = document.getElementById('category-container') as HTMLElement
  categoryEl.scroll({
    left: isIncrement ? categoryEl.scrollLeft + 220 : categoryEl.scrollLeft - 220,
    behavior: 'smooth'
  })
}

onUpdated(() => {
  const categoryEl = document.getElementById('category-container') as HTMLElement
  scrollWidthCategory.value = categoryEl.scrollWidth
  posXCategoryScroll.value = categoryEl.scrollLeft
  categoryScrollWidthClient.value = categoryEl.clientWidth
})

const onScrollCategory = () => {
  const categoryEl = document.getElementById('category-container') as HTMLElement
  posXCategoryScroll.value = categoryEl.scrollLeft
  scrollWidthCategory.value = categoryEl.scrollWidth
}

const enabledScrollLeft = computed(() => posXCategoryScroll.value > 0)
const enabledScrollRight = computed(() => (posXCategoryScroll.value + categoryScrollWidthClient.value) < scrollWidthCategory.value )

 
</script>

<template>
  <main class="grid justify-content-between bg-white min-h-screen" style="padding: 10px">
    <section class="event-list w-full">
      <h1 class="font-bold mb-2 title col-12" style="padding-left: 10px">Create</h1>
      <article class="flex gap-2 mb-2 overflow-hidden relative align-items-center" :class="{'mx-auto': isCategoryOverflown, 'col-12': !isCategoryOverflown }">
        <Button v-if="isCategoryOverflown" @click="scrollCategory(false)" outlined severity="secondary" size="small" link class="btn-nav-category min-w-min">
          <i class="pi pi-chevron-left" style="color: black;"></i>
        </Button>
        <div @scroll="onScrollCategory" class="flex gap-2 overflow-hidden" ref="categoryEl" id="category-container">
          <div v-for="(data, index) in categoryData" :key="index">
            <Button size="small" class="btn-header min-w-max" @click="goToLocation(data.location)"
            :class="{ active: activeMenu.startsWith(data.location) }">
            <i class="pi pi-plus" @click="addDialog"></i>
            <p class="inter-normal ml-2 text-white" style="font-size: 16px; font-weight: 600;">{{ data.title }}</p>
          </Button>
          </div>
          <Button size="small" class="btn-header min-w-min" @click="showModal">
            <i class="pi pi-plus"></i>
          </Button>
        </div>
        <Button v-if="isCategoryOverflown" @click="scrollCategory(true)" outlined severity="secondary" size="small" link class="btn-nav-category min-w-min">
          <i class="pi pi-chevron-right" style="color: black;"></i>
        </Button>
      </article>

      <article class="mx-2 ">
        <router-view></router-view>
      </article>

      <Dialog v-model:visible="visible" modal header="Header" :dismissable-mask="true" :style="{ width: '30vw' }" :breakpoints="{ '960px': '30vw', '641px': '100vw'}">
        <template #header>
          <div class="flex flex-row align-items-center px-3 py-1">
            <p class="modal-title">Existing title</p>
          </div>
        </template>
        <div class="p-3 grid gap-2">
          <template v-for="(data, index) in dialogData" :key="index">
            <div class="flex flex-row align-items-center col-12 existing-item">
              <div class="w-full">
                <InputText v-model="data.title" :readonly="!data.editmode" />
              </div>
              <div class="flex flex-row gap-0">
                <Button link size="small" class="p-2" @click="data.editmode = !data.editmode">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Icon">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.64504 0.150631C8.54275 0.0541835 8.40401 0 8.25934 0C8.11468 0 7.97594 0.0541835 7.87365 0.150631L1.18828 6.45398C1.11975 6.51859 1.07072 6.59925 1.04622 6.68766L0.31895 9.31287C0.270012 9.48952 0.324077 9.67739 0.461004 9.8065C0.597931 9.9356 0.79719 9.98658 0.984548 9.94043L3.76886 9.25472C3.86263 9.23163 3.94818 9.1854 4.0167 9.12078L10.7021 2.81743C10.9151 2.61659 10.9151 2.29096 10.7021 2.09012L8.64504 0.150631ZM2.06432 7.08262L8.25934 1.2416L9.54499 2.45378L3.34996 8.2948L1.60977 8.72337L2.06432 7.08262Z"
                        fill="black" />
                      <path
                        d="M0.545455 10.9714C0.244208 10.9714 0 11.2017 0 11.4857C0 11.7697 0.244208 12 0.545455 12H11.4545C11.7558 12 12 11.7697 12 11.4857C12 11.2017 11.7558 10.9714 11.4545 10.9714H0.545455Z"
                        fill="black" />
                    </g>
                  </svg>
                </Button>
                <Button link @click="removeDialog($event, index)" size="small" class="p-2">
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Icon">
                      <path
                        d="M4.45161 0.5C4.13093 0.5 3.87097 0.748809 3.87097 1.05573V1.61146H0.580645C0.259964 1.61146 0 1.86027 0 2.16719C0 2.47411 0.259964 2.72292 0.580645 2.72292H11.4194C11.74 2.72292 12 2.47411 12 2.16719C12 1.86027 11.74 1.61146 11.4194 1.61146H8.12903V1.05573C8.12903 0.748809 7.86907 0.5 7.54839 0.5H4.45161Z"
                        fill="black" />
                      <path
                        d="M6.82116 9.94742L7.95897 11.0364C8.18572 11.2534 8.18572 11.6053 7.95897 11.8223C7.73221 12.0394 7.36457 12.0394 7.13781 11.8223L6.00001 10.7333L4.8622 11.8223C4.63544 12.0394 4.2678 12.0394 4.04104 11.8223C3.81429 11.6053 3.81429 11.2534 4.04104 11.0364L5.17885 9.94742L4.04103 8.85843C3.81428 8.6414 3.81428 8.28953 4.04103 8.07251C4.26779 7.85548 4.63543 7.85548 4.86219 8.07251L6.00001 9.1615L7.13782 8.07251C7.36457 7.85549 7.73222 7.85549 7.95897 8.07251C8.18573 8.28954 8.18573 8.64141 7.95897 8.85843L6.82116 9.94742Z"
                        fill="black" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.3482 4.69923C1.38087 4.41779 1.62943 4.20487 1.92529 4.20487H10.0747C10.3706 4.20487 10.6191 4.41779 10.6518 4.69923L10.8067 6.03398C11.0876 8.4535 11.0876 10.8954 10.8067 13.3149L10.7915 13.4463C10.68 14.4067 9.90228 15.1725 8.90238 15.3065C6.97685 15.5645 5.02314 15.5645 3.09761 15.3065C2.09771 15.1725 1.32 14.4067 1.2085 13.4463L1.19325 13.3149C0.912357 10.8954 0.912357 8.4535 1.19325 6.03398L1.3482 4.69923ZM2.445 5.31633L2.34743 6.15672C2.07602 8.49467 2.07602 10.8542 2.34743 13.1921L2.36269 13.3235C2.41557 13.779 2.78441 14.1422 3.25862 14.2058C5.07733 14.4495 6.92266 14.4495 8.74137 14.2058C9.21559 14.1422 9.58443 13.779 9.63731 13.3235L9.65256 13.1921C9.92398 10.8542 9.92398 8.49467 9.65256 6.15672L9.555 5.31633H2.445Z"
                        fill="black" />
                    </g>
                  </svg>
                </Button>
              </div>
            </div>
          </template>
        </div>
        <div class="px-3 mt-2 flex flex-row align-items-center gap-2">
          <InputText v-on:keyup.enter="addDialog" type="text" class="w-full border-noround" v-model="userInput"
            placeholder="Add new title" />
          <Button @click="addDialog" link style="color: #000" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 14.1693V5.83594" stroke="black" stroke-width="1.5" stroke-linecap="round" />
              <path d="M5.83366 10L14.167 10" stroke="black" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </Button>
        </div>
        <div class="flex flex-row gap-2">
          <Button size="small" label="Cancel" severity="danger" @click="onCancel" class="w-full my-4 border-round-sm" />
          <Button size="small" label="Save" class="w-full my-4 btn-new" @click="addCategory" />
        </div>

      </Dialog>
    </section>
  </main>
</template>
<style scoped lang="scss">
@import "/src/assets/global.scss";

.width {
  max-width: 95vw;
}

.btn-header {
  height: 40px;
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

/* width */
::-webkit-scrollbar {
  height: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #dddd;
  border-radius: 10px;
}

.modal-title {
  color: var(--font-1, #001125);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
}

.btn-new {
  border: none;
  background-color: #00C0DD;
}

.existing-item {
  height: 40px;

  input {
    margin: 0;
    border-radius: 0;
    width: 100%;

    &:read-only {
      border: none;
      background: none;
      padding: 0;
    }
  }
}

.btn-nav-category {
 z-index: 99; 
 max-width: max-content;
 background-color: white;
 padding-right: .6em;
 padding-left: .6em;
}
</style>