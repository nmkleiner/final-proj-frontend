<template>
    <ul v-if="places.length > 0">
        <li></li>
    </ul>
</template>

<script>
const axios = require('axios');
// const cors = require('cors');


export default {
    data(){
        return {
            places: []
        }
    },
    methods: {
        getPlaces(){
            return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.089561,34.8627918&radius=10000&keyword=חדרי+חזרות&key=AIzaSyCYDc9_jhsMj7ahDHWpbJES2XZGfjkxRjI')
            .then(res => res.date)
            .then(places =>  console.log(places))  //this.places = places
        }
    },
    created() {
        this.getPlaces()
    }
}
</script>

<style>
</style>
