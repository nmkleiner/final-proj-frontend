<template>
  <section class="instruments-list">
    <div v-for="(currInstrument, idx) in instruments" :key="currInstrument.name" @click="toggleInstrument(idx)">
      <el-button @click="$emit('add-instrument',currInstrument.name)">{{currInstrument.name}}</el-button>
      <!-- <img :src="instruments.src" alt=""> -->

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
        this.instruments[instrumentIdx].isSelected = !this.instruments[instrumentIdx].isSelected;
      }
    },
    computed: {
      // instrumentStatus() {
      //   return {
      //     selected: instrument.isSelected
      //   }
      // }
    },
    watch: {

    },
    created() {
        
    }
}
</script>

<style>

</style>
