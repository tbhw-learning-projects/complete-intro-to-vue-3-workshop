<script setup lang="ts">
import PokemonCard from '@components/PokemonCard.vue';
import PokemonStats from '@components/PokemonStats.vue';
import ImportPokemonForm from '@components/ImportPokemonForm.vue';
import TwoColumnLayout from '@components/layouts/TwoColumnLayout.vue';
import {useFavoritePokemon} from '@composables/useFavoritePokemon';
import { PokemonClient, type Pokemon as RawPokemon } from 'pokenode-ts';
import { ref } from 'vue';

export type Pokemon = RawPokemon;
const client = new PokemonClient();

const emit = defineEmits<{navigate: [id: number]}>();

const pokemonListPromise = client
  .listPokemons(undefined, 151)
  .then(({ results }) =>
    Promise.all(results.map((pokemon) => client.getPokemonByName(pokemon.name)))
  );
const typeListPromise = client.listTypes();
const [pokemonListResult, { results: typeListResult }] = await Promise.all([
  pokemonListPromise,
  typeListPromise
]);

const {favoritePokemon, toggleFavoritePokemon} = useFavoritePokemon();
const pokemonList = ref(pokemonListResult);
const typeList = ref(typeListResult);

function goTo(id: number) {
  emit('navigate', id);
}

async function importPokemon(pokemon: { name: string }) {
  if (!pokemonList.value.some(({ name }) => name === pokemon.name)) {
    try {
      const importedPokemon = await client.getPokemonByName(pokemon.name);
      pokemonList.value.push(importedPokemon);
    } catch (e) {
      console.warn(e);
    }
  }
}
</script>

<template>
  <TwoColumnLayout>
    <template v-slot:main>
      <ImportPokemonForm @import-pokemon="importPokemon" />
      <p v-if="pokemonList.length === 0">No characters are available.</p>
      <ul v-else>
        <li v-for="pokemon in pokemonList" :key="pokemon.id">
          <PokemonCard
            :pokemon="pokemon"
            :isFavorite="favoritePokemon.has(pokemon.id)"
            @toggle-favorite="toggleFavoritePokemon"
            @view-details="goTo(pokemon.id)"
          />
        </li>
      </ul>
    </template>

    <template v-slot:aside>
      <PokemonStats :pokemon="pokemonList" :type-list="typeList" />
    </template>
  </TwoColumnLayout>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
