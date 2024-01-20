<script setup lang="ts">
import {RouterView} from "vue-router"
import BaseLayout from '@components/layouts/BaseLayout.vue';
</script>

<template>
  <BaseLayout>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </BaseLayout>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
