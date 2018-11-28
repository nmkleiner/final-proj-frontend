<template>
  <div class="home">
    <header>
      <p>Find and Play with Other Musicians!</p>
    </header>
    
    <div class="almost-full-events">
      <h2>Grab your place!</h2>
      <event-carousel :events="events"/>
      <p>Show All Events</p>
    </div>
    <div class="rock-events">
      <h2>Rock Sessions for you:</h2>
      <event-carousel :events="rockEventsToShow"/>
      <p>Show All Rock Events</p>
    </div>
    <div class="guitar-events">
      <h2>Guitar Sessions for you:</h2>
      <event-carousel :events="guitarEventsToShow"/>
      <p>Show All Guitar Events</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import nearPlacesMap from '@/components/near-places-map.vue'
import eventList from '@/components/event-list.vue'
import eventPreview from '@/components/event-preview.vue'
import eventCarousel from '@/components/event-carousel.vue'

export default {
  name: 'home',
  components: {
    eventList,
    eventPreview,
    eventCarousel
    // nearPlacesMap
    // HelloWorld
  },
  computed: {
    events() {
      return this.$store.getters.events
    },
    popularEvents() {
      return this.$store.getters.popularEvents
    },
    rockEvents() {
      return this.$store.getters.rockEvents
    },
    guitarEvents() {
      return this.$store.getters.guitarEvents
    },
    rockEventsToShow() {
      if (this.rockEvents.length > 5) {
        return this.rockEvents.slice(0, 5)
      }
    },
    guitarEventsToShow() {
      if (this.guitarEvents.length > 5) {
        return this.guitarEvents.slice(0, 5)
      }
    },
    
  },
  created() {
    // this.$store.dispatch({type: 'loadRockEvents'})
    this.$store.dispatch({type: 'loadEvents'})
  },
}
</script>
