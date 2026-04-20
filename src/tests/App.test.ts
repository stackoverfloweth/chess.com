import { mount } from "@vue/test-utils"
import { page } from "vitest/browser"
import App from "@/App.vue"
import "@/style.css"

describe("App layout", () => {
  test("positions the sidebar to the right of the chessboard on desktop viewports", async () => {
    await page.viewport(1280, 900)
    const wrapper = mount(App, { attachTo: document.body })

    const board = wrapper.get(".chess-board").element.getBoundingClientRect()
    const sidebar = wrapper.get(".side-nav").element.getBoundingClientRect()

    expect(sidebar.left).toBeGreaterThanOrEqual(board.right)
    expect(sidebar.top).toBeLessThan(board.bottom)

    wrapper.unmount()
  })

  test("positions the sidebar below the chessboard on mobile viewports", async () => {
    await page.viewport(375, 800)
    const wrapper = mount(App, { attachTo: document.body })

    const board = wrapper.get(".chess-board").element.getBoundingClientRect()
    const sidebar = wrapper.get(".side-nav").element.getBoundingClientRect()

    expect(sidebar.top).toBeGreaterThanOrEqual(board.bottom)

    wrapper.unmount()
  })
})
