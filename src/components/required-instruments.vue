<template>
  <section class="required-instruments flex wrap">
      <div v-for="instrument in instruments" :key="instrument.name">
        <img
          :class="{
            'icon-green': instrument.required, 
            'icon-red': !instrument.required
            }"
          :src="'/img/events/' + instrument.name + '.png'"
          :title="'Already have ' + instrument.name +'.'"
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
    instruments() {
      let instruments = this.event.instruments
        .map(instrument => {
          const required = !instrument.playerIds.length 
          return {name: instrument.name, required}
        })
        .sort((a,b) => {
          if (a.required) return 1
          else return -1
        })
        if (this.preview && instruments.length > 6) instruments.length = 6
      return instruments
    },
    requiredInstrumentsObj() {
        return this.event.instruments.filter(
        instrument => !instrument.playerIds.length
        );
    },
  },
  mounted() {
    this.$emit("setrequiredInstrumentsToShow", this.requiredInstrumentsObj);
  }
};
</script>