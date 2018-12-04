<template>
    <section class="players-instruments flex">

        <div class="flex flex-column">
          <!-- <router-link v-if="admin" :to="'/user/' + event.adminId">
            <img v-if="admin.pic" class="circle-icon" :title="admin.name" :src="admin.pic">
          </router-link>
            <div class="icon-white"></div> -->
        </div>

        <div class="flex flex-column" v-for="player in players" :key="player._id">
            <!-- {{player}} -->
          <router-link v-if="player" :to="'/user/' + player._id">
            <img class="circle-icon" :title="player.name" :src="player.pic">
          </router-link>

            <img v-if="preview" class="icon-green" :title="playerInstrument(player._id)" :src="'/img/events/' + playerInstrument(player._id) + '.png'"/>
            <img v-else class="icon-white" :src="'/img/events/' + playerInstrument(player._id) + '.png'"/>
        </div>

    </section>
</template>

<script>
export default {
    props: {
        admin: Object,
        players: Array,
        event: Object,
        preview: Boolean
    },
    methods: {
        playerInstrument(playerId) {
            const instrument =  this.event.instruments.find(inst => {
                const index = inst.playerIds.findIndex(id => id === playerId)
                return (index === -1)? null : inst
            })
            // return '/img/events/'+ instrument.instrument + '.png'
            return instrument.instrument
        }
    }
}
</script>

<style>

</style>
