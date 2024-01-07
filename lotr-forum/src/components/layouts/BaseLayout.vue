<script lang="ts">
export default {
  emits: ['navigate'],
  methods: {
    goTo(destination: string) {
      this.$emit('navigate', { destination });
    }
  }
};
</script>

<template>
  <header class="header">
    <a href="#" @click.prevent="goTo('/')">
      <h1>Pokemon Explorer</h1>
    </a>
  </header>
  <div class="wrapper">
    <slot />
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1440px;
  width: 100%;
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
