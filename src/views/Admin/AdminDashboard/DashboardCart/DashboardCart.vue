<template>
    <div class="grid px-1 sm:px-3">
        <h1 class="hidden md:block font-medium font-bold text-4xl mb-1 px-2 sm:px-5 col-12">Cart</h1>
        <p class="font-medium font-bold text-xl mb-1 pt-3 col-12">1 item in cart</p>
        <Divider class="mx-1 sm:mx-3 my-1"/>
        <CartItem/>
        <Divider class="mx-1 sm:mx-3 my-1"/>
        <div class="grid col-12">
            <p class="text-xl md:text-lg font-bold col-12">Promotions</p>
            <div class="flex flex-row align-items-center col-12 gap-1" v-for="(promo, index) in promoData" :key="index">
                <i class="pi pi-times-circle" @click="removePromo(index)"></i>
                <p class="font-bold orange">{{ promo.name }}</p>
                <p>is applied</p>
            </div>
            <div class="flex flex-row col-12 align-items-center gap-2">
                <InputText type="text" class="col-10 md:col-11" v-model="userInput" style="background: #EEEEEE"/>
                <Button size="small" label="APPLY" outlined class="w-max orange btn-add-intructor" @click="addPromoData" />
            </div>
        </div>
        <div class="grid col-12 align-items-center">
            <p class="text-4xl col-8 md:col-10 font-bold">Total:</p>
            <p class="text-4xl col-4 md:col-2 font-bold">RM 49.99</p>
        </div>
        <a href="cart/checkout" class="col-12"><Button size="small" label="CHECKOUT" class="col-12 btn-save"></Button></a>
    </div>
</template>

<script setup lang="ts">
import CartItem from './CartItem/CartItem.vue'
import { ref } from 'vue';

interface PromoData {
  name: string;
}

const promoData = ref<PromoData[]>([
  {
    name: 'MOREPROMO',
  },
]);

const userInput = ref('');
const promoInput = ref(false)

const addPromoData = () => {
  if (userInput.value.trim() !== '') {
    const newPromoData = {
      name: userInput.value,
    };
    promoData.value.push(newPromoData);
    promoInput.value = false;
    userInput.value = '';
  }
};

const addInstructor = () => {
  promoInput.value = true
}

const removePromo = (index: number) => {
  promoData.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.grey {
    color: #9F9F9F;
  }

  .orange {
    color: #E26954;
  }

  .light-grey {
    color: #D9D9D9;
  }

  .btn-save {
    background-color: #00C0DD;
    border: none;
  }
</style>