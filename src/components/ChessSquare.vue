<script setup lang="ts">
import type { Position } from "@/types/position"
import { isDarkSquare } from "@/services/position"
import { computed, ref } from "vue"
import { useActivityLog } from "@/composables/useActivityLog"

const props = defineProps<{
  position: Position
}>()

const selected = ref(false)

function toggleSelected(): void {
  selected.value = !selected.value
}

const classes = computed(() => {
  return {
    "chess-square--dark": isDarkSquare(props.position),
    "chess-square--selected": selected.value,
  }
})

const { push } = useActivityLog()

function handleSquareClick(): void {
  toggleSelected()

  if (selected.value) {
    push(props.position)
  }
}
</script>

<template>
  <button type="button" class="chess-square" :class="classes" @click="handleSquareClick">
    {{ JSON.stringify(position, null, 2) }}
  </button>
</template>

<style>
.chess-square {
  --square-color: var(--color-board-light);

  aspect-ratio: 1 / 1;
  background-color: var(--square-color);
  white-space: pre-wrap;
}

.chess-square--dark {
  --square-color: var(--color-board-dark);
}

.chess-square:hover:not(.chess-square--selected) {
  background-color: oklch(from var(--square-color) calc(l * 0.94) c h);
}

.chess-square--selected {
  background-color: oklch(from var(--square-color) calc(l * 0.78) calc(c * 1.5) 138);
}
</style>
