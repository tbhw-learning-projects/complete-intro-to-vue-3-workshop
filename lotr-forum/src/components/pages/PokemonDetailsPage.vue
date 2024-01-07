<template>
  <p v-if="pokemon === null">Loading...</p>
  <div v-else>
    <h1 class="name">{{ pokemon.name }}</h1>
    <h2>Stats</h2>
    <dl class="stats">
        <div v-for="[name, value] in stats" :key="name">
            <dt>{{String(name).replace("-", " ")}}</dt>
            <dd>{{ value }}</dd>
        </div>
    </dl>
    <h2>Abilities</h2>
    <ul>
        <li v-for="ability in abilities" :key="ability">{{ ability }}</li>
    </ul>    
    <!-- <pre>{{ details }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { PokemonClient } from 'pokenode-ts';
import type { Pokemon } from 'pokenode-ts';
</script>

<script lang="ts">
const client = new PokemonClient();

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    pokemon: null as null | Pokemon
  }),
  computed: {
    abilities() {
      return this.pokemon?.abilities.map(({ ability: { name } }) => name);
    },
    moves() {
      return this.pokemon?.moves.map(({ move: { name } }) => name);
    },
    stats() {
      return this.pokemon?.stats.map(({ stat: { name }, base_stat }) => [name, base_stat]);
    },
    details() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {name, abilities, moves, stats, ...details} = this.pokemon ?? {};
        return details;
    }
  },
  methods: {
    async getPokemonData() {
      this.pokemon = await client.getPokemonById(this.id);
    }
  },
  created() {
    this.getPokemonData();
  }
};
</script>

<style scoped>
.name {
    text-transform: capitalize;
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
