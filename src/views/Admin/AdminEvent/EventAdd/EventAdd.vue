<script setup lang="ts">
const emit = defineEmits(['onAdd'])
</script>

<template>
    <section
        class="container flex flex-column gap-2 border-1 surface-0 surface-border justify-content-center align-items-center">
        <Button icon="pi pi-plus" class="btn-add" rounded aria-label="Filter" @click="emit('onAdd')"></Button>
        <p class="text-900 font-normal">Add more event</p>
    </section>
</template>


<style scoped>
.container {
    min-width: 224px;
    min-height: 327px;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius: 10p
}

.btn-add {
    background: #D9D5EC;
    border: 0;      
    width: 30px;
    height: 30px !important;
}
</style>