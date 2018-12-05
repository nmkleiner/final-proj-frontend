<template>
  <section class="signup-card-wrapper">
    <form @submit.prevent="submitNewUser" class="signup-form-container flex flex-column align-center">
      <h1>sign up</h1>
      <input type="text" placeholder="Full Name..." v-model="newUser.name">
      <input type="password" placeholder="Password..." v-model="newUser.password">
      <select v-model="newUser.level" placeholder="How experienced are you?">
        <option>amateur</option>
        <option>professional</option>
      </select>

      <h4>Choose instruments you play:</h4>
      <instruments-multiple-pick @setPickedInstruments="setPickedInstruments"></instruments-multiple-pick>
     
      <span>What genres do you like?</span>
      <el-checkbox-group class="mt-20" v-model="newUser.favGenres" size="medium">
        <el-checkbox-button v-for="genre in genres" :label="genre" :key="genre">{{genre}}</el-checkbox-button>
      </el-checkbox-group>

      <textarea v-model="newUser.bio" class="signup-bio" placeholder="tell us about yourself..."></textarea>
      <div class="signup-button-wrapper">
        <el-button native-type="submit">Save</el-button>
        <router-link  to='/'><el-button>Back</el-button></router-link> 
      </div>
    </form>
  </section>
</template>

<script>
import utilService from '@/service/util.service.js'
import instrumentsMultiplePick from '@/components/instruments-multiple-pick.vue'
export default {
  data() {
    return {
      newUser: {
        name: "",
        password: "",
        pic: '',
        instruments: [],
        level: 'amateur',
        bio: '',
        favGenres: [],
        location: "",
        partEventsIds: [],
        adminEventsIds: []
      },
      genres: ['rock','classic','jazz','reggae','progressive rock','world','country']
    };
  },
  methods: {
    submitNewUser() {
      this.newUser.pic = `/img/users/${this.newUser.name}.jpg`      
      this.$store.dispatch({type: 'signUpUser', newUser: this.newUser})
        .then(() => {this.$router.push('/')})
    },
    setPickedInstruments(instruments){
      this.newUser.instruments = instruments
      console.log('from signup form:', this.instruments)
    }
  },
  components:{
    instrumentsMultiplePick
  },
  created() {
    document.body.scrollIntoView();
  }
};
      
</script>

<style>
</style>
