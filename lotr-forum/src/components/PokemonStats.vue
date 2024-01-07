<script lang="ts">
import type { NamedAPIResource } from 'pokenode-ts';
import { defineComponent, type PropType } from 'vue';
import type { Pokemon } from './pages/PokemonListPage.vue';

export default defineComponent({
  props: {
    pokemon: {
      type: Array as PropType<Pokemon[]>,
      required: true,
    },
    typeList: {
      type: Array as PropType<NamedAPIResource[]>,
        required: true,
    }
  },
  computed: {
    typeStats() {
      const stats: Record<string, number> = {};
      this.pokemon.forEach(({ types }) => (types ?? []).forEach(({type}) => {
        stats[type.name] ??= 0;
        stats[type.name] += 1}));
      return stats;
    }
  }
});
</script>

<template>
  <ul>
    <li v-for="(count, type) in typeStats" :key="type">
      {{ type }}:
      {{ new Intl.NumberFormat('en-us', { style: 'percent' }).format(count / pokemon.length) }}
    </li>
  </ul>
</template>

<style scoped>
  li {
    text-transform: capitalize;
  }
</style>
