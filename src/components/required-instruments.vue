<template>
    <section class="required-instruments flex wrap">
        <template>
            <div  v-for="instrument in chosenInstruments" :key="instrument">
                <img class="icon-green" :src="'/img/events/' + instrument + '.png'" :title="'Already have ' + instrument +'.'">
            </div>
        </template>
        <div v-for="instrument in requiredInstruments" :key="instrument">
            <img class="icon-red" :src="'/img/events/' + instrument + '.png'" :title="'Still looking for ' + instrument + '.'">
        </div>
    </section>
</template>

<script>
export default {
    props: {
        event: Object,
        
    },
    computed: {
        requiredInstruments() {
            return this.event.instruments
                .filter(instrument => !instrument.playerIds.length)
                .map(instrument => instrument.instrument);
        },
        chosenInstruments() {
            return this.event.instruments
                .filter(instrument => instrument.playerIds.length)
                .map(instrument => instrument.instrument);
        }
    }
}
</script>

<style>

</style>
