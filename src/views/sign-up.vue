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
      <instruments-multiple-pick></instruments-multiple-pick>
     
      <div class="signup-musicPrefs">
        <h4 class="text-align-center">favorite music:</h4>
        <input type="checkbox" id="rock" value="Rock" v-model="newUser.favGenres">
        <label for="rock">Rock</label>
        <input type="checkbox" id="classic" value="Classic" v-model="newUser.favGenres">
        <label for="classic">Classic</label>
        <input type="checkbox" id="world" value="World" v-model="newUser.favGenres">
        <label for="world">World</label>
      </div>

      <textarea v-model="newUser.bio" class="signup-bio" placeholder="tell us about yourself..."></textarea>
      <div class="signup-button-wrapper">
        <el-button>Save</el-button>
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
      }
    };
  },
  methods: {
    submitNewUser() {
      const num = utilService.getRandomIntInclusive(1,90)
      const gender = (utilService.getRandomIntInclusive(0,1))? 'women': 'men'
      this.newUser.pic = `https://randomuser.me/api/portraits/med/${gender}/${num}.jpg`
      
      //TODO: get location too
      this.$store.dispatch({type: 'signUpUser', newUser: this.newUser})
        .then(() => {this.$router.push('/')})
    }
  },
  components:{
    instrumentsMultiplePick
  }
};
      
</script>

<style>
</style>
