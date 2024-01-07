<script setup lang="ts">
import PokemonCard from '../PokemonCard.vue';
import PokemonStats from '../PokemonStats.vue';
import ImportPokemonForm from '../ImportPokemonForm.vue';
import TwoColumnLayout from '../layouts/TwoColumnLayout.vue';
import {PokemonClient, type NamedAPIResource, type Pokemon as RawPokemon} from "pokenode-ts"
</script>

<script lang="ts">
export type Pokemon = RawPokemon;
const client = new PokemonClient();

export default {
  components: { PokemonStats, PokemonCard },
  data: () => ({
    favoritePokemon: new Set(),
    pokemonList: [] as Pokemon[],
    typeList: [] as NamedAPIResource[],
  }),
  emits: ["navigate"],
  methods: {
    togglePokemonLike(id: number) {
      if (this.favoritePokemon.has(id)) {
        this.favoritePokemon.delete(id);
      } else {
        this.favoritePokemon.add(id);
      }
    },
    goTo(id:number) {
        this.$emit("navigate", id)
    },
    async importPokemon(importName: string) {
      if (!this.pokemonList.some((({name}) => name === importName))) {
        const pokemon = await client.getPokemonByName(importName);
        this.pokemonList.push((pokemon)) 
      }
    },
    async getPokemon() {
      const {results} = (await client.listPokemons(undefined, 151));
      const pokemonPromises = results.map((pokemon) => client.getPokemonByName(pokemon.name));
      const pokemon = await Promise.all((pokemonPromises))
      this.pokemonList = pokemon;
    },
    async getTypes() {
      this.typeList = (await client.listTypes()).results;
    },
  },
  created() {
    this.getPokemon();
    this.getTypes();
  }
};
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
            @toggle-favorite="togglePokemonLike"
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
