<template>
    <section class="login-page flex justify-center">
        <form class="flex flex-column align-center">
            <h2>Login to play</h2>
            <el-input v-model="loginData.userName" placeholder="username"></el-input>
            <el-input v-model="loginData.password" type="password" placeholder="password"></el-input>
            <span v-if="isWrong">Wrong password / username</span>
            <div class="flex">
            <el-button type="primary" @click="submit" round><i class="fas fa-sign-in-alt"></i> Login</el-button>
            <el-button type="primary" @click="signup" round><i class="fas fa-user-plus"></i> Sign Up</el-button>
            </div>
            <a>forgot your password?</a>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            loginData: {
                userName: '',
                password: ''
            },
            isWrong: false,
            fromEventId: ''
        }
    },
    methods: {
        submit() {
            this.$store.dispatch({type: 'login', loginData: this.loginData})
                .then((user) => {
                    if (!user) this.isWrong = true
                    else {
                    this.isWrong = false
                    if(this.fromEventId) this.$router.push(`/event/${this.fromEventId}`)
                    else this.$router.push('/')
                    }
                })
      
        },
        signup() {
            if(this.fromEventId) this.$router.push(`/signup/${this.fromEventId}`);
            else this.$router.push('/signup')
        }
    },
    created() {
        document.body.scrollIntoView()
        this.fromEventId = this.$route.params.eventId
    }
}
</script>

<style lang="scss">
.login-page{
    width: 70vw;
    margin: 90px auto 0;
    padding-bottom: 100px; 
    form {
        height: fit-content;
        h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        a {
            font-size: 0.8rem;
            color: gray;
            cursor: pointer;
        }
        input,button {
            margin: 0 0 10px;
        }
    }
}

@media (min-width: 600px) {
    .login-page {
        max-width: 350px;
    }
}
</style>
