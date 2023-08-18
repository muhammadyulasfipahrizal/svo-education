<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
const props = defineProps({
    title: {
        type: String,
        required: true
    },
});
const title = ref<string>(props.title);
const selectedType = ref<{ name: string; code: string } | null>(null);
const typeList = ref<{ name: string; code: string }[]>([
    { name: 'Radio Button', code: 'radio' },
    { name: 'Text Box', code: 'text' },
]);

const radioSelected = ref('model')
const answerList = ref<{ title: string; isCorrect: boolean }[]>([
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
watchEffect(() => {
    console.log('selectedType', selectedType.value);

})
</script>

<template>
    <div class="flex flex-column gap-2 w-full">
        <div class="grid">
            <InputText label="Title" v-model="title" class="col-11 square-input" />
            <p class="text-900 text-sm font-bold col-1">
                0/1 Points
            </p>
        </div>
        <div class="grid">
            <div class="col-4 px-0">
                <Dropdown v-model="selectedType" :options="typeList" optionLabel="name" placeholder="Select Type"
                    class="w-full md:w-14rem selected">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center gap-2">
                            <RadioButton v-if="slotProps.value.code === 'radio'" value="model" />
                            <Checkbox v-if="slotProps.value.code === 'text'" />
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center gap-2">
                            <RadioButton v-if="slotProps.option.code === 'radio'" />
                            <Checkbox v-if="slotProps.option.code === 'text'" />
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>

        <div class="flex flex-column gap-2" v-if="selectedType?.code === 'radio'">
            <!-- Question list -->
            <template v-for="(answer, key) in answerList">
                <div class="grid pl-3">
                    <div class="col-11">
                        <div class="flex align-items-center gap-2">
                            <RadioButton :inputId="'answer_radio' + key" name="answer_radio" v-model="radioSelected" :value="answer.title" />
                            <label :for="'answer_radio' + key" class="ml-2">{{ numberToChar(key) }}.</label>
                            <InputText v-model="answer.title" class="border-0 w-full" />
                        </div>
                    </div>
                    <div class="col-1 flex gap-2 align-items-center">
                        <Checkbox v-model="answer.isCorrect" :binary="true" />
                        <button class="w-1rem border-none cursor-pointer p-1 bg-white hover:text-white hover:surface-700"
                            @click="answerList.splice(0, key)">&times;</button>
                    </div>
                </div>
            </template>
        </div>

        <div class="flex flex-column gap-2" v-if="selectedType?.code === 'text'">
            <Textarea rows="4" class="w-full" placeholder="Please fill description" />
        </div>
    </div>
</template>

<style lang="scss">
.square-input {
    border-radius: 0;
}
</style>