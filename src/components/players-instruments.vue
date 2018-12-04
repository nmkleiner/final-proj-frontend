<template>
    <section class="players-instruments">
        <!-- {{players}} -->
        <!-- {{event}} -->
          <router-link v-if="admin" :to="'/user/' + event.adminId">
            <img v-if="admin.pic" class="circle-icon" :title="admin.name" :src="admin.pic">
          </router-link>
        <div v-for="player in players" :key="player._id">
          <router-link v-if="admin" :to="'/user/' + event.adminId">
            <img class="circle-icon" :title="player.name" :src="player.pic">
          </router-link>
            <span>{{playerInstrument(player._id)}}</span>
        </div>

    </section>
</template>

<script>
export default {
    props: {
        admin: Object,
        players: Array,
        event: Object
    },
    methods: {
        playerInstrument(playerId) {
            const instrument =  this.event.instruments.find(inst => {
                const index = inst.playerIds.findIndex(id => id === playerId)
                return (index === -1)? null : inst
            })
            return instrument.instrument
        }
    }
}
</script>

<style>

</style>
