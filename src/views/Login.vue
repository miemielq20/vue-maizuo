<template>
    <div>
        <button @click="handLogin()">
            登录
        </button>
    </div>
</template>
<script>
export default {
  methods: {
    handLogin () {
      localStorage.setItem('token', 'aaa')
      // 1.获取query字段
      // 2.跳转到当时想去的页面
      console.log(this.$route.query.redirect)
      this.$router.push(this.$route.query.redirect)
    }
  }
}
</script>
