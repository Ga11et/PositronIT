<template>
  <aside class="BasketPrice">
    <h3 class="BasketPrice__heading">Итого</h3>
    <div class="BasketPrice__values">
      <BasketPriceValue :price="price" />
      <BasketPriceCount :count="count" />
      <BasketPriceInstall :install="install" />
    </div>
    <BasketPriceDevider />
    <BasketPriceValueFinal :price="price" />
    <div class="BasketPrice__buttons">
      <BasketPriceButton @click.prevent="sumbitHandler" content="Оформить заказ" type="fill" />
      <BasketPriceButton @click.prevent="sumbitHandler" content="Купить в 1 клик" type="outlined" />
    </div>
  </aside>
</template>
<script>
import { computed } from 'vue'
import { useBasketStore } from '@/store/basket'
import BasketPriceButton from './components/BasketPriceButton.vue'
import BasketPriceCount from './components/BasketPriceCount.vue'
import BasketPriceDevider from './components/BasketPriceDevider.vue'
import BasketPriceInstall from './components/BasketPriceInstall.vue'
import BasketPriceValue from './components/BasketPriceValue.vue'
import BasketPriceValueFinal from './components/BasketPriceValueFinal.vue'
export default {
  components: {
    BasketPriceDevider,
    BasketPriceValue,
    BasketPriceCount,
    BasketPriceInstall,
    BasketPriceValueFinal,
    BasketPriceButton,
  },
  name: 'BasketPrice',
  setup(props) {
    const store = useBasketStore()
    return {
      price: computed(() => store.getPrice),
      count: computed(() => store.getCount),
      install: computed(() => store.getShouldInstall),
      sumbitHandler: () => store.buyProducts(),
    }
  },
}
</script>
<style lang="css">
.BasketPrice {
  background-color: #f6f8fa;
  border-radius: 5px;
  padding: 30px 35px;
  height: fit-content;
}
.BasketPrice__heading {
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
  color: #1f2432;
  padding-bottom: 30px;
}
.BasketPrice__values {
  display: grid;
  gap: 18px;
  padding: 0 0 30px;
}
.BasketPrice__buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
