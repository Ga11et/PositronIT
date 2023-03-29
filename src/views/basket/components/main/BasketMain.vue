<template>
  <div class="BasketMain">
    <BasketMainItem v-for="item in products" :key="item.id" :content="item" />
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BasketMainItem from './components/BasketMainItem/BasketMainItem.vue'

export default {
  components: { BasketMainItem },
  name: 'BasketMain',
  setup(props) {
    const store = useStore()
    return {
      products: computed(() => store.getters.getBasketProducts),
    }
  },
}
</script>
<style lang="css"></style>
