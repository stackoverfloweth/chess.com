<script setup lang="ts">
import ChessSquare from "./ChessSquare.vue"
import { FILES, RANKS } from "@/types/position"
</script>

<template>
  <div class="chess-board">
    <div class="chess-board__grid">
      <div class="chess-board__board">
        <template v-for="rank in [...RANKS].reverse()" :key="rank">
          <template v-for="file in FILES" :key="file">
            <ChessSquare :position="{ file, rank }" />
          </template>
        </template>
      </div>

      <template v-for="rank in [...RANKS].reverse()" :key="rank">
        <span class="chess-board__label chess-board__label--rank">{{ rank }}</span>
      </template>

      <div class="chess-board__corner" />

      <template v-for="file in FILES" :key="file">
        <span class="chess-board__label chess-board__label--file">{{ file }}</span>
      </template>
    </div>
  </div>
</template>

<style>
.chess-board {
  width: min(100%, 100cqh);
  padding: var(--space-6);
}

.chess-board__grid {
  display: grid;
  min-width: 264px;
  min-height: 264px;
  grid-template-columns: auto repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr)) auto;
}

.chess-board__board {
  display: grid;
  grid-column: 2 / 10;
  grid-row: 1 / 9;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.chess-board__label {
  display: flex;
  place-items: center;
  place-content: center;
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.chess-board__label--rank {
  margin-right: var(--space-2);
}

.chess-board__label--file {
  margin-top: var(--space-2);
}

.chess-board__corner {
  grid-column: 1;
  grid-row: 9;
}
</style>
