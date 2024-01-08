<script setup lang="ts">
import PokemonListPage from './components/pages/PokemonListPage.vue';
import PokemonDetailsPage from './components/pages/PokemonDetailsPage.vue';
import BaseLayout from './components/layouts/BaseLayout.vue';
</script>

<script lang="ts">

export default {
  components: { ListPage: PokemonListPage, DetailsPage: PokemonDetailsPage },
  data: () => ({
    activePage: "List",
    activePokemon: null as null | number
  }),
  computed: {
    activePageComponent() {
      return this.activePage + "Page"
    },
    activePageProps() {
      if (this.activePage === "List") {
        return {}
      } else {
        return {
          id: this.activePokemon
        }
      }
    }
  },
  methods: {
    setPage(page: string | number) {
      if (typeof page === "string") {
        this.activePage = page
        this.activePokemon = null;
      } else {
        this.activePage = "Details"
        this.activePokemon = page;
      }
    }
  },
};
</script>

<template>
  <BaseLayout @navigate="setPage('List')">
    <Suspense>
      <component :is="activePageComponent" @navigate="setPage" v-bind="activePageProps"/>

      <template v-slot:fallback>
        Loading...
      </template>
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
