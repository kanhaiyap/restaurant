import { theme } from "../data/siteData"

export default function applyTheme() {
  if (typeof window === 'undefined' || !theme) return
  const root = document.documentElement
  Object.entries(theme).forEach(([k, v]) => {
    root.style.setProperty(`--${k}`, v)
  })
}
