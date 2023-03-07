<template>
  <header class="Header__head">
    <div class="Header__placeholder">
      <button class="Header__addProduct" :disabled="loading" @click.prevent="addHandler">
        Добавить случайный продукт в корзину
      </button>
    </div>
    <BasketSection :count="count" :price="price" />
  </header>
</template>
<script>
import BasketSection from './components/BasketSection.vue'

export default {
  name: 'Header',
  components: { BasketSection },
  computed: {
    price() {
      return this.$store.getters.getPrice
    },
    count() {
      return this.$store.getters.getCount
    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  methods: {
    addHandler() {
      this.$store.dispatch('addBasketProduct')
    },
  },
}
</script>
<style lang="css">
.Header__head {
  padding: 0 80px;
  display: grid;
  grid-template-columns: 1fr 140px;
  grid-template-rows: 100px;
  align-items: center;
}
.Header__addProduct {
  border: none;
  border-radius: 4px;
  background-color: #0069b4;
  padding: 14px 25px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  color: white;
  transition: 300ms;
}
.Header__addProduct:hover {
  cursor: pointer;
  background-color: #1774b6;
  transition: 300ms;
}
</style>
