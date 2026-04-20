<script setup lang="ts">
const columns = Array.from({ length: 8 })
  .fill(0)
  .map((_, index) => index + 1)
  .reverse()
const rows = "abcdefgh".split("")
</script>

<template>
  <div class="chess-board">
    <template v-for="(column, columnIndex) in columns" :key="column">
      <template v-for="(row, rowIndex) in rows" :key="row">
        <div
          class="chess-board__square"
          :class="{ 'chess-board__square--dark': (columnIndex + rowIndex) % 2 === 1 }"
        >
          {{ column }}{{ row }}
        </div>
      </template>
    </template>
  </div>
</template>

<style>
.chess-board {
  --square-color: var(--color-board-light);
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  width: min(100%, 100cqh);
  padding: var(--space-4);
}

.chess-board__square {
  aspect-ratio: 1 / 1;
  background-color: var(--square-color);
}

.chess-board__square--dark {
  --square-color: var(--color-board-dark);
}
</style>
