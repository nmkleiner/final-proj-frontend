<template>
    <section class="insrtument-preview">
        <div class="instrument-container">
            <button v-if="instrument.amount > 1"
                @click.prevent="$emit('recudeInstrumentAmount')">-</button>
            <p>{{instrument.name}} X {{instrument.amount}}</p>
            <button @click.prevent="$emit('increaseInstrumentAmount')">+</button>
            <button @click.prevent="$emit('removeInstrument')">X</button>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        instrument: Object
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    created() {
        
    }
}
</script>

<style>

</style>
