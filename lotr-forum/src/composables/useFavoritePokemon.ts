import { ref } from "vue";

const favoritePokemon = ref(new Set());
function toggleFavoritePokemon(id: number) {
    if (favoritePokemon.value.has(id)) {
        favoritePokemon.value.delete(id)
    } else {
        favoritePokemon.value.add(id);
    }
}

export function useFavoritePokemon() {
    return {
        favoritePokemon, toggleFavoritePokemon
    }
}
