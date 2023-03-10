<template>
    <div class="swiper" :class="name" >
        <div class="swiper-wrapper" >
           <slot></slot>
        </div>
    </div>
</template>
<script>

import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    perview: {
      type: Number,
      default: 1
    },
    name: {
        type: String,
        default: ''
    }
  },
  mounted () {
    console.log('mounted')
    new Swiper('.' + this.name, {
        slidesPerView: this.perview,
        spaceBetween: 15,
        freeMode: true
    })
  }
}
</script>

<style lang="scss">
.filmsSwiperSpan{
  span{
    width: 1.25rem;
    height: 1.25rem;
  }

}
</style>
