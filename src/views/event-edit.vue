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
      <div class="add-instruments-container">
        <button @click.prevent="isOpenInstruments = true">Add Welcomed Instruments</button>
        <!-- <div class="add-instrument">
          <i class="fas fa-plus"></i>
        </div> -->
      </div>
        <instrument-list v-if="isOpenInstruments" @add-instrument="addInstrument"
        @saveInstrumentsChosen="saveInstrumentsChosen"
        :instruments="insturmentsList"></instrument-list>
      <div>
        <instrument-preview v-for="(instrument, idx) in event.instruments" 
        :key="instrument.name"
        :instrument="instrument"
        @recudeInstrumentAmount="instrument.amount--"
        @increaseInstrumentAmount="instrument.amount++"
        @removeInstrument="removeInstrument(idx)"></instrument-preview>
      </div>
    </div>

    <div class="edit-event-container">
      <el-date-picker
        v-model="event.time.day"
        type="date"
        placeholder="Pick a day">
      </el-date-picker>
      <el-time-select
        v-model="event.time.hour"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:30'
        }"
        placeholder="Select time">
      </el-time-select>
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
      <el-button @click="saveNewEvent">Save Event</el-button>
      <el-button @click="deleteEvent">Delete Event</el-button>
      <router-link to="/">Cancel</router-link>
      {{event}}
    </div>

    </form>
  </section>
</template>

<script>
import instrumentList from '@/components/instrument-list.vue';
import instrumentPreview from '@/components/instrument-preview.vue';

export default {
  name: 'edit-event',
  data() {
    return {
      isOpenInstruments: false,
      instruments: [],
      event: {
        time: {
          hour: '',
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
      },
    };
  },
  components: {
    instrumentList,
    instrumentPreview
  },
  computed: {
    insturmentsList() {
      return this.$store.getters.instrumentsList
      // let instrumentsToShow = fullInstrumentsList.map(instrument => {
      //   return this.event.instruments.find(currInsrtument => {
      //     console.log(currInsrtument);
          
      //     currInsrtument.name === instrument.name
      //   })
      // })
      // return instrumentsToShow
      

    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    isLoggedInUser() {
        return this.$store.getters.isLoggedInUser
    }
    
  },
  methods: {
    removeInstrument(instIdx) {
      this.event.instruments.splice(instIdx, 1)
    },
    saveInstrumentsChosen(instruments) {
      instruments.forEach(insrtument => {
        if (insrtument.isSelected) {
          if (!this.event.instruments.find(currInsrtument => currInsrtument.name === insrtument.name)) {
            this.event.instruments.push({name: insrtument.name, amount: 1, playersIds: []})     
          }
        }
      })
      this.isOpenInstruments = false
    },
    deleteEvent() {
      // console.log('Deleteing Event');
      // this.$store.dispatch({type: 'removeEvent', event: this.event})
    },
    saveNewEvent() {
      this.$store.dispatch({type: 'saveNewEvent', event: this.event})
        .then(() => {
          // tell user event was added
          this.$router.push(`/`)
        })
    },
    updateEvent() {
      // console.log('updating event');
      this.$store.dispatch({ type: 'updateEvent', event: this.event });
    },
    addInstrument(instrument) {
      const instObj = {instrument , amount: 1, playerIds: []}
      this.event.instruments.push(instObj)
    }
  },
  created() {
    // if (!this.isLoggedInUser) this.$router.push('/')
    document.body.scrollIntoView()

    // this.event.adminId = this.loggedInUser._id
    // this.event.adminName = this.loggedInUser.name
    const eventId = this.$route.params.eventId;
    if (eventId) {
    this.$store.dispatch({ type: 'getEventById', eventId })
        .then(event => {
            this.event = event;
        });
    }
    
    // this.$store.dispatch({type: 'loadInstruments'})
    //   .then(instruments => this.instruments = instruments)
  }
};
</script>

<style>
</style>
