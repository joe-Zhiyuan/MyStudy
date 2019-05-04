<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './todo/header.vue'
    import Footer from './todo/footer.jsx'
    import Todo from './todo/todo.vue'
    export default {
        components:{
            Header,Footer,Todo,
        }
    }
</script>

<style lang="stylus" scoped>
/*scoped 样式只匹配本页面本组件 其他页面同样样式名css不会影响元素*/
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
#cover
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity 0.7
    z-index -1
</style>