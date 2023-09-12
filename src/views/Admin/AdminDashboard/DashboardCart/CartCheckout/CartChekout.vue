<template>
    <div class="grid px-1 sm:px-3">
        <h1 class="font-medium font-bold text-4xl mb-1 col-12">Checkout</h1>
        <p class="font-medium font-bold text-xl mb-1 pt-3 col-12">Billing Address</p>
        <div class="flex flex-row col-12 align-items-center gap-2">
            <InputText type="text" class="col-9 md:col-11 lg:col-10 xl:col-11 h-4rem md:h-3rem"/>
            <Button size="small" label="CHANGE" outlined class="orange btn-add-intructor col-3 px-0 md:col-1 lg:col-2 xl:col-1 h-3rem md:h-3rem"/>
        </div>
        <Divider class="mx-1 sm:mx-3 my-1"/> 
        <CartItem/>
        <Divider class="mx-1 sm:mx-3 my-1"/>
        <div class="grid col-12">
            <div class="grid col-12 gap-2 align-items-center">
                <i class="pi pi-credit-card suggested-blue text-lg"></i>
                <p class="text-lg font-bold">Payment method</p>
            </div>
            <div class="align-items-center col-12 gap-2">
                <div v-for="method in payment" :key="method.key" class="flex flex-row align-items-center col-12 gap-2">
                    <RadioButton v-model="selectedPayment" :inputId="method.key" name="pizza" :value="method.number" />
                    <i class="pi pi-credit-card suggested-blue text-lg"></i>
                    <label :for="method.key">{{ '(****)-(****)-(****)-(' + method.number.toString().slice(-4) + ')' }}</label>
                </div>
                <div class="flex align-items-center col-12">
                    <RadioButton @click="visible = true"/>
                    <label for="ingredient1" class="ml-2">Pay with another card</label>
                </div>
            </div>

            <Dialog :dismissableMask="true" v-model:visible="visible" modal :style="{ width: '30vw' }" :breakpoints="{ '960px': '90vw' }">
                <template #header>
                    <p class="text-5xl font-bold">Add card</p>
                </template>
                <p class="text-2xl font-bold mt-3">Card detail</p>
                <div class="mt-2">
                    <p>Name on Card</p>
                    <InputText type="text" class="w-full"/>
                </div>
                <div class="mt-2 grid col-12">
                    <p class="col-8">Card number</p>
                    <div class="col-4">
                    </div>
                    <InputText type="text" class="w-full"/>
                </div>
                <div class="grid mt-2">
                    <div class="col-6">
                        <p>Expiry date (MM/YY)</p>
                        <InputText type="text" class="w-full"/>
                    </div>
                    <div class="col-6">
                        <p>CVV</p>
                        <InputText type="text" class="w-full"/>
                    </div>
                    
                </div>
                <p class="text-2xl font-bold mt-2">Address</p>
                <Button size="small" label="Save card" class="col-12 btn-save mb-3"></Button>
            </Dialog>
            
            </div>
        <div class="grid col-12 align-items-center" style="white-space: nowrap;">
            <p class="inter-normal text-4xl black-1 col-7 md:col-9 lg:col-10 font-bold">Total:</p>
            <p class="inter-normal text-4xl black-1 col-3 md:col-3 lg:col-2 font-bold">RM 49.99</p>
        </div>
        <Button size="small" label="COMPLETE CHECKOUT" class="col-12 btn-save" @click="checkoutVisible = true"></Button>
        <Dialog :dismissableMask="true" v-model:visible="checkoutVisible" modal :style="{ width: '30vw' } " :breakpoints="{ '960px': '90vw' }">
            <div class="flex flex-column align-items-center gap-4">
                <img src="/assets/icon/check.png" alt="" style="width: 118px; height: 118px;">
                <p class="text-xl font-bold">Checkout successful</p>
                <p class="text lg font-normal">John Toson bought 2 courses</p>
                <Button size="small" label="Close" class="col-12 btn-complete my-4"></Button>
            </div>
            
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import CartItem from '../CartItem/CartItem.vue'
import { ref } from 'vue';

const visible = ref(false);
const checkoutVisible = ref(false);

const selectedPayment = ref();
const payment = ref([
    { number: 4100310021005678, key: 'A' },
    { number: 4100310021001128, key: 'B' },
]);
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

  .suggested-blue {
    color: #00C0DD;
  }

  .btn-save {
    background-color: #00C0DD;
    border: none;
  }

  .btn-complete {
    background-color: #659872;
    border: none;
  }
</style>