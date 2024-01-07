<template>
    <div class="wrapper">
      <main class="main">
        <slot name="main" />
      </main>
      <aside class="aside">
        <slot name="aside" />
      </aside>
    </div>
</template>

<style scoped>
.wrapper {
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 3rem;
}
</style>
