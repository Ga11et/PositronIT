<template>
  <section class="Similars">
    <h2 class="Similars__heading">Просмотренные товары</h2>
    <SimilarsSwiper :content="products" />
  </section>
</template>
<script>
import SimilarsSwiper from './components/swiper/SimilarsSwiper.vue'

export default {
  name: 'Similars',
  computed: {
    products() {
      return this.$store.getters.getAllProducts
    },
  },
  components: { SimilarsSwiper },
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
