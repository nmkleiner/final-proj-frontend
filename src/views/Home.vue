<template>
  <div class="home">
<<<<<<< HEAD
=======
    <h1>Recommended events:</h1>
    <event-list :events="events"></event-list>
>>>>>>> d9c2e12938938eeb4e0300a1ebb7e2cd46935668
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
