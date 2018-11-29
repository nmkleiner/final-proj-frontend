<template>
  <section class="cards-wrapper flex space-between">
    <div class="card-container">
      <h1>
        {{event.title}}
      </h1>

      <div class="flex align-center">
        <div class="card-organizer-image-container flex justify-center align-center">
          <img class="circle-icon" :src="admin.pic " alt="event admin" :title="admin.name">
        </div>
        <h4 class="card-organizer-name capitalize">{{event.adminName}}&nbsp;</h4>
        <template v-if="isLoggedInUserAdmin">
          <el-button @click="goEdit" type="success" round >Edit Event</el-button>
          <el-button type="danger" round >Cancel Event</el-button>
        </template>
      </div>

      <div class="card-item-container">
        <h4>Genre: {{event.genre}}&nbsp;</h4>
      </div>
      <div class="card-item-container">
        <h4>Level: {{event.level}}&nbsp;</h4>
      </div>

      <div class="card-item-container">
        <h2 v-if="loggedInUser._id">Play with us as:</h2>

        <span v-else>Login to participate</span>

        <h4>welcomed instruments:</h4>
        <div class="instruments-container">
          <div
            class="instrument-item-container"
            @click="joinTheEvent(instrument.instrument)"
            v-for="(instrument,idx) in event.instruments"
            :key="idx"
          >
            <i :title="instrument.instrument" class="fas fa-drum"></i>
            {{instrument.instrument}}
          </div>
        </div>

        <!-- <div>{{instrument.amount}}x</div>
        <el-button @click="joinAs(instrument.instrument)">{{instrument.instrument}}</el-button>-->
      </div>
      <div class="card-item-container">
        <h4>Free participants:

          <!-- {{event.freePlayers.length || 0}}/
          {{event.freePlayers.amount}}-->
        </h4>
        <h4>
          Players attending:<br>
          <template v-for="player in players">
            <router-link :to="'/user/' + player._id" :key="player._id">
              <img class="circle-icon" :key="player._id" :title="player.name" :src="player.pic">
            </router-link>
          </template> 
        </h4>
        <el-button type="danger" round v-if="isLoggedInUserAdmin">Remove participant</el-button>

        <p class="card-description">{{event.desc}}</p>

        <el-button>discussions</el-button>
      </div>
    </div>

    <div class="card-container">
      <ul class="event-details">
        <li class="event-detail-list-item">
          <span>{{event.time.day}}&nbsp;</span>
        </li>
        <li class="event-detail-list-item">
          <span class="capitalize">{{event.location.address}}, {{event.location.city}}</span>
        </li>
        <li class="event-detail-list-item">
          <span v-if="event.cost">cost: {{event.cost}}$</span>
          <span v-else>cost: free</span>
        </li>
      </ul>

      <h4>Event Photo</h4>
      <img
        class="event-photo"
        src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=beb0f979ed2a7da134fb95a2ae6290c3&auto=format&fit=crop&w=1500&q=80"
      >

      <h4>Map</h4>
      <!-- <img src="https://i.stack.imgur.com/amkT6.png" alt="" > -->
      <GmapMap
        ref="mapRef"
        class="static map"
        :center="{lat: 32.089561, lng: 34.8627918}"
        :zoom="15"
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
  </section>
</template>

<script>
import userService from '@/service/user.service.js'
export default {
  methods: {
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
      // console.log(this.event.instruments);
    },
    joinTheEvent(instrument) {
      var joinedEvent = {
        instrument,
        eventId: this.$route.params.eventId
      };
      this.$store.dispatch({ type: "updateUserEvents", joinedEvent });
      this.$store.dispatch({ type: "joinEvent", joinedEvent });
      //message join event
      this.$router.push('/');
    },
    goEdit() {
      const eventId = this.event._id
      this.$router.push(`/event/edit/${eventId}`)
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    document.body.scrollIntoView();
    const eventId = this.$route.params.eventId;
    this.$store.dispatch({ type: "getEventById", eventId })
      .then(event => (this.event = event))

      // get event admin 
      .then(() => {
        const adminId = this.event.adminId
        
        this.$store.dispatch({type: 'getUserById', userId: adminId})
        .then(admin => {
          this.admin = admin
          if (this.admin._id === this.loggedInUser._id) {
            this.isLoggedInUserAdmin = true
          }
        })
      })

        // get's a players array for this preview
      .then(() => {
        this.event.instruments.forEach(instrument => {
          return instrument.playerIds.forEach(playerId => {
            if(!playerId) return;
            this.$store.dispatch({type: 'getUserById', userId: playerId})
              .then(player => {
                this.players.push(player)
              })
            })  
          })
    })
  },
  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   console.log("map promise");
    //   return map.panTo({ lat: 32.089561, lng: 34.8627918 });
    // });
  },
  data() {
    return {
      event: this.$store.getters.currEvent,
      players: [], //get from userService
      freePlayers: [], //get from userService
      admin: {},
      isLoggedInUserAdmin: false,
      // loggedInUser: {},
      markers: [
        {
          position: { lat: 32.089561, lng: 34.8627918 }
        }
      ]
    };
  }
};
</script>

<style>
</style>
