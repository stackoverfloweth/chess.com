<script setup lang="ts">
import type { Position } from "@/types/position"
import { isDarkSquare } from "@/services/position"
import { computed } from "vue"

const props = defineProps<{
  position: Position
}>()

const classes = computed(() => {
  return {
    "chess-square--dark": isDarkSquare(props.position),
  }
})
</script>

<template>
  <div class="chess-square" :class="classes">{{ JSON.stringify(position, null, 2) }}</div>
</template>

<style>
.chess-square {
  --square-color: var(--color-board-light);

  aspect-ratio: 1 / 1;
  background-color: var(--square-color);
  white-space: pre-wrap;
}

.chess-square--dark {
  background-color: var(--color-board-dark);
}
</style>
