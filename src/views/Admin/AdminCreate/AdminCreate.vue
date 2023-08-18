<script setup lang="ts">
import router from '@/router';
import { ref, onMounted } from 'vue';
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

const dialogData = ref<CategoryData[]>([...categoryData.value]);

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
  categoryData.value = [...dialogData.value];
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
</script>

<template>
    <main class="grid justify-content-between">
        <section class="event-list w-full">
            <h1 class="font-bold mb-2 title col-12">Create</h1>

            <article class="flex gap-2 overflow-x-scroll col-12">
                    <div v-for="(data, index) in categoryData" :key="index">
                        <Button size="small" class="btn-header min-w-max" @click="goToLocation(data.location)"
                            :class="{ active: activeMenu.startsWith(data.location) }">
                            <i class="pi pi-plus" @click="addDialog"></i>
                            <p class="text-900 font-bold ml-2 text-white">{{ data.title }}</p>
                        </Button>
                    </div>
                        <Button size="small" class="btn-header min-w-min" @click="showModal">
                            <i class="pi pi-plus"></i>
                        </Button>
            </article>

            <article class="px-2 bg-white">
                <router-view></router-view>
            </article>

            <Dialog v-model:visible="visible" modal header="Header"
            :style="{ width: '30vw' }">
                <template #header>
                    <div class="flex flex-row align-items-center">
                    <p class="modal-student-name">Existing title</p>
                    </div>
                </template>
                <div>
                    <div v-for="(data, index) in dialogData" :key="index" class="flex flex-row align-items-center">
                        <div class="w-full">
                            <p contenteditable>{{ data.title }}</p>
                        </div>
                        <div class="flex flex-row gap-4">
                            <i class="pi pi-pencil"></i>
                            <i class="pi pi-trash" @click="removeDialog($event, index)"></i>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-row align-items-center gap-2">
                        <InputText type="text" class="w-full" v-model="userInput" placeholder="Add new title" />
                        <i class="pi pi-plus w-min" @click="addDialog"></i>
                    </div>
                    <div class="flex flex-row gap-2">
                        <Button size="small" label="Cancel" severity="danger" class="w-full my-4" />
                        <Button size="small" label="Save" class="w-full my-4 btn-default" @click="addCategory"/>
                    </div>
                    
                </div>
            </Dialog>
        </section>
    </main>
</template>
<style scoped lang="scss">
.width {
    max-width: 95vw;
}
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

  /* width */
  ::-webkit-scrollbar {
    height: 10px;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #dddd; 
    border-radius: 10px;
  }
</style>