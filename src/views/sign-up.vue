<template>
  <section class="signup-card-wrapper">
    <form @submit.prevent="submitNewUser" class="signup-form-container">
      <h1>sign up</h1>
      <div class="signup-card-user-image-container">
        <img
          class="signup-user-image"
          src="https://api.adorable.io/avatars/64/rocki.png"
          alt="event admin"
        >
      </div>

      <input type="text" placeholder="Full Name..." v-model="newUser.name">
      <input type="password" placeholder="Password..." v-model="newUser.password">
      <select v-model="newUser.level">
        <option>amateur</option>
        <option>professional</option>
      </select>

      <h4>instruments you play on:</h4>

      <div class="signup-instruments">
        <input type="checkbox" id="guitar" value="Guitar" v-model="newUser.instruments">
        <label for="guitar">Guitar</label>
        <input type="checkbox" id="bass" value="Bass" v-model="newUser.instruments">
        <label for="bass">Bass</label>
        <input type="checkbox" id="drums" value="Drums" v-model="newUser.instruments">
        <label for="drums">Drums</label>
      </div>
      <div class="signup-musicPrefs">
        <h4>favorite music:</h4>
        <input type="checkbox" id="rock" value="Rock" v-model="newUser.favGenres">
        <label for="rock">Rock</label>
        <input type="checkbox" id="classic" value="Classic" v-model="newUser.favGenres">
        <label for="classic">Classic</label>
        <input type="checkbox" id="world" value="World" v-model="newUser.favGenres">
        <label for="world">World</label>
      </div>

      <textarea v-model="newUser.bio" class="signup-bio" placeholder="tell us about yourself..."></textarea>
      <div class="signup-button-wrapper">
        <button>Submit</button>
        <router-link  to='/'><el-button>Back</el-button></router-link> 
      </div>
    </form>
  </section>
</template>

<script>
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
      console.log(this.newUser);
      this.$store.dispatch({type: 'signUpUser', newUser: this.newUser})
      this.$router.push('/');
    }
  }
};
</script>

<style>
</style>
