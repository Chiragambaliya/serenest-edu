export const DEFAULT_THEME = 'sage'

export function applyTheme(themeId) {
  document.documentElement.dataset.theme = themeId
}
