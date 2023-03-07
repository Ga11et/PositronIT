<template>
  <swiper
    :modules="modules"
    :slides-per-view="4"
    :space-between="20"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :pagination="{
      type: 'fraction',
    }"
    navigation
  >
    <swiper-slide v-for="item in multipliedProducts" :key="item.id">
      <SwipeItem :content="item" />
    </swiper-slide>
  </swiper>
</template>
<script>
import SwipeItem from './components/swipeItem/SwipeItem.vue'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  name: 'SimilarsSwiper',
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  computed: {
    multipliedProducts() {
      return [
        ...this.$props.content,
        ...this.$props.content,
        ...this.$props.content,
        ...this.$props.content,
      ]
    },
  },
  components: { SwipeItem, Swiper, SwiperSlide },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, Navigation],
    }
  },
}
</script>
<style lang="css">
.swiper,
.swiper-container {
  overflow: visible;
}
.swiper-button-next,
.swiper-button-prev {
  background-color: #90a2b5;
  fill: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  top: -75px;
}
.swiper-button-prev {
  left: unset;
  right: 150px;
}
.swiper-button-next::after,
.swiper-button-prev::after {
  color: white;
  font-size: 20px;
}
.swiper-pagination.swiper-pagination-fraction.swiper-pagination-horizontal {
  position: absolute;
  top: -85px;
  right: 77px;
  left: unset;
  bottom: unset;
  width: fit-content;
}
.swiper-pagination-current {
  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
  color: #212121;
}
.swiper-pagination-total {
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  color: #797b86;
}
</style>
