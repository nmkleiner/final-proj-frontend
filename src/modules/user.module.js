import userService from "../service/user.service.js";

export default {
  state: {
    loggedInUser: {
      // "_id":  "5bff07f73411145ee03351b7",
      // "name": "noam", 
      // "password": "12",
      // "pic": "https://api.adorable.io/avatars/64/noam.png",
      // "instruments": [
      //     "Drums",
      //     "Bass",
      //     "Guitar"
      // ],
      // "level": "amateur",
      // "bio": "very tired",
      // "favGenres": [
      //     "Rock",
      //     "Classic",
      //     "World"
      // ],
      // "location": "",
      // "partEventsIds": [
      //     "5bff9d8786fed21fc472518e"
      // ],
      // "adminEventsIds": []
  }
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user; 
    },
    loginNewUser(state, { newUser }) {
      state.loggedInUser = newUser;
    },
    logOutUser(state) {
      state.loggedInUser = "";
    },
    setUpdateUserEvent(state, { joinedEvent }){
      // console.log('from user module mut setUpdateUserEvent', joinedEvent)
      state.loggedInUser.partEventsIds.push(joinedEvent.eventId)
    }
  },
  actions: {
    login({ commit }, { loginData }) {
      return userService.login(loginData).then(user => {
        if (user) {
          commit({ type: "setLoggedInUser", user });
        }
        return user;
    })
    },
    signUpUser({ commit }, { newUser }) {      
      userService.signupUser(newUser).then(() => {
        commit({ type: "setLoggedInUser", user: newUser });
      });
    },
    logout({ commit }) {
      commit("logOutUser");
      return Promise.resolve()
    },

    updateUserEvents({commit, state}, {joinedEvent}){
      commit({type: 'setUpdateUserEvent', joinedEvent})
      userService.updateUser(state.loggedInUser)
    },

    getUserById({commit},{userId}) {
      return userService.getById(userId)
    }
  },
  getters: {
    isLoggedInUser: state => !!state.loggedInUser.name,
    loggedInUser: state => state.loggedInUser
  }
};
