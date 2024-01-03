<script lang="ts">
import { speciesList, type Character, isSpecies } from '@/App.vue';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    characters: {
      type: Array as PropType<Character[]>,
      default: () => [] as Character[],
      required: true,
      validator: (prop): prop is Character[] =>
        Array.isArray(prop) &&
        prop.every((character) => character.id && character.name && isSpecies(character.species))
    }
  },
  computed: {
    speciesStats() {
      const stats = Object.fromEntries(speciesList.map((species) => [species, 0]));
      this.characters.forEach(({ species }) => (stats[species] += 1));
      return stats;
    }
  }
});
</script>

<template>
  <ul>
    <li v-for="(count, species) in speciesStats" :key="species">
      {{ species }}:
      {{ new Intl.NumberFormat('en-us', { style: 'percent' }).format(count / characters.length) }}
    </li>
  </ul>
</template>

<style scoped></style>
