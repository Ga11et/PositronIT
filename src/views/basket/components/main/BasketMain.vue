<template>
  <div class="BasketMain">
    <BasketMainItem v-for="item in products" :key="item.id" :content="item" />
  </div>
</template>
<script>
import { computed } from 'vue'
import { useBasketStore } from '../../../../store/basket'
import BasketMainItem from './components/BasketMainItem/BasketMainItem.vue'

export default {
  components: { BasketMainItem },
  name: 'BasketMain',
  setup(props) {
    const store = useBasketStore()
    return {
      products: computed(() => store.getBasketProducts),
    }
  },
}
</script>
<style lang="css"></style>
