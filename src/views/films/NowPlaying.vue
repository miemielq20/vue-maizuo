<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <van-cell v-for="data in datalist" :key="data.filmId" @click="handChangePage(data.filmId)">
        <img :src="data.poster">
        <div class="nowPlayingFilm-info">
          <div class="nowPlayingFilm-info-name" v-if="datalist"><span class="name">{{ data.name }}</span><span class="item">{{
            data.item.name }}</span></div>
          <div class="nowPlayingFilm-info-grade"><span :class="data.grade?'grade':'grade hidden'"> 观众评分  <span>{{ data.grade }}</span> </span></div>
          <div class="nowPlayingFilm-info-actor"><span>主演：{{ data.actors | actorFilter }}</span></div>
          <div><span>{{ data.nation }}</span> | <span>{{ data.runtime }}分钟</span></div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
.van-list {
  .van-cell{
    overflow: hidden;
    padding: 1.875rem;
    line-height: 3rem;
    background-color: #fff;
    img {
      width: 8.25rem;
      float: left;
    }

    .nowPlayingFilm-info {
      font-size: 1rem;
      color: #797d82;
      padding-left: 9rem;

      .nowPlayingFilm-info-name {
        font-size: 2rem;
        color: black;
        display: flex;
        align-items: center;
        .item {
          color: #fff;
          background-color: #d2d6dc;
          padding: 0 .125rem;
          border-radius: .125rem;
          font-size: .1rem;
          margin: .25rem 0  0 .625rem;

        }
      }

      .nowPlayingFilm-info-grade {
        .grade {
          span{
            color: orange;
          }
        }
        .hidden{
          visibility: hidden;
        }
      }

      .nowPlayingFilm-info-actor {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
<script>
import http from '@/util/http'
import Vue from 'vue'
// List 列表

Vue.filter('actorFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=1030751`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    handChangePage (id) {
      console.log(id)
      /* 编程式导航 */
      /* location.href = '#/detail' */
      /* 1.通过路径跳转 */
      // this.$router.push(`/detail/${id}`)

      /* 2.通过命名路由跳转 */
      this.$router.push({
        name: 'myDetail',
        params: {
          id
        }
      })
    },
    onLoad () {
      // 总长度 禁用 懒加载
      // console.log(this.datalist.length, this.total)
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      http({
      url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=1030751`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.datalist = [...this.datalist, ...res.data.data.films]
      /* loading 主动设置为false */
      this.loading = false
    })
    }
  }
}
</script>
