<template>
  <button :class="['BasketPriceButton', { BasketPriceButton_outlined: type === 'outlined' }]">
    {{ content }}
  </button>
</template>
<script>
export default {
  name: 'BasketPriceButton',
  props: {
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      validator: (value) => {
        return ['outlined', 'fill'].includes(value)
      },
    },
  },
}
</script>
<style lang="css">
.BasketPriceButton {
  border: none;
  border-radius: 4px;
  background-color: #0069b4;
  width: 100%;
  padding: 14px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  color: white;
  transition: 300ms;
}
.BasketPriceButton:hover {
  cursor: pointer;
  background-color: #1774b6;
  transition: 300ms;
}
.BasketPriceButton_outlined {
  background-color: transparent;
  color: #0069b4;
  border: 1px solid #0069b4;
}
.BasketPriceButton_outlined:hover {
  background-color: #dff0fd;
}
</style>
