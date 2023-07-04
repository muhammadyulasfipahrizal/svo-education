<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
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
        <h1 class="text-900 font-bold text-4xl pl-2">Instructor Grades</h1>
        <div class="pl-2 flex flex-column gap-2 my-5 pr-3">
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

            <DataTable :value="instructorList" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" sortMode="multiple"
                tableStyle="min-width: 50rem" dataKey="id" v-model:selection="checkedInstructor" class="shadow-2">
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="name" header="Name">
                    <template #body="value">
                        <div class="flex gap-2 align-items-center">
                            <img :src="value.data.image" alt="" style="width: 39px; height: 39px;" />
                            <div class="flex gap-1 flex-column align-items-start">
                                <h4 class="text-900 font-semibold">{{ value.data.name }}</h4>
                                <p class="text-500 font-normal">
                                    {{ value.data.email }}
                                </p>
                            </div>
                        </div>
                    </template>
                </Column>
                <Column field="course" header="Course" sortable>
                    <template #body="value">
                        <div class="flex gap-1 flex-column align-items-start">
                            <h4 class="text-900 font-semibold">{{ value.data.work_as }}</h4>
                            <p class="text-500 font-normal">
                                {{ value.data.rating.rating }}/5 ({{ value.data.rating.total_rating }} ratings)
                            </p>
                        </div>
                    </template>
                </Column>
                <Column field="department" header="Department" sortable></Column>
                <Column field="quantity" header="Would take again" sortable>
                    <template #body="value">
                        <div class="flex gap-1 flex-column align-items-center">
                            <h4 class="text-900 font-bold">{{ parseFloat(((value.data.rating.ratings.helpful +
                                value.data.rating.ratings.easiness + value.data.rating.ratings.clarity) /
                                3 + 95).toString()).toFixed(2) }}%
                            </h4>
                            <p class="text-500 font-normal">
                                {{ value.data.rating.total_vote }} <span class="text-500">voted</span>
                            </p>
                        </div>
                    </template>
                </Column>
                <Column field="profile" header="Profile">
                    <template #body="value">
                        <Button label="Profile" class="btn-orange" @click="onSelectProfile(value.data)"
                            size="small"></Button>
                    </template>
                </Column>
                <Column field="message" header="Message">
                    <template #body="value">
                        <Button link size="small" @click="$router.push('/admin/message/instructor/' + value.data.id)">
                            <img src="/assets/icon/reply.png" class="w-2rem" />
                        </Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </section>

    <!-- MODAL Profile -->
    <Dialog v-model:visible="modalProfile" modal :style="{ width: '50vw' }">
        <template #header>
            <div class="flex gap-2 align-items-center">
                <img :src="selectedProfile?.image" alt="" style="width: 39px; height: 39px;" />
                <div class="h4 text-900 font-bold">{{ selectedProfile?.name }}</div>
            </div>
        </template>
        <div class="flex flex-column gap-2">
            <div class="flex flex-column gap-3 align-items-center">
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="text-900 font-bold text-sm">Helpfullness</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.helpful || 0)"></star-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="text-900 font-bold text-sm">Easiness</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.easiness || 0)"></star-rating>
                </div>
                <div class="flex align-items-center justify-content-between w-full">
                    <h3 class="text-900 font-bold text-sm">Clarity</h3>
                    <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                        active-color="#E96853" read-only
                        :rating="(selectedProfile?.rating.ratings.clarity || 0)"></star-rating>
                </div>
            </div>
            <span class="border-200 surface-overlay border-1" />
            <div class="flex align-items-center justify-content-between">
                <h3 class="text-900 font-bold text-sm">Overall rating ({{ selectedProfile?.rating.total_rating }} rated)
                </h3>
                <star-rating :show-rating="false" :round-start-rating="false" :star-size="16" inactive-color="#FFF"
                    active-color="#E96853" read-only :rating="selectedProfile?.rating.ratings_overall"></star-rating>
            </div>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.filter-button {
    background-color: #fff;
    color: #8B83BA;
    border: 0.5px solid #8B83BA;
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
    .p-datatable-wrapper {
        border-radius: 10px;
    }
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
</style>