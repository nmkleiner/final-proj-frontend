<template>
  <div class="home">
    <header>
      <p>Find and Play with Other Musicians!</p>
    </header>
    
    <div class="almost-full-events">
      <h2>Almost fill grab your place!</h2>
      <event-carousel :events="events"/>
      <a>Show All Events</a>
    </div>
    <div class="rock-events">
      <h2>Rock Sessions for you:</h2>
      <event-carousel :events="rockEventsToShow"/>
      <a>Show All Rock Events</a>
    </div>
    <div class="guitar-events">
      <h2>Guitar Sessions for you:</h2>
      <event-carousel :events="guitarEventsToShow"/>
      <a>Show All Guitar Events</a>
      <!-- {{guitarEventsToShow}} -->
    </div>
    <div class="reggae-events">
      <h2>Reggae Sessions for you:</h2>
      <event-carousel :events="guitarEventsToShow"/>
      <a>Show All Reggae Events</a>
      <!-- {{guitarEventsToShow}} -->
    </div>
    <div class="world-music-events">
      <h2>World Music Sessions for you:</h2>
      <event-carousel :events="guitarEventsToShow"/>
      <a>Show All World Music Events</a>
      <!-- {{guitarEventsToShow}} -->
    </div>
    <div class="progressive-rock-events">
      <h2>Progressive Rock Sessions for you:</h2>
      <event-carousel :events="guitarEventsToShow"/>
      <a>Show All Progressive Rock Events</a>
      <!-- {{guitarEventsToShow}} -->
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
      if (this.rockEvents.length > 6) {
        return this.rockEvents.slice(0, 6)
      }
    },
    guitarEventsToShow() {
      if (this.guitarEvents.length > 6) {
        return this.guitarEvents.slice(0, 6)
      }
    },
    
  },
  created() {
    this.$store.dispatch({type: 'loadEvents'})
  },
}
</script>
