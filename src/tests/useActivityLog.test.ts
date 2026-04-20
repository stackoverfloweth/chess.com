import { createActivityLog, useActivityLog } from "@/composables/useActivityLog"

describe("createActivityLog", () => {
  test("initializes with an empty log", () => {
    const log = createActivityLog()

    expect(log.state.value).toEqual([])
  })

  test("push appends an entry with the given position and a timestamp", () => {
    const now = 1_700_000_000_000
    vi.spyOn(Date, "now").mockReturnValue(now)

    const log = createActivityLog()
    log.push({ file: "e", rank: 4 })

    expect(log.state.value).toEqual([{ position: { file: "e", rank: 4 }, timestamp: now }])

    vi.restoreAllMocks()
  })

  test("push preserves insertion order across multiple calls", () => {
    const log = createActivityLog()

    log.push({ file: "a", rank: 1 })
    log.push({ file: "h", rank: 8 })
    log.push({ file: "d", rank: 4 })

    expect(log.state.value.map((entry) => entry.position)).toEqual([
      { file: "a", rank: 1 },
      { file: "h", rank: 8 },
      { file: "d", rank: 4 },
    ])
  })

  test("reset clears all entries", () => {
    const log = createActivityLog()

    log.push({ file: "b", rank: 2 })
    log.push({ file: "c", rank: 3 })
    expect(log.state.value).toHaveLength(2)

    log.reset()
    expect(log.state.value).toEqual([])
  })
})

describe("useActivityLog", () => {
  test("throws when no activity log has been provided", () => {
    expect(() => useActivityLog()).toThrow("Activity log not found")
  })
})
