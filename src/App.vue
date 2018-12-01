<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>  
    <msg-msg></msg-msg>
    <footer>I Am Footer</footer>
  </div>
</template>

<script>

import navBar from '@/components/nav-bar.vue'
// import msgMsg from '@/components/msg-msg.vue'
export default {
  components: {
    navBar,
    // msgMsg
  }
}
</script>

<style lang="scss">
#app{

  footer {
    color: white;
    background-color: dimgray;
    padding: 100px;
    width: 100%;
    }
}
</style>
