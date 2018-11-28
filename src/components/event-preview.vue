<template>
    <section class="event-preview">
        <router-link :to="'/event/' + event._id">
            <div class="pic-wrapper flex flex-column justify-center">
                <!-- <img class="main-img" :src="event.pic" alt="event image"> -->
                <img class="main-img" src="https://picsum.photos/200/300/?random" alt="event image">
                <div class="upper-floating-wrapper">
                    <span :style="{color: status.color}">{{status.txt}}</span>
                </div>
                <div class="middle-floating-wrapper flex">
                    <template v-for="player in players">
                        <router-link :to="'/user/' + player._id" :key="player._id">
                            <img :key="player._id" :title="player.name" :src="player.pic">
                        </router-link>
                    </template>
                </div>
            </div>
        </router-link>
        <div class="details flex flex-column space-between">
            <div class="details-row flex space-between">
                <div>{{event.title}}</div>
                <div>{{event.genre}}</div>
            </div>
            <div class="details-row flex space-between">
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
                // console.log(playerId)
              const user = userService.getById(playerId)
              if (user) this.players.push(user)
          })  
        })
    },
    computed: {
        status() {
            const ratio = this.event.joinedMembersCount / +this.event.allowedMembersCount
            if (ratio < 0.4) return {txt: 'Waiting for players', color: 'lightgreen'}
            else if(ratio < 0.8) return {txt: 'Kinda full', color: 'white'}
            else if(ratio < 1) return {txt: 'Almost full', color: 'yellow'}
            return	{txt: 'Event full', color: 'red'}
        }
    }
}
</script>

<style>

</style>
