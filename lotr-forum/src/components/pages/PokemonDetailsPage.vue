<template>
  <p v-if="pokemon === null">Loading pokemon...</p>
  <div v-else>
    <h1 class="name">{{ pokemon.name }}</h1>
    <div class="details">
        <section aria-label="stats">
            <h2>Stats</h2>
            <dl class="stats">
                <div v-for="[name, value] in stats" :key="name">
                    <dt>{{name.replace("-", " ")}}</dt>
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
  </div>
</template>

<script setup lang="ts">
import { PokemonClient } from 'pokenode-ts';
import type { Pokemon } from 'pokenode-ts';
import { computed, ref } from 'vue';

const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  async function getPokemonData() {
    return await client.getPokemonById(props.id);
  }

const client = new PokemonClient();
const pokemon = ref<null | Pokemon>(null);

const abilities = computed(() => pokemon.value?.abilities.map(({ ability: { name } }) => name))
const stats = computed(() => pokemon.value?.stats.map(({ stat: { name }, base_stat }): [string, number] => [name, base_stat]))

getPokemonData().then((result) => {pokemon.value = result})
  

</script>

<style scoped>
.name {
    text-transform: capitalize;
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
