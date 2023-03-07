<template>
  <div class="BasketPriceCount">
    <p>Количество</p>
    <p>{{ count }} шт</p>
  </div>
</template>
<script>
export default {
  name: 'BasketPriceCount',
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style lang="css">
.BasketPriceCount {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  color: #1f2432;
}
</style>
