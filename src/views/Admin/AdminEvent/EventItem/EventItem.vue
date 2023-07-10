<script setup lang="ts">
import router from "@/router";

const goToDetail = () => {
    router.push('/admin/event-detail/1')
}
</script>

<template>
    <section class="flex flex-column gap-2 container">
        <article class="border-1 surface-0 surface-border p-1 flex flex-column gap-1">
            <img src="/assets/img/event/innovations.png" />
            <h2 class="text-900 font-bold text-sm">Network Technology Seminar</h2>
            <p class="text-700 font-medium text-xs">at Bukit Bintang</p>
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-calendar"></i>
                <p class="text-700 text-super-small">Thu, Dec 25th, 2022</p>
            </div>
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-clock"></i>
                <p class="text-700 text-super-small">Start at 11:00 AM</p>
            </div>
            <div class="flex gap-2 align-items-center">
                <i class="pi pi-ticket"></i>
                <p class="text-700 text-super-small">Start from RM 9.99</p>
            </div>
            <div class="flex">
                <Button label="BUY" class="btn-buy"></Button>
            </div>
        </article>
        <div class="flex gap-2 align-items-center justify-content-center">
            <p class="text-900 font-semibold">Event 1</p>
            <Button link size="small" @click="goToDetail">
                <i class="pi pi-pencil"></i>
            </Button>

            <Button link size="small" >
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
      max-width: 224px;
    }
  }
</style>