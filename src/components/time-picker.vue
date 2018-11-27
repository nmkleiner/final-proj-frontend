<template>
  <section class="time-picker-container">
    <div class="time-picker">
      <div>
        <i class="fas fa-angle-up" @click="changeHour(1)"></i>
        <p>{{time.hour}}</p>
        <i class="fas fa-angle-down" @click="changeHour(-1)"></i>
      </div>
      <div>
        <i class="fas fa-angle-up" @click="changeMin(1)"></i>
        <p>{{time.minute}}</p>
        <i class="fas fa-angle-down" @click="changeMin(-1)"></i>
      </div>
      <div>
        <i class="fas fa-angle-up" @click="toggleTime"></i>
        <p>{{time.format}}</p>
        <i class="fas fa-angle-down" @click="toggleTime"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    props: {
        'value': {
            type: Object,
            validator: function(value){
                return value.hour >= 1 && value.minute >= 0 && value.hour <= 12 && value.minute < 60
            }
        },
    },

    data() {
        return {
            time: {
                hour: this.value.hour,
                minute: this.value.minute,
                format: this.value.format,
            }
        }
    },

    methods: {
        toggleTime() {
            if (this.time.format === 'AM') this.time.format = 'PM'
            else this.time.format = 'AM'
            this.$emit('input', this.time)
        },

        changeHour(num) {
            this.time.hour += num
            switch (this.time.hour) {
                case 13:
                    this.time.hour = 1;
                    break;
                case 0:
                    this.time.hour = 12
                    break;
            }
            this.$emit('input', this.time)
        },

        changeMin(num) {
            this.time.minute += num
            if (this.time.minute === 60) this.time.minute = 0
            else if (this.time.minute === -1) this.time.minute = 59
            this.$emit('input', this.time)
        }
    },
}
</script>