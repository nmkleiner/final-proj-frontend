import eventService from '../service/event.service.js'

export default {
    state: {
        events: [],
        rockEvents: [],
        currEvent: {}
    },
    mutations: {
        setEvents(state,{events}) {
            state.events = events
        },
        setCurrentEvent(state, {event}) {
            state.currEvent = event
        },
        setRockEvents(state, {events}) {
            state.rockEvents = events
        },
        setUpdateEvent(state, {joinedEvent}){
            state.currEvent.instruments.find(item => {
                return item.instrument === joinedEvent.instrument
            }).push(joinedEvent.currUser._id)
           
        }
    },
    actions: {
        joinEvent({commit, getters, state}, {joinedEvent}){
            
            joinedEvent.currUser = getters.loggedInUser;
            commit({type: 'setUpdateEvent', joinedEvent})
            eventService.saveEvent(state.currEvent)
            .then(() => console.log('event was updated'))
        },



        loadEvents({commit}) {
            return eventService.query()
                .then(events => {
                    commit({type:'setEvents', events})
                })
        },
        // loadRockEvents({commit}) {
        //     return eventService.query({byGenre: 'rock'})
        //         .then(events => {
        //             commit({type:'setRockEvents', events})
        //         })
        // },
        getEventById({commit},{eventId}) {
            return eventService.getEventById(eventId)
                .then((event) => {
                    commit({type: 'setCurrentEvent', event})
                    return event
                })
        },


        saveNewEvent({commit}, {event}) {
            return eventService.saveEvent(event)
            .then(() => {
                //message: event was created
            })
        },







        updateEvent({commit}, {event}){
            return eventService.updateEvent(event)
            .then(() => {
                //message: event was updated
            })
        }
    },
    getters: {
        events: state => state.events,
        currEvent: state => state.currEvent,
        popularEvents(state) {
             let eventsWithPop = state.events.map( event => {
                 event.pop = event.allowedMembersCount - event.joinedMembersCount
                 return event
             })

             return eventsWithPop;
        },
        rockEvents(state) {
            let rockEvents = state.events.filter( event => {
                return event.genre === 'rock'
            })
            return rockEvents
        },
        guitarEvents(state) {
            let rockEvents = state.events.filter( event => {
                return event.instruments.some(instrument => instrument.instrument === 'guitar')
            })
            return rockEvents
        },
        // rockEvents:
        
    }
}