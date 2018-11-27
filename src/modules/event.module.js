import eventService from '../service/event.service.js'

export default {
    state: {
        events: [],
        currEvent: {}
    },
    mutations: {
        setEvents(state,{events}) {
            state.events = events
        },
        setCurrentEvent(state, {event}) {
            state.currEvent = event
        }
    },
    actions: {
        loadEvents({commit}) {
            return eventService.query()
                .then(events => {
                    commit({type:'setEvents', events})
                })
        },
        getEventById({commit},{eventId}) {
            return eventService.getEventById(eventId)
                .then((event) => {
                    commit({type: 'setCurrentEvent', event})
                    return event
                })
        }
    },
    getters: {
        events: state => state.events,
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