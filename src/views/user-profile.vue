<template>
    <section class="user-profile flex flex-column capitalize">
            <h1 class="align-self-center">{{user.name}}</h1>
            <img class="circle-icon align-self-center" :src="user.pic">
        <div class="main-container flex flex-column ">
            <h4>{{user.name}}'s profile details:</h4>
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
            <h3>Events created by {{user.name}}:</h3>
            <i v-for="event in userAdminEvents" :key="event._id">
                <router-link :to="'/event/' + event._id">
                {{event.title}} 
                {{event.time.day}} 
                {{event.time.hour.hours}}:{{event.time.hour.minutes}}
                <br><br>
                </router-link>
            </i>
            
            <h3>Events {{user.name}} joined:</h3>
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
            user: ''
        }
    },
    computed: {
      isLoggedInUser() {
        return this.$store.getters.isLoggedInUser
      },
      loggedInUser() {
        return this.$store.getters.loggedInUser
      }
    },
    created() {
        document.body.scrollIntoView()
        const userId = this.$route.params.userId

        this.$store.dispatch({type: 'getUserById', userId})
            .then(user => this.user = user)
            .then(() => {

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
        })

    }
}
</script >
<style scoped lang="scss">

.user-profile {
    margin-top: 55px;
    .main-container {
        padding: 20px;
        padding-left: 10vw;        
    }
    .user-icon{
        border-radius: 50%;
    }
}
</style>
