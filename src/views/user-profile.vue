<template>
  <section class="user-profile-cards-wrapper flex">
    <section class="user-profile-card-container flex flex-row">
      <div class="user-profile-card ">
        <div class="user-details-headline flex wrap align-center">
          <img class="user-pic" :src="user.pic">
          <h2>{{user.name}}</h2>
        </div>
        <h4>{{user.name}}'s profile details:</h4>
        <p>Bio: {{user.bio}}</p>
        <h3>Level: {{user.level}}</h3>
        <h3>
          Instruments:
          <i v-for="instrument in user.instruments" :key="instrument">{{instrument}}</i>
        </h3>
        <h3>
          Preferred genres:
          <i v-for="genre in user.favGenres" :key="genre">{{genre}}</i>.
        </h3>
      </div>
      <div class="user-profile-card">
      </div>
    </section>

    <section v-if="userAdminEvents.length" class="user-profile-card-container">
      <section class="carousel-section progressive-rock-events">
        <h3 class="capitalize">Events {{user.name}} created:</h3>
        <event-carousel :events="userAdminEvents"/>
      </section>
    </section>

    <section v-if="userPartEvents.length" class="user-profile-card-container">
      <section class="carousel-section progressive-rock-events">
        <h3 class="capitalize">Events {{user.name}} joined:</h3>
        <event-carousel :events="userPartEvents"/>
      </section>
    </section>
  </section>
</template>

<script>
import eventCarousel from "@/components/event-carousel.vue";
export default {
  components: {
    eventCarousel
  },
  data() {
    return {
      userAdminEvents: [],
      userPartEvents: [],
      user: "",
    };
  },
  computed: {
    isLoggedInUser() {
      return this.$store.getters.isLoggedInUser;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    document.body.scrollIntoView();
    const userId = this.$route.params.userId;

    this.$store
      .dispatch({ type: "getUserById", userId })
      .then(user => {
        return (this.user = user);
      })
      .then(() => {
        this.user.adminEventsIds.forEach(eventId => {
          this.$store
            .dispatch({ type: "getEventById", eventId })
            .then(event => {
              this.userAdminEvents.push(event);
            });
        });
        console.log("userAdminEvents", this.userAdminEvents);
        this.user.partEventsIds.forEach(eventId => {
          this.$store
            .dispatch({ type: "getEventById", eventId })
            .then(event => {
              this.userPartEvents.push(event);
            });
        });
        console.log("partEventsIds", this.userPartEvents);
      });
  }
};
</script >
<style scoped lang="scss">
.user-profile-cards-wrapper {
  background-color: lighten(lightgray, 10%);
  flex-direction: column;
  margin-top: 50px;

  @media screen and (min-width: 768px) {
    padding: 30px;
    flex-direction: column;
  }
}

.user-profile-card-container {
  background-color: white;
  padding: 30px;
  margin-bottom: 0px;
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100%;
    margin-bottom: 30px;
  }
  border: 1px solid darken(lightgray, 5%);
  border-radius: 6px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.05);
}

.user-profile {
  margin-top: 55px;
  .main-container {
    padding: 20px;
    padding-left: 10vw;
  }
  .user-icon {
    border-radius: 50%;
  }
}
.user-details-headline {
  margin: 20px 10px;
}
.user-pic {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-right: 30px;
}
</style>
