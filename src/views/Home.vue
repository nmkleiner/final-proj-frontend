<template>
  <div class="home">
  <!-- <near-places-map></near-places-map> -->
    <header>
      <p>Find and Play with Other Musicians!</p>
    </header>
    <!-- <div class="almost-full-events">
      <h2>Grab your place!</h2>
      <event-list :events="almostFullEvents"></event-list>
      <p>Show All Events</p>
    </div>
    <div class="rock-events">
      <h2>Rock Session for you:</h2>
      <event-list :events="rockEvents"></event-list>
      <p>Show All Rock Events</p>
    </div>
    <div class="guitar-events">
      <h2>Guitar Session for you:</h2>
      <event-list :events="guitarEvents"></event-list>
      <p>Show All Guitar Events</p>
    </div> -->
    <div class="almost-full-events">
      <h2>Grab your place!</h2>
      <el-carousel :interval="4000" type="card" height="300px" :autoplay=false>
        <el-carousel-item v-for="event in events" :key="event._id">
          <event-preview :event="event">
          </event-preview>
        </el-carousel-item>
      </el-carousel>
      <p>Show All Events</p>
    </div>
    <div class="rock-events">
      <h2>Rock Session for you:</h2>
      <el-carousel :interval="4000" type="card" height="300px" :autoplay=false>
        <el-carousel-item v-for="event in events" :key="event._id">
          <event-preview :event="event">
          </event-preview>
        </el-carousel-item>
      </el-carousel>
      <p>Show All Rock Events</p>
    </div>
    <div class="guitar-events">
      <h2>Rock Session for you:</h2>
      <el-carousel :interval="4000" type="card" height="300px" :autoplay=false>
        <el-carousel-item v-for="event in events" :key="event._id">
          <event-preview :event="event">
          </event-preview>
        </el-carousel-item>
      </el-carousel>
      <p>Show All Guitar Events</p>
      {{popularEvents}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import nearPlacesMap from '@/components/near-places-map.vue'
import eventList from '@/components/event-list.vue'
import eventPreview from '@/components/event-preview.vue'

export default {
  name: 'home',
  components: {
    eventList,
    eventPreview,
    // nearPlacesMap
    // HelloWorld
  },
  computed: {
    events() {
      return this.$store.getters.events
    },
    popularEvents() {
      console.log('hi', this.$store.getters.popularEvents);
      
      return this.$store.getters.popularEvents
    },
  },
  created() {
    this.$store.dispatch({type: 'loadEvents'})
  },
}
</script>
