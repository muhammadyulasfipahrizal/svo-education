<script lang="ts">
</script>

<template>
    <section>
        <h1 class="text-900 font-bold text-4xl mb-4">Dashboard</h1>
        <div class="flex flex-row gap-6">
            <div class="flex flex-column">
                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Ongoing Courses</p>
                    <DataTable  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="max-width: 30rem" dataKey="id" class="shadow-2">
                        <Column field="course" header="Course">
                            <template>
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Top Courses</p>
                    <DataTable  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="course" header="Course">
                            <template>
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Top Instructor</p>
                    <DataTable  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="course" header="Course">
                            <template>
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Top Students</p>
                    <DataTable  paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem" dataKey="id" class="shadow-2">
                        <Column field="course" header="Course">
                            <template>
                                <div class="flex gap-2 align-items-center">
                                    <div class="flex gap-1 flex-column align-items-center">
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                        <h4 class="text-900 font-semibold">lorem</h4>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>

            <div class="flex flex-column gap-4">

                <div class="flex flex-column">
                    <p class="text-900 font-semibold text-2xl">Calander</p>
                    <div class="flex justify-content-center">
                      <Calendar inline showWeek class="calendar" >
                        <!-- for badge calendar -->
                        <template #date="slotProps">
                          <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15"
                            class="flex flex-column justify-content-center align-items-center gap-0">
                            <p>{{ slotProps.date.day }}</p>
                            <Badge value="2" class="badge text-xs flex justify-content-center align-items-center"></Badge>
                          </strong>
                          <template v-else>{{ slotProps.date.day }}</template>
                        </template>
                      </Calendar>
                    </div>
                  </div>

                <div class="flex flex-column gap-2">

                    <div class="flex flex-row gap-2 text-lg align-items-center">
                        <i class="pi pi-calendar text-xl"></i>
                        <p>15-dec-2023</p>
                        <p>(8 activities)</p>
                    </div>

                    <div>
                        <Card>
                            <template #content>
                                <p class="text-lg text-orange-400">08:00 AM - 09:00 AM</p>
                                <p>Plan CRM training sessions</p>
                            </template>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

</style>