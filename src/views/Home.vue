<template>
  <div class="home">
    <header class="flex">
      <div
        class="welcome-text"
      >Welcome! here you can find professional & amateur musicians to play your favorite music with.</div>

      <iframe
        width="100%"
        style="height: 100%"
        src="//www.youtube.com/embed/HspKIEa1qwk?t=30&autoplay=1&controls=0"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </header>

    <div v-if="loggedInUser" class="carousels-container loggedIn">
      <template v-for="genre in loggedInUser.favGenres">
        <section class="carousel-section favourite-genre" :key="genre">
          <h2 class="capitalize">Especially for you, {{genre}} music events:</h2>
          <event-carousel :events="events"/>
          <a>Show All {{genre}} Events</a>
          <hr>
        </section>
      </template>

      <template v-for="instrument in loggedInUser.instruments">
        <section class="carousel-section favourite-genre" :key="instrument">
          <h2 class="capitalize">Especially for you, events that need a {{instrument}} player:</h2>
          <event-carousel :events="events"/>
          <a>Show All {{instrument}} Events</a>
          <hr>
        </section>
      </template>
    </div>

    <div class="carousels-container">
      <section class="carousel-section close-distance-events">
        <h2 class="capitalize">Music events in your area:</h2>
        <event-carousel :events="events"/>
        <a>Show All Events</a>
      </section>
      <hr>
      <section class="carousel-section close-distance-events">
        <h2 class="capitalize">events happening this week:</h2>
        <event-carousel :events="events"/>
        <a>Show All Events</a>
      </section>
      <hr>
      <section class="carousel-section rock-events">
        <h2 class="capitalize">Rock events for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Rock Events</a>
      </section>
      <hr>
      <section class="carousel-section just-opened-events">
        <h2 class="capitalize">Just Opened!</h2>
        <event-carousel :events="events"/>
        <a>Show All Recent Events</a>
      </section>
      <hr>
      <section class="carousel-section guitar-events">
        <h2 class="capitalize">Guitar events for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Guitar Events</a>
      </section>
      <hr>
      <section class="carousel-section almost-full-events">
        <h2 class="capitalize">Almost full grab your place!</h2>
        <event-carousel :events="events"/>
        <a>Show All Events</a>
      </section>
      <hr>
      <section class="carousel-section reggae-events">
        <h2 class="capitalize">Reggae events for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Reggae Events</a>
      </section>
      <hr>
      <section class="carousel-section world-music-events">
        <h2 class="capitalize">World Music events for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All World Music Events</a>
      </section>
      <hr>
      <section class="carousel-section progressive-rock-events">
        <h2 class="capitalize">Progressive Rock events for you:</h2>
        <event-carousel :events="events"/>
        <a>Show All Progressive Rock Events</a>
      </section>
      <hr>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
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
