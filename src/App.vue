<template>
  <Header />
  <main>
    <Path :path="['Главная', 'Корзина']" />
    <Basket />
    <Similars />
  </main>
</template>
<script>
import Basket from './views/basket/Basket.vue'
import Header from './views/header/Header.vue'
import Path from './views/path/Path.vue'
import Similars from './views/similars/Similars.vue'

export default {
  name: 'App',
  components: { Header, Path, Basket, Similars },
}
</script>
<style lang="css"></style>
