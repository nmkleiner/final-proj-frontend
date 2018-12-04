<template>
  <section class="instruments-wrapper">
    <div class="instruments-container flex">
      <div
        v-for="(instrument, index) in instruments"
        :key="index"
        @click="setPickedInstrument(instrument)"
      >
        <img :src="'/img/events/'+ instrument.instrument + '.png'">
      </div>
    </div>
    <el-button v-if="!pickedInstrument" type="danger" class="final-join-btn">Pick your instrument:</el-button>
    <el-button v-else type="danger" class="final-join-btn" @click="selectInstrument">Join As: {{pickedInstrument}}</el-button>
  </section>
</template>

<script>
export default {
  name: 'instruments-comp',
  props: ["instruments"],
  data() {
    return {
      pickedInstrument: null
    };
  },
  methods: {
    setPickedInstrument(instrument) {
      this.pickedInstrument = instrument.instrument;
      console.log(this.pickedInstrument)
    },
    selectInstrument(){
      this.$emit('selectedInstrument', this.pickedInstrument);
    }
  },
  created() {
    console.log("from ins comp ", this.instruments);
  }
};
</script>

<style scoped lang='scss'>

.instruments-wrapper {
  margin: 10px;
  border: 1px solid lightgray;
  width: 100%;
  height: 200px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.instruments-container {
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
}
img {
  width: 56px;
  height: 56px;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}

button {
  margin: 20px 0px 0px 30px;
}
</style>
