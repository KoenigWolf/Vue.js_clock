<template>
  <div id="app">
    <h1 class="app-title">Vue.js Digital Clock</h1>
    <DigitalClock />
  </div>
</template>

<script>
import DigitalClock from './components/clock/DigitalClock.vue'

export default {
  name: 'App',
  components: {
    DigitalClock
  }
}
</script>

<style>
@import './styles/variables.css';

/* Reset & Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.app-title {
  color: var(--color-primary);
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xl);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  #app {
    padding: var(--spacing-md);
  }

  .app-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg);
  }
}
</style>
