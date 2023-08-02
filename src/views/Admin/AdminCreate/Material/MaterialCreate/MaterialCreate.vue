<script setup lang="ts">
import { ref } from 'vue';

interface MaterialData {
    heading: string;
    items: { website: string }[];
}

const materialData = ref<MaterialData[]>([
    {
        heading: 'Day 1 - Develop a Strong Foundation',
        items: [
            { website: 'www.website1.com' },
            { website: 'www.website2.com' }
        ]
    },
    {
        heading: 'Day 2 - Hone Your Skills',
        items: [
            { website: 'www.website3.com' }
        ]
    },
]);

const addNewMaterial = () => {
    materialData.value.push({
        heading: 'Day 1 - Your Title',
        items: [{ website: 'www.yourwebsite.com' }]
    });
};

const addMaterial = (index: number) => {
    materialData.value[index].items.push({
        website: 'www.yourwebsite.com'
    });
};

</script>

<template>
    <section class="my-3">
        <p class="title">Material Sources</p>
        <div v-for="(material, index) in materialData" :key="index">
            <div class="flex flex-row align-items-center mt-3">
                <p contenteditable class="text font-bold text-xl sm:text-2xl md:text-3xl">{{ material.heading }}</p>
                <Button size="small" class="btn-add ml-auto">
                    <i class="pi pi-plus"></i>
                    <p class="text-900 font-bold ml-2 text-white" @click="addMaterial(index)">ADD</p>
                </Button>
            </div>
            <div class="flex flex-column">
                     <ol>
                         <li class="text text-lg my-3" v-for="(item, itemIndex) in material.items" :key="itemIndex">
                             <div class="flex flex-row align-items-center mx-2">
                                 <Dropdown
                                     optionLabel="name" placeholder="Select a City" 
                                     class="mr-3">
                                 </Dropdown>
                                 <p contenteditable class="text text-lg">{{ item.website }}</p>
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