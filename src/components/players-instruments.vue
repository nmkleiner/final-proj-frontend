<template>
    <section class="players-instruments flex flex-column">
        <div class="row flex" v-for="player in players" :key="player._id">
            
            <div class="player-instrument-wrapper">
                <router-link v-if="player" :to="'/user/' + player._id">
                    <img class="circle-icon" :title="player.name" :src="player.pic">
                </router-link>
                <img class="inst" :src="'/img/events/' + playerInstrument(player._id) + '.png'"/>
            </div>
            <div class="flex flex-column">
                <span>{{player.name}}</span>
                <span>{{player.level}} 
                    <span v-for="instrument in player.instruments" :key="instrument">{{instrument}} </span>
                    player.
                </span>
            </div>
            <!-- <span v-if="player.partEventsIds.length > 1">been to {{player.partEventsIds.length}} jams.</span>
            <span v-if="player.adminEventsIds.length > 1">hosted {{player.partEventsIds.length}} jams.</span> -->
            <!-- {{player.rank}} -->


        </div>

    </section>
</template>

<script>
export default {
    props: {
        admin: Object,
        players: Array,
        event: Object,
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

<style lang="scss" scoped>

</style>
