<template>
    <div class="grid col-12 p-4">
            <div class="col-12 md:col-7 flex justify-content-center">
                <Calendar inline class="calendar w-full">
                    <template #date="slotProps">
                        <strong v-if="slotProps.date.day === 15" 
                                class="flex flex-column justify-content-center align-items-center gap-0 highlighted">
                            <p>{{ slotProps.date.day }}</p>
                        </strong>
                        <template v-else>
                            <template v-if="slotProps.date.day > 10 && slotProps.date.day < 15">
                                <strong class="flex flex-column justify-content-center align-items-center gap-0">
                                    <p>{{ slotProps.date.day }}</p>
                                    <Badge value="2" class="badge text-xs flex justify-content-center align-items-center">
                                    </Badge>
                                </strong>
                            </template>
                            <template v-else>
                                {{ slotProps.date.day }}
                            </template>
                        </template>
                    </template>
                </Calendar>
            </div>

        <div class="col-12 md:col-5 flex flex-column md:gap-2 p-4 md:p-2">

            <div class="flex flex-column md:flex-row md:align-items-center md:justify-content-between">
                <p class="poppins-normal black-2" style="font-size: 30px; font-weight: 700; letter-spacing: 0.9px;">Tuesday</p>
                <p class="text-lg md:text-sm inter-normal font-bold">15th December, 2022</p>
            </div>

            <Button class="text-sm align-self-center mt-2 md:mt-0 btn-orange" style="width: 200px">
                <template #default>
                    <div class="flex flex-row align-items-center gap-2" style="font-size: 15px">
                        <i class="pi pi-plus text-xs"></i>
                        <p class="inter-normal" style="font-weight: 500; white-space: nowrap;">CREATE SCHEDULE</p>
                    </div>
                </template>
            </Button>

            <div>
                <VirtualScroller :items="activitiesList" :itemSize="50" style="height: 550px">
                    <template v-slot:item="{ item }">
                      <Card class="-mb-3 p-0 m-0 card mr-3" style="box-shadow: none;"> 
                        <template #content>
                          <p class="font-bold blue inter-normal" style="font-size: 16px;">{{ item.start_time }} - {{ item.end_time }}</p>
                          <div class="grid">
                            <p class="col-11 poppins-normal black-2" style="font-size: 18px; font-weight: 500; letter-spacing: 0.54px;">{{ item.activity }}</p>
                            <i :class="{'col-1 pi pi-star-fill text-lg blue': item.checked, 'col-1 pi pi-star text-lg blue': !item.checked}"></i>
                          </div>
                        </template>
                      </Card>
                    </template>
                  </VirtualScroller>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { activitiesDummyData } from '../DashboardDummyData'
import type { Activities } from '../Dashboard.type'

const activitiesList = ref<Activities[]>(activitiesDummyData)

</script>

<style lang="scss" scoped>
@import "/src/assets/global.scss";
::v-deep(.calendar) {
    border: 1px solid #D9D5EC;
    background: #FFF;
    max-height: 575px;

    .p-datepicker-calendar table td {
        padding: 0.25rem !important;
    }

    .p-datepicker {
        overflow: hidden;
    }

    .p-datepicker-header {
        padding: 0.5rem;
        margin: 5px 0 30px 0;
    }

    table tr td {
        width: 65px;
        height: 65px;
        padding: 7px;
        margin: 7px;
        background: rgba(250, 250, 250, 0.50);
        border: 1px solid #D9D5EC;  
    }

    table td>span {
        border-radius: 5px;
        width: 65px;
        height: 65px;
        font-size: 15px;
    }

    table td>span:focus {
        box-shadow: none;
        background: #E96853;
        color: white;
        font-size: 20px;
    }

    table td>span.p-highlight {
        background: #E96853;
        color: white;
        font-size: 20px;
    }

    table td>span:not(:focus) .highlighted {
        background: #E96853;
        color: white;
    }

    table td>span:not(.p-highlight) .badge {
        background: #E96853;
        color: white;
        border-radius: 50%;
    }

    table td>span.p-highlight .badge {
        background: white;
        color: #E96853;
        border-radius: 16px;
    }

    &:not(.p-disabled) table td span:not(.p-highlight):not(.p-disabled) span:hover {
        background: #E96853 !important;
    }
}

@media (max-width: 765px) {
    ::v-deep(.calendar) {

        table tr td {
            width: 50px;
            height: 50px;
            padding: 5px;
            margin: 5px;
        }
    
        table td>span {
            width: 50px;
            height: 50px;
        }
    }
}


::v-deep(.p-button) {
    .p-button-label {
        font-weight: 500;
    }
}

/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #00C0DD;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #00C0DD;
}

.blue {
    color: #00C0DD;
}

::v-deep(.card) {
    
    .p-card-body {
        background: #F9FAFE;
        padding: 0;
        .p-card-content {
            padding: 10px;
        }
    }
}
</style>