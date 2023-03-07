<template>
  <div class="SwipeItem">
    <img class="SwipeItem__image" :src="$props.content.image" :alt="$props.content.name" />
    <SwipeItemDescription :content="$props.content" />
    <SwipeItemPrice :content="$props.content" />
    <button class="SwipeItem__more" @click.prevent="moreHandler">Подробнее</button>
  </div>
</template>
<script>
import SwipeItemDescription from './components/SwipeItemDescription.vue'
import SwipeItemPrice from './components/SwipeItemPrice.vue'

export default {
  name: 'SwipeItem',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  methods: {
    moreHandler() {
      console.log('Вы кликнули на кропку "Подробнее"')
    },
  },
  components: { SwipeItemDescription, SwipeItemPrice },
}
</script>
<style lang="css">
.SwipeItem {
  padding: 25px;
  background-color: #f6f8fa;
  border-radius: 5px;
  max-width: 300px;
}
.SwipeItem__image {
  display: block;
  width: 100%;
}
.SwipeItem__more {
  width: 100%;
  margin-top: 20px;
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
.SwipeItem__more:hover {
  cursor: pointer;
  background-color: #1774b6;
  transition: 300ms;
}
</style>
