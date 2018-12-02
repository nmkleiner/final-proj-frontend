<template>
    <section class="msg-msg" :class="{show: isShowing}">
        <h3>{{msg}}</h3>
    </section>
</template>

<script>
import bus, { MSG } from "../bus.js";

export default {
    data() {
        return {
            isShowing: false,
            msg: 'event updated'
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    created() {
        bus.$on(MSG, (msg) => {
            this.msg = msg
            this.isShowing = !this.isShowing
            setTimeout(() => {
                this.isShowing = !this.isShowing
            }, 2500);
        })
    }
}
</script>

<style scoped lang="scss">
    
</style>
