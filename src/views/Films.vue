<template>
    <div class="main">
       <film-swiper :loop="true" :key="datalist.length" >
          <film-swiper-item v-for="data in datalist" :key="data.id" class="filmSwiperItem">
            <img :src="data.imgUrl" alt="">
          </film-swiper-item>
       </film-swiper>
       <film-header class="sticky"></film-header>
        <router-view></router-view>
    </div>
</template>
<style lang="scss">
.main{
 padding-bottom: 6.85rem;
 background: rgba(221, 220, 221, 0.4);
}

.filmSwiperItem{
  width: 25rem;
  img{
    width: 100%;
  }
}
.sticky{
  position: sticky;
  top: 0;
  background: white;
}
</style>
<script>
import filmSwiper from '@/components/films/FilmSwiper.vue'
import filmSwiperItem from '@/components/films/FilmSwiperItem.vue'
import FilmHeader from '@/components/films/FilmHeader.vue'
import axios from 'axios'
import obj from '@/util/mixinObj'
export default {
  mixins: [obj],
  data () {
    return {
      datalist: []
    }
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    FilmHeader
  },
  mounted () {
    axios.get('/banner.json').then(res => {
      console.log(res.data.banner)
      this.datalist = res.data.banner
    })
  }
}
</script>
