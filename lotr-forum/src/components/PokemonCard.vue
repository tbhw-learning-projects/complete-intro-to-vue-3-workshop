<template>
  <a class="card" href="#" @click.prevent="viewDetails(pokemon.id)">
    <p class="name">{{ pokemon.name }}</p>
    <img v-bind:src="imageUrl" v-bind:alt="'An image of ' + pokemon.name"/>
    <button v-if="isFavorite" @click="toggleLike">❤️</button>
    <button v-else @click.prevent="toggleLike">🤍</button>
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
  computed: {
    imageUrl() {
      return this.pokemon.sprites.front_default ?? undefined
    }
  },
  emits: ['toggle-favorite', 'view-details'],
  methods: {
    toggleLike(event: Event) {
      event.stopPropagation()
      this.$emit('toggle-favorite', this.pokemon.id);
    },
    viewDetails(id: number) {
      this.$emit('view-details', id);
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
  isolation: isolate;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;

  border-radius: 1rem;
  box-shadow: 1px 2px 5px -1px var(--color-border-hover);
}

.card button {
  position: absolute;
  left: 0.5rem;
  bottom: 0.5rem;
}

.card:hover:has(button:hover) {
  background-color: initial;
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
