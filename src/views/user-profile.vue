<template>
    <section class="user-profile flex flex-column">
            <h1 class="align-self-center">Hello {{user.name}}</h1>
            <img class="circle-icon align-self-center" :src="user.pic">
        <div class="main-container flex flex-column">
            <h4>Your profile details:</h4>
            <p>Bio: {{user.bio}}</p>
            <h3>Level: {{user.level}}</h3>
            <h3>Instruments: 
                <i v-for="instrument in user.instruments" :key="instrument">
                    {{instrument}}
                </i>
            </h3>
            <h3>
                Preferred genres:
                <i v-for="genre in user.favGenres" :key="genre">
                    {{genre}} 
                </i>.
            </h3>
            <h3>Events you created:</h3>
            <i v-for="event in userAdminEvents" :key="event._id">
                <router-link :to="'/event/' + event._id">
                {{event.title}} 
                {{event.time.day}} {{event.time.hour}}<br><br>
                </router-link>
            </i>
            
            <h3>Events you joined:</h3>
            <i v-for="event in userPartEvents" :key="event._id">
                <router-link :to="'/event/' + event._id">
                {{event.title}} 
                {{event.time.day}} {{event.time.hour}}<br><br>
                </router-link>
            </i>
        </div>        
    </section>
</template>

<script>
export default {
    data() {
        return {
            userAdminEvents: [],
            userPartEvents: [],
            // userFromQuery: '' if user from query !== loggedinuser, this page should look different different
        }
    },
    computed: {
      isLoggedInUser() {
        return this.$store.getters.isLoggedInUser
      },
      user() {
        return this.$store.getters.loggedInUser
      }
    },
    created() {
        this.userFromQuery
        document.body.scrollIntoView()
        this.user.adminEventsIds.forEach(eventId => {
            this.$store.dispatch({type: 'getEventById', eventId})
            .then(event => {
                this.userAdminEvents.push(event)
            })            
        });

        this.user.partEventsIds.forEach(eventId => {
            this.$store.dispatch({type: 'getEventById', eventId})
            .then(event => {
                this.userPartEvents.push(event)
            })
        })

    }
}
</script >
<style scoped lang="scss">

.user-profile {
    .main-container {
        padding: 20px;
        padding-left: 10vw;        
    }
    .user-icon{
        border-radius: 50%;
    }
}
</style>
