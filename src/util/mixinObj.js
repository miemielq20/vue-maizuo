const obj = {
    mounted () {
        this.$store.commit('hide')
    },
    destroyed () {
        this.$store.commit('show')
    }
}

export default obj
