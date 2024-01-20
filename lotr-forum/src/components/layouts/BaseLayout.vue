<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <header class="header">
    <RouterLink to="/">
      <h1>Pokemon Explorer</h1>
    </RouterLink>
  </header>
  <div class="wrapper">
    <slot />
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1440px;
  margin: 1rem 2rem 0 2rem;

  display: flex;
  flex-direction: row;
  gap: 3rem;
}

.header {
  display: flex;
  flex-direction: row;
  padding: 0 2rem;

  color: var(--color-heading);
  background-color: var(--color-background-soft);
}

.header a h1 {
  font-size: 1.5rem;
}
</style>
