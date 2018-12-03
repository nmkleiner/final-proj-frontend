<template>
  <section v-if="event" class="cards-wrapper flex space-between capitalize">
    <div class="card-container">
      <h1>{{event.title}}</h1>

      <div class="flex wrap align-center">
        <img class="circle-icon mb-10" :src="admin.pic " alt="event admin" :title="admin.name">
        <h4 class="card-organizer-name px-10 capitalize">{{event.adminName}}&nbsp;</h4>
        <el-button
          @click="toggleJoin"
          v-if="!isLoggedInUserAdmin"
          class="join-button"
          type="danger"
        >Join the event</el-button>
        <template v-if="isLoggedInUserAdmin">
          <el-button @click="goEdit" type="success" round>Edit Event</el-button>
          <el-button type="danger" @click="removeEvent" round>Cancel Event</el-button>
        </template>
      </div>

      <transition name="fade">
        <div class="card-item-container" v-if="isJoining">
          <h2 v-if="loggedInUser._id">Play with us as:</h2>
          <span v-else>Login to participate</span>
          <div class="instruments-container">
            <div
              class="instrument-item-container"
              @click="joinTheEvent(instrument.instrument)"
              v-for="(instrument, index) in event.instruments"
              :key="index"
            >
              <i :title="instrument.instrument" class="fas fa-drum"></i>
              {{instrument.instrument}}
            </div>
          </div>
          <!-- <div>{{instrument.amount}}x</div> -->
          <!-- <el-button @click='joinAs(instrument.instrument)'>{{instrument.instrument}}</el-button> -->
        </div>
      </transition>
      <div class="card-item-container">
        <h4>
          <span>
            Genre: {{event.genre}}
            <i class="fas fa-music"></i>
          </span>
          <span>
            Level: {{event.level}}
            <i class="fas fa-music"></i>
          </span>
        </h4>
      </div>

      <div class="card-item-container">
        <!-- <h4>Free participants:
          {{event.freePlayers.length || 0}}/
          {{event.freePlayers.amount}}
        </h4>-->
        <p class="card-description">{{event.desc}}</p>

        <div class="event-details">
          <span>
            <!-- {{dateToShow}} {{event.time.hour.hours}}:{{event.time.hour.minutes}} -->
            <i class="fas fa-music"></i>
          </span>
          <span class="capitalize">
            {{event.location.address}}, {{event.location.city}}
            <i class="fas fa-music"></i>
          </span>
          <span v-if="event.cost">cost: {{event.cost}}$</span>
          <span v-else>cost: free</span>
        </div>
        <h4>Map</h4>

        <GmapMap
          v-if="center"
          ref="mapRef"
          class="static map"
          :zoom="18"
          :center="center"
          map-type-id="roadmap"
          style="height: 300px"
        >
          <GmapMarker
            v-if="markers.position"
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </div>
    </div>

    <div class="card-container">
      <h4>Event Discussion</h4>
      <feed-comp :currEvent="event" @sendUpdatedEvent="updateEventMsgs"></feed-comp>
      <h4>
        instruments:
        <span
          v-for="(instrument,idx) in event.instruments"
          :key="idx"
        >{{instrument.instrument}} </span>
      </h4>
      <h4>{{event.joinedMembersCount}}/{{event.allowedMembersCount}} participators</h4>
      <el-button type="danger" round v-if="isLoggedInUserAdmin">Remove participant</el-button>

      <h4>Players attending:
        <br>
        <template v-for="player in players">
          <router-link :to="'/user/' + player._id" :key="player._id">
            <img class="circle-icon" :key="player._id" :title="player.name" :src="player.pic">
          </router-link>
        </template>
      </h4>
      <h4 v-if="freePlayers.length">Free players attending:
        <br>
        <template v-for="player in freePlayers">
          <router-link :to="'/user/' + player._id" :key="player._id">
            <img class="circle-icon" :key="player._id" :title="player.name" :src="player.pic">
          </router-link>
        </template>
      </h4>
    </div>
  </section>
</template>

<script>
const axios = require("axios");
import userService from "@/service/user.service.js";
import gmapMap from "@/components/gmap-map.vue";
import feedComp from "@/components/feed-comp.vue";
export default {
  data() {
    return {
      event: null,
      players: [],
      freePlayers: [], //get from userService
      admin: {},
      isLoggedInUserAdmin: false,
      isJoining: false,
      // loggedInUser: {},
      markers: [
        {
          position: null
        }
      ],
      center: null
    };
  },
  methods: {
    updateEventMsgs(msgs) {
      console.log("from details", msgs);
      //send to store first, commit then then update the server
      // this.$store.dispatch({ type: "updateEventMsgs", event });
    },
    joinAs(instrument = null) {
      if (instrument === null) {
        if (
          this.event.freePlayers.membersIds.length <
          this.event.freePlayers.amount
        )
          this.event.freePlayers.membersIds.push(this.loggedInUser._id);
        else {
          // TODO:cannot join
        }
      } else {
        const instrumentObject = this.event.instruments.find(
          inst => inst.instrument === instrument
        );
        if (instrumentObject.playersIds.length < instrumentObject.amount) {
          instrumentObject.playersIds.push(this.loggedInUser._id);
        } else {
          // TODO:cannot join
        }
      }
    },
    joinTheEvent(instrument) {
      var joinedEvent = {
        instrument,
        eventId: this.$route.params.eventId
      };
      this.$store.dispatch({ type: "updateUserPartEvents", joinedEvent });
      this.$store.dispatch({ type: "joinEvent", joinedEvent });
      this.$router.push("/");
    },
    goEdit() {
      const eventId = this.event._id;
      this.$router.push(`/event/edit/${eventId}`);
    },
    removeEvent() {
      const eventId = this.event._id;
      this.$store.dispatch({ type: "removeEvent", eventId }).then(() => {
        this.$router.push("/");
      });
    },
    getCoorFromAddress(location) {
      var currEventLocStr = `${location.address.replace(
        /[^a-zA-Z0-9]/g,
        "+"
      )}+${location.city.replace(/[^a-zA-Z0-9]/g, "+")}`;
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${currEventLocStr}&key=AIzaSyC1FhnnrcBKyOeZF9as6Qw89mBzjul9jU4`
        )
        .then(res => {
          console.log(this.$refs.mapRef);
          var latlng = res.data.results[0].geometry.location;
          this.center = latlng;
          // this.markers.position.push(latlng);
          return latlng;
        })
        .then(latlng => {
          this.$refs.mapRef.panTo(latlng);
        });
      // console.log(currEventLocStr);
    },
    toggleJoin() {
      this.isJoining = !this.isJoining;
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    dateToShow() {
      return this.event.time.day.split('-').reverse().join('/')
    }
  },
  created() {
    document.body.scrollIntoView();
    const eventId = this.$route.params.eventId;
    this.$store
      .dispatch({ type: "getEventById", eventId })
      .then(event => {
        this.event = event;
        this.getCoorFromAddress(event.location);
        return (this.event = event);
      })

      // get event admin
      .then(() => {
        const adminId = this.event.adminId;

        this.$store
          .dispatch({ type: "getUserById", userId: adminId })
          .then(admin => {
            this.admin = admin;
            if (this.admin._id === this.loggedInUser._id) {
              this.isLoggedInUserAdmin = true;
            }
          });
      })

      // get's a players array for this preview
      .then(() => {
        this.event.instruments.forEach(instrument => {
          return instrument.playerIds.forEach(playerId => {
            if (!playerId) return;
            this.$store
              .dispatch({ type: "getUserById", userId: playerId })
              .then(player => {
                this.players.push(player);
              });
          });
        });
        if (this.event.freePlayers.memberIds.length) {
          this.event.freePlayers.memberIds.forEach(playerId => {
            if (!playerId) return;
            this.$store
              .dispatch({ type: "getUserById", userId: playerId })
              .then(player => {
                this.freePlayers.push(player);
              });
          });
        }
      });
  },
  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   console.log('map promise');
    //   return map.panTo({ lat: 32.089561, lng: 34.8627918 });
    // });
  },
  components: {
    gmapMap,
    feedComp
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
