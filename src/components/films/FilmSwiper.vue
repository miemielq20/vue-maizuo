<template>
    <div class="swiper kerwin" >
        <div class="swiper-wrapper" >
           <slot></slot>
        </div>
        <div class="swiper-pagination filmsSwiperSpan"></div>
    </div>
</template>
<script>

import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    console.log('mounted')
    /* 初始化swiper */
    /* 安装swiper npm i --save swiper */
    new Swiper('.kerwin', {
      loop: this.loop, // 循环模式选项
      /* 自动播放 */
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      /* 分页器 */
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
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
