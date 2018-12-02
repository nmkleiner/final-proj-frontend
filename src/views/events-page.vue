<template>
    <section class='events-page'>
        <h1>{{headline}}</h1>
        <filter-events></filter-events>
        <event-list :events='events'></event-list>
    </section>
</template>

<script>
import filterEvents from '@/components/filter-events';
import eventList from '@/components/event-list';
export default {
    name: 'events-page',
    components: {
        filterEvents,
        eventList
    },
    props: {
        events: Array,
        headline: String,
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
        document.body.scrollIntoView()

    }
}
</script>

<style>

</style>
