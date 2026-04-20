<script setup lang="ts">
import { useActivityLog } from "@/composables/useActivityLog"
import SideNavItem from "@/components/SideNavItem.vue"

const { state } = useActivityLog()
</script>

<template>
  <aside class="side-nav">
    <h2 class="side-nav__title">Activity Log</h2>

    <ul class="side-nav__list">
      <template v-if="state.length === 0">
        <li class="side-nav__empty-message">No activity logged</li>
      </template>
      <template v-for="(log, index) in state" :key="log.timestamp">
        <SideNavItem
          :index="index"
          :title="`${log.position.file}${log.position.rank}`"
          :date="new Date(log.timestamp)"
        />
      </template>
    </ul>
  </aside>
</template>

<style>
.side-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  height: 100cqh;
  max-width: 600px;
  min-width: 200px;
  flex: 1;
}

.side-nav__list {
  list-style: none;
  margin: 0;
  max-height: 100cqh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
}

.side-nav__empty-message {
  text-align: center;
  font-style: italic;
  padding: var(--space-2);
  color: var(--text-secondary);
}
</style>
