<script setup lang="ts">
import { ref } from 'vue';
// upload drag drop
const fileUpload = ref();
const fileUploadPreview = ref();
const emit = defineEmits(['files-dropped'])

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
    fileUpload.value = e.dataTransfer.files[0];
    fileUploadPreview.value = URL.createObjectURL(fileUpload.value);
}
const onUpload = (e: any) => {
    setInactive();
    fileUpload.value = e.target.files[0];
    fileUploadPreview.value = URL.createObjectURL(fileUpload.value);
}
// end upload drag
</script>

<template>
    <div class="flex justify-content-center align-items-center border-1 border-solid surface-0 surface-border flex-column p-3 gap-2 w-full shadow-2 p-8 card-upload"
        :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive"
        @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>

        <img v-if="fileUploadPreview" :src="fileUploadPreview" class="w-full h-20rem" />
        <template v-if="!fileUploadPreview">
            <input type="file" ref="fileUpload" class="hidden" accept="video/*" @change="onUpload" />
            <i class="w-2rem pi-cloud-upload pi" />
            <h2 class="inter-normal grey-3 text-center" style="font-size: 12px; font-weight: 400;">Drag and drop the video file/paste the link you
                want to upload</h2>
        </template>
    </div>
</template>

<style lang="scss">
@import "/src/assets/global.scss";
.card-upload {
    border-radius: 10px;
    border: 1px solid #E5E5E5;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>