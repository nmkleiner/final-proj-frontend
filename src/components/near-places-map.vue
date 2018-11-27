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
            console.log('fired!')
            return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.089561,34.8627918&radius=10000&keyword=חדרי+חזרות&key=AIzaSyDO8_gGN5DLINa4SLwfz5wMEK990KsDuIo')
            .then(res => console.log(res.data.results))
        }
    },
    created() {
        // this.getPlaces()
    }
}
</script>

<style>
</style>
