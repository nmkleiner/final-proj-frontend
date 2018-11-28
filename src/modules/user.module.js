import userService from "../service/user.service.js";

export default {
  state: {
    loggedInUser: ""
  },
  mutations: {
    setLoggedInUser(state, { loginDetails }) {
      state.loggedInUser = loginDetails.userName;
    },
    loginNewUser(state, {newUser}) {
        console.log('new signedin user:', newUser.name)
        state.loggedInUser = newUser.name
    }
  },
  actions: {
    login({ commit }, { loginDetails }) {
      userService.login(loginDetails).then(() => {
        commit({ type: "setLoggedInUser", loginDetails });
      });
    },
    signUpUser({ commit }, { newUser }) {
        userService.signupUser(newUser)
        .then(() => {
            commit({ type: "loginNewUser", newUser })
        })
    }
  },
  getters: {}
};
