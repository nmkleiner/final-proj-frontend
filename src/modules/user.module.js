import userService from '../service/user.service.js'

export default {
    state: {
        loggedInUser: 'raj'
    },
    mutations: {
        setLoggedInUser(state, {loginData}) {
            state.loggedInUser = loginData.userName
        },
        logOutUser(state) {
            state.loggedInUser = ''
        }
    },
    actions: {
        login({commit},{loginData}) {
                return userService.login(loginData)
                    .then(() => {
                        commit({type: 'setLoggedInUser', loginData})
                        return;
                    })
        },
        logout({commit}){
            commit('logOutUser')
        }
    },
    getters: {
        isLoggedInUser: state => !!state.loggedInUser,
        loggedInUser: state => state.loggedInUser
    }
}