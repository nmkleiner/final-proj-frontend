<template>
  <section v-if="event" class="cards-wrapper flex space-between capitalize">
    <div class="card-container">
      <h1>{{event.title}}</h1>

      <div class="flex wrap align-center">
        <img class="circle-icon mb-10" :src="admin.pic " alt="event admin" :title="admin.name">
        <h4 class="card-organizer-name px-10 capitalize">{{event.adminName}}&nbsp;</h4>

        <template v-if="isLoggedInUserAdmin">
          <el-button @click="goEdit" type="success" round>
            <i class="fas fa-edit"></i> Edit Event
          </el-button>
          <el-button type="danger" @click="removeEvent" round>
            <i class="fas fa-trash-alt"></i> Cancel Event
          </el-button>
        </template>
      </div>

      <div class="card-item-container">
        <h4>
          <span>Genre: {{event.genre}}</span>
          <span>Level: {{event.level}}</span>
        </h4>
      </div>

      <div class="card-item-container">
        <p class="card-description">{{event.desc}}</p>
        <div class="event-details">
          <span class="capitalize">{{event.location.address}}, {{event.location.city}}</span>
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
      <el-button
        @click="loginToJoin"
        v-if="!loggedInUser"
        class="static join-button"
        type="info"
      >Login to join</el-button>

      <el-button
        v-if="loggedInUser && requiredInstrumentsToShow.length === 0"
        class="static join-button"
        type="warning"
      >Event is full</el-button>

      <el-button
        @click="toggleJoin"
        v-if="requiredInstrumentsToShow.length > 0 && loggedInUser && !isLoggedInUserAdmin && !isJoining"
        class="static join-button"
        type="success"
      >Join the event</el-button>

      <el-button
        @click="toggleJoin"
        v-if="loggedInUser && !isLoggedInUserAdmin && isJoining"
        class="static join-button"
        type="danger"
      >Cancel</el-button>

      <transition name="fade">
        <pick-instruments-comp
          :instruments="requiredInstrumentsToShow"
          v-if="isJoining && requiredInstrumentsToShow.length > 0"
          @selectedInstrument="joinTheEvent"
        ></pick-instruments-comp>
      </transition>
      <h4>Chat</h4>
      <feed-comp :currEvent="event" @pushMsgToHistory="pushMsgToHistory"></feed-comp>
      <h4>required instruments:
        <required-instruments :preview="false" :event="event" @setrequiredInstrumentsToShow="setrequiredInstrumentsToShow"></required-instruments>
      </h4>
      <h4>{{event.joinedMembersCount}}/{{event.instruments.length}} participators</h4>
      <el-button type="danger" round v-if="isLoggedInUserAdmin">Remove participant</el-button>
      <h4>attending:</h4>
        <players-instruments :event="event" :players="players"></players-instruments>
    </div>
  </section>
</template>

<script>
const axios = require("axios");
import userService from "@/service/user.service.js";
import gmapMap from "@/components/gmap-map.vue";
import feedComp from "@/components/feed-comp.vue";
import pickInstrumentsComp from "@/components/pick-instruments-comp.vue";
import playersInstruments from "@/components/players-instruments.vue";
import requiredInstruments from "@/components/required-instruments.vue";

export default {
  components: {
    gmapMap,
    feedComp,
    pickInstrumentsComp,
    playersInstruments,
    requiredInstruments
  },
  data() {
    return {
      event: null,
      players: [],
      admin: {},
      isLoggedInUserAdmin: false,
      isJoining: false,
      markers: [],
      center: null,
      requiredInstrumentsToShow: []
    };
  },
  methods: {
    setrequiredInstrumentsToShow(instruments) {
      this.requiredInstrumentsToShow = instruments;
    },
    pushMsgToHistory(msg) {
      this.$store.dispatch({type: 'pushMsgToHistory', msg})
    },
    addPlayer() {
      this.players.push(this.loggedInUser)
    },
    getPlayers() {
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
    },
    joinAs(instrument = null) {
        const instrumentObject = this.event.instruments.find(
          inst => inst.instrument === instrument
        );
        if (instrumentObject.playersIds.length < instrumentObject.amount) {
          instrumentObject.playersIds.push(this.loggedInUser._id);
        }
    },
    joinTheEvent(instrument) {
      this.isJoining = false;
      if(instrument === null) return this.isJoining = !this.isJoining;
      var joinedEvent = {
        instrument,
        eventId: this.$route.params.eventId
      };
      this.$store.dispatch({ type: "updateUserPartEvents", joinedEvent })
        .then(() => {
          this.$store.dispatch({ type: "joinEvent", joinedEvent })
            .then(() => {
              this.$store.dispatch({ type: "getEventById", eventId: this.event._id })
                .then(event => {
                  this.event = event;
                  this.addPlayer()
                  document.body.querySelector('footer').scrollIntoView();
            })
          })
        })
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
          var latlng = res.data.results[0].geometry.location;
          this.center = latlng;
          this.markers.push({ position: latlng });
          return latlng;
        })
        .then(latlng => {
          this.$refs.mapRef.panTo(latlng);
        });
    },
    toggleJoin() {
      this.isJoining = !this.isJoining;
    },
    loginToJoin() {
      const eventId = this.event._id;
      this.$router.push(`/login/${eventId}`);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    dateToShow() {
      return this.event.time.day
        .split("-")
        .reverse()
        .join("/");
    }
  },
  created() {
    document.body.scrollIntoView();
    const eventId = this.$route.params.eventId;
    // this.getEvent()
    this.$store
      .dispatch({ type: "getEventById", eventId })
      .then(event => {
        this.event = event;
        this.getCoorFromAddress(event.location);
        return (this.event = event);
      })

      // get event admin
      // this.getAdmin()
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
        this.getPlayers()
      });
  },
};
</script>

<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.disabled {
  background-color: white;
  color: lightgray;
  border: 1px solid black;
}
.join-button {
  margin: 20px 0px;
  width: 100%;
  top: 0;
  position: sticky;
  @media screen and (min-width: 768px) {
    margin: 20px 0px;
    width: 100%;
  }
}
</style>
