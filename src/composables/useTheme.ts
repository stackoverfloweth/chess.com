import { ref, watch, provide, inject, getCurrentInstance, type InjectionKey, type Ref } from "vue"

export type Theme = "light" | "dark"

export type UseTheme = {
  theme: Ref<Theme>
  toggle: () => void
}

export const THEME_KEY: InjectionKey<UseTheme> = Symbol("theme")

export function useTheme(): UseTheme {
  const existing = getCurrentInstance() ? inject(THEME_KEY) : null

  if (!existing) {
    throw new Error("Theme not found")
  }

  return existing
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem("theme")

  if (stored === "light" || stored === "dark") {
    return stored
  }

  return null
}

function setStoredTheme(value: Theme): void {
  localStorage.setItem("theme", value)
}

function getDefaultTheme(): Theme {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  return prefersDark ? "dark" : "light"
}

export function createTheme(): UseTheme {
  const theme = ref<Theme>(getStoredTheme() ?? getDefaultTheme())

  watch(
    theme,
    (value) => {
      document.documentElement.setAttribute("data-theme", value)
      setStoredTheme(value)
    },
    { immediate: true },
  )

  function toggle(): void {
    theme.value = theme.value === "light" ? "dark" : "light"
  }

  const themeState = { theme, toggle } satisfies UseTheme

  if (getCurrentInstance()) {
    provide(THEME_KEY, themeState)
  }

  return themeState
}
