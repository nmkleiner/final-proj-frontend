<template>
    <section class="login-page flex justify-center">
        <form class="flex flex-column align-center">
            <h2>Login to play</h2>
            <el-input v-model="login.userName" placeholder="username"></el-input>
            <el-input v-model="login.password" type="password" placeholder="password"></el-input>
            <el-button type="primary" @click="submit" round>login</el-button>
            <a>forgot your password?</a>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            login: {
                userName: '',
                password: ''
            }
        }
    },
    methods: {
        submit() {
            this.$store.dispatch({type: 'login', loginData: this.login})
                .then(() => {
                    this.$router.push('/')
                })
        }
    },
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
