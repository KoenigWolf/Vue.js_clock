<template>
  <div class="clock-container">
    <div class="clock-display" :style="clockStyle">
      <span v-once class="time-part">{{ formattedTime }}</span>
    </div>
    <div class="clock-controls">
      <div class="time-format-control">
        <label class="control-label">
          <input type="checkbox" v-model="is24Hour"> 24時間表示
        </label>
      </div>
      <div class="color-controls">
        <label class="control-label">
          背景色: <input type="color" v-model="backgroundColor">
        </label>
        <label class="control-label">
          文字色: <input type="color" v-model="textColor">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigitalClock',
  
  data() {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      is24Hour: true,
      backgroundColor: '#000000',
      textColor: '#ffffff'
    }
  },

  computed: {
    /**
     * 時計の表示スタイルを計算します
     * @returns {Object} スタイルオブジェクト
     */
    clockStyle() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.textColor
      }
    },

    /**
     * フォーマットされた時刻文字列を返します
     * @returns {string} フォーマットされた時刻
     */
    formattedTime() {
      return `${this.hours}:${this.minutes}:${this.seconds}`
    }
  },

  methods: {
    /**
     * 時刻を更新します
     */
    updateTime() {
      const now = new Date()
      this.updateHours(now.getHours())
      this.minutes = this.padNumber(now.getMinutes())
      this.seconds = this.padNumber(now.getSeconds())
    },

    /**
     * 時間を更新し、表示形式に応じてフォーマットします
     * @param {number} hours - 時間（0-23）
     */
    updateHours(hours) {
      if (this.is24Hour) {
        this.hours = this.padNumber(hours)
        return
      }
      const h = hours % 12
      this.hours = h === 0 ? '12' : this.padNumber(h)
    },

    /**
     * 数値を2桁の文字列にパディングします
     * @param {number} num - パディングする数値
     * @returns {string} パディングされた文字列
     */
    padNumber(num) {
      return num < 10 ? `0${num}` : String(num)
    }
  },

  watch: {
    /**
     * 時間表示形式の変更を監視し、表示を更新します
     */
    is24Hour() {
      this.updateTime()
    }
  },

  mounted() {
    // 初期表示
    this.updateTime()
    
    // RAF（RequestAnimationFrame）を使用して時刻更新を最適化
    let lastUpdate = 0
    const updateFrame = (timestamp) => {
      if (timestamp - lastUpdate >= 1000) {
        this.updateTime()
        lastUpdate = timestamp
      }
      this.animationFrame = requestAnimationFrame(updateFrame)
    }
    this.animationFrame = requestAnimationFrame(updateFrame)
  },

  beforeUnmount() {
    // アニメーションフレームをクリーンアップ
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
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
  will-change: transform;
}

.clock-display {
  font-family: 'Arial', sans-serif;
  font-size: 8rem;
  font-weight: bold;
  padding: 2rem;
  border-radius: 15px;
  min-width: 600px;
  text-align: center;
}
</style>