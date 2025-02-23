<!-- 時計設定コンポーネント -->
<template>
  <div class="settings-container">
    <div class="settings-group">
      <!-- タイムフォーマット設定 -->
      <div class="format-options">
        <button
          v-for="format in timeFormats"
          :key="format.value"
          class="format-button"
          :class="{ active: currentTimeFormat === format.value }"
          :aria-pressed="currentTimeFormat === format.value"
          @click="updateTimeFormat(format.value)"
        >
          <span class="format-label">{{ format.label }}</span>
          <span class="format-example">{{ format.example }}</span>
        </button>
      </div>

      <!-- テーマ切り替え -->
      <button 
        class="theme-toggle"
        :class="{ 'theme-dark': isDarkTheme }"
        :aria-label="`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`"
        @click="toggleTheme"
      >
        <span class="theme-icon">
          {{ isDarkTheme ? '🌞' : '🌙' }}
        </span>
        <span class="theme-label">
          {{ isDarkTheme ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockSettings',

  props: {
    currentTimeFormat: {
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
      timeFormats: [
        { value: '12h', label: '12時間', example: '03:45 PM' },
        { value: '24h', label: '24時間', example: '15:45' }
      ]
    }
  },

  computed: {
    isDarkTheme() {
      return this.currentTheme === 'dark'
    }
  },

  methods: {
    updateTimeFormat(format) {
      this.$emit('update:time-format', format)
    },

    toggleTheme() {
      const newTheme = this.isDarkTheme ? 'light' : 'dark'
      this.$emit('update:theme', newTheme)
    }
  }
}
</script>

<style scoped>
.settings-container {
  width: 100%;
  padding: clamp(0.5rem, 2vh, 1.5rem);
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vh, 2rem);
  align-items: center;
  max-width: min(100%, 500px);
  margin: 0 auto;
}

/* フォーマットオプション */
.format-options {
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.format-button {
  flex: 1;
  min-width: min(140px, calc(50% - 0.5rem));
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: clamp(0.5rem, 1.5vh, 1rem) clamp(1rem, 2vw, 1.5rem);
  border: none;
  border-radius: var(--border-radius-md);
  background: var(--color-background);
  box-shadow: var(--outer-shadow-sm);
  cursor: pointer;
  transition: all var(--transition-duration) var(--transition-timing);
}

.format-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--outer-shadow-lg);
}

.format-button.active {
  background: var(--color-primary);
  box-shadow: var(--inner-shadow);
  transform: translateY(1px);
}

.format-button.active .format-label,
.format-button.active .format-example {
  color: var(--color-background);
}

.format-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  transition: color var(--transition-duration) var(--transition-timing);
}

.format-example {
  font-size: var(--font-size-base);
  color: var(--color-muted);
  font-family: var(--font-family-display);
  transition: color var(--transition-duration) var(--transition-timing);
}

/* テーマ切り替えボタン */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: clamp(0.5rem, 1.5vh, 0.75rem) clamp(1rem, 3vw, 1.5rem);
  border: none;
  border-radius: var(--border-radius-full);
  background: var(--color-background);
  box-shadow: var(--outer-shadow-sm);
  cursor: pointer;
  transition: all var(--transition-duration) var(--transition-bounce);
  position: relative;
  overflow: hidden;
}

.theme-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-accent)
  );
  opacity: 0;
  transition: opacity var(--transition-duration) var(--transition-timing);
}

.theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: var(--outer-shadow-lg);
}

.theme-toggle:hover::before {
  opacity: 0.1;
}

.theme-icon {
  font-size: 1.2em;
  position: relative;
  z-index: 1;
}

.theme-label {
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  position: relative;
  z-index: 1;
}

/* よりコンパクトな表示のための調整 */
@media screen and (max-height: 600px) {
  .settings-container {
    padding: clamp(0.25rem, 1vh, 0.5rem);
  }

  .settings-group {
    gap: clamp(0.5rem, 2vh, 1rem);
  }

  .format-button {
    padding: clamp(0.25rem, 1vh, 0.5rem) clamp(0.5rem, 1.5vw, 1rem);
  }
}

/* アクセシビリティ強化 */
@media (hover: hover) and (pointer: fine) {
  .format-button:focus-visible,
  .theme-toggle:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

/* リデュースモーション設定のユーザー向け */
@media (prefers-reduced-motion: reduce) {
  .format-button,
  .theme-toggle {
    transition: none;
  }

  .format-button:hover,
  .theme-toggle:hover {
    transform: none;
  }
}
</style>