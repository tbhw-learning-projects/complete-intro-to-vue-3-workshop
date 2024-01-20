import axios from 'axios';
import { defineStore } from 'pinia';
import { PokemonClient } from 'pokenode-ts';
import type {
  ChainLink,
  EvolutionChain,
  NamedAPIResourceList,
  Pokemon as RawPokemon
} from 'pokenode-ts';

export type Pokemon = RawPokemon;

interface PokemonData {
  id: number;
  name: string;
  url: string;
  pokemon: Pokemon;
  evolutionChain?: Evolution[];
}

type Evolution = { name: string; id: string } | { name: string; id: string }[];

type LimitOffset<T = {}> = T & {
  limit?: number;
  offset?: number;
};

const client = new PokemonClient();

export const usePokemonStore = defineStore('pokemon_store', {
  state: () => ({
    pokemon: new Map<string, PokemonData>(),
    types: {} as NamedAPIResourceList
  }),
  getters: {
    pokemonList: ({ pokemon }) =>
      [...pokemon.values()]
        .sort(({ id: id1 }, { id: id2 }) => id1 - id2)
        .map(({ pokemon }) => pokemon)
  },
  actions: {
    async getInitialPokemonList({ limit = 151, offset }: LimitOffset = {}) {
      const pokemonList = await client.listPokemons(offset, limit);
      const pokemonDataPromises = pokemonList.results.map(({ name }) => this.getPokemon(name));
      return Promise.all(pokemonDataPromises.slice(0, 10));
    },
    async getPokemon(name: string) {
      if (!this.pokemon.has(name)) {
        const data = await client.getPokemonByName(name);
        const existingData = this.pokemon.get(name);
        this.pokemon.set(name, {
          ...existingData,
          pokemon: data,
          id: data.id,
          name,
          url: `/pokemon/${name}`
        });
      }
    },
    async getPokemonEvolutionData(name: string) {
      const existingPokemon = this.pokemon.get(name);
      if (existingPokemon && existingPokemon.evolutionChain) {
        return;
      }
      if (!existingPokemon) {
        await this.getPokemon(name);
      }
      const species = await client.getPokemonSpeciesByName(name);
      const speciesData = await axios.get<EvolutionChain>(species.evolution_chain.url);
      const chains = processLinks(speciesData.data.chain);

      chains.forEach((link) => {
        if (Array.isArray(link)) {
          return link.forEach((option) => {
            const target = this.pokemon.get(option.name);
            if (target) {
              this.pokemon.set(option.name, { ...target, evolutionChain: chains });
            }
          });
        }
        const target = this.pokemon.get(link.name);
        if (target) {
          this.pokemon.set(link.name, { ...target, evolutionChain: chains });
        }
      });

      if (existingPokemon) {
        this.pokemon.set(name, { ...existingPokemon, evolutionChain: chains });
      }

      function processLinks(chain: ChainLink) {
        const forms: Evolution[] = [];
        const chainLinks: (ChainLink | ChainLink[])[] = [chain];

        do {
          const current = chainLinks.shift();
          if (!current) {
            continue;
          } else if ((Array.isArray(current) && current.length === 1) || !Array.isArray(current)) {
            const currentLink = Array.isArray(current) ? current[0] : current;
            if (!currentLink.species) continue;
            const { name, url } = currentLink.species;
            forms.push({ name, id: url.split('/').at(-2) || '' });
            if (currentLink.evolves_to) {
              chainLinks.push(currentLink.evolves_to);
            }
          } else {
            if (current.length === 0) continue;

            const processed = current.flatMap((link) => processLinks(link));
            forms.push(processed as Evolution);
          }
        } while (chainLinks.length);
        return forms;
      }
    },
    async getPokemonTypeList({ limit = 100, offset }: LimitOffset = {}) {
      const types = await client.listTypes(offset, limit);
      const existingData = this.types;
      const results = [...(existingData.results || []), ...types.results];
      const count = (existingData.count || 0) + types.count;
      const previous = null;
      const next = types.next;

      this.types = { results, count, next, previous };
    }
  }
});
