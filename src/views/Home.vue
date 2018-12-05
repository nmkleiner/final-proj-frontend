<template>
  <div class="home">
    <header>
      <replacing-images></replacing-images>
      <div class="welcome-text">
        <h2 class="white-text">Welcome to <br>
          <i class="fas fa-drum"></i>MUSIGROUPS
        </h2>
        <h4 class="pl-10">
            <p class="white-text p-10 bold">
              Here you can find and join
              music events, created by musicians in your area, 
              or create your own events.
            </p>
            <p class="white-text p-10 bold">
              Connect with the musician community in a new way.
            </p>
          </h4>
      </div>
    </header>
   
    <section v-if="events.length">
      <div v-if="loggedInUser" class="carousels-container loggedIn">
        <template v-for="genre in loggedInUser.favGenres">
          <section class="carousel-section favourite-genre" :key="genre">
            <h2 class="capitalize">Especially for you, {{genre}} music events:</h2>
            <event-carousel :events="events"/>
            <a @click="goList(genre.toLowerCase())">Show All {{genre}} Events</a>
            
          </section>
        </template>

        <template v-for="instrument in loggedInUser.instruments">
          <section class="carousel-section favourite-genre" :key="instrument">
            <h2 class="capitalize">Especially for you, events that need a {{instrument}} player:</h2>
            <event-carousel :events="events"/>
            <a @click="goList('',instrument.toLowerCase())">Show All {{instrument}} Events</a>
            
          </section>
        </template>
      </div>

      <div class="carousels-container">
        <section class="carousel-section close-distance-events">
          <h2 class="capitalize">Music events in your area:</h2>
          <event-carousel :events="closeEvents"/>
          <a class @click="goList('','','location')">Show All Events</a>
        </section>
        
        <section class="carousel-section close-distance-events">
          <h2 class="capitalize">events happening this week:</h2>
          <event-carousel :events="thisWeekEvents"/>
          <!-- <a @click="goList('','','','this week')">Show All Events</a> -->
        </section>
        
        <section class="carousel-section rock-events">
          <h2 class="capitalize">Rock events:</h2>
          <event-carousel :events="rockEvents"/>
          <a @click="goList('rock')">Show All Rock Events</a>
        </section>
        
        <section class="carousel-section just-opened-events">
          <h2 class="capitalize">Just Opened!</h2>
          <event-carousel :events="waitingEvents"/>
          <a @click="goList('','','','','Waiting for players')">Show All Recent Events</a>
        </section>
        
        <section class="carousel-section almost-full-events">
          <h2 class="capitalize">Almost full grab your place!</h2>
          <event-carousel :events="almostFullEvents"/>
          <a @click="goList('','','','','almost full')">Show All Events</a>
        </section>
        
        <section class="carousel-section reggae-events">
          <h2 class="capitalize">Reggae events:</h2>
          <event-carousel :events="reggaeEvents"/>
          <a @click="goList('reggae')">Show All Reggae Events</a>
        </section>
        
        <section class="carousel-section world-music-events">
          <h2 class="capitalize">World Music:</h2>
          <event-carousel :events="worldEvents"/>
          <a @click="goList('world')">Show All World Music Events</a>
        </section>
        
        <section v-if="progEvents.length" class="carousel-section progressive-rock-events">
          <h2 class="capitalize">Progressive Rock events:</h2>
          <event-carousel :events="progEvents"/>
          <a @click="goList('progressive rock')">Show All Progressive Rock Events</a>
        </section>
        
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
import replacingImages from "@/components/replacing-images.vue";
import bus, {FILTER} from "@/bus.js"
export default {
  name: "home",
  components: {
    eventList,
    eventPreview,
    eventCarousel,
    replacingImages
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
    rockEvents() {
      return this.events.filter(event => event.genre === "rock")
    },
    classicEvents() {
      return this.events.filter(event => event.genre === "classic")
    },
    progEvents() {
      return this.events.filter(event => event.genre === "progressive rock")
    },
    countryEvents() {
      return this.events.filter(event => event.genre === "country")
    },
    jazzEvents() {
      return this.events.filter(event => event.genre === "jazz")
    },
    worldEvents() {
      return this.events.filter(event => event.genre === "world")
    },
    reggaeEvents() {
      return this.events.filter(event => event.genre === "reggae")
    },
    closeEvents() {
      return this.events.filter(event => event.location.city === "tel aviv" ||
        event.location.city === "ramat gan")
    },
    thisWeekEvents() {
      return this.events.filter(event => event.location.city === "tel aviv" ||
        event.location.city === "ramat gan")
    },
    waitingEvents() {
      return this.events.filter(event => event.status === "Waiting for players")
    },
    almostFullEvents() {
      return this.events.filter(event => event.status === "Almost full" ||
      event.status === "Kinda full")
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
