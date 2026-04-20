import { mount } from "@vue/test-utils"
import { page } from "vitest/browser"
import { defineComponent, h } from "vue"
import ChessBoard from "@/components/ChessBoard.vue"
import { createActivityLog, type UseActivityLog } from "@/composables/useActivityLog"
import { FILES } from "@/types/position"

const Host = defineComponent({
  setup(_, { expose }) {
    const log = createActivityLog()
    expose({ log })
    return () => h(ChessBoard)
  },
})

test("enforces a 264px floor on the grid when the viewport is smaller", async () => {
  await page.viewport(200, 200)

  const wrapper = mount(Host, { attachTo: document.body })

  const grid = wrapper.get(".chess-board__grid").element
  const rect = grid.getBoundingClientRect()

  expect(rect.width).toBeGreaterThanOrEqual(264)
  expect(rect.height).toBeGreaterThanOrEqual(264)

  wrapper.unmount()
})

test("renders A1 as a dark square in the bottom-left corner", async () => {
  const wrapper = mount(Host, { attachTo: document.body })

  const squares = wrapper.findAll(".chess-square")

  const bottomLeft = squares.reduce((current, candidate) => {
    const currentRect = current.element.getBoundingClientRect()
    const candidateRect = candidate.element.getBoundingClientRect()

    if (candidateRect.bottom > currentRect.bottom) {
      return candidate
    }

    if (candidateRect.bottom === currentRect.bottom && candidateRect.left < currentRect.left) {
      return candidate
    }

    return current
  })

  const files = wrapper.findAll(".chess-board__label--file")
  const ranks = wrapper.findAll(".chess-board__label--rank")

  expect(files[0].text()).toBe("a")
  expect(ranks[ranks.length - 1].text()).toBe("1")
  expect(bottomLeft.classes()).toContain("chess-square--dark")

  wrapper.unmount()
})

test("pushes the clicked square's file and rank to the activity log", async () => {
  const wrapper = mount(Host, { attachTo: document.body })

  const squares = wrapper.findAll(".chess-square")
  const index = Math.floor(Math.random() * squares.length)
  const expectedFile = FILES[index % 8]
  const expectedRank = 8 - Math.floor(index / 8)

  await squares[index].trigger("click")

  const { log } = wrapper.vm as unknown as { log: UseActivityLog }

  expect(log.state.value).toHaveLength(1)
  expect(log.state.value[0].position).toEqual({ file: expectedFile, rank: expectedRank })

  wrapper.unmount()
})

test("does not log activity when deselecting an already-selected square", async () => {
  const wrapper = mount(Host, { attachTo: document.body })

  const squares = wrapper.findAll(".chess-square")
  const index = Math.floor(Math.random() * squares.length)

  await squares[index].trigger("click")
  await squares[index].trigger("click")

  const { log } = wrapper.vm as unknown as { log: UseActivityLog }

  expect(log.state.value).toHaveLength(1)

  wrapper.unmount()
})

test("toggles the selected state on a square when clicked", async () => {
  const wrapper = mount(Host, { attachTo: document.body })

  const squares = wrapper.findAll(".chess-square")
  const index = Math.floor(Math.random() * squares.length)
  const square = squares[index]

  expect(square.classes()).not.toContain("chess-square--selected")

  await square.trigger("click")
  expect(square.classes()).toContain("chess-square--selected")

  await square.trigger("click")
  expect(square.classes()).not.toContain("chess-square--selected")

  wrapper.unmount()
})

test("allows multiple squares to be selected at the same time", async () => {
  const wrapper = mount(Host, { attachTo: document.body })

  const squares = wrapper.findAll(".chess-square")
  const indices = [0, 17, 42, 63]

  for (const index of indices) {
    await squares[index].trigger("click")
  }

  for (const index of indices) {
    expect(squares[index].classes()).toContain("chess-square--selected")
  }

  const selected = wrapper.findAll(".chess-square--selected")
  expect(selected).toHaveLength(indices.length)

  wrapper.unmount()
})
