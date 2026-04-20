<script setup lang="ts">
import ChessBoard from "@/components/ChessBoard.vue"
import SideNav from "@/components/SideNav.vue"
</script>

<template>
  <SideNav class="app__side-nav" />
  <ChessBoard class="app__chess-board" />
</template>

<style>
#app {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
}
</style>
