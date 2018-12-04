<template>
  <section class="instruments-wrapper">
    <div class="signup-instruments flex">
      <input
        type="checkbox"
        id="guitar"
        value="guitar"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="guitar">
        <img
          :src="'/img/events/guitar.png'"
          alt="guitar"
          @click="setPicked('guitar')"
          :class="{picked: itemPicked.guitar}"
        >
      </label>
      <input
        type="checkbox"
        id="bass-guitar"
        value="bass-guitar"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="bass-guitar">
        <img
          :src="'/img/events/bass-guitar.png'"
          @click="setPicked('bassGuitar')"
          :class="{picked: itemPicked.bassGuitar}"
        >
      </label>
      <input
        type="checkbox"
        id="acoustic-guitar"
        value="acoustic-guitar"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="acoustic-guitar">
        <img
          :src="'/img/events/acoustic-guitar.png'"
          @click="setPicked('acousticGuitar')"
          :class="{picked: itemPicked.acousticGuitar}"
        >
      </label>
      <input
        type="checkbox"
        id="dj"
        value="dj"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="dj">
        <img :src="'/img/events/dj.png'" @click="setPicked('dj')" :class="{picked: itemPicked.dj}">
      </label>
      <input
        type="checkbox"
        id="drums"
        value="drums"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="drums">
        <img
          :src="'/img/events/drums.png'"
          @click="setPicked('drums')"
          :class="{picked: itemPicked.drums}"
        >
      </label>
      <input
        type="checkbox"
        id="flute"
        value="flute"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="flute">
        <img
          :src="'/img/events/flute.png'"
          @click="setPicked('flute')"
          :class="{picked: itemPicked.flute}"
        >
      </label>
      <input
        type="checkbox"
        id="french-horn"
        value="french-horn"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="french-horn">
        <img
          :src="'/img/events/french-horn.png'"
          @click="setPicked('frenchHorn')"
          :class="{picked: itemPicked.frenchHorn}"
        >
      </label>
      <input
        type="checkbox"
        id="other"
        value="other"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="other">
        <img
          :src="'/img/events/other.png'"
          @click="setPicked('other')"
          :class="{picked: itemPicked.other}"
        >
      </label>
      <input
        type="checkbox"
        id="piano"
        value="piano"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="piano">
        <img
          :src="'/img/events/piano.png'"
          @click="setPicked('piano')"
          :class="{picked: itemPicked.piano}"
        >
      </label>
      <input
        type="checkbox"
        id="saxophone"
        value="saxophone"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="saxophone">
        <img
          :src="'/img/events/saxophone.png'"
          @click="setPicked('saxophone')"
          :class="{picked: itemPicked.saxophone}"
        >
      </label>
      <input
        type="checkbox"
        id="synthesizer"
        value="synthesizer"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="synthesizer">
        <img
          :src="'/img/events/synthesizer.png'"
          @click="setPicked('synthesizer')"
          :class="{picked: itemPicked.synthesizer}"
        >
      </label>
      <input
        type="checkbox"
        id="trumpet"
        value="trumpet"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="trumpet">
        <img
          :src="'/img/events/trumpet.png'"
          @click="setPicked('trumpet')"
          :class="{picked: itemPicked.trumpet}"
        >
      </label>
      <input
        type="checkbox"
        id="tuba"
        value="tuba"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="tuba">
        <img
          :src="'/img/events/tuba.png'"
          @click="setPicked('tuba')"
          :class="{picked: itemPicked.tuba}"
        >
      </label>
      <input
        type="checkbox"
        id="violin"
        value="violin"
        v-model="pickedInstruments"
        @change="setPickedInstruments"
        hidden
      >
      <label for="violin">
        <img
          :src="'/img/events/violin.png'"
          @click="setPicked('violin')"
          :class="{picked: itemPicked.violin}"
        >
      </label>
    </div>
  </section>
</template>

<script>
export default {
  props: ["currInstruments"],
  data() {
    return {
      pickedInstruments: [],
      itemPicked: {
        guitar: false,
        bassGuitar: false,
        acousticGuitar: false,
        dj: false,
        flute: false,
        frenchHorn: false,
        other: false,
        piano: false,
        saxophone: false,
        synthesizer: false,
        trumpet: false,
        tuba: false,
        violin: false
      }
    };
  },
  methods: {
    setPickedInstruments() {
      this.$emit("setPickedInstruments", this.pickedInstruments);
    },
    setPicked(instrument) {
      this.itemPicked[instrument] = !this.itemPicked[instrument];
    }
  },
  created() {
    console.log("currInstruments", this.currInstruments);
    if (this.currInstruments.length > 0) {
      this.pickedInstruments = this.currInstruments;
      console.log("on created inst-mult", this.pickedInstruments);
      this.pickedInstruments.forEach(pickedInstrument => {
          console.log('pickedInstrument',pickedInstrument)
        for (var instrument in this.itemPicked) {
          if (pickedInstrument === instrument) {
              console.log('instrument', instrument)
            this.itemPicked[instrument] = true;
          }
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.instruments-wrapper {
  margin: 10px;
  border: 1px solid lightgray;
  height: auto;
  width: 100%;
}
.signup-instruments {
  padding: 5px;
  flex-wrap: wrap;
  justify-content: center;
  label {
    margin: 5px;
  }
}
img {
  width: 48px;
  height: 48px;
  padding: 5px;
  border: 1px solid black;
  &:hover {
    background-color: lightgray;
  }
  &:active {
    background-color: gray;
  }
}
.picked {
  background-color: gray;
}
</style>
