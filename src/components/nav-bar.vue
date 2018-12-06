<template>
    <div class="nav-bar flex space-between">
        <router-link class="logo" to="/"><i class="fas fa-drum fa-lg"></i> MUSIGROUPS</router-link>
        <div class="links">
          <button class="nav-btn" @click="goEdit" v-if="isLoggedInUser" to="/event/edit">
            Create <i class="fas fa-plus"></i>
          </button>
          <img v-if="loggedInUser" @click="goProfile" class="circle-icon-sm" :src="loggedInUser.pic"/>
          <router-link class="" v-if="isLoggedInUser" :to="'/user/' + loggedInUser._id">
            Profile
          </router-link>
          <a v-if="isLoggedInUser" @click="logout">Logout</a>
          <router-link v-else to="/login">Login</router-link>
        </div>

        <a @click="setIsOpen" class="icon" :class="{'open': isOpen, 'guest': !isLoggedInUser}">
          <i class="fa fa-bars"></i>
        </a>

        <aside class="flex flex-column" :class="{'open': isOpen, 'guest': !isLoggedInUser}">
          <a v-if="isLoggedInUser" @click="logout">Logout</a>
          
          <div class="flex align-center profile-wrapper" v-if="isLoggedInUser">
            <img @click="goProfile" class="circle-icon-sm" :src="loggedInUser.pic"/>
            <router-link class=""  :to="'/user/' + loggedInUser._id">
              Profile
            </router-link>
          </div>

          <router-link v-else to="/login">Login</router-link>
          <button class="nav-btn" @click="goEdit" v-if="isLoggedInUser" to="/event/edit">
            Create <i class="fas fa-plus"></i>
          </button>
        </aside>
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
        goProfile() {
          this.$router.push(`/user/${loggedInUser._id}`)
        },
        setIsOpen(){
            return this.isOpen = !this.isOpen;
        },
        logout() {
          this.$store.dispatch({type: 'logout'})
          .then(() => {this.$router.push('/')})
        },
        goEdit() {
          this.$router.push('/event/edit')
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
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0px;
  border-bottom: 1px solid white;
  .circle-icon-sm {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  .nav-btn{
    background-color: black;
    color: rgb(144, 241, 241);
    font-size: 17px;
    border: 1px solid lighten(black,20%);
    padding: 8px;
    border-radius: 50px;
    margin: 0 20px;
    cursor: pointer;
  }
  a {
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
    cursor: pointer; 
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
  aside{
    position: fixed;
    right: -100%;
  }
  &.guest{
    position: absolute;
    top: 0;
    left: 0;
    .logo:hover {
      border-bottom: 1px solid transparent;
    }
  }
}

@media screen and (max-width: 730px) {
  .nav-bar {
    .nav-btn, .circle-icon-sm {
      display: none;
    }
    a:not(.logo) {
      display: none;
    }
    a.icon {
      float: right;
      display: block;
      border: 1px solid transparent;
      &.open {
        transform: rotateZ(90deg);
      }
    }
    &.guest {
      a.icon{ 
        display: none;
      }
      a{
        display: inline;
      }
    } 
    aside{
    background-color: black;
    display: flex;
    position: fixed;
    padding: 0 20px;
    right: -30vw;
    top: 50px;
    height: calc(100vh - 50px);
    transition: .8s ease-in-out;
    .profile-wrapper {
        border: 1px solid transparent;
        a{
          border: none;

        }
      &:hover{
        border-bottom: 1px solid rgb(144, 241, 241);
      }
    }
      &.open{
        transform: translateX(-30vw);
        .nav-btn, .circle-icon-sm, a {
          display: block;
        }
      }
    } 
  }
  .nav-bar.open {position: fixed;}
  .nav-bar.open .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
}

</style>
