<template>
  <section class="instruments-wrapper flex">
      <div class="signup-instruments">
        <input type="checkbox" id="guitar" value="guitar" v-model="pickedInstruments"  @change="setPickedInstruments" hidden>
        <label for="guitar"><img :src="'/img/events/guitar.png'" @click="setPicked('guitar')" :class="{picked: itemPicked.guitar}"/></label>
        <input type="checkbox" id="bass-guitar" value="bass-guitar" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="bass-guitar"><img :src="'/img/events/bass-guitar.png'"  @click="setPicked('bassGuitar')" :class="{picked: itemPicked.bassGuitar}"/></label>
        <input type="checkbox" id="acoustic-guitar" value="acoustic-guitar" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="acoustic-guitar"><img :src="'/img/events/acoustic-guitar.png'"  @click="setPicked('acousticGuitar')" :class="{picked: itemPicked.acousticGuitar}"/></label>
        <input type="checkbox" id="dj" value="dj" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="dj"><img :src="'/img/events/dj.png'"  @click="setPicked('dj')" :class="{picked: itemPicked.dj}"/></label>
        <input type="checkbox" id="drums" value="drums" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="drums"><img :src="'/img/events/drums.png'"  @click="setPicked('drums')" :class="{picked: itemPicked.drums}"/></label>
        <input type="checkbox" id="flute" value="flute" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="flute"><img :src="'/img/events/flute.png'"  @click="setPicked('flute')" :class="{picked: itemPicked.flute}"/></label>
        <input type="checkbox" id="french-horn" value="french-horn" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="french-horn"><img :src="'/img/events/french-horn.png'"  @click="setPicked('frenchHorn')" :class="{picked: itemPicked.frenchHorn}"/></label>
        <input type="checkbox" id="other" value="other" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="other"><img :src="'/img/events/other.png'"  @click="setPicked('other')" :class="{picked: itemPicked.other}"/></label>
        <input type="checkbox" id="piano" value="piano" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="piano"><img :src="'/img/events/piano.png'"  @click="setPicked('piano')" :class="{picked: itemPicked.piano}"/></label>
        <input type="checkbox" id="saxophone" value="saxophone" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="saxophone"><img :src="'/img/events/saxophone.png'"  @click="setPicked('saxophone')" :class="{picked: itemPicked.saxophone}"/></label>
        <input type="checkbox" id="synthesizer" value="synthesizer" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="synthesizer"><img :src="'/img/events/synthesizer.png'"  @click="setPicked('synthesizer')" :class="{picked: itemPicked.synthesizer}"/></label>
        <input type="checkbox" id="trumpet" value="trumpet" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="trumpet"><img :src="'/img/events/trumpet.png'"  @click="setPicked('trumpet')" :class="{picked: itemPicked.trumpet}"/></label>
        <input type="checkbox" id="tuba" value="tuba" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="tuba"><img :src="'/img/events/tuba.png'"  @click="setPicked('tuba')" :class="{picked: itemPicked.tuba}"/></label>
        <input type="checkbox" id="violin" value="violin" v-model="pickedInstruments" @change="setPickedInstruments" hidden>
        <label for="violin"><img :src="'/img/events/violin.png'"  @click="setPicked('violin')" :class="{picked: itemPicked.violin}"/></label>
        
      </div>
        
  </section>
</template>

<script>
export default {
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
        console.log(this.pickedInstruments)
    },
    setPicked(instrument){
        this.itemPicked[instrument] = !this.itemPicked[instrument];
    }
  },
  created() {
  }
};
</script>

<style scoped lang='scss'>

.instruments-wrapper {
  margin: 10px;
  border: 1px solid lightgray;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: space-around;
}
.signup-instruments {
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
.picked{
    background-color: lightblue;
}


</style>
