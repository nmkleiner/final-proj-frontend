<template>
    <section class="event-list">
        li
        <event-preview v-for="event in events" :key="event._id" :event="event"></event-preview>
    </section>
</template>

<script>

import eventPreview from '@/components/event-preview.vue'

export default {
    props: {
        events: Array,
    },
    components: {
        eventPreview
    },
}
</script>

<style>

</style>
