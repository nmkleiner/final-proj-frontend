<template>
  <section class="event-details flex">
      <div class="flex flex-column col-1">
        <h1>{{event.title}}</h1>
        <div class="flex">
            admin pic, admin name
            <!-- <img :src="admin.pic" alt="event admin">
            <span>{{admin.name}}</span> -->
        </div>
       
        <div class="flex flex-column">
            <h4>Genre: {{event.genre}}&nbsp;</h4>
            <h4>Level: {{event.level}}&nbsp;</h4>
            
        </div>

     <span v-if="loggedInUser._id">Play with us as:</span>
          <span v-else >Login to join</span>
            <span>welcomed instruments:</span>
            <div class="flex instruments">
              <div class="instrument" 
              v-for="instrument in event.instruments" 
              :key="instrument.instrument">
                <div>
                    {{instrument.amount}}x
                </div>
                <el-button @click="joinAs(instrument.instrument)" 
                class="instrument-pic">
                {{instrument.instrument}}
                </el-button> 
                </div>
            </div>
        <h4>
            Free players: 
            {{event.freePlayers.length || 0}}/
            {{event.freePlayers.amount}}
        </h4>
        <h4>{{event.desc}}</h4>

        
        <el-button>discussions</el-button>
      </div>

      <div class="flex flex-column col-2">
           <div class="flex flex-column">
            <h4>{{event.time.day}}&nbsp;{{event.time.hour}}&nbsp;</h4>
            <h4>{{event.location.address}}</h4>
        </div>
          <h4 v-if="event.cost">cost: {{event.cost}}$</h4>
            <h4 v-else>cost: free</h4>
         <img class="event-img" src="https://picsum.photos/200/300/?random"/>
        <div class="location">map</div>
      </div>
  </section>
</template>

<script>
export default {
    methods: {
        joinAs(instrument = null) {
            if (instrument === null) {
                if (this.event.freePlayers.membersIds.length < this.event.freePlayers.amount)
                this.event.freePlayers.membersIds.push(this.loggedInUser._id)
                else {
                    // TODO:cannot join
                }
            }
            else {
                const instrumentObject = this.event.instruments.find(inst => inst.instrument === instrument)
                if (instrumentObject.playersIds.length < instrumentObject.amount) {
                    instrumentObject.playersIds.push(this.loggedInUser._id)
                }
                else {
                    // TODO:cannot join
                }
            }
            console.log(this.event.instruments)
        }
    },
    computed: {

    },
    watch: {

    },
    created() {
        const eventId = this.$route.params.eventId
        this.$store.dispatch({type: 'getEventById', eventId})
            .then(event => this.event = event)

        this.event.instruments.forEach(instrument => {
        return instrument.playersIds.forEach(playerId => {
            const user = userService.getById(playerId)
            if (user) this.players.push(user)
        })  
    })
    },
    data() {
        return {
            event: {} ,
            players: [],
            freePlayers: [], //get from userService
            admin: {}, // get from userService,
            // loggedInUser: {},
            loggedInUser: {_id: 'xyz'}
        }
    }
}
</script>

<style>
    .event-details{
        padding: 10px auto;
    }

    .col-1 {
        padding-left: 30px;
        background-color: whitesmoke;
        border-radius: 5px;
        margin: 0px 10px;
    }

    .col-2 {
        background-color: whitesmoke;
        border-radius: 5px;
    }

    div h4 {
        margin: 10px 0;
    }

    .location, .event-img {
        border: 1px solid black;
        width: 90%;
        height: 200px;
        margin: 10px auto;
    }
    .event-details h1 {
        border-bottom: 1px solid black;
        font-size: 1.5em;
        text-align: left;
        margin-bottom: 20px;
    }
</style>
