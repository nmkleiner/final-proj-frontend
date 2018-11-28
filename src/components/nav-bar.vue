<template>
    <div class="static topnav" :class="{'responsive': isOpen}">
        <a><i class="fab fa-html5 fa-lg"></i></a>
        <router-link to="/">Home</router-link>
        <router-link to="#">Users</router-link>
        <router-link to="/event/edit">Create</router-link>
        <router-link to="/about">About</router-link>
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
        }
    }
};
</script>

<style>

.topnav {
  font-family: 'Montserrat', sans-serif;  
  overflow: hidden;
  background-color: snow;
  border: 2px solid black;
  border-radius: 5px;
}

.topnav a {
  float: left;
  display: block;
  color: darkslategray;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: yellowgreen;
  color: black;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
