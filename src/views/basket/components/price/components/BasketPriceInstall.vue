<template>
  <div class="BasketPriceInstall">
    <p>Установка</p>
    <p>{{ install ? 'Да' : 'Нет' }}</p>
  </div>
</template>
<script>
export default {
  name: 'BasketPriceInstall',
  props: {
    install: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
<style lang="css">
.BasketPriceInstall {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: #1f2432;
}
</style>
