<template>
  <div class="BasketPriceValue">
    <p>Сумма заказа</p>
    <p>{{ formattedPrice }}</p>
  </div>
</template>
<script>
import { BasketServises } from '../../../../../servises/basketServises'

export default {
  name: 'BasketPriceValue',
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      return BasketServises.formatPrice(this.$props.price)
    },
  },
}
</script>
<style lang="css">
.BasketPriceValue {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: #1f2432;
}
</style>
