<template>
    <section class="real-app">
        <input type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下来要去做什么？"
        @keyup.enter="addTodo"
        >
        <Item :todo="todo"></Item>
        <tabs :filter="filter"></tabs>
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'

    export default{
        data(){
            return{
                todo:{
                    id:0,
                    content:'This is zero',
                    completed:false,
                },
                filter:'all'
            }
        },
        components:{
          Item,Tabs,
        },
        methods:{
            addTodo(){}
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