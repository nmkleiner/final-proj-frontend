<template>
  <div class="home">
    <h1>Recommended events:</h1>
    <event-list :events="events"></event-list>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import eventList from '@/components/event-list.vue'

export default {
  name: 'home',
  components: {
    eventList
    // HelloWorld
  },
  computed: {
    events() {
      this.$store.getters.events
    },
  },
  created() {
    this.$store.dispatch({type: 'loadEvents'})
  },
}
</script>
