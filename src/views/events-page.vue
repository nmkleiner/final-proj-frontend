<template>
    <section class="events-page">
        <h1>{{headline}}</h1>
        <!-- <filter-events></filter-events> -->
        <event-list :events="events"></event-list>
    </section>
</template>

<script>
export default {
    name: 'events-page',
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
