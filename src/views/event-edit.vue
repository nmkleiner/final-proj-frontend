<template>
  <section class="edit-event">
    <div class="user-container">Logged in user name and pic</div>
    <button @click="deleteEvent">Delete Event</button>
    <input type="text" v-model="event.title" placeholder="Event Title">
    <select v-model="event.genre">
        <option value="rock">Rock</option>
        <option value="country">Country</option>
        <option value="jazz">Jazz</option>
        <option value="world">World</option>
        <option value="personal">Personal Stuff</option>
        <option value="freestyle">Freestyle</option>
        <option value="other">Other</option>
    </select>
    <select v-model="event.level">
        <option value="pro">Professional</option>
        <option value="fun">Fun</option>
    </select>
    <input type="number" v-model="event.cost">
    <textarea v-model="event.desc"/>
    <input type="date" v-model="event.time.day">
    <div>
      <time-picker v-model="timePicked"></time-picker>
    </div>
    <instrument-list></instrument-list>
    <div class="add-instruments-container">
      <div class="add-instrument">
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="img-n-address-container">
      <div class="img-container">
        <img src alt>
        <button>Upload image</button>
      </div>
      <div class="address-container"></div>
    </div>
    <button @click="saveEvent">Save Event</button>
    <router-link to="/">Cancel</router-link>
    {{event}}
  </section>
</template>

<script>

import instrumentList from '@/components/instrument-list.vue'
import timePicker from '@/components/time-picker.vue'

export default {
    name: 'edit-event',
    data() {
        return {
            timePicked: {
                hour: 1,
                minute: 0,
                format: 'AM'
            },
            event: {
                title: '',
                desc: '',
                genre: '',
                level: '',
                pic: '',
                instruments:[],
                cost: 0,
                location: {address: ''},
                time: {day: '',hour: ''},
            },
        }
    },
    components: {
        timePicker,
        instrumentList
    },
    computed: {
        
    },
    methods: {
        deleteEvent() {
            console.log('Deleteing Event');            
        },
        saveEvent() {
            console.log('Saving Event');
        }
    },
    created() {
        // const eventId = this.$route.params.eventId;
        // if (eventId) {
        // this.$store.dispatch({ type: "getEventById", eventId })
        //     .then(event => {
        //         this.event = event;
        //     });
        // }
  }
}
</script>

<style>

</style>
