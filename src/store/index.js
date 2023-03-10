import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
/*  cnpm i --save vuex-persistedstate 安装vex可持久模块 */
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  /* state 公共状态  */
  state: {
    cityId: 310100,
    cityName: '上海',
    cinemasList: [],
    isTabbarShow: false
  },
  getters: {
  },
  /* 统一管理 转态改变被devtools监控 */
  /* 不能写异步 */
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemasList (state, data) {
      state.cinemasList = data
    },
    clearCinemasList (state, data) {
      state.cinemasList = []
    },
    show (state) {
      state.isTabbarShow = false
    },
    hide (state) {
      state.isTabbarShow = true
    }
  },
  /* 同步和异步请求 */
  actions: {
    getCinemasData (store, cityId) {
     return http({
        url: `gateway?cityId=${cityId}&ticketFlag=1&k=3727970`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        store.commit('changeCinemasList', res.data.data.cinemas)
      })
    }
  },
  modules: {
  }
})

/* vuex 管理保存公共状态 （分散在各个组件的状态，统一管理） */

// 注意：
// vuex 默认是管理在内存 一刷新页面，公共状态就丢失了
// vuex 持续化-todo

// vuex 项目应用
// 1.非父子的通信
// 2.后端数据的缓存快照，减少数据重复请求，减轻服务器的 压力 提高用户体验
