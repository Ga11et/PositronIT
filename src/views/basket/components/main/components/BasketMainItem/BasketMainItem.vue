<template>
  <div class="BasketMainItem">
    <img class="BasketMainItem__image" :src="$props.content.image" :alt="$props.content.name" />
    <BasketMainItemDescription :content="$props.content" />
    <BasketMainItemCount :content="$props.content" />
    <div class="BasketMainItem__price">
      {{ formattedPrice }}
    </div>
    <div class="BasketMainItem__delete">
      <button
        class="BasketMainItem__deleteButton"
        :disabled="loading"
        @click.prevent="deleteHandler"
      >
        <DeleteSVG />
      </button>
    </div>
  </div>
</template>
<script>
import BasketMainItemDescription from './components/BasketMainItemDescription.vue'
import BasketMainItemCount from './components/BasketMainItemCount.vue'
import DeleteSVG from './components/DeleteSVG.vue'
import { BasketServises } from '@/servises/basketServises'
import { computed, toRefs } from 'vue'
import { useBasketStore } from '@/store/basket'
export default {
  components: { BasketMainItemCount, BasketMainItemDescription, DeleteSVG },
  name: 'BasketMainItem',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useBasketStore()
    const { content } = toRefs(props)
    return {
      loading: computed(() => store.getLoading),
      formattedPrice: computed(() =>
        BasketServises.formatPrice(content.value.price * content.value.count),
      ),
      deleteHandler: () => store.deleteBasketProduct(content.value.id),
    }
  },
}
</script>
<style lang="css">
.BasketMainItem {
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr 20px;
  gap: 30px;
  padding: 25px 0 25px 25px;
  border-bottom: 1px solid #c4c4c4;
}
.BasketMainItem:last-child {
  border-bottom: none;
}
.BasketMainItem__image {
  display: block;
  width: 100px;
  height: 100px;
}
.BasketMainItem__price {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  color: #1f2432;
}
.BasketMainItem__delete {
  display: flex;
  align-items: flex-start;
}
.BasketMainItem__deleteButton {
  background-color: transparent;
  border: none;
}
.BasketMainItem__deleteButton:hover {
  cursor: pointer;
}
</style>
