<script setup lang="ts">
import PokemonListPage from './components/pages/PokemonListPage.vue';
import PokemonDetailsPage from './components/pages/PokemonDetailsPage.vue';
import BaseLayout from './components/layouts/BaseLayout.vue';
import { computed, ref } from 'vue';

const activePage = ref('List');
const activePokemon = ref<null | number>(null);

const activePageComponent = computed(() => {
  switch (activePage.value) {
    case 'List':
      return PokemonListPage;
    default:
      return PokemonDetailsPage;
  }
});
const activePageProps = computed(() => {
  if (activePage.value === 'List') {
    return {};
  } else {
    return {
      id: activePokemon.value
    };
  }
});

function setPage(page: unknown) {
  if (typeof page === 'number') { 
    activePage.value = 'Details';
    activePokemon.value = page;
  } else if (typeof page === "string") {
    activePage.value = page;
    activePokemon.value = null;
  }
}
</script>

<template>
  <BaseLayout @navigate="setPage('List')">
    <Suspense>
      <component :is="activePageComponent" @navigate="setPage" v-bind="activePageProps" />

      <template v-slot:fallback> Loading... </template>
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
