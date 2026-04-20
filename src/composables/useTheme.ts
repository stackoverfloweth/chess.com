import { ref, watch, provide, inject, type InjectionKey, type Ref, computed } from "vue"

export type Theme = "light" | "dark"

export type UseTheme = {
  theme: Ref<Theme>
  toggle: () => void
}

export const THEME_KEY: InjectionKey<UseTheme> = Symbol("theme")

export function useTheme(): UseTheme {
  const existing = inject(THEME_KEY)

  if (!existing) {
    throw new Error("Theme not found")
  }

  return existing
}

const stored = computed({
  get() {
    const stored = localStorage.getItem("theme")

    if (stored === "light" || stored === "dark") {
      return stored
    }

    return getDefaultTheme()
  },
  set(value) {
    localStorage.setItem("theme", value)
  },
})

function getDefaultTheme(): Theme {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  return prefersDark ? "dark" : "light"
}

export function createTheme(): UseTheme {
  const theme = ref<Theme>(stored.value ?? getDefaultTheme())

  watch(
    theme,
    (value) => {
      document.documentElement.setAttribute("data-theme", value)
      stored.value = value
    },
    { immediate: true },
  )

  function toggle(): void {
    theme.value = theme.value === "light" ? "dark" : "light"
  }

  const themeState = { theme, toggle } satisfies UseTheme

  provide(THEME_KEY, themeState)

  return themeState
}
