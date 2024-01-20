<script setup lang="ts">
import PokemonCard from '@components/PokemonCard.vue';
import PokemonStats from '@components/PokemonStats.vue';
import ImportPokemonForm from '@components/ImportPokemonForm.vue';
import TwoColumnLayout from '@components/layouts/TwoColumnLayout.vue';
import {useFavoritePokemonStore} from '@stores/favoritePokemon';
import { usePokemonStore } from '@stores/pokemon';


const emit = defineEmits<{navigate: [id: number]}>();

const pokemonStore = usePokemonStore();

await pokemonStore.getInitialPokemonList();
await pokemonStore.getPokemonTypeList();

const favoritePokemonStore = useFavoritePokemonStore();

function goTo(id: number) {
  emit('navigate', id);
}

async function importPokemon(pokemon: { name: string }) {
  if (!pokemonStore.pokemon.has(pokemon.name)) {
    try {
      pokemonStore.getPokemon(pokemon.name);
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
      <p v-if="pokemonStore.pokemon.size === 0">No characters are available.</p>
      <ul v-else>
        <li v-for="pokemon in pokemonStore.pokemonList" :key="pokemon.id">
          <PokemonCard
            :pokemon="pokemon"
            :isFavorite="favoritePokemonStore.favoritePokemon.has(pokemon.id)"
            @toggle-favorite="favoritePokemonStore.toggleFavoritePokemon"
            @view-details="goTo(pokemon.id)"
          />
        </li>
      </ul>
    </template>

    <template v-slot:aside>
      <PokemonStats :pokemon="pokemonStore.pokemonList" :type-list="pokemonStore.types.results" />
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
