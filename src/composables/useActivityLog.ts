import type { Position } from "@/types/position"
import { ref, type Ref, provide, inject, getCurrentInstance, type InjectionKey } from "vue"

export type ActivityLog = {
  position: Position
  timestamp: number
}

export type UseActivityLog = {
  state: Ref<ActivityLog[]>
  push: (position: Position) => void
  reset: () => void
}

export const ACTIVITY_LOG_KEY: InjectionKey<UseActivityLog> = Symbol("activityLog")

export function useActivityLog() {
  const existing = getCurrentInstance() ? inject(ACTIVITY_LOG_KEY) : null

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

  function reset(): void {
    state.value = []
  }

  const activityLog = {
    state,
    push,
    reset,
  } satisfies UseActivityLog

  if (getCurrentInstance()) {
    provide(ACTIVITY_LOG_KEY, activityLog)
  }

  return activityLog
}
