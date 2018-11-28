<template>
    <section class="user-profile">
        {{user}}
        <h1>Hello {{user.name}}</h1>
        <img class="user-icon" src="https://api.adorable.io/avatars/64/rocki.png">
        <h4>These are your profile details:</h4>
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
                {{event.time.day}} {{event.time.hour}}
                </router-link>
            </i>
        
        <h3>Events you joined:</h3>
            <i v-for="event in userPartEvents" :key="event">
                <router-link :to="'/event/' + event._id">
                {{event.title}} 
                {{event.time.day}} {{event.time.hour}}
                </router-link>
            </i>
        
    </section>
</template>

<script>
export default {
    data() {
        return {
            userAdminEvents: [],
            userPartEvents: []
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
        // get events, joined & created
        // display event title & time and link to it 
        this.$store.dispatch({type: 'getEventById', eventId: '5bfe6e85096449d7b4c67f8b'})
            .then(event => {
                this.userAdminEvents.push(event)
                this.userPartEvents.push(event)
            })
    }
}
</script >
<style scoped lang="scss">
.user-profile {
    .user-icon{
        border-radius: 50%;
    }
}
</style>
