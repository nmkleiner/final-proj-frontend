<template>
  <section class="instruments-list">
    <div v-for="(instrument, idx) in instruments" :key="instrument.name" @click="toggleInstrument(idx)"
    :class="instrumentStatus">
      <img :src="instruments.src" alt="">
    </div>
  </section>
</template>

<script>

export default {
    data() {
        return {
            instruments: [{name: 'guitar', src: '', isSelected: false}],
        }
    },
    methods: {
      toggleInstrument(instrumentIdx) {
        instruments[instrumentIdx].isSelected = !instruments[instrumentIdx].isSelected;
      }
    },
    computed: {
      instrumentStatus() {
        return {
          selected: instrument.isSelected
        }
      }
    },
    watch: {

    },
    created() {
        
    }
}
</script>

<style>

</style>
