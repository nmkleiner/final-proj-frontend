<template>
  <section class="carousel">
    <carousel :perPageCustom="[[586, 2], [768, 3], [1024, 4]]"
    :mouse-drag="true"
    :navigationEnabled="true">
      <slide v-for="event in events" :key="event._id">
        <event-preview :event="event"></event-preview>
      </slide>
    </carousel>
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
