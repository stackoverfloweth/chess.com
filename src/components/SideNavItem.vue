<script setup lang="ts">
import type { PositionString } from "@/types/position"
import { computed } from "vue"

const props = defineProps<{
  index: number
  title: PositionString
  date: Date
}>()

const classes = computed(() => {
  return {
    "side-nav-item--even": props.index % 2 === 0,
  }
})
</script>

<template>
  <li class="side-nav-item" :class="classes">
    <span class="side-nav-item__index">{{ index + 1 }}.</span>
    <span class="side-nav-item__title">{{ title }}</span>
    <span class="side-nav-item__date">{{ date.toLocaleTimeString() }}</span>
  </li>
</template>

<style>
.side-nav-item {
  display: grid;
  grid-template-columns: 4ch minmax(0, 1fr) auto;
  flex-direction: row;
  padding: var(--space-2);
  gap: var(--space-2);
}

.side-nav-item--even {
  background-color: oklch(from var(--surface-raised) calc(l * 0.95) c h);
}

.side-nav-item__index {
  font-weight: var(--font-medium);
}

.side-nav-item__title {
  font-weight: var(--font-medium);
}

.side-nav-item__date {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  font-family: var(--font-mono);
}
</style>
