import type { Position } from "@/types/position"
import { ref, type Ref, provide, inject, type InjectionKey } from "vue"

export type ActivityLog = {
  position: Position
  timestamp: number
}

export type UseActivityLog = {
  state: Ref<ActivityLog[]>
  push: (position: Position) => void
}

export const ACTIVITY_LOG_KEY: InjectionKey<UseActivityLog> = Symbol("activityLog")

export function useActivityLog() {
  const existing = inject(ACTIVITY_LOG_KEY)

  if (!existing) {
    throw new Error("Activity log not found")
  }

  return existing
}

export function createActivityLog(): UseActivityLog {
  const state = ref<ActivityLog[]>([])

  function push(position: Position): void {
    state.value.push({ position, timestamp: Date.now() })
  }

  const activityLog = {
    state,
    push,
  } satisfies UseActivityLog

  provide(ACTIVITY_LOG_KEY, activityLog)

  return activityLog
}
