<template>
  <div id="app">
      <transition :name="type">
        <router-view/>
      </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data:function(){
    return{
      type:'vux-pop-nor'
    }
  },
  mounted:function(){
    // console.log(this.$router);
    this.$gob.router = this.$router;
    // console.log(this.$gob.router)
  }
}
</script>

<style lang="less">
.el-message{
  top: 10%;
}
*{
  margin: 0px;
  padding: 0px;
}
a{
  color: #333;
  text-decoration: underline;
}
body{
  background: #f9f9f9;
  color: #333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.vux-pop-nor-enter-active,
.vux-pop-nor-leave-active{
    will-change: transform;
    transition: all 350ms;
}
.vux-pop-nor-enter{
    will-change: transform;
    opacity: 0;
}
.vux-pop-nor-leave-active{
    will-change: transform;
    opacity: 0;
}
</style>
