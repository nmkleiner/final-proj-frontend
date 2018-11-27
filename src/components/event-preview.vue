<template>
    <section class="event-preview">
        <div class="pic-wrapper flex flex-column justify-center" :style="{backgroundImage: 'url(' + event.pic + ')'}">
            <div class="buttons-wrapper flex space-between">
                <button class="carousel-arrow"><i class="fas fa-arrow-left"></i></button>
                <button class="carousel-arrow"><i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
        <div class="event-details">
            <div>{{event.title}}</div>
            <div>{{event.genre}}</div>
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
