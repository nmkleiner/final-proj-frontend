import eventService from "../service/event.service.js";
import bus, { MSG } from "../bus.js";
export default {
  state: {
    events: [],
    rockEvents: [],
    currEvent: null
  },
  mutations: {
    setEvents(state, { events }) {
      state.events = events;
    },
    setCurrentEvent(state, { event }) {
      state.currEvent = event;
    },
    setRockEvents(state, { events }) {
      state.rockEvents = events;
    },
    setUpdateEvent(state, { joinedEvent }) {
      state.currEvent.instruments
        .find(item => {
          return item.instrument === joinedEvent.instrument;
        })
        .playerIds.push(joinedEvent.currUser._id);
    }
  },
  actions: {
    joinEvent({ commit, getters, state }, { joinedEvent }) {
      joinedEvent.currUser = getters.loggedInUser;
      commit({ type: "setUpdateEvent", joinedEvent });
      eventService.saveEvent(state.currEvent).then(() => {
        bus.$emit(MSG, "Joined event.");
      });
    },

    loadEvents({ commit }) {
      return eventService.query().then(events => {
        commit({ type: "setEvents", events });
      });
    },
    // loadRockEvents({commit}) {
    //     return eventService.query({byGenre: 'rock'})
    //         .then(events => {
    //             commit({type:'setRockEvents', events})
    //         })
    // },
    getEventById({ commit }, { eventId }) {
      return eventService.getEventById(eventId).then(event => {
        commit({ type: "setCurrentEvent", event });
        return event;
      });
    },

    saveNewEvent({ commit }, { event }) {
      return eventService.saveEvent(event).then(result => {
        bus.$emit(MSG, "Event saved.");
        return result.data.eventId;
      });
    },

    updateEvent({ commit }, { event }) {
      return eventService.saveEvent(event).then(() => {
        bus.$emit(MSG, "Event updated.");
      });
    },
    updateEventMsgs({ commit }, { event }) {
      return eventService.saveEvent(event).then(() => {
      });
    },
    removeEvent({ commit }, { eventId }) {
      return eventService.remove(eventId).then(() => {
        bus.$emit(MSG, "Event canceled.");
      });
    }
  },
  getters: {
    events: state => state.events,
    currEvent: state => state.currEvent,
    popularEvents(state) {
      let eventsWithPop = state.events.map(event => {
        event.pop = event.allowedMembersCount - event.joinedMembersCount;
        return event;
      });

      return eventsWithPop;
    },
    rockEvents(state) {
      let rockEvents = state.events.filter(event => {
        return event.genre === "rock";
      });
      return rockEvents;
    },
    guitarEvents(state) {
      let rockEvents = state.events.filter(event => {
        return event.instruments.some(
          instrument => instrument.instrument === "guitar"
        );
      });
      return rockEvents;
    }
    // rockEvents:
  }
};
