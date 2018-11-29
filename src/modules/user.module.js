import userService from "../service/user.service.js";

export default {
  state: {
    loggedInUser: {}
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user; 
    },
    logOutUser(state) {
      state.loggedInUser = "";
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
    }
  },
  getters: {
    isLoggedInUser: state => !!state.loggedInUser.name,
    loggedInUser: state => state.loggedInUser
  }
};
