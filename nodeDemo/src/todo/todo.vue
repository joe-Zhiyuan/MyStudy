<template>
    <section class="real-app">
        <input type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下来要去做什么？"
        @keyup.enter="addTodo"
        >
        <Item
                :todo="todo"
                v-for="todo in filterTodos"
                :key="todo.id"
                @del="deleteTodo"
        />
        <tabs
                :filter="filter"
                :todos="todos"
                @toggle="toggleFilter"
                @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'

    let id = 0;
    export default{
        //尽量把数据放在底层操作 不要放在子组件中 会导致错误
        data(){
            return{
                todos:[],
                filter:'all'
            }
        },
        components:{
          Item,Tabs,
        },
        computed:{
            filterTodos(){
                if(this.filter === 'all'){
                    return this.todos;
                }
                //判断点击的是已做过true----active 还是没做过的 false----completed
                const completed = this.filter === 'completed';
                //completed:true 过滤属性 判断是对的返回
                return this.todos.filter(todo => completed === todo.completed);
            }
        },
        methods:{
            addTodo(e){
                this.todos.unshift({
                    id: id++,
                    // trim()去除字符两边的空格
                    content: e.target.value.trim(),
                    completed: false,
                })
                e.target.value = ''
            },
            deleteTodo(id){
                // findIndex查找id所在位置 剪除1个节点
                this.todos.splice(this.todos.findIndex(todo => todo.id === id),1);
            },
            toggleFilter(state){
                this.filter = state;
            },
            clearAllCompleted(){
                // 清除完成的项目todo.completed = false的挑选出来重新 === this.todos数组中
                this.todos = this.todos.filter(todo => !todo.completed);
            },
        }
    }
</script>

<style scoped>
.real-app{
    width :600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
}
.add-input{
    position: relative;
    margin :0;
    width :100%;
    font-size :24px;
    /*font-family: inherit; 文字向上罪魁祸首*/
    font-weight: inherit;
    line-height: 1.4em;
    vertical-align: middle;
    border :none;
    outline: none;
    color :inherit;
    box-sizing :border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 36px;
    border: none;
    box-shadow :inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>