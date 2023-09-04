<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import StarRating from 'vue-star-rating'
import { ref, watchEffect, watch } from 'vue';
import type { Instructor } from './Instructor.type';
import { instructorDummyData } from './instructorDummyData';
const search = ref();

const instructorList = ref<Instructor[]>(instructorDummyData)

const modalProfile = ref<boolean>(false);
const selectedProfile = ref<Instructor | null>(null);
const checkedInstructor = ref();

const onSelectProfile = (v: Instructor) => {
    modalProfile.value = true
    selectedProfile.value = v;

    if (selectedProfile.value) {
        const clarity = selectedProfile.value.rating.ratings.clarity || 0;
        const easiness = selectedProfile.value.rating.ratings.easiness || 0
        const helpful = selectedProfile.value.rating.ratings.helpful || 0;
        selectedProfile.value.rating.ratings_overall = (Math.round(((clarity + easiness + helpful / 3) + Number.EPSILON) * 100) / 100) / 3;
    }
}

</script>

<template>
    <section class="px-2">
        <section
            class="grid overflow-hidden flex-column md:flex-row pl-3 pr-3 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2 py-2">
            <h1 class="title-head">Instructor Grades</h1>
            <div class="pl-2 col-12 flex flex-column gap-2 my-2">
                <!-- FILTER -->
                <div class="flex justify-content-start md:justify-content-between align-items-center w-full">
                    <div class="flex flex-row align-items-center filter-search align-items-center">
                        <Button label="Filter" icon="pi pi-filter-fill" size="small" class="filter-button mr-3" />
                        <span class="p-input-icon-left mr-3">
                            <i class="pi pi-search search-icon" />
                            <InputText placeholder="Search by name" class="search-bar p-inputtext-sm" />
                        </span>
                    </div>
                    <Button label="DOWNLOAD" size="small" icon="pi pi-download" class="btn-orange"></Button>
                </div>
            </div>
            <div class="col-12">
                <DataTable :value="instructorList" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    sortMode="multiple" v-model:selection="checkedInstructor" class="shadow-2 p-datatable-sm"
                    tableStyle="min-width: 80rem" :paginatorTemplate="{
                        '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
                        '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                    }" :pageLinkSize="3" currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" headerStyle="width: 0.5rem"></Column>
                    <Column field="name" class="w-1">
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="font-bold text-sm">Name</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center">
                                <img :src="value.data.image" alt="" style="width: 39px; height: 39px;" />
                                <div class="flex flex-column align-items-start">
                                    <h4 class="p-0 text-900 font-semibold text-sm">{{ value.data.name }}</h4>
                                    <p class="p-0 text-500 font-normal text-sm" style="color: #808081">
                                        {{ value.data.email }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="course" sortable class="w-2 center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <p class="font-bold text-sm">Course</p>
                        </template>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-start">
                                <h4 class="p-0 text-900 font-semibold text-sm">{{ value.data.work_as }}</h4>
                                <p class="p-0 text-500 font-normal text-sm" style="color: #808081">
                                    {{ value.data.rating.rating }}/5 ({{ value.data.rating.total_rating }} ratings)
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="department" sortable class="w-2 center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <p class="font-bold text-sm">Department</p>
                        </template>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-center justify-content-center">
                                <p class="text-sm font-bold">
                                    {{ value.data.department }}
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="quantity" sortable class="w-2 center">
                        <template #sorticon="{ sorted, sortOrder }">
                            <div class="flex justify-content-center align-items-center">
                                <template v-if="!sorted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path
                                            d="M5.2202 7.84912L8.57777 3.66525C8.87645 3.27825 9.36864 3.27825 9.66789 3.66525L13.0255 7.84912C13.3241 8.23612 13.1835 8.55225 12.6739 8.55225H5.57233C5.0627 8.55225 4.92208 8.23556 5.22077 7.84912H5.2202ZM13.0249 11.1538L9.66733 15.3377C9.36864 15.7247 8.87645 15.7247 8.5772 15.3377L5.21964 11.1538C4.92095 10.7668 5.06158 10.4507 5.5712 10.4507H12.6728C13.1824 10.4507 13.323 10.7674 13.0243 11.1538H13.0249Z"
                                            fill="white" />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) > 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" />
                                    </svg>
                                    <svg class="mx-2" v-if="(sortOrder as unknown as number) < 0"
                                        xmlns="http://www.w3.org/2000/svg" width="10.033" height="5">
                                        <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                                    </svg>
                                </template>
                            </div>
                        </template>
                        <template #header>
                            <p class="font-bold text-sm">Would take again</p>
                        </template>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-center">
                                <h4 class="text-900 font-bold text-sm">{{ parseFloat(((value.data.rating.ratings.helpful +
                                    value.data.rating.ratings.easiness + value.data.rating.ratings.clarity) /
                                    3 + 95).toString()).toFixed(2) }}%
                                </h4>
                                <p class="text-500 font-normal text-sm" style="color: #808081">
                                    {{ value.data.rating.total_vote }} <span class="text-500">voted</span>
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="profile" class="w-2rem center" style="min-width: 2rem;">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-sm">Profile</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex justify-content-center">
                                <Button class="w-5rem btn-orange" @click="onSelectProfile(value.data)">
                                    <span class="text-sm font-semibold">
                                        Profile
                                    </span>
                                </Button>
                            </div>
                        </template>
                    </Column>
                    <Column field="message" class="w-2rem" style="min-width: 5rem;">
                        <template #header>
                            <div class="flex justify-content-center align-items-center w-full">
                                <p class="font-bold text-sm">Message</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex flex-column align-items-center">
                                <Button link size="small"
                                    @click="$router.push('/admin/grade/instructor/' + value.data.id + '/message')">
                                    <img src="/assets/icon/reply.png" class="w-2rem" />
                                </Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </section>

    </section>

    <!-- MODAL Profile -->
    <Dialog v-model:visible="modalProfile" modal :style="{ width: '40vw' }" :breakpoints="{ '764px': '90vw' }">
        <template #header>
            <div class="flex gap-2 align-items-center p-2">
                <img :src="selectedProfile?.image" alt="" style="width: 39px; height: 39px;" />
                <div class="title-text">{{ selectedProfile?.name }}</div>
            </div>
        </template>
        <div class="flex flex-column gap-2 p-2">
            <div class="flex flex-column gap-2 align-items-center">
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="text-900 font-bold text-sm">Helpfullness</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        border-color="#E96853" :border-width="1" active-color="#E96853" read-only :padding="0.99"
                        :rating="(selectedProfile?.rating.ratings.helpful || 0)"></star-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="text-900 font-bold text-sm">Easiness</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        border-color="#E96853" :border-width="1" :padding="0.99" active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.easiness || 0)"></star-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="text-900 font-bold text-sm">Clarity</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        border-color="#E96853" :border-width="1" :padding="0.99" active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.clarity || 0)"></star-rating>
                </div>
            </div>
            <span class="border-200 surface-overlay border-1" />
            <div class="flex align-items-center justify-content-between">
                <h3 class="text-900 font-bold text-sm">Overall rating ({{ selectedProfile?.rating.total_rating }} rated)
                </h3>
                <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                    border-color="#E96853" :border-width="1" :padding="0.99" active-color="#E96853" read-only
                    :rating="selectedProfile?.rating.ratings_overall">
                </star-rating>
            </div>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.filter-button {
    background-color: #fff;
    color: #808081;
    border: 0.5px solid #808081;
}

.search-bar {
    background-color: rgba(139, 131, 186, 0.1);
    color: #8B83BA;
    width: 240px;
}

.search-bar::placeholder {
    color: #8B83BA;
}

.search-icon {
    color: #8B83BA;
}

.btn-orange {
    background-color: #e26954;
    border: none;

    &:hover,
    &:active,
    &:focus {
        background-color: #e26954;
    }
}

::v-deep(.p-datatable) {

    .p-datatable-thead>tr>th {
        background: #006785;
        color: white;
        color: var(--white, #FFF);
        text-align: center;
        font-size: 20px;
        font-weight: 700;

        svg path {
            fill: white;
        }

        &:hover {
            background: #006785;
            color: var(--white, #FFF);
        }
    }
}

@media only screen and (min-width: 768px) {
    .search-bar {
        width: 400px;
    }
}

@media (max-width: 768px) {
    ::v-deep(.p-button .p-button-label) {
        display: none;
        margin: 0;
        padding: 0;
    }
}


::v-deep(.p-datatable) {
    .p-datatable-footer {
        background: white;
        height: 55px;
        font-size: 14px;
        color: #B5B7C0;
        font-weight: 500;
    }
}

.title-text {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
}
</style>