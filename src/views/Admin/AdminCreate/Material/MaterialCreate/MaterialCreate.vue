<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface MaterialItem {
    type: 'website' | 'video' | 'pdf' | 'none';
    selectedType?: typeof types[number] | null;
    selectedItemURL?: string;
}


interface MaterialData {
    heading: string;
    items: MaterialItem[];
}

const types = [{
    name: 'Website',
    code: "website"
}, {
    name: 'Video',
    code: "video"
}, {
    name: 'PDF',
    code: "pdf"
}];

const materialData = ref<MaterialData[]>([{
    heading: '',
    items: [
        {
            type: 'website',
            selectedItemURL: '',
            selectedType: types.find(type => type.code === ''),
        }
    ]
}]);

const addMaterial = (index: number) => {
    materialData.value[index].items.push({
        type: 'website',
        selectedItemURL: '',
        selectedType: null,
    });
};

const addNewMaterial = () => {
    materialData.value.push({
        heading: '',
        items: [
            {
                type: 'website',
                selectedItemURL: '',
                selectedType: types.find(type => type.code === 'website'),
            }
        ]
    });
};

const removeMaterial = (index: number) => {
    materialData.value.splice(index, 1);
};

const removeItem = (groupIndex: number, itemIndex: number) => {
    const materialGroup = materialData.value[groupIndex];
    if (materialGroup.items.length === 1) {
        return;
    }
    materialGroup.items.splice(itemIndex, 1);
};

const setSelectedItem = (item: MaterialItem) => {
    if (item.selectedType) {
        switch (item.selectedType.code) {
            case 'website':
                item.selectedItemURL = '';
                break;
            case 'pdf':
                item.selectedItemURL = '';
                break;
            case 'video':
                item.selectedItemURL = '';
                break;
            default:
                item.selectedItemURL = '';
        }
    }
};

watchEffect(() => {
    materialData.value.forEach(material => {
        material.items.forEach(item => {
            setSelectedItem(item);
        });
    });
});
</script>

<template>
    <section style="padding: 20px 10px 10px 10px; gap: 10px">
        <p class="inter-normal black-1" style="font-size: 25px; font-weight: 700;">Material Sources</p>
        <div v-for="(material, index) in materialData" :key="index">
            <div class="flex flex-row align-items-center mt-3 gap-2">
                <InputText class="md:h-3rem w-full p-inputtext-sm title" v-model="material.heading"
                    style="font-size: 20px; font-weight: 600;" placeholder="Title..." />
                <i class="pi pi-times text-900 pl-2 text-sm" @click="removeMaterial(index)"></i>
            </div>
            <div class="flex flex-column item-content">
                <ol class="p-0 m-0" style="list-style-type: none;">
                    <li class="inter-normal black-2 text-lg" v-for="(item, itemIndex) in material.items" :key="itemIndex"
                        style="font-size: 20px; font-weight: 400; padding: 10px;">
                        <div class="flex flex-column md:flex-row md:align-items-center mx-2 gap-2 md:gap-0">
                            <div class="flex flex-row" style="gap: 10px">
                                <p class="inter-normal black-2" style="font-size: 20px; font-weight: 400;">{{ itemIndex + 1 + "." }}</p>
                                <Dropdown optionLabel="name" v-model="item.selectedType"
                                v-bind:class="{ selected: item.type !== 'none' }" :options="types" placeholder="Select type"
                                class="mr-3 sm:w-full flex align-items-center" style="height: 35px;">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center gap-2">
                                        <div class="flex gap-2 align-items-center min-dropdown" style="min-width: 113px" 
                                            v-if="slotProps.value.code === 'website'">
                                            <img class="w-1rem" src="/assets/img/world.png" />
                                            <p class="inter-normal black-2"
                                                style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{
                                                    slotProps.value.name }}</p>
                                        </div>
                                        <div v-if="slotProps.value.code === 'video'" class="flex gap-2 align-items-center min-dropdown" style="min-width: 113px" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M17.5938 3.6543H2.55273C1.94531 3.6543 1.61328 3.95703 1.61328 4.59375V15.5605C1.61328 16.1973 1.94531 16.5 2.55273 16.5H17.5938C18.2305 16.5 18.5332 16.168 18.5332 15.5605V4.5957C18.5332 3.98633 18.2305 3.6543 17.5938 3.6543ZM3.80664 15.5625H3.17969C2.67383 15.5625 2.55273 15.2559 2.55273 14.9355V13.6816H3.80664V15.5625ZM3.80664 12.7422H2.55273V10.5488H3.80664V12.7422ZM3.80664 9.60937H2.55273V7.41602H3.80664V9.60937ZM3.80664 6.47461H2.55273V5.2207C2.55273 4.71484 2.85938 4.59375 3.17969 4.59375H3.80664V6.47461ZM15.4004 15.5625H4.74609V4.5957H15.4004V15.5625ZM17.5938 14.9355C17.5938 15.2559 17.4727 15.5625 16.9668 15.5625H16.3398V13.6816H17.5938V14.9355ZM17.5938 12.7422H16.3398V10.5488H17.5938V12.7422ZM17.5938 9.60937H16.3398V7.41602H17.5938V9.60937ZM17.5938 6.47461H16.3398V4.59375H16.9668C17.2871 4.59375 17.5938 4.71484 17.5938 5.2207V6.47461ZM7.74219 13.2656C7.82227 13.3301 7.92188 13.3672 8.03125 13.3691H8.03906C8.12305 13.3691 8.20703 13.3496 8.28516 13.3066L13.1895 10.5254C13.4199 10.3965 13.498 10.1074 13.3652 9.88281V9.88086C13.3262 9.79687 13.2617 9.72266 13.1738 9.67187L8.28711 6.85156C8.20898 6.80664 8.125 6.78711 8.04102 6.78906H8.03711C7.77734 6.78906 7.56641 7 7.56641 7.25977V12.8398C7.55273 12.9395 7.57227 13.043 7.62695 13.1348C7.65625 13.1855 7.69727 13.2305 7.74219 13.2656ZM8.50586 8.06445L12.0254 10.0957L8.50586 12.0937V8.06445Z"
                                                    fill="#5B99EE" />
                                            </svg>
                                            <p class="inter-normal black-2"
                                                style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{
                                                    slotProps.value.name }}</p>
                                        </div>
                                        <div class="flex gap-2 align-items-center min-dropdown" v-if="slotProps.value.code === 'pdf'" style="min-width: 113px">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M14.8343 13.0481C14.5906 13.1201 14.2328 13.1281 13.8492 13.0725C13.4375 13.0128 13.0175 12.8869 12.6048 12.7015C13.3408 12.5944 13.9118 12.6274 14.4002 12.8005C14.5159 12.8415 14.706 12.9511 14.8343 13.0481ZM10.7276 12.3729C10.6976 12.3811 10.6681 12.3888 10.6388 12.3969C10.4407 12.4508 10.248 12.5035 10.0623 12.5503L9.81195 12.6138C9.30825 12.7412 8.79325 12.8714 8.2846 13.0265C8.4779 12.5603 8.6575 12.089 8.83335 11.6282C8.96355 11.2871 9.0965 10.9387 9.234 10.5947C9.30375 10.7099 9.37655 10.8251 9.4523 10.9407C9.7974 11.4663 10.2312 11.9522 10.7276 12.3729ZM9.44635 7.1163C9.479 7.6915 9.3549 8.24485 9.17285 8.7757C8.9486 8.1193 8.8441 7.39445 9.12445 6.80925C9.19635 6.65925 9.25525 6.57905 9.29345 6.5372C9.35245 6.6283 9.43005 6.8321 9.44635 7.1163ZM6.81673 14.4027C6.69074 14.6281 6.56213 14.8391 6.43031 15.0384C6.11221 15.5177 5.59196 16.031 5.3247 16.031C5.2984 16.031 5.26658 16.0268 5.22007 15.9777C5.19014 15.9463 5.18534 15.9238 5.18679 15.8931C5.1958 15.7168 5.42933 15.403 5.76763 15.1119C6.07469 14.8479 6.42176 14.6131 6.81673 14.4027ZM15.6853 13.073C15.6444 12.4859 14.6561 12.1093 14.6464 12.1058C14.2643 11.9703 13.8493 11.9045 13.3776 11.9045C12.8726 11.9045 12.3282 11.9776 11.6291 12.141C11.007 11.7 10.4696 11.1479 10.0681 10.5366C9.8908 10.2666 9.7314 9.99705 9.59245 9.73375C9.93165 8.9227 10.2371 8.05065 10.1816 7.07395C10.1368 6.2908 9.7837 5.76475 9.30345 5.76475C8.974 5.76475 8.69035 6.00875 8.4597 6.49065C8.04825 7.34935 8.1564 8.4481 8.781 9.7592C8.55605 10.2875 8.34705 10.8353 8.14475 11.3656C7.89305 12.0249 7.6337 12.7052 7.3414 13.3523C6.52167 13.6766 5.84824 14.07 5.28701 14.5528C4.91935 14.8686 4.47611 15.3514 4.45081 15.8553C4.43846 16.0927 4.51984 16.3104 4.68522 16.4848C4.86091 16.6699 5.08165 16.7674 5.32435 16.7677C6.12594 16.7677 6.89744 15.6663 7.0438 15.4454C7.33835 15.0014 7.61405 14.5062 7.8842 13.9349C8.5646 13.689 9.2897 13.5055 9.9925 13.3281L10.2442 13.2641C10.4334 13.216 10.63 13.1628 10.8317 13.1076C11.0452 13.0499 11.2648 12.9901 11.488 12.9333C12.2096 13.3922 12.9857 13.6916 13.7425 13.8014C14.38 13.8941 14.9462 13.8403 15.3294 13.6405C15.6743 13.4609 15.6933 13.1838 15.6853 13.073ZM17.2377 18.1214C17.2377 19.1966 16.2901 19.2629 16.0989 19.2651H3.87243C2.80112 19.2651 2.73661 18.3109 2.73456 18.1214L2.73442 1.87821C2.73442 0.80195 3.68381 0.7367 3.87228 0.73454H12.1315L12.1359 0.7389V3.96198C12.1359 4.60882 12.5269 5.83345 14.0079 5.83345H17.2101L17.2376 5.8609L17.2377 18.1214ZM16.4786 5.0988H14.0084C12.9374 5.0988 12.8726 4.14985 12.8712 3.96209V1.47653L16.4786 5.0988ZM17.9723 18.1214V5.55785L12.8712 0.435511V0.411678H12.8468L12.4371 0H3.87245C3.22477 0 2 0.392668 2 1.87856V18.1217C2 18.7714 2.39148 20 3.87245 20H16.1C16.7476 19.9998 17.9723 19.6072 17.9723 18.1214Z"
                                                    fill="#EB5757" />
                                            </svg>
                                            <p class="inter-normal black-2"
                                                style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{
                                                    slotProps.value.name }}</p>
                                        </div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex gap-2 align-items-center" v-if="slotProps.option.code === 'website'">
                                        <img class="w-1rem" src="/assets/img/world.png" />
                                        <p class="inter-normal black-2"
                                            style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{
                                                slotProps.option.name }}</p>
                                    </div>
                                    <div v-if="slotProps.option.code === 'video'" class="flex gap-2 align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                            fill="none">
                                            <path
                                                d="M17.5938 3.6543H2.55273C1.94531 3.6543 1.61328 3.95703 1.61328 4.59375V15.5605C1.61328 16.1973 1.94531 16.5 2.55273 16.5H17.5938C18.2305 16.5 18.5332 16.168 18.5332 15.5605V4.5957C18.5332 3.98633 18.2305 3.6543 17.5938 3.6543ZM3.80664 15.5625H3.17969C2.67383 15.5625 2.55273 15.2559 2.55273 14.9355V13.6816H3.80664V15.5625ZM3.80664 12.7422H2.55273V10.5488H3.80664V12.7422ZM3.80664 9.60937H2.55273V7.41602H3.80664V9.60937ZM3.80664 6.47461H2.55273V5.2207C2.55273 4.71484 2.85938 4.59375 3.17969 4.59375H3.80664V6.47461ZM15.4004 15.5625H4.74609V4.5957H15.4004V15.5625ZM17.5938 14.9355C17.5938 15.2559 17.4727 15.5625 16.9668 15.5625H16.3398V13.6816H17.5938V14.9355ZM17.5938 12.7422H16.3398V10.5488H17.5938V12.7422ZM17.5938 9.60937H16.3398V7.41602H17.5938V9.60937ZM17.5938 6.47461H16.3398V4.59375H16.9668C17.2871 4.59375 17.5938 4.71484 17.5938 5.2207V6.47461ZM7.74219 13.2656C7.82227 13.3301 7.92188 13.3672 8.03125 13.3691H8.03906C8.12305 13.3691 8.20703 13.3496 8.28516 13.3066L13.1895 10.5254C13.4199 10.3965 13.498 10.1074 13.3652 9.88281V9.88086C13.3262 9.79687 13.2617 9.72266 13.1738 9.67187L8.28711 6.85156C8.20898 6.80664 8.125 6.78711 8.04102 6.78906H8.03711C7.77734 6.78906 7.56641 7 7.56641 7.25977V12.8398C7.55273 12.9395 7.57227 13.043 7.62695 13.1348C7.65625 13.1855 7.69727 13.2305 7.74219 13.2656ZM8.50586 8.06445L12.0254 10.0957L8.50586 12.0937V8.06445Z"
                                                fill="#5B99EE" />
                                        </svg>
                                        <p class="inter-normal black-2"
                                            style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{
                                                slotProps.option.name }}</p>
                                    </div>
                                    <div class="flex gap-2 align-items-center" v-if="slotProps.option.code === 'pdf'">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                            fill="none">
                                            <path
                                                d="M14.8343 13.0481C14.5906 13.1201 14.2328 13.1281 13.8492 13.0725C13.4375 13.0128 13.0175 12.8869 12.6048 12.7015C13.3408 12.5944 13.9118 12.6274 14.4002 12.8005C14.5159 12.8415 14.706 12.9511 14.8343 13.0481ZM10.7276 12.3729C10.6976 12.3811 10.6681 12.3888 10.6388 12.3969C10.4407 12.4508 10.248 12.5035 10.0623 12.5503L9.81195 12.6138C9.30825 12.7412 8.79325 12.8714 8.2846 13.0265C8.4779 12.5603 8.6575 12.089 8.83335 11.6282C8.96355 11.2871 9.0965 10.9387 9.234 10.5947C9.30375 10.7099 9.37655 10.8251 9.4523 10.9407C9.7974 11.4663 10.2312 11.9522 10.7276 12.3729ZM9.44635 7.1163C9.479 7.6915 9.3549 8.24485 9.17285 8.7757C8.9486 8.1193 8.8441 7.39445 9.12445 6.80925C9.19635 6.65925 9.25525 6.57905 9.29345 6.5372C9.35245 6.6283 9.43005 6.8321 9.44635 7.1163ZM6.81673 14.4027C6.69074 14.6281 6.56213 14.8391 6.43031 15.0384C6.11221 15.5177 5.59196 16.031 5.3247 16.031C5.2984 16.031 5.26658 16.0268 5.22007 15.9777C5.19014 15.9463 5.18534 15.9238 5.18679 15.8931C5.1958 15.7168 5.42933 15.403 5.76763 15.1119C6.07469 14.8479 6.42176 14.6131 6.81673 14.4027ZM15.6853 13.073C15.6444 12.4859 14.6561 12.1093 14.6464 12.1058C14.2643 11.9703 13.8493 11.9045 13.3776 11.9045C12.8726 11.9045 12.3282 11.9776 11.6291 12.141C11.007 11.7 10.4696 11.1479 10.0681 10.5366C9.8908 10.2666 9.7314 9.99705 9.59245 9.73375C9.93165 8.9227 10.2371 8.05065 10.1816 7.07395C10.1368 6.2908 9.7837 5.76475 9.30345 5.76475C8.974 5.76475 8.69035 6.00875 8.4597 6.49065C8.04825 7.34935 8.1564 8.4481 8.781 9.7592C8.55605 10.2875 8.34705 10.8353 8.14475 11.3656C7.89305 12.0249 7.6337 12.7052 7.3414 13.3523C6.52167 13.6766 5.84824 14.07 5.28701 14.5528C4.91935 14.8686 4.47611 15.3514 4.45081 15.8553C4.43846 16.0927 4.51984 16.3104 4.68522 16.4848C4.86091 16.6699 5.08165 16.7674 5.32435 16.7677C6.12594 16.7677 6.89744 15.6663 7.0438 15.4454C7.33835 15.0014 7.61405 14.5062 7.8842 13.9349C8.5646 13.689 9.2897 13.5055 9.9925 13.3281L10.2442 13.2641C10.4334 13.216 10.63 13.1628 10.8317 13.1076C11.0452 13.0499 11.2648 12.9901 11.488 12.9333C12.2096 13.3922 12.9857 13.6916 13.7425 13.8014C14.38 13.8941 14.9462 13.8403 15.3294 13.6405C15.6743 13.4609 15.6933 13.1838 15.6853 13.073ZM17.2377 18.1214C17.2377 19.1966 16.2901 19.2629 16.0989 19.2651H3.87243C2.80112 19.2651 2.73661 18.3109 2.73456 18.1214L2.73442 1.87821C2.73442 0.80195 3.68381 0.7367 3.87228 0.73454H12.1315L12.1359 0.7389V3.96198C12.1359 4.60882 12.5269 5.83345 14.0079 5.83345H17.2101L17.2376 5.8609L17.2377 18.1214ZM16.4786 5.0988H14.0084C12.9374 5.0988 12.8726 4.14985 12.8712 3.96209V1.47653L16.4786 5.0988ZM17.9723 18.1214V5.55785L12.8712 0.435511V0.411678H12.8468L12.4371 0H3.87245C3.22477 0 2 0.392668 2 1.87856V18.1217C2 18.7714 2.39148 20 3.87245 20H16.1C16.7476 19.9998 17.9723 19.6072 17.9723 18.1214Z"
                                                fill="#EB5757" />
                                        </svg>
                                        <p class="inter-normal black-2"
                                            style="font-size: 20px; font-weight: 500; letter-spacing: 0.6px;">{{
                                                slotProps.option.name }}</p>
                                    </div>
                                </template>
                            </Dropdown>
                            </div>
                            
                            <div class="flex flex-row sm:w-full">
                                <div class="flex justify-content-between py-0 m-0 gap-2 w-max sm:w-full align-items-center">
                                    <InputText contenteditable class="input-text p-inputtext-sm w-full"
                                        v-model="item.selectedItemURL" v-if="item.type === 'website'"
                                        placeholder="Title..." />
                                    <InputText contenteditable class="input-text" v-model="item.selectedItemURL"
                                        v-if="item.type === 'video'" />
                                    <InputText contenteditable class="input-text" v-model="item.selectedItemURL"
                                        v-if="item.type === 'pdf'" />
                                </div>
                                <div class="flex gap-1">
                                    <svg @click="addMaterial(index)" v-if="itemIndex === material.items.length - 1"
                                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                        fill="none" class="ml-2">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M15 27.5C8.0965 27.5 2.5 21.9035 2.5 15C2.5 8.09644 8.0965 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9035 21.9036 27.5 15 27.5ZM14.0625 11.25C14.0625 10.7322 14.4823 10.3125 15 10.3125C15.5178 10.3125 15.9375 10.7322 15.9375 11.25V14.0625H18.75C19.2678 14.0625 19.6875 14.4822 19.6875 15C19.6875 15.5177 19.2678 15.9375 18.75 15.9375H15.9375V18.75C15.9375 19.2677 15.5178 19.6875 15 19.6875C14.4823 19.6875 14.0625 19.2677 14.0625 18.75V15.9375H11.25C10.7323 15.9375 10.3125 15.5177 10.3125 15C10.3125 14.4822 10.7323 14.0625 11.25 14.0625H14.0625V11.25Z"
                                            fill="#006785" />
                                    </svg>
                                    <svg @click="removeItem(index, itemIndex)" xmlns="http://www.w3.org/2000/svg" width="30"
                                        height="30" viewBox="0 0 30 30" fill="none" class="ml-2">
                                        <path
                                            d="M21.25 5V6.25H18.75V5H11.25V6.25H8.75V5C8.75 4.33696 9.01339 3.70107 9.48223 3.23223C9.95107 2.76339 10.587 2.5 11.25 2.5H18.75C19.413 2.5 20.0489 2.76339 20.5178 3.23223C20.9866 3.70107 21.25 4.33696 21.25 5Z"
                                            fill="#006785" />
                                        <path
                                            d="M25 7.5H5C4.66848 7.5 4.35054 7.6317 4.11612 7.86612C3.8817 8.10054 3.75 8.41848 3.75 8.75C3.75 9.08152 3.8817 9.39946 4.11612 9.63388C4.35054 9.8683 4.66848 10 5 10H6.25V25C6.25 25.663 6.51339 26.2989 6.98223 26.7678C7.45107 27.2366 8.08696 27.5 8.75 27.5H21.25C21.913 27.5 22.5489 27.2366 23.0178 26.7678C23.4866 26.2989 23.75 25.663 23.75 25V10H25C25.3315 10 25.6495 9.8683 25.8839 9.63388C26.1183 9.39946 26.25 9.08152 26.25 8.75C26.25 8.41848 26.1183 8.10054 25.8839 7.86612C25.6495 7.6317 25.3315 7.5 25 7.5ZM13.75 21.25C13.75 21.5815 13.6183 21.8995 13.3839 22.1339C13.1495 22.3683 12.8315 22.5 12.5 22.5C12.1685 22.5 11.8505 22.3683 11.6161 22.1339C11.3817 21.8995 11.25 21.5815 11.25 21.25V13.75C11.25 13.4185 11.3817 13.1005 11.6161 12.8661C11.8505 12.6317 12.1685 12.5 12.5 12.5C12.8315 12.5 13.1495 12.6317 13.3839 12.8661C13.6183 13.1005 13.75 13.4185 13.75 13.75V21.25ZM18.75 21.25C18.75 21.5815 18.6183 21.8995 18.3839 22.1339C18.1495 22.3683 17.8315 22.5 17.5 22.5C17.1685 22.5 16.8505 22.3683 16.6161 22.1339C16.3817 21.8995 16.25 21.5815 16.25 21.25V13.75C16.25 13.4185 16.3817 13.1005 16.6161 12.8661C16.8505 12.6317 17.1685 12.5 17.5 12.5C17.8315 12.5 18.1495 12.6317 18.3839 12.8661C18.6183 13.1005 18.75 13.4185 18.75 13.75V21.25Z"
                                            fill="#006785" />
                                    </svg>
                                </div>
                            </div>

                            
                        </div>
                    </li>
                </ol>
            </div>
        </div>
        <Button size="small" label="Add new material sources"
            class="w-full text text-white btn-add-material border-noround" @click="addNewMaterial">
            <template #default>
                <div class="flex flex-row m-auto" style="gap: 8px">
                    <i class="pi pi-plus align-self-center justify-content-center font-bold text-sm"></i>
                    <p class="font-medium text text-white text-sm">Add new section</p>
                </div>
            </template>
        </Button>
    </section>

    <Button size="small" label="Save" class="w-full border-none border-noround" style="background: #00C0DD; margin: 10px 0px" />
</template>

<style scoped lang="scss">
@import "/src/assets/global.scss";

.btn-add {
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

.btn-add-material {
    background: var(--suggested-orange, #E96853);
    border: none;
}

.item-content {
    margin: 10px 0;
    border-radius: 10px;
    border: 1px solid #D9D5EC;
    background: #FFF;
}

.title {
    color: var(--Black, #000);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;

    &::placeholder {
        color: var(--Suggested-dark-grey, #808081);
    }
}

.input-text {
    height: 35px;
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #D9D5EC;
}

::v-deep(.p-dropdown) {
    .p-dropdown-label {
        color: #000;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.6px;
        margin-right: -15px;
    }
}

.min-dropdown {
    @media screen and (max-width: 764px) {
        width: 50px;
    }
}
</style>