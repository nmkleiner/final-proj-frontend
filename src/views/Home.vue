<template>
  <div class="home">
    <div class="header-wrapper">
      <header class="flex">
        <div class="welcome-text">
          <h2>Welcome to
            <br>
            <span>
              <i class="flaticon-bass-guitar"></i>
              <i class="fas fa-drum"></i>MUSIGROUPS
            </span>
          </h2>
          <h4
            class="pl-10"
          >Here you can find professional & amateur musicians to play your favorite music with.</h4>
        </div>

        <iframe
          width="100%"
          style="height: 100%"
          src="//www.youtube.com/embed/HspKIEa1qwk?t=30&controls=0"
          frameborder="0"
          allowfullscreen
          allow="autoplay"
          autoplay="1"
        ></iframe>
      </header>
    </div>
   
    <section v-if="events.length">
      <div v-if="loggedInUser" class="carousels-container loggedIn">
        <template v-for="genre in loggedInUser.favGenres">
          <section class="carousel-section favourite-genre" :key="genre">
            <h2 class="capitalize">Especially for you, {{genre}} music events:</h2>
            <event-carousel :events="events"/>
            <a @click="goList(genre.toLowerCase())">Show All {{genre}} Events</a>
            <hr>
          </section>
        </template>

        <template v-for="instrument in loggedInUser.instruments">
          <section class="carousel-section favourite-genre" :key="instrument">
            <h2 class="capitalize">Especially for you, events that need a {{instrument}} player:</h2>
            <event-carousel :events="events"/>
            <a @click="goList('',instrument.toLowerCase())">Show All {{instrument}} Events</a>
            <hr>
          </section>
        </template>
      </div>

      <div class="carousels-container">
        <section class="carousel-section close-distance-events">
          <h2 class="capitalize">Music events in your area:</h2>
          <event-carousel :events="events"/>
          <a class @click="goList('','','location')">Show All Events</a>
        </section>
        <hr>
        <section class="carousel-section close-distance-events">
          <h2 class="capitalize">events happening this week:</h2>
          <event-carousel :events="events"/>
          <!-- <a @click="goList('','','','this week')">Show All Events</a> -->
        </section>
        <hr>
        <section class="carousel-section rock-events">
          <h2 class="capitalize">Rock events for you:</h2>
          <event-carousel :events="events"/>
          <a @click="goList('rock')">Show All Rock Events</a>
        </section>
        <hr>
        <section class="carousel-section just-opened-events">
          <h2 class="capitalize">Just Opened!</h2>
          <event-carousel :events="events"/>
          <a @click="goList('','','','','Waiting for players')">Show All Recent Events</a>
        </section>
        <hr>
        <section class="carousel-section guitar-events">
          <h2 class="capitalize">Guitar events for you:</h2>
          <event-carousel :events="events"/>
          <a @click="goList('','guitar')">Show All Guitar Events</a>
        </section>
        <hr>
        <section class="carousel-section almost-full-events">
          <h2 class="capitalize">Almost full grab your place!</h2>
          <event-carousel :events="events"/>
          <a @click="goList('','','','','almost full')">Show All Events</a>
        </section>
        <hr>
        <section class="carousel-section reggae-events">
          <h2 class="capitalize">Reggae events for you:</h2>
          <event-carousel :events="events"/>
          <a @click="goList('reggae')">Show All Reggae Events</a>
        </section>
        <hr>
        <section class="carousel-section world-music-events">
          <h2 class="capitalize">World Music events for you:</h2>
          <event-carousel :events="events"/>
          <a @click="goList('world')">Show All World Music Events</a>
        </section>
        <hr>
        <section class="carousel-section progressive-rock-events">
          <h2 class="capitalize">Progressive Rock events for you:</h2>
          <event-carousel :events="events"/>
          <a @click="goList('progressive rock')">Show All Progressive Rock Events</a>
        </section>
        <hr>
      </div>
    </section>
     
  </div>
</template>

<script>
// @ is an alias to /src
// import nearPlacesMap from '@/components/near-places-map.vue'
import eventList from "@/components/event-list.vue";
import eventPreview from "@/components/event-preview.vue";
import eventCarousel from "@/components/event-carousel.vue";
import bus, { FILTER } from "@/bus.js";
export default {
  name: "home",
  components: {
    eventList,
    eventPreview,
    eventCarousel
    // nearPlacesMap
  },
  methods: {
    goList(genre, instrument, location, recent, status) {
      this.$router.push("/event");
      setTimeout(() => {
        if (genre) bus.$emit(FILTER, { genre });
        if (instrument) bus.$emit(FILTER, { instrument });
        if (location) bus.$emit(FILTER, { location });
        if (recent) bus.$emit(FILTER, { recent });
        if (status === "Almost full") bus.$emit(FILTER, { status });
        if (status === "Waiting for players") bus.$emit(FILTER, { status });
      }, 50);
    }
  },
  computed: {
    events() {
      return this.$store.getters.events;
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
    document.body.scrollIntoView();
    this.$store.dispatch({ type: "loadEvents" });
  }
};
</script>
