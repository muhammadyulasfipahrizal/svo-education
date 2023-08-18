<script setup lang="ts">
import { ref } from 'vue';

interface MaterialData {
    heading: string;
    items: { website?: string; pdf?: string; type: 'website' | 'video' | 'pdf' | 'none'; video?: string; }[];
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

const materialData = ref<MaterialData[]>([
    {
        heading: 'Day 1 - Develop a Strong Foundation',
        items: [
            { website: 'www.website1.com', type: 'website', video: '', pdf: '' },
            { website: 'www.website2.com', type: 'website', video: '', pdf: '' }
        ]
    },
    {
        heading: 'Day 2 - Hone Your Skills',
        items: [
            { website: 'www.website3.com', type: 'website', video: '', pdf: '' }
        ]
    },
]);

const addNewMaterial = () => {
    materialData.value.push({
        heading: 'Day 1 - Your Title',
        items: [{ website: 'www.yourwebsite.com', type: 'website', video: '', pdf: '' }]
    });
};

const addMaterial = (index: number) => {
    materialData.value[index].items.push({
        website: 'www.yourwebsite.com',
        type: 'website', video: '', pdf: ''
    });
};

</script>

<template>
    <section class="my-3">
        <p class="title">Material Sources</p>
        <div v-for="(material, index) in materialData" :key="index">
            <div class="flex flex-row align-items-center mt-3 gap-2">
                <InputText class="text font-bold text-xl sm:text-2xl md:text-3xl h-3rem w-full"
                    v-model="material.heading" />
                <Button size="small" class="btn-add ml-auto h-3rem">
                    <i class="pi pi-plus"></i>
                    <p class="text-900 font-bold ml-2 text-white" @click="addMaterial(index)">ADD</p>
                </Button>
            </div>
            <div class="flex flex-column">
                <ol>
                    <li class="text text-lg my-3" v-for="(item, itemIndex) in material.items" :key="itemIndex">
                        <div class="flex flex-row align-items-center mx-2">
                            <Dropdown optionLabel="name" v-model="item.website"
                                v-bind:class="{ selected: item.type !== 'none' }" :options="types" placeholder="Select"
                                class="mr-3 h-2rem flex align-items-center">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center gap-2">
                                        <div class="flex gap-2 align-items-center"
                                            v-if="slotProps.value.code === 'website'">
                                            <img class="w-1rem" src="/assets/img/world.png" />
                                            <p>{{ slotProps.value.name }}</p>
                                        </div>
                                        <div v-if="slotProps.value.code === 'video'" class="flex gap-2 align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="22"
                                                viewBox="0 0 32 22" fill="none">
                                                <path
                                                    d="M22.6667 21H2.66667C2.22464 21 1.80072 20.8244 1.48816 20.5118C1.17559 20.1993 1 19.7754 1 19.3333V2.66667C1 2.22464 1.17559 1.80072 1.48816 1.48816C1.80072 1.1756 2.22464 1 2.66667 1H22.6667C23.1087 1 23.5326 1.1756 23.8452 1.48816C24.1577 1.80072 24.3333 2.22464 24.3333 2.66667V19.3333C24.3333 19.7754 24.1577 20.1993 23.8452 20.5118C23.5326 20.8244 23.1087 21 22.6667 21ZM31 16.6333L24.3333 15.3667L28.5833 17.4833C28.837 17.6112 29.1192 17.6721 29.4031 17.6602C29.687 17.6483 29.9631 17.564 30.2052 17.4154C30.4473 17.2668 30.6475 17.0587 30.7866 16.811C30.9257 16.5633 30.9991 16.2841 31 16V6C30.9991 5.71589 30.9257 5.43672 30.7866 5.189C30.6475 4.94128 30.4473 4.73323 30.2052 4.58461C29.9631 4.43599 29.687 4.35173 29.4031 4.33984C29.1192 4.32795 28.837 4.38882 28.5833 4.51667L24.3333 6.63333L31 16.6333ZM14.3333 11L11 8.5V13.5L14.3333 11Z"
                                                    stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                            <p>{{ slotProps.value.name }}</p>
                                        </div>
                                        <div class="flex gap-2 align-items-center" v-if="slotProps.value.code === 'pdf'">
                                            <img class="w-1rem" src="/assets/img/document.png" />
                                            <p>{{ slotProps.value.name }}</p>
                                        </div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex gap-2 align-items-center" v-if="slotProps.option.code === 'website'">
                                        <img class="w-1rem" src="/assets/img/world.png" />
                                        <p>{{ slotProps.option.name }}</p>
                                    </div>
                                    <div v-if="slotProps.option.code === 'video'" class="flex gap-2 align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="22" viewBox="0 0 32 22"
                                            fill="none">
                                            <path
                                                d="M22.6667 21H2.66667C2.22464 21 1.80072 20.8244 1.48816 20.5118C1.17559 20.1993 1 19.7754 1 19.3333V2.66667C1 2.22464 1.17559 1.80072 1.48816 1.48816C1.80072 1.1756 2.22464 1 2.66667 1H22.6667C23.1087 1 23.5326 1.1756 23.8452 1.48816C24.1577 1.80072 24.3333 2.22464 24.3333 2.66667V19.3333C24.3333 19.7754 24.1577 20.1993 23.8452 20.5118C23.5326 20.8244 23.1087 21 22.6667 21ZM31 16.6333L24.3333 15.3667L28.5833 17.4833C28.837 17.6112 29.1192 17.6721 29.4031 17.6602C29.687 17.6483 29.9631 17.564 30.2052 17.4154C30.4473 17.2668 30.6475 17.0587 30.7866 16.811C30.9257 16.5633 30.9991 16.2841 31 16V6C30.9991 5.71589 30.9257 5.43672 30.7866 5.189C30.6475 4.94128 30.4473 4.73323 30.2052 4.58461C29.9631 4.43599 29.687 4.35173 29.4031 4.33984C29.1192 4.32795 28.837 4.38882 28.5833 4.51667L24.3333 6.63333L31 16.6333ZM14.3333 11L11 8.5V13.5L14.3333 11Z"
                                                stroke="#001125" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                        <p>{{ slotProps.option.name }}</p>
                                    </div>
                                    <div class="flex gap-2 align-items-center" v-if="slotProps.option.code === 'pdf'">
                                        <img class="w-1rem" src="/assets/img/document.png" />
                                        <p>{{ slotProps.option.name }}</p>
                                    </div>
                                </template>
                            </Dropdown>
                            <InputText contenteditable class="h-2rem w-full text text-lg" v-model="item.website"
                                v-if="item.type === 'website'" />
                            <InputText contenteditable class="h-2rem w-full text text-lg" v-model="item.video"
                                v-if="item.type === 'video'" />
                            <InputText contenteditable class="h-2rem w-full text text-lg" v-model="item.pdf"
                                v-if="item.type === 'pdf'" />
                        </div>
                    </li>
                </ol>
            </div>
        </div>
        <Button size="small" label="Add new material sources" class="w-full text text-white mt-4 btn-add-material"
            @click="addNewMaterial" />
    </section>

    <Button size="small" label="SAVE" class="w-full my-4 btn-default" />
</template>

<style scoped lang="scss">
.title {
    color: var(--font-1, #001125);
    font-size: 25px;
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
}

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

.text {
    color: #000;
    font-family: Inter;
    font-style: normal;
    line-height: 160%;
}

.btn-add-material {
    background: var(--suggested-orange, #E96853);
    border: none;
}
</style>