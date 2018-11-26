import eventService from '../service/event.service.js'

export default {
    state: {
        events: []
    },
    mutations: {
        setEvents(state,{events}) {
            state.events = events
        }
    },
    actions: {
        loadEvents({commit}) {
            return eventService.query()
                .then(events => {
                    commit({type:'setEvents', events})
                })
        }
    },
    getters: {
        events: state => state.events  
    }
}