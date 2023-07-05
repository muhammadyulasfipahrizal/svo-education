<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    title: {
        type: String,
        required: true
    },
});
const title = ref<string>(props.title);
const selectedType = ref<string>('Radio Button');
const typeList = ref<{ name: string; code: string }[]>([
    { name: 'Radio Button', code: 'radio' },
]);

const radioSelected = ref('model')
const questionList = ref<{ title: string; isCorrect: boolean }[]>([
    {
        title: 'To make the product visually appealing',
        isCorrect: true,
    }, {
        title: 'To create a seamless user experience',
        isCorrect: false,
    },
    {
        title: 'To optimize the product for search engines',
        isCorrect: false,
    },
    {
        title: 'To increase website traffic',
        isCorrect: false
    }
]);

const numberToChar = (number: number) => {
    if (!Number.isInteger(number) || number < 0 || number > 25) {
        throw new Error("Number must be an integer between 1 and 26");
    }

    return String.fromCharCode((number + 1) + 'A'.charCodeAt(0) - 1);
}

</script>

<template>
    <div class="flex flex-column gap-2">
        <div class="grid">
            <InputText label="Title" v-model="title" class="col-11 square-input" />
            <p class="text-900 text-sm font-bold col-1">
                0/1 Points
            </p>
        </div>
        <div class="grid">
            <div class="col-4 px-0">
                <Dropdown v-model="selectedType" :options="typeList" optionLabel="name" placeholder="Select Type"
                    class="w-full md:w-14rem">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center gap-2">
                            <RadioButton v-if="slotProps.value.code === 'radio'" value="model" v-model="radioSelected" />
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center gap-2">
                            <RadioButton v-if="slotProps.option.code === 'radio'" value="model" v-model="radioSelected" />
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>

        <div class="flex flex-column gap-2">
            <!-- Question list -->
            <template v-for="(question, key) in questionList">
                <div class="grid pl-3">
                    <div class="col-11">
                        <div class="flex align-items-center gap-2">
                            <RadioButton :inputId="'question_radio' + key" name="question_radio" />
                            <label :for="'question_radio' + key" class="ml-2">{{ numberToChar(key) }}.</label>
                            <InputText v-model="question.title" class="border-0 w-full" />
                        </div>
                    </div>
                    <div class="col-1 flex gap-2 align-items-center">
                        <Checkbox v-model="question.isCorrect" :binary="true" />
                        <button class="w-1rem border-none cursor-pointer p-1 bg-white hover:text-white hover:surface-700"
                            @click="questionList.splice(0, key)">&times;</button>
                    </div>
                </div>
            </template>

            <!-- ADD more quiz -->
            <div class="grid pl-3">
                <div class="col">
                    <Button label="Add More Quiz" class="btn-orange w-full" icon="pi pi-plus" size="small"
                        @click="questionList.push({ title: 'New Quiz', isCorrect: false })" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.square-input {
    border-radius: 0;
}
</style>