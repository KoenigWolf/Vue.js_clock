<template>
  <div class="clock-container">
    <ClockDisplay :formatted-time="formattedTime" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import ClockDisplay from './ClockDisplay.vue'
import { useTimeFormat } from '@/composables/useTimeFormat'

export default {
  name: 'DigitalClock',
  
  components: {
    ClockDisplay
  },

  setup() {
    const { formattedTime, updateTime } = useTimeFormat()
    let animationFrame = null
    let lastUpdate = 0

    const updateFrame = (timestamp) => {
      if (timestamp - lastUpdate >= 1000) {
        updateTime()
        lastUpdate = Math.floor(timestamp / 1000) * 1000
      }
      animationFrame = requestAnimationFrame(updateFrame)
    }

    onMounted(() => {
      updateTime()
      animationFrame = requestAnimationFrame(updateFrame)
    })

    onBeforeUnmount(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    })

    return {
      formattedTime
    }
  }
}
</script>

<style scoped>
.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>