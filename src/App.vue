<!-- アプリケーションのルートコンポーネント -->
<template>
  <div id="app" role="application">
    <div class="background-decoration">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
    </div>

    <header class="app-header" role="banner">
      <h1 class="app-title">
        <span class="title-part">Vue.js</span>
        <span class="title-accent">Digital Clock</span>
      </h1>
    </header>

    <main class="app-main" role="main">
      <DigitalClock />
    </main>

  </div>
</template>

<script>
import DigitalClock from './features/clock/DigitalClock.vue'

export default {
  name: 'App',
  components: {
    DigitalClock
  }
}
</script>

<style>
@import './shared/styles/variables.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

/* リセット & ベーススタイル */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  transition: background-color var(--transition-duration) var(--transition-timing);
}

/* レイアウト */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  z-index: var(--z-index-base);
}

/* 装飾的な背景要素 */
.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.gradient-circle {
  position: absolute;
  border-radius: var(--border-radius-full);
  filter: blur(80px);
  opacity: 0.15;
  transition: all var(--transition-duration) var(--transition-timing);
}

.circle-1 {
  top: -15%;
  right: -15%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle at center, var(--color-primary), var(--color-accent));
  animation: float 20s ease-in-out infinite alternate;
}

.circle-2 {
  bottom: -15%;
  left: -15%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle at center, var(--color-secondary), var(--color-primary));
  animation: float 15s ease-in-out infinite alternate-reverse;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(5%, 5%);
  }
}

/* ヘッダー */
.app-header {
  flex: 0 0 auto;
  text-align: center;
  padding: clamp(1rem, 3vh, 2rem);
  position: relative;
  z-index: var(--z-index-above);
}

.app-title {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.title-part {
  color: var(--color-text);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.02em;
}

.title-accent {
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.03em;
  position: relative;
}

.title-accent::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    var(--color-primary) 0%,
    var(--color-accent) 50%,
    var(--color-primary) 100%
  );
  transform-origin: center;
  transform: scaleX(0);
  transition: transform 0.6s var(--transition-bounce);
}

.title-accent:hover::after {
  transform: scaleX(1);
}

/* メインコンテンツ */
.app-main {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(0.5rem, 2vh, 2rem);
  position: relative;
  z-index: var(--z-index-above);
  min-height: 0; /* Flexboxのバグ対策 */
}

/* リデュースモーション設定のユーザー向け */
@media (prefers-reduced-motion: reduce) {
  .gradient-circle {
    animation: none;
  }

  .title-accent::after {
    transition: none;
  }
}
</style>
