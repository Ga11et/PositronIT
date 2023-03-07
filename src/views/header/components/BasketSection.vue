<template>
  <div class="BasketSection">
    <div class="BasketSection__left">
      <BasketSVG />
    </div>
    <div class="BasketSection__right">
      <h3 class="BasketSection__heading">Ваша корзина</h3>
      <p class="BasketSection__count">{{ count }} товара</p>
      <p class="BasketSection__price">{{ formattedPrice }}</p>
    </div>
  </div>
</template>
<script>
import { BasketServises } from '../../../servises/basketServises'
import BasketSVG from './basketSVG.vue'

export default {
  name: 'BasketSection',
  props: {
    count: {
      type: Number,
      required: true,
    },
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
  components: { BasketSVG },
}
</script>
<style lang="css">
.BasketSection {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 12px;
  height: 50px;
}
.BasketSection__left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.BasketSection__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.BasketSection__heading {
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: #1f2432;
}
.BasketSection__count {
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  color: #797b86;
}
.BasketSection__price {
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  color: #1f2432;
}
</style>
