<template>
  <div class="home">
    <header>
      <p>Hello
        <span v-if="!isLoggedInUser">!</span>
        <span v-else>{{loggedInUser.name}}!</span> Find and Play with Other Musicians!
        <iframe width="100%" height="300" src="//www.youtube.com/embed/HspKIEa1qwk?t=30s&autoplay=1&controls=0" frameborder="0" allowfullscreen></iframe>
      </p>
    </header>

    <div v-if="loggedInUser" class="carousels-container loggedIn">
      
      
      <template v-for="genre in loggedInUser.favGenres">
        <section class="carousel-section favourite-genre" :key="genre">
          <h2>Especially for you, {{genre}} music events:</h2>
          <event-carousel :events="events"/>
          <a>Show All {{genre}} Events</a>
          <hr>
        </section>
      </template>
      
      <template v-for="instrument in loggedInUser.instruments">
        <section class="carousel-section favourite-genre" :key="instrument">
          <h2>Especially for you, events that need a {{instrument}} player:</h2>
          <event-carousel :events="events"/>
          <a>Show All {{instrument}} Events</a>
          <hr>
        </section>
      </template>


      <section class="carousel-section rock-events">
        <h2>Rock Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Rock Events</a>
        <hr>
      </section>
      <section class="carousel-section guitar-events">
        <h2>Guitar Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Guitar Events</a>
        <hr>
      </section>
      <section class="carousel-section reggae-events">
        <h2>Reggae Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Reggae Events</a>
        <hr>
      </section>
      <section class="carousel-section world-music-events">
        <h2>World Music Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All World Music Events</a>
        <hr>
      </section>
      <section class="carousel-section progressive-rock-events">
        <h2>Progressive Rock Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Progressive Rock Events</a>
        <hr>
      </section>
    </div>

    <div v-else class="carousels-container guest">
      <section class="carousel-section almost-full-events">
        <h2>Almost full grab your place!</h2>
        <event-carousel :events="events"/>
        <a>Show All Events</a>
      </section>
      <hr>
      <section class="carousel-section rock-events">
        <h2>Rock Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Rock Events</a>
      </section>
      <hr>
      <section class="carousel-section guitar-events">
        <h2>Guitar Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Guitar Events</a>
      </section>
      <hr>
      <section class="carousel-section reggae-events">
        <h2>Reggae Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Reggae Events</a>
      </section>
      <hr>
      <section class="carousel-section world-music-events">
        <h2>World Music Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All World Music Events</a>
      </section>
      <hr>
      <section class="carousel-section progressive-rock-events">
        <h2>Progressive Rock Sessions for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Progressive Rock Events</a>
      </section>
      <hr>
    </div>
    {{loggedInUser}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import nearPlacesMap from '@/components/near-places-map.vue'
import eventList from "@/components/event-list.vue";
import eventPreview from "@/components/event-preview.vue";
import eventCarousel from "@/components/event-carousel.vue";

export default {
  name: "home",
  components: {
    eventList,
    eventPreview,
    eventCarousel
    // nearPlacesMap
  },
  computed: {
    events() {
      return this.$store.getters.events;
    },
    popularEvents() {
      return this.$store.getters.popularEvents;
    },
    rockEvents() {
      return this.$store.getters.rockEvents;
    },
    guitarEvents() {
      return this.$store.getters.guitarEvents;
    },
    rockEventsToShow() {
      if (this.rockEvents.length > 6) {
        return this.rockEvents.slice(0, 6);
      }
    },
    guitarEventsToShow() {
      if (this.guitarEvents.length > 6) {
        return this.guitarEvents.slice(0, 6);
      }
    },
    isLoggedInUser() {
      return this.$store.getters.isLoggedInUser;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    document.body.scrollIntoView()
    // this.$store.dispatch({type: 'loadRockEvents'})
    this.$store.dispatch({ type: "loadEvents" });
  }
};
</script>
