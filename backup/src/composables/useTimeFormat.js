import { ref, computed } from 'vue'

/**
 * 時刻フォーマットに関するロジックを提供するcomposable
 * @returns {Object} 時刻フォーマット関連の状態とメソッド
 */
export function useTimeFormat() {
  const time = ref({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  /**
   * 数値を2桁の文字列にパディング
   * @param {number} num - パディングする数値
   * @returns {string} パディングされた文字列
   */
  const padNumber = (num) => {
    return num < 10 ? `0${num}` : String(num)
  }

  /**
   * 時間を12時間形式でフォーマット
   * @param {number} hours - 時間（0-23）
   * @returns {string} フォーマットされた時間
   */
  const formatHours = (hours) => {
    const h = hours % 12
    return h === 0 ? '12' : padNumber(h)
  }

  /**
   * 現在時刻で時間を更新
   */
  const updateTime = () => {
    const now = new Date()
    time.value = {
      hours: formatHours(now.getHours()),
      minutes: padNumber(now.getMinutes()),
      seconds: padNumber(now.getSeconds())
    }
  }

  /**
   * フォーマットされた時刻文字列
   */
  const formattedTime = computed(() => {
    return `${time.value.hours}:${time.value.minutes}:${time.value.seconds}`
  })

  return {
    time,
    formattedTime,
    updateTime
  }
}