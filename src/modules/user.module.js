import userService from "../service/user.service.js";

export default {
  state: {
    loggedInUser: {}
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user; 
    },
    loginNewUser(state, { newUser }) {
      console.log("new signedin user:", newUser);
      state.loggedInUser = newUser;
    },
    logOutUser(state) {
      state.loggedInUser = "";
    },
    setUpdateUserEvent(state, { joinedEvent }){
      console.log('from user module mut setUpdateUserEvent', joinedEvent)
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
      console.log('from user module act updateUserEvents', joinedEvent)
      console.log(joinedEvent)
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
