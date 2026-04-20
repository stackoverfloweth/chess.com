<script setup lang="ts">
import ChessSquare from "./ChessSquare.vue"
import { FILES, RANKS } from "@/types/position"
</script>

<template>
  <div class="chess-board">
    <div class="chess-board__grid">
      <template v-for="rank in [...RANKS].reverse()" :key="rank">
        <template v-for="file in FILES" :key="file">
          <ChessSquare :position="{ file, rank }" />
        </template>
      </template>
    </div>
  </div>
</template>

<style>
.chess-board {
  width: min(100%, 100cqh);
  min-width: 264px;
  min-height: 264px;
  padding: var(--space-4);
}

.chess-board__grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  border-radius: var(--radius-xl);
  overflow: hidden;
}
</style>
