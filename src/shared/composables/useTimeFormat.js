import { ref, computed } from 'vue'
import { TIME_FORMAT, DEFAULT_TIME_FORMAT } from '@/shared/constants/timeFormat'

/**
 * 時刻フォーマットに関するロジックを提供するcomposable
 * @returns {Object} 時刻フォーマット関連の状態とメソッド
 */
export function useTimeFormat() {
  const timeFormat = ref(DEFAULT_TIME_FORMAT)
  const time = ref({
    hours: '00',
    minutes: '00',
    seconds: '00',
    period: 'AM'
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
   * 時間を現在の表示形式でフォーマット
   * @param {number} hours - 時間（0-23）
   * @returns {Object} フォーマットされた時間と期間（AM/PM）
   */
  const formatHours = (hours) => {
    if (timeFormat.value === TIME_FORMAT.TWELVE_HOUR) {
      const period = hours < 12 ? 'AM' : 'PM'
      const h = hours % 12
      return {
        hours: h === 0 ? '12' : padNumber(h),
        period
      }
    }
    return {
      hours: padNumber(hours),
      period: ''
    }
  }

  /**
   * 時刻フォーマットを変更
   * @param {string} format - 新しい時刻フォーマット
   */
  const setTimeFormat = (format) => {
    if (Object.values(TIME_FORMAT).includes(format)) {
      timeFormat.value = format
      updateTime() // フォーマット変更後に時刻を更新
    }
  }

  /**
   * 現在時刻で時間を更新
   */
  const updateTime = () => {
    const now = new Date()
    const { hours, period } = formatHours(now.getHours())
    time.value = {
      hours,
      minutes: padNumber(now.getMinutes()),
      seconds: padNumber(now.getSeconds()),
      period
    }
  }

  /**
   * フォーマットされた時刻文字列
   */
  const formattedTime = computed(() => {
    const { hours, minutes, seconds, period } = time.value
    return `${hours}:${minutes}:${seconds}${period ? ` ${period}` : ''}`
  })

  return {
    time,
    formattedTime,
    timeFormat,
    updateTime,
    setTimeFormat
  }
}