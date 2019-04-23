<template>
    <div id="test">{{text}}</div>
</template>

<script>
    export default {
        data(){
            return{
                text:'abcde'
            }
        }
    }
</script>

<style scoped>
#test{
    color:mediumvioletred;
}
</style>