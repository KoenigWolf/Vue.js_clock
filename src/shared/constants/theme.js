/**
 * テーマに関する定数
 */
export const THEME = {
  /**
   * ライトモード
   */
  LIGHT: 'light',
  
  /**
   * ダークモード
   */
  DARK: 'dark'
}

/**
 * デフォルトのテーマ設定
 */
export const DEFAULT_THEME = THEME.LIGHT

/**
 * テーマごとの色設定
 */
export const THEME_COLORS = {
  [THEME.LIGHT]: {
    background: '#ffffff',
    text: '#333333',
    primary: '#2c3e50',
    secondary: '#42b983'
  },
  [THEME.DARK]: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#42b983',
    secondary: '#2c3e50'
  }
}