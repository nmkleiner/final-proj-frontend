<template>
    <section class="required-instruments flex wrap">
        <div v-for="instrument in requiredInstruments" :key="instrument">
            <img class="icon-red" :src="'/img/events/' + instrument + '.png'" :title="instrument">
        </div>
        <template v-if="!preview">
            <div  v-for="instrument in chosenInstruments" :key="instrument">
                <img class="icon-green" :src="'/img/events/' + instrument + '.png'" :title="instrument">
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
            const instruments = this.event.instruments
                .filter(instrument => !instrument.playerIds.length)
                .map(instrument => instrument.instrument);
            if (!this.preview) return instruments
            else return instruments.slice(0,5)

        },
        chosenInstruments() {
            const instruments = this.event.instruments
                .filter(instrument => instrument.playerIds.length)
                .map(instrument => instrument.instrument);
            if (!this.preview) return instruments
            else return instruments.slice(0,5)
        }
    }
}
</script>

<style>

</style>
