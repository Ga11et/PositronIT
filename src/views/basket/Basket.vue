<template>
  <section class="Basket">
    <BasketHead />
    <div class="Basket__placeholder"></div>
    <BasketMain />
    <BasketPrice class="Basket__price" />
    <BasketInstall />
  </section>
</template>
<script>
import BasketHead from './components/head/BasketHead.vue'
import BasketInstall from './components/install/BasketInstall.vue'
import BasketMain from './components/main/BasketMain.vue'
import BasketPrice from './components/price/BasketPrice.vue'

export default {
  components: { BasketHead, BasketMain, BasketPrice, BasketInstall },
  name: 'Basket',
}
</script>
<style lang="css">
.Basket {
  padding: 30px 80px;
  display: grid;
  grid-template-columns: 1fr 425px;
  column-gap: 55px;
  row-gap: 30px;
}
.Basket__placeholder {
  grid-column: 2/3;
  grid-row: 1/2;
}
.Basket__price {
  grid-column: 2/3;
  grid-row: 2/5;
}
</style>
