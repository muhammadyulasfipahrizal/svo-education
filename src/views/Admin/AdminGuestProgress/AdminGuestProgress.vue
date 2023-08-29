<template>
  <section class="px-2">
    <section
      class="grid overflow-hidden flex-column md:flex-row pl-4 pr-4 md:pl-0 md:pr-2 lg:pl-0 lg:pr-2 xl:pl-0 xl:pr-2">
      <div class="flex flex-row align-items-center col-12">
        <h1 class="title-head">Guest Progress</h1>
      </div>
      <div class="col-12">
        <DataTable :value="guestProgressList" class="shadow-2" removableSort paginator :rows="10" selectionMode="single"
          :selection="selectedCourse" @rowSelect="handleRowSelect"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing data {first} to {last} of {totalRecords} entries">
          <Column field="dealerName">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Dealer Name</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="grid align-items-center w-full col-offset-3">
                <img :src="data.image" class="data-image border-circle col-6 text-right" />
                <p class="col-6 data-text">{{ data.code }} ({{ data.name }})</p>
              </div>
            </template>
          </Column>
          <Column field="recruited">
            <template #header>
              <div class="flex justify-content-center w-full">
                <p class="header-text">Guest Recruited</p>
              </div>
            </template>
            <template #body="{ data }">
              <div class="flex justify-content-center w-full">
                <p class="data-text">{{ data.recruited }}</p>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import type { DataTableRowSelectEvent } from 'primevue/datatable';
import { guestProgressDataMock } from './GuestProgress.mock';


const guestProgressList = ref(guestProgressDataMock);
const selectedCourse = ref(null);


const handleRowSelect = (event: DataTableRowSelectEvent) => {
  router.push('/admin/progress/guest/' + event.data.course + '?filter-guest=' + event.data.id)
}

</script>

<style scoped>
.back-arrow {
  cursor: pointer;
}

.page-title {
  color: var(--font-1, #001125);
  font-size: 35px;
  font-family: Inter;
  font-weight: 700;
  line-height: 160%;
}

.header-text {
  color: white;
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
}

.data-text {
  color: var(--fonts-primary, #25213B);
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
}

.progress-bar-container {
  width: 200px;
  height: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #EFAE1C;
  transition: width 0.5s;
}

.data-image {
  width: 50px;
  height: 50px;
}
</style>

<style lang="scss" scoped>
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

  .p-datatable-footer {
    background: white;
    height: 55px;
    font-size: 14px;
    color: #B5B7C0;
    font-weight: 500;
  }
}
</style>
