<template>
    <div class="px-3 sm:px-5 col-12">
        <h1 class="hidden md:block font-medium font-bold text-4xl mb-3">Settings</h1>
        <div class="grid my-2 md:my-0 gap-2 md:gap-0">

            <Card class="col-12 md:col-4 h-min">
                <template #content>
                    <div class="flex flex-column align-items-center gap-4">
                        <div class="flex flex-column align-items-center">
                            <p class="font-bold text-xl">Tracey Tam</p>
                            <p class="text-sm font-normal">TraceyTam@gmail.com</p>
                        </div>
                        <div class="relative">
                            <img :src="uploadedImage" alt="" style="max-width: 100px; max-height: 100px object-fit: cover;" class="border-circle">
                            <i class="pi pi-trash trash-icon" @click="deleteImage"></i>
                        </div>
                        <label for="file-input" class="upload-photo-button">
                            Upload New Photo
                            <input id="file-input" type="file" accept="image/*" @change="handleImageUpload" class="hidden">
                        </label>
                    </div>
                </template>
            </Card>

            <TabView class="col-12 md:col-8">
                <TabPanel header="User Info">
                    <div class="flex flex-column gap-3">
                        <p class="font-bold text-xl">Profile Information</p>
                        <div class="grid">
                            <div class="col-6">
                                <p class="">First Name</p>
                                <InputText type="text" class="w-full" value="Tracey"/>
                            </div>
                            <div class="col-6">
                                <p class="">Last Name</p>
                                <InputText type="text" class="w-full" value="Tam"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="">Email</p>
                                <InputText type="email" class="w-full" value="TraceyTam@gmail.com"/>
                            </div>
                            <div class="col-6">
                                <p class="">Phone Number</p>
                                <InputText type="text" class="w-full" value="+01 7093 000"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="">Password</p>
                                <InputText type="password" class="w-full" value="********************"/>
                            </div>
                            <div class="col-6">
                                <p class="">Confirm Password</p>
                                <InputText type="password" class="w-full" value="********************"/>
                            </div>
                        </div>
                        <p class="font-bold text-xl">Social profile</p>
                        <div class="flex flex-row gap-2">
                            <Button class="btn-add" icon="pi pi-plus" label="ADD" outlined/>
                            <Dropdown v-model="selectedSocial" :options="social" optionLabel="name" placeholder="Facebook username" class="w-full w-min" >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center gap-2">
                                      <i class="pi pi-facebook icon-blue"></i>
                                      <div class="dropdown-text">{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                      <div class="flex align-items-center gap-2">
                                        <i class="pi pi-facebook icon-blue"></i>
                                        <div class="dropdown-text">{{ slotProps.placeholder }}</div>
                                      
                                      </div>
                                      
                                    </span>
                                  </template>
                                  <template #option="slotProps">
                                    <div class="flex align-items-center gap-2">
                                      <i class="pi pi-facebook"></i>
                                      <div class="dropdown-text">{{ slotProps.option.name }}</div>
                                    </div>
                                  </template>
                            </Dropdown>
                        </div>
                        <Button size="small" label="Save" class="col-12 btn-save"></Button>
                    </div>
                </TabPanel>
                <TabPanel header="Billing Information ">
                    <div class="flex flex-column gap-3">
                        <p class="font-bold text-xl">Card detail</p>
                        <div class="grid">
                            <div class="col-12">
                                <p class="">Name on card</p>
                                <InputText type="text" class="w-full" value="Tracey Tam"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-4">
                                <p class="">Card number</p>
                                <InputText type="text" class="w-full" value="(1234)-(5678)-(1234)-(5678)"/>
                            </div>
                            <div class="col-4">
                                <p class="">Expiry date (MM/YY)</p>
                                <InputText type="text" class="w-full" value="11/30"/>
                            </div>
                            <div class="col-4">
                                <p class="">CVV</p>
                                <InputText type="text" class="w-full" value="111"/>
                            </div>
                        </div>
                        <p class="font-bold text-xl">Address</p>
                        <div class="grid">
                            <div class="col-6">
                                <p class="">Street Address</p>
                                <InputText type="text" class="w-full" value="123 Bukit Tinggi"/>
                            </div>
                            <div class="col-6">
                                <p class="">Apt, suite, etc (optional)</p>
                                <InputText type="text" class="w-full" value="Block C - 10 - 10"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="">City</p>
                                <InputText type="text" class="w-full" value="Klang"/>
                            </div>
                            <div class="col-6">
                                <p class="">Country</p>
                                <InputText type="text" class="w-full" value="Selangor"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="">ZIP / Postcode</p>
                                <InputText type="text" class="w-full" value="41000"/>
                            </div>
                        </div>
                        <Button size="small" label="Save" class="col-12 btn-save"></Button>
                    </div>
                </TabPanel>
            </TabView>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedSocial = ref();
const social = ref([
    { name: 'Facebook username'},
]);

const uploadedImage = ref('/assets/img/admin-profile-image.png');

const handleImageUpload = (payload: Event) => {
    const target = payload.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            uploadedImage.value = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
};

const deleteImage = () => {
    uploadedImage.value = '/assets/img/admin-profile-image.png';
};
</script>

<style lang="scss" scoped>
.btn-save {
    background-color: #00C0DD;
    border: none;
  }

::v-deep(.btn-upload) {
    border-radius: 0px;
    border: none;

    .p-button-label	{
        color: var(--bg-1, #FFF);
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%;
    }
}

.trash-icon {
    position: absolute;
    bottom: 8px;
    right: 5px;
    background-color: #ECEEF5;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
}

::v-deep(.p-dropdown-label) {
    color: #C0C3C9;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.42px;
}

::v-deep(.p-tabview) {
    
    .p-tabview-nav{
        color: var(--font-1, #001125);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%; /* 25.6px */
        background: #F4F2FF;
        
    }
    .p-tabview-nav a{
        background: #F4F2FF;
    }

    .p-tabview-nav a>span{
        color: black;
    }

    .p-tabview-nav li.p-highlight .p-tabview-nav-link{
        background: #F4F2FF;
    }
}

.icon-blue {
   color: #337FFF;
}

.dropdown-text {
    color: #C0C3C9;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.42px;
}

::v-deep(.btn-add) {
    border: 1px solid #006785;
    color: #006785;
}

.upload-photo-button {
    display: inline-block;
    padding: 10px 15px;
    background-color: #00C0DD;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: var(--bg-1, #FFF);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
  }
  
  .upload-photo-button:hover {
    background-color: #006785;
  }
</style>