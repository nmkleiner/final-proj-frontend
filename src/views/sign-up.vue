<template>
  <section class="signup-card-wrapper ">
    <form @submit.prevent="submitNewUser" class="signup-form-container flex flex-column align-center">
      <h1>sign up</h1>

      <input type="text" placeholder="Full Name..." v-model="newUser.name">
      <input type="password" placeholder="Password..." v-model="newUser.password">
      <select v-model="newUser.level" placeholder="How experienced are you?">
        <option>amateur</option>
        <option>professional</option>
      </select>

      <h4>Instruments you play:</h4>

      <div class="signup-instruments">
        <input type="checkbox" id="guitar" value="Guitar" v-model="newUser.instruments">
        <label for="guitar">Guitar</label>
        <input type="checkbox" id="bass" value="Bass" v-model="newUser.instruments">
        <label for="bass">Bass</label>
        <input type="checkbox" id="drums" value="Drums" v-model="newUser.instruments">
        <label for="drums">Drums</label>
        <input type="checkbox" id="flute" value="Flute" v-model="newUser.instruments">
        <label for="flute">Flute</label>
        <input type="checkbox" id="saxophone" value="Saxophone" v-model="newUser.instruments">
        <label for="saxophone">Saxophone</label>
        <input type="checkbox" id="trumpet" value="Trumpet" v-model="newUser.instruments">
        <label for="trumpet">Trumpet</label>
      </div>
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
      this.newUser.pic = `/img/users/${this.newUser.name}.jpg`      
      //TODO: get location too
      this.$store.dispatch({type: 'signUpUser', newUser: this.newUser})
        .then(() => {this.$router.push('/')})
    }
  }
};
      
</script>

<style>
</style>
