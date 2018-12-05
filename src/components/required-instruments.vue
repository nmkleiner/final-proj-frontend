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
    name: 'required-instruments',
    props: {
        event: Object,   
    },
    computed: {
        requiredInstruments() {
            return this.event.instruments
                .filter(instrument => !instrument.playerIds.length)
                .map(instrument => instrument.instrument);
        },
        requiredInstrumentsObj() {
            return this.event.instruments
                .filter(instrument => !instrument.playerIds.length)
        },
        chosenInstruments() {
            return this.event.instruments
                .filter(instrument => instrument.playerIds.length)
                .map(instrument => instrument.instrument);
        }
    },
    mounted(){
        this.$emit('setrequiredInstrumentsToShow' ,this.requiredInstrumentsObj)
    }
}
</script>

<style>

</style>
