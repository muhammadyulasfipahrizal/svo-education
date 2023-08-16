<template>
    <div class="grid col-12 align-items-center justify-content-center md:justify-content-start mx-2 mt-2">
        <img src="/public/assets/img/course/ui-ux-design.png" alt="ui ux design course" 
            class="col-12 md:col-3 md:w-13rem">
        <div class="flex flex-column align-items-center md:align-items-start col-12 md:col-3">
            <p class="text-4xl md:text-2xl font-bold ">UI UX Designing</p>
            <p class="text-2xl md:text-lg font-bold grey ">by David Burn</p>
            <div class="flex flex-row align-items-center gap-2 ">
                <p>4.0</p>
                <i class="pi pi-star-fill text-xs"></i>
                <i class="pi pi-star-fill text-xs"></i>
                <i class="pi pi-star-fill text-xs"></i>
                <i class="pi pi-star-fill text-xs"></i>
                <i class="pi pi-star text-xs"></i>
                <p>(10.000)</p>
            </div>
            <div>
                <p>30 total hours | 10 lectures | Beginners</p>
            </div>
        </div>
        <div class="flex flex-row justify-content-center col-12 md:col-3 gap-2">
            <div class="flex flex-row align-items-center justify-content-center numeric-stepper" style="width: 160px; height: 45px;">
                <i class="pi pi-minus orange" @click="decrement"></i>
                <Divider layout="vertical" />
                <p class="font-bold">{{ stepperValue }}</p>
                <Divider layout="vertical" />
                <i class="pi pi-plus orange" @click="increment"></i>
            </div>
            <Button size="small" label="Remove" outlined class="w-min orange numeric-stepper"/>
        </div>
        <div class="col-12 md:col-3 flex flex-column align-items-center">
            <div class="flex flex-row align-items-center gap-2">
                <p class="text-4xl font-bold">RM 49.99</p>
                <p class="text-lg font-medium cart-coupon">50% off</p>
            </div>
            <p class="text-4xl light-grey line-through">RM 49.99</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stepperValue = ref(0);

const increment = () => {
    stepperValue.value++;
};

const decrement = () => {
  if (stepperValue.value > 0) {
    stepperValue.value--;
  }
};
</script>

<style lang="scss" scoped>
.numeric-stepper {
    border: 1px solid #F1644C;
    border-radius: 5px;
}
.grey {
    color: #9F9F9F;
  }

  .orange {
    color: #E26954;
  }

  .light-grey {
    color: #D9D9D9;
  }

  .cart-coupon {
    background: #E26954;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
  }
</style>