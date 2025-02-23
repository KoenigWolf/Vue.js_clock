<!-- デジタル時計のメインコンポーネント -->
<template>
  <div class="clock-container">
    <!-- 時計表示 -->
    <ClockDisplay
      :formatted-time="formattedTime"
      :current-theme="currentTheme"
    />
    
    <!-- 時計設定 -->
    <ClockSettings
      :current-time-format="timeFormat"
      :current-theme="currentTheme"
      @update:time-format="setTimeFormat"
      @update:theme="setTheme"
    />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import ClockDisplay from './ClockDisplay.vue'
import ClockSettings from './ClockSettings.vue'
import { useTimeFormat } from '@/shared/composables/useTimeFormat'
import { useTheme } from '@/shared/composables/useTheme'

export default {
  name: 'DigitalClock',
  
  components: {
    ClockDisplay,
    ClockSettings
  },

  setup() {
    // 時刻フォーマット関連の状態とメソッド
    const { formattedTime, timeFormat, updateTime, setTimeFormat } = useTimeFormat()
    
    // テーマ関連の状態とメソッド
    const { currentTheme, setTheme } = useTheme()

    // アニメーションフレーム管理
    let animationFrame = null
    let lastUpdate = 0

    /**
     * 時刻更新処理
     * パフォーマンス最適化のため、1秒ごとに更新
     */
    const updateFrame = (timestamp) => {
      // 最後の更新から1秒以上経過している場合のみ更新
      if (timestamp - lastUpdate >= 1000) {
        updateTime()
        lastUpdate = Math.floor(timestamp / 1000) * 1000
      }
      animationFrame = requestAnimationFrame(updateFrame)
    }

    // コンポーネントのマウント時の処理
    onMounted(() => {
      updateTime() // 初期表示
      animationFrame = requestAnimationFrame(updateFrame)
    })

    // コンポーネントのアンマウント時のクリーンアップ
    onBeforeUnmount(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    })

    return {
      formattedTime,
      timeFormat,
      currentTheme,
      setTimeFormat,
      setTheme
    }
  }
}
</script>

<style scoped>
.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vh, 2rem);
  width: 100%;
  height: 100%;
  padding: clamp(0.5rem, 2vh, 1.5rem);
  max-width: var(--container-max-width);
  margin: 0 auto;
}

/* より小さい画面向けの最適化 */
@media screen and (max-height: 600px) {
  .clock-container {
    gap: clamp(0.5rem, 2vh, 1rem);
  }
}

/* 縦長画面向けの最適化 */
@media screen and (max-width: 480px) and (min-height: 700px) {
  .clock-container {
    justify-content: space-around;
  }
}
</style>