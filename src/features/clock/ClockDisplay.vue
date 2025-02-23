<!-- 時計表示コンポーネント -->
<template>
  <div 
    class="clock-display" 
    :class="{ 'theme-dark': isDarkTheme }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="clock-inner"
      :style="{ 
        transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)` 
      }"
    >
      <div class="time-wrapper">
        <span class="time-part" aria-live="polite">{{ formattedTime }}</span>
        <div class="time-shadow"></div>
      </div>
      <div class="clock-decoration">
        <div class="pulse-ring"></div>
      </div>
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
    },
    currentTheme: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      tiltX: 0,
      tiltY: 0
    }
  },

  computed: {
    isDarkTheme() {
      return this.currentTheme === 'dark'
    }
  },

  methods: {
    handleMouseMove(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = event.clientX
      const mouseY = event.clientY

      this.tiltX = ((mouseX - centerX) / (rect.width / 2)) * 5
      this.tiltY = ((mouseY - centerY) / (rect.height / 2)) * -5
    },

    handleMouseLeave() {
      this.tiltX = 0
      this.tiltY = 0
    }
  }
}
</script>

<style scoped>
.clock-display {
  position: relative;
  width: 100%;
  height: var(--clock-container-height);
  padding: clamp(1rem, 3vh, 3rem);
  background-color: var(--color-background);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--outer-shadow-lg);
  transition: all var(--transition-duration) var(--transition-timing);
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clock-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(0.5rem, 2vh, 2rem);
  border-radius: var(--border-radius-md);
  background: var(--color-background);
  box-shadow: var(--inner-shadow);
  transition: transform var(--transition-duration) var(--transition-bounce);
  transform-style: preserve-3d;
}

.time-wrapper {
  position: relative;
  z-index: var(--z-index-above);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.time-part {
  display: inline-block;
  font-family: var(--font-family-display);
  font-size: var(--font-size-clock);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: var(--line-height-clock);
  letter-spacing: -0.02em;
  text-shadow: 2px 2px 4px var(--shadow-dark);
  transition: color var(--transition-duration) var(--transition-timing);
  white-space: nowrap;
}

.time-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  opacity: 0.3;
  background: var(--color-primary);
  z-index: var(--z-index-base);
}

.clock-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  pointer-events: none;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(50%, 200px);
  height: min(50%, 200px);
  border: 2px solid var(--color-accent);
  border-radius: var(--border-radius-full);
  transform: translate(-50%, -50%);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}

/* リデュースモーション設定のユーザー向け */
@media (prefers-reduced-motion: reduce) {
  .clock-inner {
    transition: none;
  }

  .pulse-ring {
    animation: none;
  }
}
</style>