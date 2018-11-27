<template>
    <section class="login-page">
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
            this.$store.dispatch({type: 'login', loginDetails: this.login})
        }
    },
    computed: {

    },
    watch: {

    },
    created() {

}
}
</script>

<style lang="scss">
.login-page{
    width: 40vw;
    margin: 90px auto 0;

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
</style>
