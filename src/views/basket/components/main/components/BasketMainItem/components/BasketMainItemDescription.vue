<template>
  <div class="BasletMainItemDescription">
    <h3 class="BasletMainItemDescription__heading">{{ content.name }}</h3>
    <p class="BasletMainItemDescription__description">{{ content.techDescription }}</p>
    <p class="BasletMainItemDescription__articul">Артикул: {{ content.articul }}</p>
  </div>
</template>
<script>
export default {
  name: 'BasletMainItemDescription',
  props: {
    content: {
      type: Object,
      requred: true,
    },
  },
}
</script>
<style lang="css">
.BasletMainItemDescription {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
.BasletMainItemDescription__heading {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  color: #1f2432;
}
.BasletMainItemDescription__description {
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: #2c3242;
}
.BasletMainItemDescription__articul {
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: #797b86;
}
</style>
