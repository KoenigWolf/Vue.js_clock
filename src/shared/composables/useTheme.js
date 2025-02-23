import { ref, watchEffect } from 'vue'
import { THEME, DEFAULT_THEME, THEME_COLORS } from '@/shared/constants/theme'

/**
 * テーマ管理に関するロジックを提供するcomposable
 * @returns {Object} テーマ関連の状態とメソッド
 */
export function useTheme() {
  const currentTheme = ref(DEFAULT_THEME)

  /**
   * システムのダークモード設定を検知
   */
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

  /**
   * テーマを変更
   * @param {string} theme - 新しいテーマ
   */
  const setTheme = (theme) => {
    if (Object.values(THEME).includes(theme)) {
      currentTheme.value = theme
      localStorage.setItem('preferred-theme', theme)
    }
  }

  /**
   * システムのカラーモード変更を監視
   */
  const handleSystemColorSchemeChange = (e) => {
    const preferredTheme = localStorage.getItem('preferred-theme')
    if (!preferredTheme) {
      setTheme(e.matches ? THEME.DARK : THEME.LIGHT)
    }
  }

  /**
   * テーマの初期化
   */
  const initializeTheme = () => {
    const preferredTheme = localStorage.getItem('preferred-theme')
    if (preferredTheme) {
      setTheme(preferredTheme)
    } else {
      setTheme(systemPrefersDark.matches ? THEME.DARK : THEME.LIGHT)
    }
  }

  // システムのカラーモード変更イベントをリッスン
  systemPrefersDark.addEventListener('change', handleSystemColorSchemeChange)

  // テーマが変更されたときにCSSカスタムプロパティを更新
  watchEffect(() => {
    const colors = THEME_COLORS[currentTheme.value]
    for (const [key, value] of Object.entries(colors)) {
      document.documentElement.style.setProperty(`--color-${key}`, value)
    }
  })

  // 初期テーマを設定
  initializeTheme()

  return {
    currentTheme,
    setTheme
  }
}