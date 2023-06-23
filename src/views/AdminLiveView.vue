<template>
    <div class="admin-live-view">
      <h1>Live video for you</h1>
      <div class="card-header" @click="openModal(null)">
        <div v-if="!videoUrls[0]" class="card-content">
          <i class="pi pi-fw pi-plus-circle upload-icon"></i>
          <h3 class="upload-text">Add more live event</h3>
        </div>
        <div class="video-container" v-else>
          <video width="1180" height="500" :src="videoUrls[0].url" controls></video>
        </div>
      </div>
      <div class="card-row">
        <div v-for="(url, index) in videoUrls" :key="index" class="card-item" @click="openModal(null)">
          <div class="card-video">
            <div v-if="!url" class="card-content">
              <i class="pi pi-fw pi-plus-circle upload-icon"></i>
              <h3 class="upload-text">Add more live event</h3>
            </div>
            <div class="video-container" v-else>
              <video width="380" height="235"   :src="url.url" controls></video>
              <div class="card-footer">
                <div class="card-icon">
                  <i class="pi pi-fw pi-circle-on live-icon"></i>
                  <div class="view-count">
                    <i class="pi pi-fw pi-eye"></i>
                    <span class="view-count-text">92</span>
                  </div>
                  <i class="pi pi-fw pi-thumbs-up like-icon"></i>
                  <i class="pi pi-fw pi-heart love-icon"></i>
                  <p>42k</p>
                </div>
                <div class="card-data">
                  <img :src="profileImage" alt="Profile" class="card-profile" />
                  <div class="card-info">
                    <p class="card-title">{{ url.details.title }}</p>
                    <p>by <span>{{ url.details.instructor }}</span></p>
                  </div>
                </div>
                <div class="card-icon">
                  <p>Event 1</p>
                  <i @click="openModal" class="pi pi-fw pi-user-edit"></i>
                  <i @click="deleteCard" class="pi pi-fw pi-user-edit"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>Upload A New Video</h2>
          <div class="upload-section">
            <label class="upload-label" v-if="!selectedVideo">
              <input class="modal-input" ref="fileInput" type="file" accept="video/*" style="display: none" @change="handleFileChange" />
              <span class="modal-upload-text">Drop Files Here</span>
              <p>Or</p>
              <p class="modal-select-file">Select File</p>
            </label>
            <video v-else :src="selectedVideo" class="modal-video"></video>
            <p class="max-file-size">Maximum file size: 8 MB</p>
          </div>
          <h3 class="live-video-details">Live Video Details</h3>
          <div class="profile-section">
            <input 
              type="file"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              @change="handleImageChange" 
            />
            <img
              :src="profileImage"
              alt="Profile"
              class="modal-profile"
              @click="changeProfileImage"
            />
          </div>        
          <div class="details-section">
            <input v-model="currentCard.details.title" type="text" placeholder="Title" class="title-input" />
            <div class="instructor-section">
              <p>by</p>
              <select v-model="currentCard.details.instructor" class="instructor-dropdown">
                <option value="Instructor 1">Instructor 1</option>
                <option value="Instructor 2">Instructor 2</option>
                <option value="Instructor 3">Instructor 3</option>
              </select>
            </div>
          </div>
          <button class="save-button" @click="saveVideo">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoUrls: [],
        showModal: false,
        profileImage: "../../public/assets/img/admin-profile-image.png",
        currentCard: {
          index: null,
          details: {
            title: "",
            instructor: "Instructor 1",
          },
        },
        uploadedVideoFile: null,
        selectedVideo: null,
        imageInput: null,
      };
    },
    methods: {
      openModal(index) {
        this.showModal = true;
        this.uploadedVideoFile = null;
  
        if (index !== null) {
          this.currentCard.index = index;
          this.currentCard.details.title = this.videoUrls[index].details.title;
          this.currentCard.details.instructor = this.videoUrls[index].details.instructor;
          this.selectedVideo = this.videoUrls[index].url;
        } else {
          this.currentCard.index = null;
          this.currentCard.details.title = "";
          this.currentCard.details.instructor = "Instructor 1";
        }
  
        this.$nextTick(() => {
          if (index !== null) {
            const cardTitleInput = document.querySelector(`.card-item:nth-child(${index + 1}) .title-input`);
            if (cardTitleInput) {
              cardTitleInput.focus();
            }
          }
        });
      },
      addVideoUrl() {
        const newVideoUrl = {
          url: URL.createObjectURL(this.uploadedVideoFile),
          details: { ...this.currentCard.details },
        };
        this.videoUrls.unshift(newVideoUrl);
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        this.uploadedVideoFile = file;
        this.selectedVideo = URL.createObjectURL(file);
      },
      changeProfileImage() {
        const fileInput = this.$refs.fileInput;
        if (fileInput) {
          fileInput.click();
        }
      },
      handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profileImage = e.target.result;
          };
          reader.readAsDataURL(file);
          this.imageInput = file;
        }
      },
      closeModal(event) {
        if (event.target.classList.contains('modal')) {
          this.showModal = false;
          this.selectedVideo = null;
          this.currentCard.details.title = "";
          this.currentCard.details.instructor = "Instructor 1";
        }
      },
      addEmptyCard() {
        const newEmptyCardItem = null;
        this.videoUrls.push(newEmptyCardItem);
      },
      saveVideo() {
        if (this.currentCard.details.title && this.uploadedVideoFile) {
          this.showModal = false;
          this.addVideoUrl();
          this.currentCard.details.title = "";
          this.currentCard.details.instructor = "Instructor 1";
          this.selectedVideo = null;
  
          if (this.videoUrls.length === 1) {
            this.addEmptyCard();
          }
        }
      },
    },
  };
  </script>

<style scoped>
.admin-live-view {
  position: absolute;
  top: 10%;
  left: 0%;
  color: #000;
}

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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  width: 700px;
  border-radius: 15px;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-upload-text {
  font-size: 20px;
}

.modal-select-file{
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
  width: 650px;
  height: 200px;
  border: 2px dotted #D9D9D9;
  border-radius: 10px;
}

.upload-label input[type="file"] {
  display: none;
}

.max-file-size {
  margin-top: 5px;
  font-size: 14px;
}

.details-section {
  display: flex;
  flex-direction: row;
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

.instructor-section {
  display: flex;
  margin: 0 10px;
  flex-direction: row;
}

.instructor-dropdown {
  margin-left: 10px;
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
</style>