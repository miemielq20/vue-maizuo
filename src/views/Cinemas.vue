<template>
  <div class="cinemas">
    <van-nav-bar title="影院" @click-left="handLeft" @click-right="handRight">
      <template #left>
        {{ cityName }} <van-icon name="arrow-down"  size="6" color="black" />
      </template>
      <template #right>
        <van-icon class-prefix="iconfont icon-search" size="18"  color="black"/>
      </template>
  </van-nav-bar>
    <div class="list" :style="{
      height: height
    }">
    <cinemas-list :list="cinemasList" ></cinemas-list>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cinemas {
  background: rgba(221, 220, 221, 0.4);
  .list {
    overflow: hidden;
    position: relative;
  }
}
</style>
<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
import cinemasList from '@/components/cinemas/CinemasList.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import obj from '@/util/mixinObj'
export default {
  mixins: [obj],
  data () {
    return {
      datalist: [],
      height: '0px'
    }
  },
  computed: {
    ...mapState(['cinemasList', 'cityId', 'cityName'])
  },
  components: {
    cinemasList
  },
  methods: {
    ...mapActions(['getCinemasData']),
    ...mapMutations(['clearCinemasList']),
    handLeft () {
      this.$router.push('/city')

      /* 清空cinemasList */
      this.clearCinemasList()
    },
    handRight () {
      this.$router.push('/cinemas/search')
    }
  },
  mounted () {
    // 动态结算高度
    this.height =
      document.documentElement.clientHeight -
      document.querySelector('.van-nav-bar').offsetHeight -
      document.querySelector('.footer-nav').offsetHeight +
       'px'

    // 分发
    if (this.$store.state.cinemasList.length === 0) {
      this.getCinemasData(this.cityId).then(res => {
        /* 需要在异步请求结束后执行 */
        this.$nextTick(() => {
        new BetterScroll('.list', {
          scrollbar: {
            fade: true
          }
        })
      })
      })
    } else {
      /* 缓存后也要调用一次 */
      this.$nextTick(() => {
        new BetterScroll('.list', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  }
}
</script>
