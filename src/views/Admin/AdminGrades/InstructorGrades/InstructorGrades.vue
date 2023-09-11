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
    <section>
        <section
            class="grid overflow-hidden flex-column md:flex-row"  style="padding: 10px;">
            <h1 class="hidden lg:block title-head" style="padding: 0px 5px">Instructor Grades</h1>
            <h1 class="title-head lg:hidden" style="padding: 0px 5px">Instructors</h1>
            <div class="col-12">
                <div
                    class="col-12 flex flex-row align-items-center justify-content-between filter-search p-0 m-0">
                    <div
                        class="col-12 md:col-10 lg:col-10 lg:col-10 grid grid-nogutter gap-2 align-items-center filter-container ">
                        <Button size="small" class="filter-button sm:col-1 md:col-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_2726_4798)">
                                    <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#808081" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2726_4798">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>Filter</p>
                        </Button>
                        <div class="p-input-icon-left sm:w-7 w-6 col-5 sm:mt-0 p-0 search-input">
                            <i class="pi pi-search search-icon ml-2" />
                            <InputText placeholder="Search by Name" class="search-bar p-inputtext-sm w-full h-full" />
                        </div>
                        <Button size="small" class="col-2 download ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M6.73798 0.25C5.96436 0.25 5.31904 0.841231 5.25148 1.61189C5.11024 3.22317 5.0745 4.84164 5.14436 6.45693C5.06003 6.46258 4.97571 6.46847 4.8914 6.47462L3.4019 6.5832C2.44985 6.6526 1.91764 7.71416 2.43163 8.51854C3.5278 10.2341 4.94026 11.7254 6.59369 12.9132L7.19043 13.3418C7.67425 13.6894 8.32591 13.6894 8.80972 13.3418L9.40646 12.9132C11.0599 11.7254 12.4724 10.2341 13.5685 8.51855C14.0825 7.71416 13.5503 6.6526 12.5983 6.5832L11.1088 6.47462C11.0245 6.46847 10.9401 6.46258 10.8558 6.45693C10.9257 4.84164 10.8899 3.22317 10.7487 1.61188C10.6811 0.841229 10.0358 0.25 9.26219 0.25H6.73798ZM6.68157 7.11473C6.56786 5.3275 6.58909 3.53417 6.74513 1.75H9.25503C9.41106 3.53417 9.4323 5.3275 9.31859 7.11473C9.30584 7.31509 9.37396 7.51221 9.5077 7.66195C9.64144 7.8117 9.82964 7.90156 10.0302 7.91144C10.3535 7.92737 10.6767 7.94711 10.9997 7.97065L12.0815 8.04951C11.1219 9.46281 9.92044 10.6971 8.53133 11.6949L8.00008 12.0765L7.46882 11.6949C6.07972 10.6971 4.87824 9.4628 3.9187 8.04951L5.00046 7.97065C5.32345 7.94711 5.64664 7.92737 5.96999 7.91144C6.17052 7.90156 6.35871 7.81169 6.49246 7.66195C6.6262 7.51221 6.69432 7.31509 6.68157 7.11473Z"
                                    fill="white" />
                                <path
                                    d="M1.75 14C1.75 13.5858 1.41421 13.25 1 13.25C0.585786 13.25 0.25 13.5858 0.25 14V16C0.25 16.9665 1.0335 17.75 2 17.75H14C14.9665 17.75 15.75 16.9665 15.75 16V14C15.75 13.5858 15.4142 13.25 15 13.25C14.5858 13.25 14.25 13.5858 14.25 14V16C14.25 16.1381 14.1381 16.25 14 16.25H2C1.86193 16.25 1.75 16.1381 1.75 16V14Z"
                                    fill="white" />
                            </svg>
                            <p>DOWNLOAD</p>
                        </Button>
                        <Button size="small" class="col-2 download block md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M6.73798 0.25C5.96436 0.25 5.31904 0.841231 5.25148 1.61189C5.11024 3.22317 5.0745 4.84164 5.14436 6.45693C5.06003 6.46258 4.97571 6.46847 4.8914 6.47462L3.4019 6.5832C2.44985 6.6526 1.91764 7.71416 2.43163 8.51854C3.5278 10.2341 4.94026 11.7254 6.59369 12.9132L7.19043 13.3418C7.67425 13.6894 8.32591 13.6894 8.80972 13.3418L9.40646 12.9132C11.0599 11.7254 12.4724 10.2341 13.5685 8.51855C14.0825 7.71416 13.5503 6.6526 12.5983 6.5832L11.1088 6.47462C11.0245 6.46847 10.9401 6.46258 10.8558 6.45693C10.9257 4.84164 10.8899 3.22317 10.7487 1.61188C10.6811 0.841229 10.0358 0.25 9.26219 0.25H6.73798ZM6.68157 7.11473C6.56786 5.3275 6.58909 3.53417 6.74513 1.75H9.25503C9.41106 3.53417 9.4323 5.3275 9.31859 7.11473C9.30584 7.31509 9.37396 7.51221 9.5077 7.66195C9.64144 7.8117 9.82964 7.90156 10.0302 7.91144C10.3535 7.92737 10.6767 7.94711 10.9997 7.97065L12.0815 8.04951C11.1219 9.46281 9.92044 10.6971 8.53133 11.6949L8.00008 12.0765L7.46882 11.6949C6.07972 10.6971 4.87824 9.4628 3.9187 8.04951L5.00046 7.97065C5.32345 7.94711 5.64664 7.92737 5.96999 7.91144C6.17052 7.90156 6.35871 7.81169 6.49246 7.66195C6.6262 7.51221 6.69432 7.31509 6.68157 7.11473Z"
                                    fill="white" />
                                <path
                                    d="M1.75 14C1.75 13.5858 1.41421 13.25 1 13.25C0.585786 13.25 0.25 13.5858 0.25 14V16C0.25 16.9665 1.0335 17.75 2 17.75H14C14.9665 17.75 15.75 16.9665 15.75 16V14C15.75 13.5858 15.4142 13.25 15 13.25C14.5858 13.25 14.25 13.5858 14.25 14V16C14.25 16.1381 14.1381 16.25 14 16.25H2C1.86193 16.25 1.75 16.1381 1.75 16V14Z"
                                    fill="white" />
                            </svg>
                        </Button>
                    </div>
                </div>

                <DataTable :value="instructorList" removableSort paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                    sortMode="multiple" v-model:selection="checkedInstructor" class="shadow-2 p-datatable-sm"
                    tableStyle="min-width: 80rem" :paginatorTemplate="{
                        '600px': 'CurrentPageReport PrevPageLink PageLinks NextPageLink',
                        '1062px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                    }" :pageLinkSize="3"
                    currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" headerStyle="width: 0%"></Column>
                    <Column field="name" headerStyle="width: 20%">
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
                            <div class="flex flex-column align-items-start" style="gap: 5px;">
                                <h4 class="p-0 inter-normal black-3" style="font-size: 14px; font-weight: 500;">{{
                                    value.data.work_as }}</h4>
                                <p class="p-0 inter-normal grey-3"
                                    style="font-size: 14px; font-weight: 400; letter-spacing: 0.7px;">
                                    {{ value.data.rating.rating }}/5 ({{ value.data.rating.total_rating }} ratings)
                                </p>
                            </div>
                        </template>
                    </Column>
                    <Column field="department" sortable class="center" headerStyle="width: 15%">
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
                    <Column field="quantity" sortable class="center" headerStyle="width: 15%">
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
                                <h4 class="inter-normal black-3" style="font-size: 14px; font-weight: 500;">{{
                                    parseFloat(((value.data.rating.ratings.helpful +
                                        value.data.rating.ratings.easiness + value.data.rating.ratings.clarity) /
                                        3 + 95).toString()).toFixed(2) }}%
                                </h4>
                                <p class="inter-normal grey-3"
                                    style="font-size: 14px; font-weight: 400; letter-spacing: 0.7px;">
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
    <Dialog v-model:visible="modalProfile" modal :style="{ width: '35vw' }" :breakpoints="{ '764px': '90vw' }">
        <template #header>
            <div class="flex gap-2 align-items-center" style="margin: 10px">
                <img :src="selectedProfile?.image" alt="" style="width: 39px; height: 39px;" />
                <div class="title-text">{{ selectedProfile?.name }}</div>
            </div>
        </template>
        <div class="flex flex-column" style="padding: 10px">
            <div class="flex flex-column align-items-center" style="gap: 25px">
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
            <span class="border-200 surface-overlay border-1" style="margin: 15px 0px;"/>
            <div class="flex align-items-center justify-content-between">
                <h3 class="inter-normal black-1" style="font-size: 16px; font-weight: 600;">Overall rating ({{
                    selectedProfile?.rating.total_rating }} rated)
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