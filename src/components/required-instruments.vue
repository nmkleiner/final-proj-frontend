<template>
    <section class="required-instruments flex wrap">
        <!-- {{event}} -->
        <div v-for="instrument in requiredInstruments" :key="instrument">
            <img class="icon-red" :src="instrument">
        </div>
        <template v-if="!preview">
            <div  v-for="instrument in chosenInstruments" :key="instrument">
                <img class="icon-green" :src="instrument">
            </div>
        </template>
    </section>
</template>

<script>
export default {
    props: {
        event: Object,
        preview: Boolean
    },
    computed: {
        requiredInstruments() {
            return this.event.instruments
                .filter(instrument => !instrument.playerIds.length)
                .map(instrument => '/img/events/'+ instrument.instrument + '.png');
        },
        chosenInstruments() {
            return this.event.instruments
                .filter(instrument => instrument.playerIds.length)
                .map(instrument => '/img/events/'+ instrument.instrument + '.png');
        }
    }
}
</script>

<style>

</style>
