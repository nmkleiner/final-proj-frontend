<template>
    <section class="event-preview">
        <router-link :to="'/event/' + event._id">
            <div class="pic-wrapper flex flex-column justify-center">
                <img class="main-img" :src="event.pic" alt="event image">
                <div class="buttons-wrapper flex">
                    <!-- <button class="carousel-arrow"><i class="fas fa-arrow-left"></i></button>
                    <button class="carousel-arrow"><i class="fas fa-arrow-right"></i></button> -->
                    <img v-for="player in players" :key="player._id" :src="player.pic">
                </div>
            </div>
        </router-link>
        <div class="event-details flex flex-column space-between">
            <div class="flex space-between">
                <div>{{event.title}}</div>
                <div>{{event.genre}}</div>
            </div>
            <div class="flex space-between">
                <div>{{event.level}}</div>
                <div class="flex flex-row">
                    <div>{{event.time.day}}&nbsp;</div>
                    <div>{{event.location.city}}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import userService from '@/service/user.service.js'
export default {
    props: {
        event: Object,
    },
    data() {
        return {
            players: [],
        }
    },
    created() {
        this.event.instruments.forEach(instrument => {
            return instrument.playersIds.forEach(playerId => {
              const user = userService.getById(playerId)
              if (user) this.players.push(user)
          })  
        })
    }
}
</script>

<style>

</style>
