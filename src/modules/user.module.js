import userService from '../service/event.service.js'

export default {
    state: {
        loggedInUser: ''
    },
    mutations: {
        setLoggedInUser(state, {loginDetails}) {
            state.loggedInUser = loginDetails.userName
        }
    },
    actions: {
        login({commit},{loginDetails}) {
            userService.login(loginDetails)
                .then(() => {
                    commit({type: 'setLoggedInUser', loginDetails})
                })
        }
    },
    getters: {
        
    }
}