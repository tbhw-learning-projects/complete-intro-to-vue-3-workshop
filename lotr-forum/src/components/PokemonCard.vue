<template>
  <a class="card" href="#" @click.prevent="viewDetails(pokemon.id)">
    <p class="name">{{ pokemon.name }}</p>
    <button v-if="isFavorite" @click="toggleLike(pokemon.id)">❤️</button>
    <button v-else @click.prevent="toggleLike(pokemon.id)">🤍</button>
  </a>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Pokemon } from './pages/PokemonListPage.vue';

export default {
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-favorite', 'view-details'],
  methods: {
    toggleLike(id: number) {
      this.$emit('toggle-favorite', id);
    },
    viewDetails(id: number) {
      this.$emit('view-details', id);
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;

  border-radius: 1rem;
  box-shadow: 1px 2px 5px -1px var(--color-border-hover);
}

.name {
  text-transform: capitalize;
}

button {
  border: none;
  cursor: pointer;
  background-color: #00000050;
  border-radius: 100%;
  box-shadow: 1px 2px 5px -1px var(--color-border-hover);
  font-size: 0.75rem;
  width: 2.75em;
  height: 2.75em;
  text-align: center;
  padding-top: 0.25em;

  transition: box-shadow 300ms ease-in-out;
  will-change: box-shadow;
}

button:hover,
button:focus-visible {
  outline: none;
  box-shadow: 2px 3px 10px -2px var(--color-border-hover);
  transition: box-shadow 100ms ease-in-out;
}
</style>
