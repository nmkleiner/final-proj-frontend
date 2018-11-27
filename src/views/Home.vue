<template>
  <div class="home">
  <near-places-map></near-places-map>
    <h1>Recommended events:</h1>
    <event-list :events="events"></event-list>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import eventList from '@/components/event-list.vue'
import navBar from '@/components/nav-bar.vue'

export default {
  name: 'home',
  components: {
    eventList,
    navBar
    // HelloWorld
  },
  computed: {
    events() {
      return this.$store.getters.events
    },
  },
  created() {
    this.$store.dispatch({type: 'loadEvents'})
  },
}
</script>
