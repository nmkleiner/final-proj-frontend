<template>
  <div class="home">
  <!-- <nav-bar></nav-bar> -->
  <!-- <near-places-map></near-places-map> -->
    <h1>Recommended events:</h1>
    <event-list :events="events"></event-list>
  </div>
</template>

<script>
// @ is an alias to /src
import eventList from '@/components/event-list.vue'
import navBar from '@/components/nav-bar.vue'
import nearPlacesMap from '@/components/near-places-map.vue'

export default {
  name: 'home',
  components: {
    eventList,
    navBar,
    nearPlacesMap
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
