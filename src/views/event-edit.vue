<template>
  <section >
    <form class="edit-event-wrapper flex space-between">

    <div class="edit-event-container">
      <div class="edit-event-user-container">
        <h4>{{loggedInUser.name}}</h4>
        <div class="edit-event-user-image-container">
          <img class="edit-event-image" :src="loggedInUser.pic" alt="event admin">
        </div>
      </div>
      <h4>Event Title</h4>
      <input type="text" id="title" v-model="event.title" placeholder="Event Title">
      <h4>select genre</h4>
      <select v-model="event.genre"> 
        <option value="rock">Rock</option>
        <option value="country">Country</option>
        <option value="jazz">Jazz</option>
        <option value="world">World</option>
        <option value="personal">Personal Stuff</option>
        <option value="freestyle">Freestyle</option>
        <option value="other">Other</option>
      </select>
      <h4>professional level</h4>
      <select v-model="event.level">
        <option value="pro">Professional</option>
        <option value="fun">Fun</option>
      </select>
      <h4>Event Description</h4>
      <textarea v-model="event.desc" placeholder="Event Description"/>
      <instrument-list @add-instrument="addInstrument"></instrument-list>
      <div class="add-instruments-container">
        <div class="add-instrument">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>

    <div class="edit-event-container">
      <input type="date" v-model="event.time.day">
      <div>
        <time-picker v-model="event.time.hour"></time-picker>
      </div>
      <input type="number" v-model="event.cost">
      <div class="img-n-address-container">
        <div class="img-container">
          <img src alt>
          <button>Upload image</button>
        </div>
        <div class="address-container">
          <el-input v-model="event.location.city" placeholder="city"></el-input>
          <el-input v-model="event.location.address" placeholder="street & number"></el-input>
        </div>
      </div>
      <el-button v-if="!isUpdateEvent" @click="saveNewEvent">Save Event</el-button>
      <el-button v-else @click="updateEvent">Update Event</el-button>
      <el-button @click="deleteEvent">Delete Event</el-button>
      <router-link to="/">Cancel</router-link>
      <!-- {{event}} -->
    </div>

    </form>
  </section>
</template>

<script>
import instrumentList from '@/components/instrument-list.vue';
import timePicker from '@/components/time-picker.vue';

export default {
  name: 'edit-event',
  data() {
    return {
      event: {
        time: {
          hour: {
            hour: 1,
          minute: 0,
          format: 'AM',
          },
          day: ''
        },
        adminId: '',
        title: '',
        desc: '',
        genre: '',
        level: '',
        pic: '',
        instruments: [],
        cost: 0,
        location: { address: '', city: '' },
        time: { day: '', hour: this.timePicked }
      },
    };
  },
  components: {
    timePicker,
    instrumentList
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    isLoggedInUser() {
        return this.$store.getters.isLoggedInUser
    },
    isUpdateEvent() {
      return !!this.$route.params.eventId
    }
    
  },
  methods: {
    deleteEvent() {
      // console.log('Deleteing Event');
      // this.$store.dispatch({type: 'removeEvent', event: this.event})
    },
    saveNewEvent() {
      this.$store.dispatch({type: 'saveNewEvent', event: this.event})//does not return id yet
        .then((eventId) => {
          this.$store.dispatch({type: 'updateUserAdminEvents', eventId})
          this.$router.push(`/`)
        })
    },
    updateEvent() {
      this.$store.dispatch({ type: 'updateEvent', event: this.event })
        .then((eventId) => {
          this.$router.push(`/`)
        })
    },
    addInstrument(instrument) {
      const instObj = {instrument , amount: 1, playerIds: []}
      this.event.instruments.push(instObj)
    }
  },
  created() {
    if (!this.isLoggedInUser) this.$router.push('/')
    document.body.scrollIntoView()

    this.event.adminId = this.loggedInUser._id
    this.event.adminName = this.loggedInUser.name
    const eventId = this.$route.params.eventId;
    if (eventId) {
    this.$store.dispatch({ type: 'getEventById', eventId })
        .then(event => {
            this.event = event;
        });
    }
  }
};
</script>

<style>
</style>
