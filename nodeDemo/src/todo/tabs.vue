<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <span
                v-for="state in states"
                :key="state"
                :class="[state,filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear completer</span>
    </div>
</template>

<script>
    // 是export default 不能写错 低级错误！！！
    export default{
        props:{
            filter:{
                type:String,
                required:true,
            },
            todos:{
                true: Array,
                required:true,
            }
        },
        data(){
            return{
                states:['all','active','completed']
            }
        },
        computed:{
            unFinishedTodoLength(){
                return this.todos.filter(todo => !todo.completed).length;
            }
        },
        methods:{
            clearAllCompleted(){
                this.$emit('clearAllCompleted');
            },
            toggleFilter(state){
                this.$emit('toggle',state);
            },
        }
    }
</script>

<style lang="stylus" scoped>
.helper
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #fff
    font-size 14px
    vertical-align middle
    font-smoothing antialiased
.left,.clear,.tabs
    padding 0 10px
.left .clear
    width 150px
.left
    text-align center
.clear
    text-align right
    cursor pointer
.tabs
    width  200px
    display flex
    justify-content space-between
    *
        display inline-block
        /*pading 出错 不要犯低级错误！！！*/
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived
            border-color rgba(175,47,47,0.4)
            border-radius 5px

</style>