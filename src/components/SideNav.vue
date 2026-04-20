<script setup lang="ts">
import { useActivityLog } from "@/composables/useActivityLog"

const { state } = useActivityLog()
</script>

<template>
  <div class="side-nav">
    <template v-for="log in state" :key="log.timestamp">
      <div class="side-nav__item">{{ log.position.file }}{{ log.position.rank }}</div>
    </template>
  </div>
</template>

<style>
.side-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  max-height: 100cqh;
  overflow-y: auto;
  flex: 1;
}
</style>
