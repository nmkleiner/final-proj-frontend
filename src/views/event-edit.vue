<template>
  <section>
    <form class="edit-event-wrapper flex space-between">
      <div class="edit-event-container">
        <div class="edit-event-user-container">
          <h4>{{loggedInUser.name}}</h4>
          <div class="edit-event-user-image-container">
            <img class="edit-event-image" :src="loggedInUser.pic" alt="event admin">
          </div>
        </div>
        <h4>Event Title</h4>
        <el-input type="text" id="title" v-model="event.title" placeholder="Event Title"></el-input>
        <h4>select genre</h4>
        <el-select v-model="event.genre" placeholder="select genre">
          <el-option value="rock">Rock</el-option>
          <el-option value="country">Country</el-option>
          <el-option value="jazz">Jazz</el-option>
          <el-option value="classic">Classic</el-option>
          <el-option value="world">World</el-option>
          <el-option value="reggae">Reggae</el-option>
          <el-option value="Progressive rock">Progressive Rock</el-option>
          <el-option value="personal">Personal Material</el-option>
        </el-select>
        <h4>select level</h4>
        <el-select v-model="event.level" placeholder="level">
          <el-option value="pro">Professional</el-option>
          <el-option value="amateur">Amateur</el-option>
        </el-select>
        <h4>Event Description</h4>
        <textarea v-model="event.desc" placeholder="Event Description"/>
        <h4>Choose instruments</h4>

        <instruments-multiple-pick v-if="event" @setPickedInstruments="setPickedInstruments" :currInstruments="pickedInstruments"></instruments-multiple-pick>
        <!-- <instrument-list @add-instrument="addInstrument"></instrument-list> -->


        <div class="add-instruments-container">
          <div class="add-instrument">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <h4>Freeplayers allowed</h4>
        <el-input
          type="number"
          min="0"
          v-model="event.freePlayers.amount"
          placeholder="Number of free players"
          title="free players can bring any instrument they want or just listen."
        ></el-input>
      </div>

      <div class="edit-event-container">
        <h4>event date</h4>
        <el-input type="date" v-model="event.time.day"></el-input>
        <div>
          <h4>event hour</h4>

          <time-picker class="align-self-center" v-model="event.time.hour"></time-picker>
        </div>
        <h4>event cost</h4>
        <el-input type="number" min="0" v-model="event.cost" placeholder="cost"></el-input>
        <div class="img-n-address-container">
          <div class="img-container">
            <img src alt>
            <h4></h4>
            <button>Upload image</button>
          </div>
          <div class="address-container">
            <h4>city</h4>
            <el-input v-model="event.location.city" placeholder="city"></el-input>
            <h4>street</h4>
            <el-input v-model="event.location.address" placeholder="street & number"></el-input>
          </div>
        </div>
        <el-button type="success" v-if="!isUpdateEvent" @click="saveNewEvent">Save Event</el-button>
        <el-button type="success" v-else @click="updateEvent">Update Event</el-button>
        <!-- <el-button @click="deleteEvent">Delete Event</el-button> -->
        <router-link to="/">
          <el-button type="danger">Cancel</el-button>
        </router-link>
        <!-- {{event}} -->
      </div>
    </form>
  </section>
</template>

<script>
import eventService from "@/service/event.service.js";
import instrumentList from "@/components/instrument-list.vue";
import instrumentsMultiplePick from "@/components/instruments-multiple-pick.vue";
import timePicker from "@/components/time-picker.vue";

export default {
  name: "edit-event",
  data() {
    return {
      event: {
        adminId: "",
        location: { address: "", city: "" },
        time: {
          day: "",
          hour: {
            hours: "0",
            minutes: "00",
            ampm: "AM"
          }
        },
        title: "",
        desc: "",
        genre: "",
        level: "",
        pic: "",
        instruments: [],
        freePlayers: {
          amount: 0,
          memberIds: []
        },
        allowedMembersCount: 0,
        joinedMembersCount: 0,
        cost: 0,
        msgs: []
      },
      pickedInstruments: []
    };
  },
  components: {
    timePicker,
    instrumentsMultiplePick,
    instrumentList
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isLoggedInUser() {
      return this.$store.getters.isLoggedInUser;
    },
    isUpdateEvent() {
      return !!this.$route.params.eventId;
    }
  },
  methods: {
    fillEventObject() {
      let allowedMembersCount = this.event.instruments.reduce((acc, inst) => {
        acc += +inst.amount;
        return acc;
      }, 0);
      allowedMembersCount += +this.event.freePlayers.amount;
      this.event.allowedMembersCount = allowedMembersCount;
      this.event.time.timestamp = new Date(this.event.time.day).getTime();
    },

    saveNewEvent() {
      this.fillEventObject();
      this.$store
        .dispatch({ type: "saveNewEvent", event: this.event })
        .then(eventId => {
          this.$store.dispatch({ type: "updateUserAdminEvents", eventId });
          this.$router.push(`/`);
        });
    },
    updateEvent() {
      this.pickedInstruments.forEach(instrument => {
        addInstrument(instrument)
      });
      this.$store
        .dispatch({ type: "updateEvent", event: this.event })
        .then(eventId => {
          this.$router.push(`/`);
        });
    },
    setPickedInstruments(instruments){
      this.pickedInstruments = instruments
      console.log(this.pickedInstruments)
    },
    addInstrument(instrument) {
      const existObj = this.event.instruments.find(
        inst => inst.instrument === instrument
      );
      const instObj = { instrument, amount: 1, playerIds: [] };

      if (existObj) existObj.amount++;
      else this.event.instruments.push(instObj);
    }
  },
  created() {
    if (!this.isLoggedInUser) this.$router.push("/");
    document.body.scrollIntoView();

    this.event.adminId = this.loggedInUser._id;
    this.event.adminName = this.loggedInUser.name;
    const eventId = this.$route.params.eventId;
    if (eventId) {
      this.$store.dispatch({ type: "getEventById", eventId }).then(event => {
        this.event = event;
        var temp = this.event.instruments.map(instrumentObj => {
          return instrumentObj.instrument
        })
        this.pickedInstruments = temp;
        console.log('on created event edit:', this.pickedInstruments)
        this.event.pic = eventService.getImage();
      });
    }
    this.event.pic = eventService.getImage();
  }
};
</script>

<style>
</style>
