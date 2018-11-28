<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>  
    <footer>I Am Footer</footer>
  </div>
</template>

<script>

import navBar from '@/components/nav-bar.vue'
export default {
  components: {
    navBar,
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
