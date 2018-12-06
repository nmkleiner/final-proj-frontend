<template>
  <GmapMap
    v-if="center"
    ref="mapRef"
    class="static map"
    :zoom="18"
    :center="center"
    map-type-id="roadmap"
    style="height: 300px"
  >
    <GmapMarker
      v-if="markers.position"
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script>
const axios = require('axios');
export default {
  props: ["currEvent"],
  data() {
    return {
      markers: [
        {
          position: null
        }
      ],
      center: null
    }
  },
  methods: {
      getCoorFromAddress(location){
      var currEventLocStr = `${location.address.replace(/[^a-zA-Z0-9]/g,'+')}+${location.city.replace(/[^a-zA-Z0-9]/g,'+')}`
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${currEventLocStr}&key=AIzaSyC1FhnnrcBKyOeZF9as6Qw89mBzjul9jU4`)
      .then(res => {
        var latlng = res.data.results[0].geometry.location
        this.center = latlng
        this.markers.position.push(latlng)
        return latlng
        }).then(latlng => {
          this.$refs.mapRef.panTo(latlng)
        })
    }
  },
  created(){
      this.getCoorFromAddress(this.currEvent.location)
  }
  }

</script>

<style>
</style>
