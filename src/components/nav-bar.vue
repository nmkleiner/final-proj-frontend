<template>
    <div class="nav-bar flex space-between" :class="{'responsive': isOpen, 'guest': !isLoggedInUser}">
        <router-link class="logo" to="/"><i class="fas fa-drum fa-lg"></i> MUSIGROUPS</router-link>
        <div class="links">
          <!-- <button v-if="isLoggedInUser" to="/event/edit">
            Create+
          </button>
            <img class="circle-icon-sm" :src="loggedInUser.pic"/> -->
          <router-link class="" v-if="isLoggedInUser" :to="'/user/' + loggedInUser._id">
            Profile
          </router-link>
          <!-- <router-link to="/about">About</router-link> -->
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
  opacity: 0.85;
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0px;

  a {
    // float: left;
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
  img {
    // float: left;
    display: block;
    // padding: 0px 20px;

  }

  a:hover {
    border-bottom: 1px solid rgb(144, 241, 241);
  }
  .logo:hover {
    border-bottom: 1px solid transparent;
  }
  .links{
    display: flex;
    align-items: center;
  }
  .links a:last-child{
    margin-right: 20px;
  }

  .icon {
    display: none;
  }
}
.nav-bar.guest{
  position: absolute;
  top: 0;
  left: 0;
  .logo:hover {
    border-bottom: 1px solid transparent;
  }
}


@media screen and (max-width: 730px) {
  .nav-bar a:not(.logo) {display: none;}
  .nav-bar a.icon {
    float: right;
    display: block;
  }
  .nav-bar.guest a.icon {
    display: none;
  }
  .nav-bar.guest a {
    display: inline;
  }
  .nav-bar.responsive {position: fixed;}
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
