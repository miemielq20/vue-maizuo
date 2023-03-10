<template>
    <ul>
        <router-link to="/films/nowplaying" custom v-slot='{navigate,isActive}'>
          <li @click="navigate">
            <span :class="isActive?'hotActive':''" >正在热映</span>
           </li>
        </router-link>

        <router-link to="/films/comingsoon" custom v-slot='{navigate,isActive}'>
          <li @click="navigate">
            <span :class="isActive?'hotActive':''">即将上映</span>
            </li>
        </router-link>
    </ul>
</template>
<style lang="scss" scoped>
  .hotActive{
    color: #ff5f16;
    border-bottom: 2px #ff5f16 solid;
  }
  ul{
    display: flex;
    height: 4.375rem;
    list-style:none;

    li{
      flex: 1;
      text-align: center;
      line-height: 4.375rem;
      span{
        display:inline-block;
        height: 4.375rem;
        box-sizing: border-box;
      }
    }
  }
</style>
