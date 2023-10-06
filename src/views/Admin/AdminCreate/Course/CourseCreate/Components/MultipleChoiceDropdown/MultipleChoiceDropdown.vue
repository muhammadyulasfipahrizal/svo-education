<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);

const showDropdown = () => {
    show.value = !show.value;
};

const categories = ref([
    {name: "David Burn", key: "A"},
    {name: "Ava Baker", key: "M"},
    {name: "Gabriel Hates", key: "P"}
]);
const selectedCategories = ref(['David Burn']);
</script>

<template>
    <div class="container">
        <div class="flex flex-row justify-content-between" @click="showDropdown()" style="cursor: pointer;">
            <p class="text">David Burn</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                <path d="M19.1242 10.8154C18.9134 10.6059 18.6283 10.4883 18.3311 10.4883C18.0338 10.4883 17.7487 10.6059 17.5379 10.8154L13.4992 14.7979L9.51668 10.8154C9.3059 10.6059 9.02076 10.4883 8.72355 10.4883C8.42635 10.4883 8.14121 10.6059 7.93043 10.8154C7.82498 10.92 7.74129 11.0444 7.68418 11.1815C7.62706 11.3186 7.59766 11.4657 7.59766 11.6142C7.59766 11.7627 7.62706 11.9097 7.68418 12.0468C7.74129 12.1839 7.82498 12.3083 7.93043 12.4129L12.7004 17.1829C12.805 17.2884 12.9294 17.3721 13.0665 17.4292C13.2036 17.4863 13.3507 17.5157 13.4992 17.5157C13.6477 17.5157 13.7947 17.4863 13.9318 17.4292C14.0689 17.3721 14.1933 17.2884 14.2979 17.1829L19.1242 12.4129C19.2296 12.3083 19.3133 12.1839 19.3704 12.0468C19.4275 11.9097 19.457 11.7627 19.457 11.6142C19.457 11.4657 19.4275 11.3186 19.3704 11.1815C19.3133 11.0444 19.2296 10.92 19.1242 10.8154Z" fill="#808081"/>
            </svg>
        </div>
        <div v-if="show">
            <div class="flex flex-row align-items-center" style="gap: 10px" v-for="category of categories" :key="category.key">
                <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name">
                    <template #icon="{ checked }">
                        <svg v-if="!checked" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            viewBox="0 0 18 18" fill="none">
                            <path d="M0.5 17.5V0.5H17.5V17.5H0.5Z" fill="white" stroke="#ECEEF5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <rect width="22" height="22" rx="11" fill="#659872" />
                            <path
                                d="M17.1501 6.60904C17.0649 6.52312 16.9635 6.45493 16.8518 6.40839C16.7401 6.36185 16.6203 6.33789 16.4993 6.33789C16.3783 6.33789 16.2584 6.36185 16.1467 6.40839C16.035 6.45493 15.9336 6.52312 15.8484 6.60904L9.01926 13.4474L6.1501 10.569C6.06162 10.4836 5.95717 10.4164 5.84272 10.3713C5.72827 10.3262 5.60606 10.304 5.48306 10.3062C5.36006 10.3083 5.23868 10.3346 5.12586 10.3837C5.01304 10.4327 4.91098 10.5035 4.82551 10.592C4.74004 10.6804 4.67284 10.7849 4.62774 10.8993C4.58263 11.0138 4.56051 11.136 4.56264 11.259C4.56477 11.382 4.5911 11.5034 4.64014 11.6162C4.68917 11.729 4.75995 11.8311 4.84843 11.9165L8.36843 15.4365C8.45364 15.5225 8.55503 15.5907 8.66673 15.6372C8.77844 15.6837 8.89825 15.7077 9.01926 15.7077C9.14027 15.7077 9.26009 15.6837 9.37179 15.6372C9.4835 15.5907 9.58488 15.5225 9.6701 15.4365L17.1501 7.95654C17.2431 7.8707 17.3174 7.76652 17.3682 7.65056C17.419 7.5346 17.4452 7.40938 17.4452 7.28279C17.4452 7.1562 17.419 7.03097 17.3682 6.91502C17.3174 6.79906 17.2431 6.69488 17.1501 6.60904Z"
                                fill="white" />
                        </svg>
                    </template>
                </Checkbox>
                <p class="text">{{ category.name }}</p>
            </div>
        </div>
    </div>
  </template>

  <style scoped>
  .container {
    border-radius: 10px;
    border: 1px solid var(--Suggested-dark-grey, #808081);
    background: #FFF;
    min-width: 325px;
    padding: 9px 8px;
  }

  .text {
    color: var(--Black, #000);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
  }
  </style>