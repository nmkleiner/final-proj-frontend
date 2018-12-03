import userService from '../service/user.service.js';

export default {
  state: {
    loggedInUser: {
      // '_id':  '5bff07f73411145ee03351b7',
      // 'name': 'noam',
      // 'password': '12',
      // 'pic': 'https://api.adorable.io/avatars/64/noam.png',
      // 'instruments': [
      //     'Drums',
      //     'Bass',
      //     'Guitar'
      // ],
      // 'level': 'amateur',
      // 'bio': 'very tired',
      // 'favGenres': [
      //     'Rock',
      //     'Classic',
      //     'World'
      // ],
      // 'location': '',
      // 'partEventsIds': [
      //     '5bff9d8786fed21fc472518e'
      // ],
      // 'adminEventsIds': []
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
      state.loggedInUser = '';
    },
    setUserPartEvent(state, { joinedEvent }) {
      state.loggedInUser.partEventsIds.push(joinedEvent.eventId);
    },
    setUserAdminEvent(state, { eventId }) {
      state.loggedInUser.adminEventsIds.push(eventId);
    }
  },
  actions: {
    login({ commit }, { loginData }) {
      return userService.login(loginData).then(user => {
        if (user) {
          commit({ type: 'setLoggedInUser', user });
        }
        return user;
      });
    },
    signUpUser({ commit }, { newUser }) {
      userService.signupUser(newUser).then((user) => {
        // commit({ type: 'setLoggedInUser', user}); TODO: get back user with _id from mongo
        commit({ type: 'setLoggedInUser', user: newUser });
      });
    },
    logout({ commit }) {
      userService.logout();
      commit('logOutUser');
      return Promise.resolve();
    },

    updateUserPartEvents({ commit, state }, { joinedEvent }) {
      commit({ type: 'setUserPartEvent', joinedEvent });
      userService.updateUser(state.loggedInUser);
    },
    updateUserAdminEvents({ commit, state }, { eventId }) {
      commit({ type: 'setUserAdminEvent', eventId });
      userService.updateUser(state.loggedInUser);
    },
    getUserById({ commit }, { userId }) {
      return userService.getById(userId);
    },
    getLoggedInUser({ commit }) {
      userService.getLoggedInUser().then(loggedInUser => {
        commit({ type: 'setLoggedInUser', user: loggedInUser });
      });
    }
  },
  getters: {
    isLoggedInUser: state => !!state.loggedInUser,
    loggedInUser: state => state.loggedInUser
  }
};
