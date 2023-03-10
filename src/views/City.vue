<template>
    <div>
        <van-nav-bar title="当前城市" :fixed="true" :z-index="999" :placeholder="true">
            <template #left>
                <van-icon name="cross" size="20"  color="black" @click="handBack"/>
            </template>
        </van-nav-bar>
        <van-search v-model="value" placeholder="输入城市或拼音"  :show-action="isSearchBtnShow"  @search="onSearch" @cancel="onCancel" @focus="isSearchBtnShow=true" />
        <div class="recommend-city">
            <div class="hot-city" >
                <div class="hot-city-title">热门城市</div>
                <div class="city-item-detail">
                    <div class="city-item-text" v-for="data in hotCity" :key="data.cityId" @click="handClick(data)">{{ data.name }}</div>
                </div>
            </div>
        </div>

        <div>
            <van-index-bar :index-list="computedList" @change="handChange">
                <div v-for="data in datalist"  :key="data.type">
                    <van-index-anchor :index="data.type" />
                    <van-cell v-for="item in data.list"  :title="item.name" :key="item.cityId" @click="handClick(item)"/>
                </div>
            </van-index-bar>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.van-search{
    width: 100%;
    position: fixed;
    top: 5.75rem;
    z-index: 999;
}
.recommend-city{
    background: white;
    padding-top:6.75rem;
    .hot-city{
        height: 15rem;
        padding: 0 2.125rem 0 1.875rem;
        .hot-city-title{
            font-size: 1.625rem;
            color: #797d82;
        }
        .city-item-detail{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap:wrap;
            padding-right: 1.5rem;
            padding-left: 1.5rem;
            .city-item-text {
                width:30%;
                height: 3.75rem;
                line-height: 3.75rem;
                font-size: 1.75rem;
                text-align: center;
                background-color: #f4f4f4;
                margin-top: 1.875rem
            }
        }
    }
}

</style>>
<script>
import http from '@/util/http'
import Vue from 'vue'
import { Toast } from 'vant'
import obj from '@/util/mixinObj'

/* Vue.filter('hotFilter', (date) => {
    return date.cityId === 341000
}) */
export default {
    data () {
        return {
            datalist: [],
            hotCity: [],
            value: '',
            isSearchBtnShow: false
        }
    },
    computed: {
        /* 把空的城市数据索引去掉 */
        computedList () {
            return this.datalist.map(item => item.type)
        }
    },
    mounted () {
        http({
            url: 'gateway?&k=3727970',
            headers: {
                'X-Host': 'mall.film-ticket.city.list'
            }
            }).then(res => {
                this.renderCity(res.data.data.cities)
                this.computedHotList(res.data.data.cities)
            })
        },
        methods: {
            handClick (item) {
                // 传统的多页面方案
                // 1.location.href='#/cinemas?cityname='+item.name
                // cookie localStrong

                // 单页面方案
                // 1.中间人模式
                // 2.bus事件总线 $on $emit

                /* vuex-状态管理模式 */

               /*  this.$store.state.cityName = item */
                this.$store.commit('changeCityName', item.name)
                this.$store.commit('changeCityId', item.cityId)
                this.$router.push('/films')
            },
            handBack () {
                this.$router.back()
            },
            handChange (data) {
             Toast(data)
            },
            /* 将城市数据按照拼音排序筛选 */
          renderCity (List) {
            console.log(List)
            /* 创建26个字母 */
           const arr = []
           for (let i = 65; i < 91; i++) {
                arr.push(String.fromCharCode(i))
           }
           /* 排序 */
           arr.forEach(Litter => {
                const newList = List.filter(item => {
                return item.pinyin.toUpperCase().substring(0, 1) === Litter
                })

                if (newList.length !== 0) {
                    this.datalist.push({
                        type: Litter,
                        list: newList
                    })
                }
           })
         },

         computedHotList (List) {
         const newHotList = List.filter(item => {
                return item.isHot === 1
            })
            this.hotCity = newHotList
        },
        onSearch (val) {
            console.log(val)
        },
        onCancel () {
           this.isSearchBtnShow = false
        }

        }

    }

</script>
