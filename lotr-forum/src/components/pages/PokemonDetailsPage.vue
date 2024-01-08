<template>
  <p v-if="pokemon === null">Loading pokemon...</p>
  <main v-else>
    <header>
        <h1 class="name">{{ pokemon.name }}</h1>
        <button class="like-button" v-if="isFavorite" @click="toggleFavoritePokemon(pokemon.id)">❤️</button>
        <button class="like-button" v-else @click.prevent="toggleFavoritePokemon(pokemon.id)">🤍</button>
    </header>
    <div class="details">
      <section aria-label="stats">
        <h2>Stats</h2>
        <dl class="stats">
          <div v-for="[name, value] in stats" :key="name">
            <dt>{{ name.replace('-', ' ') }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </section>
      <section aria-label="abilities">
        <h2>Abilities</h2>
        <ul>
          <li v-for="ability in abilities" :key="ability">{{ ability }}</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFavoritePokemon } from '@composables/useFavoritePokemon';
import { PokemonClient } from 'pokenode-ts';
import type { Pokemon } from 'pokenode-ts';
import { computed, ref } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const {favoritePokemon, toggleFavoritePokemon} = useFavoritePokemon();

async function getPokemonData() {
  return await client.getPokemonById(props.id);
}

const client = new PokemonClient();
const pokemon = ref<null | Pokemon>(null);

const isFavorite = computed(() => favoritePokemon.value.has((props.id)))
const abilities = computed(() => pokemon.value?.abilities.map(({ ability: { name } }) => name));
const stats = computed(
  () =>
    pokemon.value?.stats.map(({ stat: { name }, base_stat }): [string, number] => [name, base_stat])
);

getPokemonData().then((result) => {
  pokemon.value = result;
});
</script>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}
.name {
  text-transform: capitalize;
}

.like-button {
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

.like-button:hover,
.like-button:focus-visible {
  outline: none;
  box-shadow: 2px 3px 10px -2px var(--color-border-hover);
  transition: box-shadow 100ms ease-in-out;
}

.details {
  display: flex;
  flex-direction: row;
}
.stats div {
  display: contents;
}
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  text-transform: capitalize;
  margin: 1rem 0;
}
</style>
