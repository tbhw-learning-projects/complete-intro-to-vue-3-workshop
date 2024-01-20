import { defineStore } from 'pinia';

export const useFavoritePokemonStore = defineStore('favorite_pokemon_store', {
  state: () => ({ favoritePokemon: new Set() }),
  getters: {},
  actions: {
    toggleFavoritePokemon(id: number) {
      if (this.favoritePokemon.has(id)) {
        this.favoritePokemon.delete(id);
      } else {
        this.favoritePokemon.add(id);
      }
    }
  }
});
