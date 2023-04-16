<template>
  <section class="Similars">
    <h2 class="Similars__heading">Просмотренные товары</h2>
    <SimilarsSwiper :content="products" />
  </section>
</template>
<script>
import { computed } from 'vue'
import { useProductsStore } from '../../store/products'
import SimilarsSwiper from './components/swiper/SimilarsSwiper.vue'

export default {
  components: { SimilarsSwiper },
  name: 'Similars',
  setup(props) {
    const store = useProductsStore()
    return {
      products: computed(() => store.getAllProducts),
    }
  },
}
</script>
<style lang="css">
.Similars {
  padding-top: 10px;
  width: calc(1440px - 160px);
  margin: 0 auto 100px;
  overflow: hidden;
}
.Similars__heading {
  font-size: 30px;
  line-height: 30px;
  font-weight: 600;
  color: #1f2432;
  padding-bottom: 60px;
}
</style>
