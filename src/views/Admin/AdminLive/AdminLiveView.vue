<script setup lang="ts">
import { ref, nextTick } from 'vue';

interface VideoUrl {
  url: string;
  details: {
    title: string;
    instructor: string;
  };
}

interface CurrentCard {
  index: number | null;
  details: {
    title: string;
    instructor: string;
  };
}

const videoUrls = ref<VideoUrl[]>([]);
const showModal = ref(false);
const profileImage = ref("/assets/img/admin-profile-image.png");
const currentCard = ref<{ index: number | null; details: { title: string; instructor: string }; }>({
  index: null,
  details: {
    title: "",
    instructor: "Instructor 1",
  },
});
const uploadedVideoFile = ref<File | null>(null);
const selectedVideo = ref<string | null>(null);
const imageInput = ref<File | null>(null);

const openModal = (index: number | null): void => {
  showModal.value = true;
  uploadedVideoFile.value = null;

  if (index !== null) {
    currentCard.value = {
      ...currentCard.value,
      details: {
        ...currentCard.value.details,
        title: videoUrls.value[index].details.title,
        instructor: videoUrls.value[index].details.instructor
      },
      index: index
    };
    selectedVideo.value = videoUrls.value[index].url;
  } else {
    currentCard.value.index = null;
    currentCard.value.details.title = "";
    currentCard.value.details.instructor = "Instructor 1";
  }

  nextTick(() => {
    if (index !== null) {
      const cardTitleInput = document.querySelector(`.card-item:nth-child(${index + 1}) .title-input`);
      if (cardTitleInput instanceof HTMLElement) {
        cardTitleInput.focus();
      }
    }
  });
};

const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    uploadedVideoFile.value = file;
    selectedVideo.value = URL.createObjectURL(file);
  }
};

const changeProfileImage = (): void => {
  const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
  if (fileInput) {
    fileInput.click();
  }
};

const handleImageChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    imageInput.value = file;
  }
};

const closeModal = (event: Event): void => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('modal')) {
    showModal.value = false;
    selectedVideo.value = null;
    currentCard.value.details.title = "";
    currentCard.value.details.instructor = "Instructor 1";
  }
};

const saveVideo = (): void => {
  if (currentCard.value.details.title && uploadedVideoFile.value) {
    showModal.value = false;
    const newVideoUrl: VideoUrl = {
      url: URL.createObjectURL(uploadedVideoFile.value),
      details: currentCard.value.details,
    };

    videoUrls.value = [...videoUrls.value, newVideoUrl]
    currentCard.value = {
      ...currentCard.value,
      details: {
        title: '',
        instructor: ''
      }
    }
    selectedVideo.value = null;
    instructorNew.value = '';
  }
};

const deleteCard = (index: number) => {
  //
}

const instructors = ref([
  { name: 'Instructor 1', code: '001' },
  { name: 'Instructor 2', code: '002' },
  { name: 'Instructor 3', code: '003' },
  { name: 'Instructor 4', code: '001' },
])

const instructorNew = ref();
</script>

<template>
  <section
    class="grid pl-4 pr-4 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 py-2 w-full py-3">
    <h1>Live video for you</h1>
    <div class="border-1 surface-border surface-0 mb-3 w-full" @click="openModal(null)">
      <div v-if="!videoUrls[0]" class="p-5 flex justify-content-center align-items-center h-30rem cursor-pointer">
        <i class="pi pi-fw pi-plus-circle upload-icon"></i>
        <h3 class="upload-text">Add more live event</h3>
      </div>
      <div class="grid overflow-hidden" v-else>
        <video class="col-12" height="500" :src="videoUrls[0].url" controls></video>
      </div>
    </div>
    <div class="grid ">
      <div v-for="(video, index) in videoUrls" :key="index" class="col-12 md:col-4 lg:col-4 xl:col-4">
        <div class="card-video border-1 border-round-xl border-300">
          <div class="flex flex-column gap-2">
            <div class="flex gap-2 justify-content-center align-items-center">
              <p class="text-sm font-bold">Event 1</p>
              <Button icon="pi pi-pencil" size="small" @click="openModal(index)" link></Button>
              <Button icon="pi pi-trash" size="small" @click="deleteCard(index)" link></Button>
            </div>
            <video height="235" :src="video.url" controls="false" class="w-full"></video>
            <div class="px-2">
              <div class="flex align-items-center">
                <!-- live icon -->
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.28544 4.11517C5.61088 4.44061 5.61088 4.96825 5.28544 5.29368C2.68111 7.89802 2.68111 12.1205 5.28544 14.7248C5.61088 15.0502 5.61088 15.5779 5.28544 15.9033C4.96001 16.2288 4.43237 16.2288 4.10693 15.9033C0.851725 12.6481 0.851725 7.37038 4.10693 4.11517C4.43237 3.78973 4.96001 3.78973 5.28544 4.11517ZM15.8951 4.11517C19.1503 7.37038 19.1503 12.6481 15.8951 15.9033C15.5696 16.2288 15.042 16.2288 14.7166 15.9033C14.3911 15.5779 14.3911 15.0502 14.7166 14.7248C17.3209 12.1205 17.3209 7.89802 14.7166 5.29368C14.3911 4.96825 14.3911 4.44061 14.7166 4.11517C15.042 3.78973 15.5696 3.78973 15.8951 4.11517ZM7.75765 6.50965C8.08309 6.83509 8.08309 7.36273 7.75765 7.68816C6.48185 8.96396 6.48185 11.0324 7.75765 12.3082C8.08309 12.6337 8.08309 13.1613 7.75765 13.4868C7.43222 13.8122 6.90458 13.8122 6.57914 13.4868C4.65247 11.5601 4.65247 8.43633 6.57914 6.50965C6.90458 6.18421 7.43222 6.18421 7.75765 6.50965ZM13.5563 6.50965C15.4829 8.43633 15.4829 11.5601 13.5563 13.4868C13.2308 13.8122 12.7032 13.8122 12.3777 13.4868C12.0523 13.1613 12.0523 12.6337 12.3777 12.3082C13.6535 11.0324 13.6535 8.96396 12.3777 7.68816C12.0523 7.36273 12.0523 6.83509 12.3777 6.50965C12.7032 6.18421 13.2308 6.18421 13.5563 6.50965ZM10.0677 8.8175C10.7581 8.8175 11.3177 9.37715 11.3177 10.0675C11.3177 10.7579 10.7581 11.3175 10.0677 11.3175C9.37734 11.3175 8.8177 10.7579 8.8177 10.0675C8.8177 9.37715 9.37734 8.8175 10.0677 8.8175Z"
                    fill="#BE2F00" />
                </svg>
                <div class="view-count ml-2">
                  <i class="pi pi-fw pi-eye"></i>
                  <span class="view-count-text">92</span>
                </div>
                <Button icon="pi pi-thumbs-up" size="small" link></Button>
                <Button icon="pi pi-heart" size="small" link></Button>
                <p class="text-sm font-900">42k</p>
              </div>
              <div class="card-data">
                <img src="/assets/img/instructor.png" alt="Profile" class="card-profile" />
                <div class="flex flex-column gap-0">
                  <p class="p-0 m-0 text-sm card-title">{{ video.details?.title }}</p>
                  <p class="p-0 m-0 text-sm">by <span>{{ video.details?.instructor }}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ADD NEW VIDEO -->
      <div
        class="col-12 md:col-4 lg:col-4 xl:col-4 cursor-pointer"
        v-if="videoUrls.length > 0" @click="openModal(null)">
        <div class="card-video border-1 border-round-xl border-300 flex flex-column md:flex-row justify-content-center align-items-center p-8 h-full">
          <div class="card-content">
            <i class="pi pi-fw pi-plus-circle upload-icon"></i>
            <h3 class="upload-text">Add more live event</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <Dialog v-model:visible="showModal" modal header="Upload new media" class="modal min-w-min" :style="{ width: '50vw' }"
      :breakpoints="{ '764px': '70vw' }">
      <div class="upload-section">
        <label class="upload-label" v-if="!selectedVideo">
          <input ref="fileInput" type="file" accept="video/*" style="display: none" @change="handleFileChange" />
          <span class="modal-upload-text">Drop Files Here</span>
          <p>Or</p>
          <p class="modal-select-file">Select File</p>
        </label>
        <video v-else :src="selectedVideo"></video>
        <p class="max-file-size">Maximum file size: 8 MB</p>
      </div>
      <h3 class="live-video-details">Live Video Details</h3>
      <div class="profile-section">
        <input type="file" ref="fileInput" accept="image/*" style="display: none" @change="handleImageChange" />
        <img :src="profileImage" alt="Profile" class="modal-profile" @click="changeProfileImage" />
      </div>
      <div class="flex gap-2">
        <InputText v-model="currentCard.details.title" small placeholder="Title" class="p-inputtext-sm" />
        <div class="flex gap-2">
          <p class="text-700 text-normal">by</p>
          <Dropdown v-model="instructorNew" :options="instructors" optionLabel="name" placeholder="Instructor name"
            class="w-full md:w-14rem filter-toggle"></Dropdown>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-content-center align-items-center py-2">
          <Button size="small" class="w-full save-button" @click="saveVideo">Save</Button>
        </div>
      </template>
    </Dialog>
  </section>
</template>

<style scoped lang="scss">
.card-row {
  display: flex;
  justify-content: flex-start;
  max-width: 1200px;
  flex-wrap: wrap;
}

.card-header {
  width: 1180px;
  height: 500px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.card-item {
  width: 380px;
  height: 350px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 30px 20px 15px 0;
  position: relative;
}

.card-content {
  text-align: center;
}

.video-container {
  position: relative;
  overflow: hidden;
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
}

.card-profile {
  margin-right: 10px;
  width: 40px;
  height: 40px;
}

.upload-icon {
  font-size: 50px;
  flex-direction: row;
}

.upload-text {
  margin-top: 2.5px;
}

.live-icon,
.like-icon,
.love-icon {
  font-size: 15px;
  margin-right: 5px;
}

.view-count {
  border: 1px solid #000;
  padding: 0 2px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.view-count-text {
  font-size: 16px;
  margin: 0 3px;
}

.card-icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.card-util {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.card-util i {
  margin: 0 10px;
}

.card-data {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card-info {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

.card-info p {
  margin: 0;
}

/* Modal Styles */

.modal video {
  max-width: 100%;
  max-height: 100%;
}

.modal-upload-text {
  font-size: 20px;
}

.modal-select-file {
  border: 1px solid #ccc;
  padding: 0 5px;
  border-radius: 5px;
}

.modal-profile {
  width: 50px;
  height: 50px;
}

.modal-video {
  width: 100%;
  height: 400px;
  object-fit: fill;
}

.upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  height: 200px;
  border: 1px dotted #D9D9D9;
  border-radius: 10px;
}

.upload-label input[type="file"] {
  display: none;
}

.max-file-size {
  margin-top: 5px;
  font-size: 14px;
}

.live-video-details {
  margin-top: 30px;
  font-size: 30px;
  font-weight: bold;
}

.profile-section {
  text-align: start;
  margin-bottom: 20px;
}

.profile-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
}

.title-input {
  height: 25px;
  font-size: 14px;
}

.instructor-dropdown {
  margin-left: 10px;
  height: 26px;
}

.instructor-toggle label {
  display: inline-block;
  margin-right: 10px;
}

.save-button {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 8px 20px;
  font-size: 16px;
  background-color: #00C0DD;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.p-inputtext-sm {
  background-color: #D9D9D9;
  width: 139px;
  height: 30px;
}

::v-deep(.filter-toggle) {
  background-color: #D9D9D9;
  border-radius: 6px;
  color: #808081;
  height: 32px;

  .p-dropdown-label {
    padding: 5px 10px 5px 10px;
    font-size: 15px;
    // font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }

  .p-dropdown-trigger svg path {
    fill: #808081;
  }

  i {
    margin: 0 0.5rem;
  }
}
</style>