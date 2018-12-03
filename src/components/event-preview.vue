<template>
  <section class="event-preview">
    <router-link :to="'/event/' + event._id">
      <div class="pic-wrapper flex flex-column justify-center">
        <!-- <img class="main-img" :src="event.pic" alt="event image"> -->
        <img class="main-img" :src="event.pic" alt="event image">
      </div>
    </router-link>
    <!-- Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, architecto placeat consequuntur ipsum et officia quibusdam facere perferendis animi asperiores quae atque explicabo dolores assumenda est nisi aspernatur quo ullam. -->

    <div class="details flex flex-column space-between">
      <div class="icons-wrapper flex">
          <router-link v-if="admin" :to="'/user/' + event.adminId">
            <img class="circle-icon" :title="admin.name" :src="admin.pic">
          </router-link>
        <template v-if="players.length" v-for="player in playersToShow">
          <router-link :to="'/user/' + player._id" :key="player._id">
            <img class="circle-icon" :key="player._id" :title="player.name" :src="player.pic">
          </router-link>
        </template>
      </div>

      <span class="bold">{{event.title}}</span>
      
      <span class="capitalize">{{event.genre}} music
        {{event.level}} 
      </span>
      <span :style="{color: status.color}"> {{status.txt}}</span>
      <span class="capitalize">At: {{event.location.city}} Date:{{dateToShow}}</span>
      
    </div>
  </section>
</template>

<script>
import userService from "@/service/user.service.js";
export default {
  props: {
    event: Object
  },
  data() {
    return {
      players: [],
      admin: ''
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
      else if (ratio < 0.8) return { txt: "Kinda full", color: "white" };
      else if (ratio < 1) return { txt: "Almost full", color: "white" };
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
