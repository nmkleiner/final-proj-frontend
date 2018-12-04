<template>
  <section class="event-preview flex flex-column space-between">
    <router-link :to="'/event/' + event._id">
      <div class="pic-wrapper flex flex-column justify-center">
        <!-- <img class="main-img" :src="event.pic" alt="event image"> -->
        <img class="main-img" :src="event.pic" alt="event image">
      </div>
    </router-link>

    <div class="details flex flex-column space-between capitalize">
      <h6 class="bold">{{event.title}}</h6>
      <span class="capitalize">{{event.genre}} music
        for {{event.level}}s 
      </span>
      <span class="capitalize">At: {{event.location.city}} Date:{{dateToShow}}</span>
      
      <span>Who's coming:</span>
      <players-instruments :event="event" :admin="admin" :players="playersToShow"></players-instruments>
      <span>needed instruments:</span>
      <required-instruments :preview="true" :event="event"></required-instruments>
      
      <span :style="{color: status.color}"> 
        {{status.txt}} {{event.joinedMembersCount}}/{{event.allowedMembersCount}}
      </span>
      
    </div>
  </section>
</template>

<script>
import userService from "@/service/user.service.js";
import playersInstruments from '@/components/players-instruments.vue'
import requiredInstruments from '@/components/required-instruments.vue'
export default {
  components: {
    playersInstruments,
    requiredInstruments
  },
  props: {
    event: Object
  },
  data() {
    return {
      players: [],
      admin: {}
    };
  },
  created() {
    // get admin
    const adminId = this.event.adminId;
      this.$store
        .dispatch({ type: "getUserById", userId: adminId })
        .then(admin => {
          this.admin = admin;
          });
    // get players
    this.event.instruments.forEach(instrument => {
          return instrument.playerIds.forEach(playerId => {
            if(!playerId) return;
            this.$store.dispatch({type: 'getUserById', userId: playerId})
              .then(player => {
                this.players.push(player)
        })
      })  
    })
  },
  computed: {
    status() {
      const ratio =
        this.event.joinedMembersCount / +this.event.allowedMembersCount;
      if (ratio < 0.4)
        return { txt: "Waiting for players", color: "lightgreen" };
      else if (ratio < 0.8) return { txt: "Kinda full", color: "orange" };
      else if (ratio < 1) return { txt: "Almost full", color: "orangered" };
      return { txt: "Event full", color: "red" };
    },
    playersToShow() {
      return this.players.slice(0, 3);
    },
    dateToShow() {
      var date = this.event.time.day.split('-').reverse()
      date.splice(2,1)
      return date.join('/')
    }
  }
};
</script>

<style>
</style>
