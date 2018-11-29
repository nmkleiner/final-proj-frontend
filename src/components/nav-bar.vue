<template>
    <div class="nav-bar flex space-between" :class="{'responsive': isOpen}">
        <router-link class="logo" to="/"><i class="fas fa-drum fa-lg"></i>musiGroops</router-link>
        <div class="links">
          <router-link to="/">Home</router-link>
          <router-link v-if="isLoggedInUser" :to="'/user/' + loggedInUser._id">Profile</router-link>
          <router-link v-if="isLoggedInUser" to="/event/edit">Create</router-link>
          <router-link to="/about">About</router-link>
          <a v-if="isLoggedInUser" @click="logout">Logout</a>
          <router-link v-else to="/login">Login</router-link>
        </div>
        <a @click="setIsOpen" class="icon"><i class="fa fa-bars"></i></a>
        
</div>
</template>

<script>
export default {
    data(){
        return {
            isOpen: false
        }
    },
    methods: {
        setIsOpen(){
            return this.isOpen = !this.isOpen;
        },
        logout() {
          this.$store.dispatch({type: 'logout'})
          .then(() => {this.$router.push('/')})
        }
    },
    computed: {
      isLoggedInUser() {
        return this.$store.getters.isLoggedInUser
      },
      loggedInUser() {
        return this.$store.getters.loggedInUser
      }
    }
};
</script>

<style lang="scss">
  
@import url('https://fonts.googleapis.com/css?family=Montserrat');

.nav-bar {
  font-family: 'Montserrat', sans-serif;  
  overflow: hidden;
  background-color: black;
  
  a {
  float: left;
  display: block;
  color: rgb(144, 241, 241);
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 17px;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: .3s;
  }

  a:hover {
  border-bottom: 1px solid rgb(144, 241, 241);
  }
  .logo:hover {
  border-bottom: 1px solid transparent;
  }

  .links a:last-child{
  margin-right: 80px;
  }

  .icon {
  display: none;
  }
}


@media screen and (max-width: 730px) {
  .nav-bar a:not(.logo) {display: none;}
  .nav-bar a.icon {
    float: right;
    display: block;
  }
  .nav-bar.responsive {position: relative;}
  .nav-bar.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .nav-bar.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

</style>
