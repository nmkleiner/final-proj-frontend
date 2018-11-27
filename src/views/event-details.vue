<template>
  <section class="event-details flex">
      <div class="flex flex-column col-1">
        <h2>{{event.title}}</h2>
        <div class="flex">
            admin pic, admin name
            <!-- <img :src="admin.pic" alt="event admin">
            <span>{{admin.name}}</span> -->
        </div>
        <div class="flex">
            <h4>{{event.time.day}}&nbsp;{{event.time.hour}}&nbsp;</h4>
            <h4>{{event.location.address}}</h4>
        </div>
        <div class="flex">
            <h4>Genre: {{event.genre}}&nbsp;</h4>
            <h4>Level: {{event.level}}&nbsp;</h4>
            <h4 v-if="event.cost">cost: {{event.cost}}$</h4>
            <h4 v-else>cost: free</h4>
        </div>
        <img :src="event.pic"/>
        <el-button>discussions</el-button>
      </div>

      <div class="flex flex-column col-2">
          <span v-if="loggedInUser._id">Join as:</span>
          <span v-else >Login to join</span>
            <span>welcomed instruments:</span>
            <div class="flex instruments">
              <div class="instrument" 
              v-for="instrument in event.instruments" 
              :key="instrument.instrument">
                <div>{{instrument.amount}}x</div>
                <el-button class="instrument-pic">{{instrument.instrument}}</el-button> 
              </div>
          </div>
        <h5>{{event.desc}}</h5>
        <h5>
            Free players: 
            {{event.freePlayers.length || 0}}/
            {{event.freePlayers.amount}}
        </h5>
      </div>

      <!-- <h5>{{event.title}}</h5> -->
  </section>

</template>

<script>
export default {
    data() {
        return {
            event: {
                _id: 1,
                adminId: 'xyz',
                location: {address: 'florentin 6, tel aviv'},
                time: {day: '27/11',hour: '19:34'},
                title: 'Playing Lez Deppelin',
                desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio in maiores, laborum placeat ipsam ea. In cupiditate sed necessitatibus libero cumque inventore distinctio quidem. Possimus delectus ullam numquam officiis ea!',
                genre: 'rock',
                level: 'professional',
                pic: 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png',
                instruments:[{
                    instrument: 'guitar',
                    amount: 2,
                    playersIds: ['xyz','abc'],
                },{
                    instrument: 'french horn',
                    amount: 1,
                    playersIds: [],
                }],
                freePlayers: {
                    amount: 3,
                    membersIds: []
                },
                cost: 0,
            } ,
            players: [],//get from userService
            freePlayers: [], //get from userService
            admin: {}, // get from userService,
            loggedInUser: {},
            // loggedInUser: {_id: 'xyz'}
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    created() {
        const eventId = this.$route.params.eventId
        this.$store.dispatch({type: 'getEventById', eventId})
            .then(event => this.event = event)
    }
}
</script>

<style>

</style>
