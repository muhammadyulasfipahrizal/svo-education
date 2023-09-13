<template>
  <section class=" py-4 bg-white">
    <div class="grid overflow-hidden flex-column px-2 md:px-3 lg:pl-0 lg:px-3 h-screen">
      <div class="flex flex-column col-12 gap-2 md:gap-0 md:flex-row justify-content-between">
        <h1 class="title-head">Instructors</h1>

        <Button label="ADD PROFILE" size="small" icon="pi pi-plus" @click="visible = true" class="btn-orange"></Button>
      </div>

      <div class="instructors px-2 mt-3">
        <div v-for="(instructor, index) in instructorsDummy" :key="instructor.id" class="card-instructor border-round-md">
          <img :src="instructor.image" class="w-12 border-round-top-md img" />
          <div class="p-2 flex flex-column justify-content-between gap-1">
            <div class="flex justify-content-between gap-2">
              <h1>{{ instructor.name }}</h1>
              <div class="flex gap-3 align-items-center">
                <svg @click="handleEdit(instructor)" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.0267 0.225946C11.8903 0.0812753 11.7053 0 11.5125 0C11.3196 0 11.1346 0.0812753 10.9982 0.225946L2.08437 9.68097C1.993 9.77789 1.92762 9.89888 1.89496 10.0315L0.925267 13.9693C0.860016 14.2343 0.932102 14.5161 1.11467 14.7097C1.29724 14.9034 1.56292 14.9799 1.81273 14.9107L5.52514 13.8821C5.65017 13.8474 5.76423 13.7781 5.8556 13.6812L14.7694 4.22615C15.0535 3.92489 15.0535 3.43645 14.7694 3.13519L12.0267 0.225946ZM3.25242 10.6239L11.5125 1.86239L13.2267 3.68067L4.96662 12.4422L2.64636 13.0851L3.25242 10.6239Z"
                    fill="black" />
                  <path
                    d="M1.22727 16.4571C0.825611 16.4571 0.5 16.8025 0.5 17.2286C0.5 17.6546 0.825611 18 1.22727 18H15.7727C16.1744 18 16.5 17.6546 16.5 17.2286C16.5 16.8025 16.1744 16.4571 15.7727 16.4571H1.22727Z"
                    fill="black" />
                </svg>

                <svg @click="handleDelete(index)" width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.56452 0C5.16366 0 4.83871 0.298571 4.83871 0.666877V1.33375H0.725806C0.324955 1.33375 0 1.63232 0 2.00063C0 2.36894 0.324955 2.66751 0.725806 2.66751H14.2742C14.675 2.66751 15 2.36894 15 2.00063C15 1.63232 14.675 1.33375 14.2742 1.33375H10.1613V0.666877C10.1613 0.298571 9.83634 0 9.43548 0H5.56452Z"
                    fill="black" />
                  <path
                    d="M8.52645 11.3369L9.94871 12.6437C10.2322 12.9041 10.2322 13.3264 9.94871 13.5868C9.66526 13.8472 9.20571 13.8472 8.92226 13.5868L7.50001 12.28L6.07775 13.5868C5.7943 13.8472 5.33475 13.8472 5.0513 13.5868C4.76786 13.3264 4.76786 12.9041 5.0513 12.6437L6.47356 11.3369L5.05129 10.0301C4.76785 9.76968 4.76785 9.34744 5.05129 9.08701C5.33474 8.82658 5.79429 8.82658 6.07774 9.08701L7.50001 10.3938L8.92227 9.08702C9.20572 8.82658 9.66527 8.82658 9.94872 9.08702C10.2322 9.34745 10.2322 9.76969 9.94872 10.0301L8.52645 11.3369Z"
                    fill="black" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M1.68525 5.03908C1.72609 4.70135 2.03678 4.44585 2.40662 4.44585H12.5934C12.9632 4.44585 13.2739 4.70135 13.3147 5.03908L13.5084 6.64078C13.8595 9.5442 13.8595 12.4744 13.5084 15.3779L13.4894 15.5355C13.35 16.688 12.3779 17.607 11.128 17.7678C8.72106 18.0774 6.27893 18.0774 3.87201 17.7678C2.62214 17.607 1.65 16.688 1.51062 15.5355L1.49156 15.3779C1.14045 12.4744 1.14045 9.5442 1.49156 6.64078L1.68525 5.03908ZM3.05624 5.7796L2.93429 6.78807C2.59502 9.5936 2.59502 12.425 2.93429 15.2306L2.95336 15.3882C3.01946 15.9348 3.48051 16.3707 4.07327 16.4469C6.34667 16.7394 8.65332 16.7394 10.9267 16.4469C11.5195 16.3707 11.9805 15.9348 12.0466 15.3882L12.0657 15.2306C12.405 12.425 12.405 9.5936 12.0657 6.78807L11.9437 5.7796H3.05624Z"
                    fill="black" />
                </svg>

              </div>
            </div>

            <span class="branch">Branch - {{ instructor.branch }}</span>
            <span class="enrolled">Enrolled students - {{ instructor.enrolled }}</span>

            <Button label="PROFILE" size="small" class="btn-primary"
              @click="router.push({ path: `/admin/profile/instructors/${instructor.id}` })"></Button>
          </div>
        </div>
      </div>
      
    </div>
    <Paginator :rows="10" :totalRecords="instructorsDummy.length" :template="{
        '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
        '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
      }" :pageLinkSize="3" currentPageReportTemplate='Showing data {first} to {last} of {totalRecords} entries'
        class="col-12" @page="pageChanged" />
  </section>

  <!-- MODAL Add Profile -->
  <Dialog :dismissable-mask="true" v-model:visible="visible" modal :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '90vw' }">
    <template #header>
      <h1 class="text-4xl font-bold">{{ isEdit ? 'Edit' : 'Add' }} Profile</h1>
    </template>

    <!-- FILE Upload -->
    <div class="flex flex-column gap-2 pb-2">
      <div
        class="flex justify-content-center align-items-center border-1 border-dashed surface-0 surface-border flex-column px-3 py-5 gap-2 h-14rem border-round-xl"
        :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive"
        @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>

        <img v-if="fileUploadPreview" :src="fileUploadPreview" class="h-full" style="object-fit: cover;" />
        <template v-if="!fileUploadPreview">
          <input type="file" ref="fileUpload" class="hidden" accept="image/*" @change="onUpload" />
          <h2 class="inter-normal grey-3" style="font-size: 20px; font-weight: 400;">Drop files here</h2>
          <p class="inter-normal grey-3" style="font-size: 15px; font-weight: 400;">or</p>
          <div class="flex">
            <Button size="small" plain outlined @click="fileUpload.click()" class="py-1 px-2">
              <template #default>
                <div>
                  <p class="inter-normal grey-3" style="font-size: 12px; font-weight: 600;">Select File</p>
                </div>
              </template>
            </Button>
          </div>
        </template>
      </div>
      <div class="flex">
        <p class="inter-normal black-2" style="font-size: 15px; font-weight: 400;">Maximum upload file size: 8 MB</p>
      </div>
    </div>

    <div class="flex flex-column gap-2 pb-3">
      <p class="inter-normal black-1" style="font-size: 30px; font-weight: 700;">Profile Information</p>

      <div class="flex flex-column md:flex-row gap-2">
        <InputText class="p-inputtext-sm" type="text" v-model="form.name" placeholder="Instructor Name" />
        <Dropdown optionLabel="name" v-model="form.branch" placeholder="Branch" :options="branchList"
          class="p-inputtext-sm" :class="{'selected': form.branch}" />
        <InputText class="p-inputtext-sm" type="number" v-model="form.enrolled" placeholder="Enrolled" />
      </div>

      <Button label="SAVE" size="small" class="btn-primary" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { instructorsDummy } from './instructorsDummy'
import { useRouter } from 'vue-router';
import type { PageState } from 'primevue/paginator';
import type { Instructor } from './instructors.type';

const router = useRouter()

const visible = ref(false)
const isEdit = ref(false)

const fileUpload = ref();
const fileUploadPreview = ref();
const branchList = ref([
  { name: 'Penang', code: '1' },
  { name: 'Pahang', code: '2' },
  { name: 'Singapore', code: '3' }
])

const form = ref({
  name: '',
  branch: {
    name: '',
    code: ''
  },
  enrolled: '',
  file: ''
})

// Create `active` state and manage it with functions
let active = ref(false)

function setActive() {
  active.value = true
}
function setInactive() {
  active.value = false
}

function onDrop(e: any) {
  setInactive();
  form.value.file = e.dataTransfer.files[0];
  fileUploadPreview.value = URL.createObjectURL(fileUpload.value);
}


const onUpload = (e: any) => {
  setInactive();
  fileUpload.value = e.target.files[0];
  fileUploadPreview.value = URL.createObjectURL(fileUpload.value);
}
const cardData = ref(instructorsDummy);
const perPage = ref(10);
const pageChanged = (page: PageState) => {
  const startIndex = page.page * perPage.value;
  const endIndex = startIndex + perPage.value;
  const data = [...instructorsDummy];
  const filteredData = data.slice(startIndex, endIndex);
  cardData.value = filteredData;
}

const handleEdit = (data: Instructor) => {
  console.log({ data })
  isEdit.value = true
  visible.value = true

  form.value.name = data.name
  form.value.branch = branchList.value.filter(item => item.name === data.branch)[0]
  form.value.enrolled = data.enrolled
  fileUploadPreview.value = data.image
}

const handleDelete = (index: number) => {
  instructorsDummy.splice(1, index)
}
</script>
<style scoped lang="scss">
@import "/src/assets/global.scss";
.card-instructor {
  border-radius: 10px;
  border: 1px solid var(--suggested-grey, #D9D9D9);
  background: #FFF;
  max-width: 226px;

  h1 {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
    /* 32px */
  }

  .branch,
  .enrolled {
    color: var(--Suggested-dark-grey, #808081);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }

  @media screen and (min-width: 1443px) {
    max-width: 100%;
  }

  img {
    object-fit: cover;
    object-position: center;
    max-height: 122px;

    @media screen and (min-width: 1443px) {
      max-height: 134px;
    }
  }
}


.instructors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;

  @media screen and (min-width: 576px) and (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media screen and (min-width: 1443px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

  }
}

:deep(.p-paginator) {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 50px !important;
  gap: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin: 0 7.5px !important;
  }


  .p-paginator-pages {
    display: flex;
    flex-direction: row;
    gap: 0 !important;
    display: flex;

    .p-paginator-page {
      color: #6D5BD0;
      text-align: center;
      font-size: 16px;
      font-family: Inter;
      font-weight: 600;
      background-color: white;
    }
  }

  .p-paginator-first {
    margin-left: auto !important;
  }

  .p-link {
    width: 27px;
    height: 27px;
    color: #404B52 !important;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.14px;
    border-radius: 4px;
    border: 1px solid #EEE !important;
    background: #F5F5F5 !important;
    border-radius: 4px;
    border: 1px solid #EEE;
    background: #F5F5F5;
    min-width: unset;

    &.p-highlight {
      color: white !important;
      border: 1px solid var(--svo-dark-color, #006785) !important;
      background: var(--svo-dark-color, #006785) !important;
    }

    svg {
      width: 9px;
      height: 14px;

      path {
        fill: #404B52;
      }
    }
  }

  .p-dropdown {
    height: 27px;
    align-items: center;
    background: transparent;
  }

  .p-paginator-current {
    text-align: left;
    margin-right: auto;
    display: flex;
    justify-content: flex-start;
    cursor: default;

    background: white;
    height: 21px !important;
    font-size: 14px !important;
    color: #B5B7C0 !important;
  }

  .p-paginator-prev {
    margin-left: auto;
  }

  @media screen and (max-width: 767px) {
    height: 100px !important;
    gap: 2px !important;


    .p-paginator-pages {
      gap: 2px !important;
    }
  }
}</style>