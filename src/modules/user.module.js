import userService from "../service/user.service.js";

export default {
  state: {
    loggedInUser: {
      _id: "abc",
      name: "rocki",
      password: "123",
      pic: "https://api.adorable.io/avatars/64/rocki.png",
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ["guitar"],
      favGenres: ["rock", "country"],
      level: "professional"
    }
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
        commit({ type: "loginNewUser", newUser });
      });
    },
    logout({ commit }) {
      commit("logOutUser");
    },
    updateUserEvents({commit, state}, {joinedEvent}){
      commit({type: 'setUpdateUserEvent', joinedEvent})
      userService.updateUser(state.loggedInUser)
    }
  },
  getters: {
    isLoggedInUser: state => !!state.loggedInUser._id,
    loggedInUser: state => state.loggedInUser
  }
};
