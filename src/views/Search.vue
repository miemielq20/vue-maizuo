<template>
    <div>
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @input="onInput" @cancel="onCancel"  />
        <div class="list" v-show="isShow" :style="{
            height:height
        }">
            <cinemas-list :list="computedList" :isShow="isShow"></cinemas-list>
        </div>

        <div class="cinema-init-area" v-show="this.value?false:true" :style="{
            height:height
        }">
            <div class="cinema-init-list">
                <div class="title">离你最近</div>
                <ul class="init-list">
                    <li class="list-item"  v-for="data in computedCityList" :key="data.cinemasId">{{ data.name }}</li>
                </ul>
            </div>
        </div>
        <div class="empty" v-show="this.value?!isShow:isShow">
            <img src="https://assets.maizuo.com/h5/v5/public/app/img/rectangle@2x.2bdf0374.png" alt="">
            <p>没有找到匹配的影院</p>
            <p>提示：仅支持搜索“影院”</p>
            <p>建议您检查输入的影院名称是否有误？</p>
        </div>
    </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import cinemasList from '@/components/cinemas/CinemasList.vue'
import Vue from 'vue'
export default {
    data () {
        return {
            value: '',
            isShow: false,
            height: '0px'
        }
    },
    computed: {
        computedList () {
            return this.$store.state.cinemasList.filter(item => {
               return item.name.toUpperCase().includes(this.value.toUpperCase()) ||
                      item.address.toUpperCase().includes(this.value.toUpperCase())
            })
        },
        computedCityList () {
            return this.$store.state.cinemasList.slice(0, 5)
        }
    },
    methods: {
        onInput () {
            if (this.computedList.length !== 0 && this.value !== '') { this.isShow = true } else {
                this.isShow = false
            }
        },
        onCancel () {
            this.$router.back()
        }
    },
    components: {
    cinemasList
    },
    mounted () {
        if (this.$store.state.cinemasList.length === 0) {
        this.$store.dispatch('getCinemasData', this.$store.state.cityId)
        }

      this.height =
      document.documentElement.clientHeight -
      document.querySelector('.van-search').offsetHeight +
       'px'
    }
}
</script>
<style lang="scss" scoped>
.van-search{
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #ededed;
}
.list,.cinema-init-area{
    padding-top: 5.5rem;
    .cinema-init-list{
        padding: 1.875rem 0 0 0;

        .title{
            font-size: 1.625rem;
            color: #bdc0c5;
            margin-left: 1.875rem;
            margin-top: .625rem;
        }
        .init-list{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .list-item{
                height: 30px;
                background-color: hsla(0,0%,95.7%,.6);
                line-height: 14px;
                border-radius: 3px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 13px;
                padding: 8px 12px;
                margin-top: 1.875rem;
                margin-left: 1.875rem;
            }
        }
    }
}
.empty{
    position: absolute;
    top: 25rem;
    width: 100%;
    text-align: center;
    img{
        width: 11.25rem;
    }
    p{
        font-size: 1.375rem;
        color: #bdc0c5;
        padding-top: .625rem;
    }
}
</style>
