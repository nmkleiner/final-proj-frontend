<template>
  <section class="required-instruments flex wrap">
    <template>
      <div v-for="instrument in chosenInstruments" :key="instrument">
        <img
          class="icon-green"
          :src="'/img/events/' + instrument + '.png'"
          :title="'Already have ' + instrument +'.'"
        >
      </div>
    </template>
    <div v-for="instrument in requiredInstruments" :key="instrument">
      <img
        class="icon-red"
        :src="'/img/events/' + instrument + '.png'"
        :title="'Still looking for ' + instrument + '.'"
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "required-instruments",
  props: {
    event: Object,
    preview: Boolean
  },
  computed: {
    requiredInstruments() {
      let instruments = this.event.instruments
        .filter(instrument => !instrument.playerIds.length)
        .map(instrument => instrument.name);
      if (this.preview) return instruments.slice(0, 6);
      return instruments;
    },
    requiredInstrumentsObj() {
      return this.event.instruments.filter(
        instrument => !instrument.playerIds.length
      );
    },
    chosenInstruments() {
      return this.event.instruments
        .filter(instrument => instrument.playerIds.length)
        .map(instrument => instrument.name);
    }
  },
  mounted() {
    this.$emit("setrequiredInstrumentsToShow", this.requiredInstrumentsObj);
  }
};
</script>

<style>
</style>
