<template>
    <section class="event-preview">
        <div class="pic-wrapper flex flex-column justify-center">
            <img :src="event.pic" alt="event image">
            <div class="buttons-wrapper flex space-between">
                <button class="carousel-arrow"><i class="fas fa-arrow-left"></i></button>
                <button class="carousel-arrow"><i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
        <div class="event-details">
            <div>{{event.title}}</div>
            <div>{{event.genre}}</div>
            <router-link :to="'/event/' + event._id">Details</router-link>

        </div>
    </section>
</template>

<script>
export default {
    props: {
        event: Object,
    },
}
</script>

<style>

</style>
