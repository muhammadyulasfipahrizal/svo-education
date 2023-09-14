<template>
    <div class="px-3 sm:px-5 col-12">
        <h1 class="hidden md:block mb-3 inter-normal black-1" style="font-size: 35px; font-weight: 700;">Settings</h1>
        <div class="grid my-2 md:my-0 gap-2 md:gap-0">

            <Card class="col-12 md:col-4 h-min">
                <template #content>
                    <div class="flex flex-column align-items-center gap-4">
                        <div class="flex flex-column align-items-center">
                            <p class="inter-normal black-1" style="font-size: 20px; font-weight: 700;">Tracey Tam</p>
                            <p class="inter-normal black-1" style="font-size: 14px; font-weight: 400;">TraceyTam@gmail.com</p>
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
                        <p class="inter-normal black-1" style="font-size: 20px; font-weight: 700;">Profile Information</p>
                        <div class="grid">
                            <div class="col-6">
                                <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">First Name</p>
                                <InputText type="text" class="w-full" placeholder="Tracey"/>
                            </div>
                            <div class="col-6">
                                <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Last Name</p>
                                <InputText type="text" class="w-full" placeholder="Tam"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Email</p>
                                <InputText type="email" class="w-full" placeholder="TraceyTam@gmail.com"/>
                            </div>
                            <div class="col-6">
                                <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Phone Number</p>
                                <InputText type="text" class="w-full" placeholder="+01 7093 000"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Password</p>
                                <InputText type="password" class="w-full" placeholder="********************"/>
                            </div>
                            <div class="col-6">
                                <p class="inter-normal black-1" style="font-size: 12px; font-weight: 400;">Confirm Password</p>
                                <InputText type="password" class="w-full" placeholder="********************"/>
                            </div>
                        </div>
                        <p class="inter-normal black-2" style="font-size: 20px; font-weight: 700;">Social profile</p>
                        <div class="grid gap-2">
                            <Button class="btn-add min-w-min col-3 md:col-1" icon="pi pi-plus" size="small" label="ADD" outlined style="height: 60px"/>
                            <Dropdown v-model="selectedSocial" :options="social" optionLabel="name" placeholder="Facebook username" class="col-7 md:col-6" style="height: 60px">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center gap-2 mb-2">
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
                        <p class="inter-normal black-2" style="font-size: 20px; font-weight: 700;">Card detail</p>
                        <div class="grid">
                            <div class="col-12">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">Name on card</p>
                                <InputText type="text" class="w-full" placeholder="Tracey Tam"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-4">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">Card number</p>
                                <InputText type="text" class="w-full" placeholder="(1234)-(5678)-(1234)-(5678)"/>
                            </div>
                            <div class="col-4">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">Expiry date (MM/YY)</p>
                                <InputText type="text" class="w-full" placeholder="11/30"/>
                            </div>
                            <div class="col-4">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">CVV</p>
                                <InputText type="text" class="w-full" placeholder="111"/>
                            </div>
                        </div>
                        <p class="font-bold text-xl">Address</p>
                        <div class="grid">
                            <div class="col-6">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">Street Address</p>
                                <InputText type="text" class="w-full" placeholder="123 Bukit Tinggi"/>
                            </div>
                            <div class="col-6">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">Apt, suite, etc (optional)</p>
                                <InputText type="text" class="w-full" placeholder="Block C - 10 - 10"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">City</p>
                                <InputText type="text" class="w-full" placeholder="Klang"/>
                            </div>
                            <div class="col-6">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">Country</p>
                                <InputText type="text" class="w-full" placeholder="Selangor"/>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-6">
                                <p class="inter-normal black-2" style="font-size: 12px; font-weight: 400;">ZIP / Postcode</p>
                                <InputText type="text" class="w-full" placeholder="41000"/>
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
@import "/src/assets/global.scss";
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
    .p-tabview-title{
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
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