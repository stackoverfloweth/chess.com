<script setup lang="ts">
import ChessSquare from "./ChessSquare.vue"
import { FILES, RANKS } from "@/types/position"
</script>

<template>
  <div class="chess-board">
    <template v-for="rank in [...RANKS].reverse()" :key="rank">
      <template v-for="file in FILES" :key="file">
        <ChessSquare :position="{ file, rank }" />
      </template>
    </template>
  </div>
</template>

<style>
.chess-board {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  width: min(100%, 100cqh);
  padding: var(--space-4);
}
</style>
