<script setup lang="ts">
import ChessBoard from "@/components/ChessBoard.vue"
import SideNav from "@/components/SideNav.vue"
import { createActivityLog } from "@/composables/useActivityLog"
import { createTheme } from "@/composables/useTheme"

createActivityLog()
createTheme()
</script>

<template>
  <div class="app">
    <ChessBoard class="app__chess-board" />
    <SideNav class="app__side-nav" />
  </div>
</template>

<style>
.app {
  background-color: var(--surface-page);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
}
</style>
