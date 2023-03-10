<template>
  <div class="detail-main">
   <div class="film" v-if="filmInfo">
    <detail-header class="film-header" v-scroll="50" :class="isHeader?'show-header':''" :isShow="isHeader">
      <div class="film-header-title">{{ filmInfo.name }}</div>
    </detail-header>
    <div class=film-poster :style="{
            backgroundImage:'url('+filmInfo.poster+')'
          }">
    </div >

    <div class="film-detail">
      <div class=" film-detail-name"><span class="name">{{ filmInfo.name }}</span> <span class="item">{{filmInfo.item.name}}</span> <span :class="filmInfo.grade? 'grade':'grade-hide'"><i>{{ filmInfo.grade }}</i>分</span></div>
        <div class="film-detail-content">
          <div class=" film-detail-category">{{ filmInfo.category }}</div>
              <div class="film-detail-date"> {{filmInfo.premiereAt | dateFilter}}上映</div>
              <div class="film-detail-nation-runtime">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
              <div class="film-detail-synopsis" :class="isHidden?'hidden':''">{{filmInfo.synopsis}}</div>
              <div class="toggle"><i class="iconfont icon-xiajiantou" @click="isHidden=!isHidden" :class="isHidden?'':'direction'"></i></div>
        </div>
     </div>

    <div class="film-actors">
        <div class="films-actors-title">演职人员</div>
        <div class="films-actors-list">
          <detail-swiper class="swiper" :perview="4" name="actors">
            <swiper-item v-for="(data,index ) in filmInfo.actors" :key="index" class="swiper-item" >
              <div class="photo" :style="{
                backgroundImage:'url('+data.avatarAddress+')'
              }"></div>
              <div class="name">{{ data.name }}</div>
              <div class="role">{{ data.role }}</div>
            </swiper-item>
          </detail-swiper>
        </div>
    </div>

    <div class="film-photos">
        <div class="films-photos-title "><span>剧照</span ><span class="photos-all"> 全部({{filmInfo.photos.length}})<i class="iconfont icon-xiajiantou"></i></span></div>
        <div class="films-photos-list">
          <detail-swiper class="swiper" :perview="2.5" name="photos">
            <swiper-item v-for="(data,index ) in filmInfo.photos" :key="index" class="swiper-item" >
              <div class="photo" :style="{
                backgroundImage:'url('+data+')'
              }" @click="handPreview()"></div>
            </swiper-item>
          </detail-swiper>
        </div>
    </div>

    <div class="film-goSchedule">
      <a href="#">选择购票</a>
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>

.detail-main{
  padding-bottom: 7rem;
  background: rgba(221, 220, 221, 0.4);
}
.film{
  .show-header{
    background: white;
    color:#2c3e50;
  }
  .film-header{
    .film-header-title{
      font-size: 2.5rem;
      line-height: 5.5rem;
    }
  }
  .film-poster{
    width: 100%;
    height: 26.25rem;
    background-position: center;
    background-size: cover;
  }
  .film-detail{
    padding: 1.5rem 1.875rem 1.875rem;
    background: #fff;
    .film-detail-name{
      .name{
        font-size: 2.5rem;
      }
      .item{
        color: #fff;
          background-color: #d2d6dc;
          padding: 0 .125rem;
          border-radius: .125rem;
          font-size: .1rem;
          margin: .25rem 0  0 .625rem;
      }
      .grade{
        color: #ffb232;
       i{
        font-size: 2.25rem;
       }
        float: right;
      }
      .grad-hide{
        visibility: hidden;
      }
    }
    .film-detail-content{
      font-size: 1.625rem;
      color: #797d82;
      div{
        padding-top:1rem ;
      }
      .film-detail-synopsis{
        margin-top:.25rem
      }
      .hidden{
        height: 4.25rem;
        overflow: hidden;
      }
      .toggle{
        text-align: center;
        padding-top: 0rem;
        .direction{
            display: inline-block;
            &:hover{
              transform: rotate(180deg);
            }
        }
      }
    }
  }
  .film-actors,.film-photos{
    margin-top: 1.25rem;
    background: #fff;
    .films-actors-title,.films-photos-title{
      font-size: 2rem;
      padding: 1.875rem;
      .photos-all{
        font-size: 1.625rem;
        color: #797d82;
        float: right;
        i{
          display: inline-block;
          transform: rotate(270deg);
          font-size:1.875rem;
          position: relative;
          top: .175rem;
          left: -0.4375rem
        }
    }
    }
    .films-actors-list,.films-photos-list{
     .swiper{
      padding:0 1.875rem 1.875rem 1.875rem;
        .swiper-item{
          text-align: center;
          .name{
            margin-top: .75rem
          }
          .role{
            color: #797d82;
          }
          .photo{
            width: 100%;
            height: 9.375rem;
            background-size: cover;
            background-position: center;
          }
        }
      }
    }
  }
  .film-goSchedule{
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    a{
      text-decoration: none;
      color: white;
      display: block;
      background: orangered;
      width: 100%;
      height:6.125rem;
      line-height: 6.125rem;
      text-align: center;
      font-size: 1rem;
    }
  }
}
</style>
<script>
/* 下载 moment 日期模块 */
import http from '@/util/http'
import Vue from 'vue'
import moment from 'moment'
import detailSwiper from '@/components/detail/DetailSwiper.vue'
import swiperItem from '@/components/films/FilmSwiperItem.vue'
import detailHeader from '@/components/detail/DetailHeader.vue'
// 图片预览
import { ImagePreview } from 'vant'

moment.locale('zh-cn')// 设置中文
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.directive('scroll', {
  inserted (el, binding, vnode) {
    /* 第三个参数vnode 用来指向Vue实例 解决自定义指令无法获取vue实例数据问题 */
    // console.log(vnode.context.isHeader)
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > binding.value) {
        vnode.context.isHeader = true
      } else {
        vnode.context.isHeader = false
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})

export default {
  data () {
    return {
      filmInfo: null,
      isHidden: true,
      isHeader: false
    }
  },
  methods: {
    handPreview () {
      ImagePreview({
        images: this.filmInfo.photos,
        closeable: true
      })
    }
  },
  components: {
    detailSwiper,
    swiperItem,
    detailHeader
  },
  created () {
    console.log(this.$route.params.id) // 匹配当前页面路由
    http({
      url: `gateway?filmId=${this.$route.params.id}&k=6481686`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }

  /* axios */
  // 用 axios 利用id发请求到详情接口，获取详细数据，布局页面
}
</script>
