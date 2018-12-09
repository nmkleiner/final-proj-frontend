<template>
  <section class="instruments-wrapper">
    <h4 class="final-join-btn">Pick your instrument:</h4>
    <div class="instruments-container flex">
      <div
        v-for="(instrument, index) in instruments"
        :key="index"
        @click="setPickedInstrument(instrument)"
      >
        <img
          :src="'/img/events/'+ instrument.name + '.png'"
          :class="{picked: pickedInstrument === instrument.name}"
        >
      </div>
    </div>
    <el-button
      round
      class="final-join-btn brand-button"
      @click="selectInstrument"
    >Join As: {{pickedInstrument}}</el-button>
    <el-button @click='cancelInstrumentPick' round >Back</el-button>
  </section>
</template>

<script>
export default {
  name: "pick-instruments-comp",
  props: ["instruments"],
  data() {
    return {
      pickedInstrument: null
    };
  },
  methods: {
    setPickedInstrument(instrument) {
      this.pickedInstrument = instrument.name;
    },
    selectInstrument() {
      this.$emit("selectedInstrument", this.pickedInstrument);
    },
    cancelInstrumentPick(){
      this.pickedInstrument = null;
      this.selectInstrument();
    }
  },
};
</script>

<style scoped lang='scss'>
.instruments-wrapper {
  border: 1px solid lightgray;
  width: 100%;
  padding-bottom: 20px;
}
.instruments-container {
  padding: 10px;
  flex-wrap: wrap;
}
img {
  border-radius: 5px;
  width: 40px;
  height: 40px;
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  background-color: #f56c6c;
  &:hover {
    background-color: #85ce61;
  }
  &:active {
    background-color: #5daf34;
  }
}

h4 {
  text-align: center;
}

.picked {
  background-color: #67c23a;
}

button {
  margin: 20px 0px 0px 30px;
}
</style>
