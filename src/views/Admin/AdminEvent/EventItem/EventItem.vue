<script setup lang="ts">
import { type EventItem } from "../AdminEvent.vue";
import format from 'date-fns/format'
import router from "@/router";
const props = defineProps<{ item: EventItem }>();

const goToDetail = () => {
    router.push('/admin/event-detail/1')
}
</script>

<template>
    <section class="flex flex-column gap-2 w-full md:w-4 lg:w-4 xl:w-4">
        <article class="border-1 surface-0 surface-border">
            <img src="/assets/img/event/innovations.png" class="col-12 py-0 w-full" />
            <h2 class="col-12 text-900 font-bold text-sm py-0 m-0">{{ props.item.name }}</h2>
            <p class="col-12 text-700 font-medium text-xs py-0 m-0">at {{ props.item.location }}</p>
            <div class="col-12 flex py-1 gap-2 align-items-center">
                <i class="pi pi-calendar"></i>
                <p class="text-700 text-super-small">{{ format(new Date(props.item.date), 'EEE, MMM Lo, yyyy') }}</p>
            </div>
            <div class="col-12 flex py-1 gap-2 align-items-center">
                <i class="pi pi-clock"></i>
                <p class="text-700 text-super-small">Start at {{ format(new Date(props.item.date), 'hh:mm aa') }}</p>
            </div>
            <div class="col-12 flex py-1 gap-2 align-items-center">
                <i class="pi pi-ticket"></i>
                <p class="text-700 text-super-small">Start from RM {{ props.item.ticket_prize }}</p>
            </div>
            <div class="flex col-12">
                <Button label="BUY" class="btn-buy"></Button>
            </div>
        </article>
        <div class="flex gap-2 align-items-center justify-content-center">
            <p class="text-900 font-semibold">Event 1</p>
            <Button link size="small" @click="goToDetail">
                <i class="pi pi-pencil"></i>
            </Button>

            <Button link size="small">
                <i class="pi pi-trash"></i>
            </Button>

        </div>
    </section>
</template>


<style scoped>
.btn-buy {
    width: 100%;
    background-color: #E26954;
    border: 0;
}

.btn-buy:hover {
    background-color: #E26954;
}

.pi svg path {
    fill: black
}

.text-super-small {
    font-size: 8px;
}

@media only screen and (min-width: 768px) {
    .container {
<<<<<<< HEAD
      max-width: 225px;
=======
        max-width: 225px;
>>>>>>> 32b633dd4fdb714ede7fdc7fdede0e4a5131a752
    }
}
</style>