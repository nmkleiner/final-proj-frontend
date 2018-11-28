import userService from '../service/user.service.js'

export default {
    state: {
        loggedInUser: {
            userName: '',
            _id: '',
            password: ''
        }
    },
    mutations: {
        setLoggedInUser(state, {user}) {
            state.loggedInUser = user
        },
        logOutUser(state) {
            state.loggedInUser = ''
        }
    },
    actions: {
        login({commit},{loginData}) {
            console.log(2)
            return userService.login(loginData)
                .then((user) => {
                    if (user) {
                        commit({type: 'setLoggedInUser', user})
                    }
                    return user;
                })
        },
        logout({commit}){
            commit('logOutUser')
        }
    },
    getters: {
        isLoggedInUser: state => !!state.loggedInUser._id,
        loggedInUser: state => state.loggedInUser
    }
}