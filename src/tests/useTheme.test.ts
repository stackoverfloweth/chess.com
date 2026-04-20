import { nextTick } from "vue"
import { createTheme, useTheme } from "@/composables/useTheme"

function mockPrefersDark(prefersDark: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        matches: query === "(prefers-color-scheme: dark)" ? prefersDark : false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
        onchange: null,
      }) as unknown as MediaQueryList,
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute("data-theme")
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("createTheme", () => {
  test("uses the stored theme from localStorage when present", () => {
    localStorage.setItem("theme", "dark")

    const { theme } = createTheme()

    expect(theme.value).toBe("dark")
  })

  test("falls back to the OS preference when nothing is stored", () => {
    mockPrefersDark(true)

    const { theme } = createTheme()

    expect(theme.value).toBe("dark")
  })

  test("defaults to light when nothing is stored and OS does not prefer dark", () => {
    mockPrefersDark(false)

    const { theme } = createTheme()

    expect(theme.value).toBe("light")
  })

  test("toggle flips the theme and persists it", async () => {
    const { theme, toggle } = createTheme()
    expect(theme.value).toBe("light")

    toggle()
    await nextTick()

    expect(theme.value).toBe("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
  })
})

describe("useTheme", () => {
  test("throws when no theme has been provided", () => {
    expect(() => useTheme()).toThrow("Theme not found")
  })
})
