<template>
  <div class="clock-display">
    <div class="clock-inner">
      <h1 class="clock-title">Vue.js Digital Clock</h1>
      <span class="time-part">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockDisplay',
  
  props: {
    formattedTime: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.clock-display {
  position: relative;
  font-family: 'Playfair Display', serif;
  padding: 2rem;
  text-align: center;
  border-radius: 10px;
  min-width: 600px;
}

.clock-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.time-part {
  display: block;
  font-size: 8rem;
  font-weight: 700;
  color: #333;
  letter-spacing: 0.05em;
}
</style>