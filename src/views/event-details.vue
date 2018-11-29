<template>
  <section class="cards-wrapper flex space-between">

    <div class="card-container">
      
      <h1>{{event.title}}</h1>
      <div class="flex align-center">
        <div class="card-organizer-image-container flex justify-center align-center">
          <img class="card-organizer-image" src="https://api.adorable.io/avatars/64/rocki.png" alt="event admin">
        </div>
        <h4 class="card-organizer-name capitalize">{{event.adminName}}</h4>
        <!-- <img :src="admin.pic" alt="event admin"> -->
        <!-- <span>{{admin.name}}</span>-->
      </div>

      
      <div class="card-item-container"><h4>Genre: {{event.genre}}&nbsp;</h4></div>
      <div class="card-item-container"><h4>Level: {{event.level}}&nbsp;</h4></div>

      <div class="card-item-container">
        <h2 v-if="loggedInUser._id">Play with us as:</h2>
        
        <span v-else>Login to join</span>
        
        <h4>welcomed instruments:</h4>
        <div class="instruments-container">
          <div class="instrument-item-container" @click="joinTheEvent(instrument.instrument)" v-for="instrument in event.instruments" :key="instrument.instrument">
<<<<<<< HEAD
            <i :title="instrument" class="fas fa-drum"></i>
=======
            <i :title="instrument.instrument" class="fas fa-drum"></i>
            {{instrument.instrument}}
>>>>>>> 02b3d057b92eaed6c291d2cacde111035cbfa7c9
          </div>
        </div>

          <!-- <div>{{instrument.amount}}x</div>
          <el-button @click="joinAs(instrument.instrument)">{{instrument.instrument}}</el-button> -->
      </div>
      
      <div class="card-item-container">
        <h4>
          Free players:
          <!-- {{event.freePlayers.length || 0}}/
          {{event.freePlayers.amount}} -->
        </h4>
        <p class="card-description">{{event.desc}}</p>

        <el-button>discussions</el-button>
      </div>

    </div>

    <div class="card-container">
      
      <ul class="event-details">
        <li class="event-detail-list-item">
          <span>{{event.time.day}}&nbsp;{{event.time.hour}}&nbsp;</span>
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
      <img class="event-photo" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=beb0f979ed2a7da134fb95a2ae6290c3&auto=format&fit=crop&w=1500&q=80">
      
      <h4>Map</h4>
      <img src="https://i.stack.imgur.com/amkT6.png" alt="" class="map">

    </div>

  </section>
</template>

<script>
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
      console.log(this.event.instruments);
    },
    joinTheEvent(instrument){
      var joinedEvent = {
        instrument,
        eventId: this.$route.params.eventId
      }
      console.log('from event details', joinedEvent);
      this.$store.dispatch({type: 'joinEvent', joinedEvent})
      this.$store.dispatch({type: 'updateUserEvents', joinedEvent})
      // message join event
      // this.$router.push('/')
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  created() {
    document.body.scrollIntoView()
    const eventId = this.$route.params.eventId;
<<<<<<< HEAD
    this.$store
      .dispatch({ type: "getEventById", eventId })
      .then(event => {
        console.log(event)
        return this.event = event
        });
=======
    this.$store.dispatch({ type: "getEventById", eventId })
      .then(event => (this.event = event));
>>>>>>> 02b3d057b92eaed6c291d2cacde111035cbfa7c9
  },
  data() {
    return {
      event: this.$store.getters.currEvent,
      players: [], //get from userService
      freePlayers: [], //get from userService
      admin: {}, // get from userService,
      // loggedInUser: {},
    };
  }
};
</script>

<style>
</style>
