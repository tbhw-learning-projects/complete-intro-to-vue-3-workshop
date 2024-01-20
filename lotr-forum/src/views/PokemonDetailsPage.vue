<template>
  <p v-if="pokemon === null || evolutionChain === null">Loading pokemon...</p>
  <main v-else>
    <header>
      <h1 class="name">{{ pokemon.name }}</h1>
      <button
        class="like-button"
        v-if="isFavorite"
        @click="favoritePokemonStore.toggleFavoritePokemon(pokemon.id)"
      >
        ❤️
      </button>
      <button
        class="like-button"
        v-else
        @click.prevent="favoritePokemonStore.toggleFavoritePokemon(pokemon.id)"
      >
        🤍
      </button>
    </header>
    <p
      class="evolution"
      v-for="(chain, index) in evolutionChain"
      :key="Array.isArray(chain) ? chain.map(({ name }) => name).join('-') : chain.name"
    >
      <RouterLink
        :to="`/pokemon/${chain.name}`"
        v-if="'name' in chain && chain.name !== pokemon.name"
        >{{ chain.name }}</RouterLink
      >
      <span v-else-if="'name' in chain">{{ chain.name }}</span>
      <span v-else class="form-list">
        <RouterLink :to="`/pokemon/${selectedChain[index]}`">{{ selectedChain[index] }}</RouterLink>
        <Dropdown :options="chain" optionLabel="name" optionValue="name" v-model="selectedChain[index]">
        </Dropdown>
      </span>
    </p>
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
import { useFavoritePokemonStore } from '@stores/favoritePokemon';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Dropdown from 'primevue/dropdown';
import { usePokemonStore} from '@stores/pokemon';

const route = useRoute();
const rawName = route.params.name;
const name = ref(Array.isArray(rawName) ? rawName[0] : rawName);
const favoritePokemonStore = useFavoritePokemonStore();
const pokemonStore = usePokemonStore();

const selectedChain = ref<string[]>(pokemonStore.pokemon.get((name.value))?.evolutionChain?.map((link) => Array.isArray(link) ? link[0].name : '') ?? []);

const isFavorite = computed(() => favoritePokemonStore.favoritePokemon.has(pokemon.value?.id));
const abilities = computed(() => pokemon.value?.abilities.map(({ ability: { name } }) => name));
const stats = computed(
  () =>
    pokemon.value?.stats.map(({ stat: { name }, base_stat }): [string, number] => [name, base_stat])
);
const pokemon = computed(() => pokemonStore.pokemon.get(name.value)?.pokemon ?? null)
const evolutionChain = computed(() => pokemonStore.pokemon.get(name.value)?.evolutionChain ?? null)

preparePageData(name.value);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.name !== from.params.name) {
    const rawToName = to.params.name;
    const toName = Array.isArray(rawToName) ? rawToName[0] : rawToName;
    name.value = toName;
    await preparePageData(toName);
  }
});

async function preparePageData(targetName: string) {
  await pokemonStore.getPokemonEvolutionData(targetName).then(() => {
  const targetPokemon = pokemonStore.pokemon.get(targetName) 
  selectedChain.value = targetPokemon?.evolutionChain?.map((link) => Array.isArray(link) ? link[0].name : '') ?? []
});
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

:deep(.p-dropdown) {
  margin-left: 0.25em;
  align-self: center;
  border-color: var(--color-border);
  border-width: 2px;
  overflow: hidden;
}

:deep(.p-dropdown:not(.p-disabled):hover) {
  border-color: var(--color-border-hover);
}

:deep(.p-dropdown-label) {
  display: none;
}

:deep(.p-dropdown-trigger) {
  width: fit-content;
  padding: 0.25em;
  height: 1em;
  width: 1em;
  background-color: var(--color-background-mute);
  color: var(--color-text);
}

:global(.p-dropdown-panel) {
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
  color: var(--color-text);
}

:global(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus) {
  background-color: var(--color-primary);
  color: var(--color-background-soft);
}

:global(.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover) {
  background-color: var(--color-primary-soft);
}

.form-list {
  display: inline-flex;
  height: 100%;
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

.evolution {
  display: inline-block;
}

.evolution:not(:first-of-type)::before {
  content: '>';
  margin: 0 1ch;
}

.evolution select {
  border: none;
  background-color: inherit;
  color: currentColor;
  font: inherit;
}

.evolution option {
  color: var(--color-text);
  background: var(--color-background);
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
