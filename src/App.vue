<template>
  <div id="box">
    <!--a标签 声明式导航 -->
    <!-- href.location 是编程式导航 -->
    <!-- vue router 声明式导航  -->
    <!-- <router-link to="/films/nowplaying" custom v-slot='{navigate,isActive}'>
          <li @click="navigate" :class="isActive?'bottomActive':''">
          最新电影</li>
    </router-link>

    <router-link to="/films/comingsoon" custom v-slot='{navigate,isActive}'>
          <li @click="navigate" :class="isActive?'bottomActive':''">
          即将上线</li>
    </router-link> -->
    <!-- 路由容器 -->
    <router-view></router-view>
    <tabbar v-show="$store.state.isTabbarShow"></tabbar>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
.van-toast--text{
        min-width: 3.75rem;
    }
</style>
<script>
import '@/assets/iconfont/iconfont.css'
import tabbar from './components/Tabbar.vue'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
export default {
  data () {
    return {
      navShow: true
    }
  },
  components: {
    tabbar
  }
}
</script>
