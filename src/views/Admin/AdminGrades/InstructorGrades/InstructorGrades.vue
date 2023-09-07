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
            <div class="pl-2 col-12 flex flex-column gap-2">
                <!-- FILTER -->
                <div class="grid w-full px-2 md:px-3 align-items-center justify-content-between">
                    <div class="col-10 md:col-11 lg:col-10 xl:col-10 grid align-items-center filter-search align-items-center py-0 mt-2 px-0"
                        style="height: 40px;">
                        <button class="filter-button col-2 md:col-1 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_2655_7875)">
                                    <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#808081" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2655_7875">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p class="p-0 m-0">Filter</p>
                        </button>
                        <div class="p-input-icon-left h-full col-10 md:col-6 xl:col-6 py-0">
                            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                fill="none">
                                <path
                                    d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"
                                    fill="#808081" />
                            </svg>
                            <InputText placeholder="Search by name" class="search-bar w-full p-inputtext-sm" />
                        </div>
                    </div>
                    <div class="col-2 align-items-end flex justify-content-end">
                        <Button label="DOWNLOAD " size="small" icon="pi pi-download"
                            class="download-button flex text-right justify-content-center align-items-center "></Button>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <DataTable :value="instructorList" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    sortMode="multiple" v-model:selection="checkedInstructor" class="shadow-2 p-datatable-sm"
                    tableStyle="min-width: 80rem" :paginatorTemplate="{
                        '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
                        '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                    }" :pageLinkSize="3"
                    currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" headerStyle="width: 0%"></Column>
                    <Column field="name" headerStyle="width: 25%">
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Name</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-2 align-items-center">
                                <img :src="value.data.image" alt="" style="width: 39px; height: 39px;" />
                                <div class="flex flex-column align-items-start instructor-name">
                                    <h4>{{ value.data.name }}</h4>
                                    <p>
                                        {{ value.data.email }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="course" sortable class="center w-max" headerStyle="width: 10%">
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
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Course</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-start">
                                <h4 class="p-0 inter-normal black-3" style="font-size: 14px; font-weight: 500;">{{ value.data.work_as }}</h4>
                                <p class="p-0 inter-normal grey-3" style="font-size: 14px; font-weight: 400; letter-spacing: 0.7px;">
                                    {{ value.data.rating.rating }}/5 ({{ value.data.rating.total_rating }} ratings)
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="department" sortable class="center" headerStyle="width: 20%">
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
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Department</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-center justify-content-center">
                                <p class="inter-normal black-3" style="font-size: 15px; font-weight: 500;">
                                    {{ value.data.department }}
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="quantity" sortable class="center" headerStyle="width: 20%">
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
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Would take again</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex gap-1 flex-column align-items-center">
                                <h4 class="inter-normal black-3" style="font-size: 14px; font-weight: 500;">{{ parseFloat(((value.data.rating.ratings.helpful +
                                    value.data.rating.ratings.easiness + value.data.rating.ratings.clarity) /
                                    3 + 95).toString()).toFixed(2) }}%
                                </h4>
                                <p class="inter-normal grey-3" style="font-size: 14px; font-weight: 400; letter-spacing: 0.7px;">
                                    {{ value.data.rating.total_vote }} <span class="text-500">voted</span>
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="profile" headerStyle="width: 10%" class="center">
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Profile</p>
                            </div>
                        </template>
                        <template #body="value">
                            <div class="flex justify-content-center">
                                <Button class="w-5rem btn-orange" @click="onSelectProfile(value.data)">
                                    <span class="inter-normal white-1" style="font-size: 16px; font-weight: 600;">
                                        Profile
                                    </span>
                                </Button>
                            </div>
                        </template>
                    </Column>
                    <Column field="message" class="center" headerStyle="width: 10%">
                        <template #header>
                            <div class="flex justify-content-center align-items-center">
                                <p class="text-header">Message</p>
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
                    <h3 class="inter-normal black-1" style="font-size: 16px; font-weight: 600;">Helpfullness</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        border-color="#E96853" :border-width="1" active-color="#E96853" read-only :padding="0.99"
                        :rating="(selectedProfile?.rating.ratings.helpful || 0)"></star-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="inter-normal black-1" style="font-size: 16px; font-weight: 600;">Easiness</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        border-color="#E96853" :border-width="1" :padding="0.99" active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.easiness || 0)"></star-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="inter-normal black-1" style="font-size: 16px; font-weight: 600;">Clarity</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        border-color="#E96853" :border-width="1" :padding="0.99" active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.clarity || 0)"></star-rating>
                </div>
            </div>
            <span class="border-200 surface-overlay border-1" />
            <div class="flex align-items-center justify-content-between">
                <h3 class="inter-normal black-1" style="font-size: 16px; font-weight: 600;">Overall rating ({{ selectedProfile?.rating.total_rating }} rated)
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
@import "/src/assets/global.scss";
.search-bar {
    border-radius: 6px;
    background: #EEE !important;
    color: #808081;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    ::placeholder {
        color: #8B83BA;
    }
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

.title-text {
    color: var(--font-1, #001125);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
}

.download-button {
    background-color: #e26954;
    border: none;

    &:hover,
    &:active,
    &:focus {
        background-color: #e26954;
    }
}

:deep(.p-datatable) {
    &.p-datatable-sm .p-datatable-thead>tr>th {
        height: 45px;
    }
}

.instructor-name {
    h4 {
        color: #25213B;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    p {
        color: #808081;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.7px;
    }
}
</style>