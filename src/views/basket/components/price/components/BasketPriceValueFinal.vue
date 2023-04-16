<template>
  <div class="BasketPriceValueFinal">
    <p>Стоимость товаров</p>
    <p class="BasketPriceValueFinal__value">{{ formattedPrice }}</p>
  </div>
</template>
<script>
import { computed, toRefs } from 'vue'
import { BasketServises } from '@/servises/basketServises'

export default {
  name: 'BasketPriceValue',
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { price } = toRefs(props)
    return {
      formattedPrice: computed(() => BasketServises.formatPrice(price.value)),
    }
  },
}
</script>
<style lang="css">
.BasketPriceValueFinal {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  color: #1f2432;
}
.BasketPriceValueFinal__value {
  font-size: 26px;
  line-height: 26px;
  font-weight: 700;
}
</style>
