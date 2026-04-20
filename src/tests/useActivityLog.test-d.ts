import { createActivityLog } from "@/composables/useActivityLog"
import type { Position } from "@/types/position"

describe("useActivityLog types", () => {
  test("push accepts a valid Position", () => {
    const log = createActivityLog()

    expectTypeOf(log.push).parameter(0).toEqualTypeOf<Position>()
    log.push({ file: "e", rank: 4 })
  })

  test("push rejects invalid file", () => {
    const log = createActivityLog()

    // @ts-expect-error — "z" is not a valid File
    log.push({ file: "z", rank: 4 })
  })

  test("push rejects invalid rank", () => {
    const log = createActivityLog()

    // @ts-expect-error — 9 is not a valid Rank
    log.push({ file: "e", rank: 9 })
  })

  test("push rejects missing fields", () => {
    const log = createActivityLog()

    // @ts-expect-error — missing rank
    log.push({ file: "e" })

    // @ts-expect-error — missing file
    log.push({ rank: 4 })

    // @ts-expect-error — position is required
    log.push()
  })

  test("push rejects extra fields", () => {
    const log = createActivityLog()

    // @ts-expect-error — timestamp is not part of Position
    log.push({ file: "e", rank: 4, timestamp: Date.now() })
  })

  test("push rejects non-Position values", () => {
    const log = createActivityLog()

    // @ts-expect-error — string is not a Position
    log.push("e4")

    // @ts-expect-error — null is not a Position
    log.push(null)

    // @ts-expect-error — undefined is not a Position
    log.push(undefined)
  })
})
