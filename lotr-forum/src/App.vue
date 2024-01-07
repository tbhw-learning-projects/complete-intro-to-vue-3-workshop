<script setup lang="ts">
import CharacterCard from './components/CharacterCard.vue';
import CharacterStats from './components/CharacterStats.vue';
import NewCharacterForm from './components/NewCharacterForm.vue';
import BaseLayout from './components/layouts/BaseLayout.vue';
</script>

<script lang="ts">
export const speciesList = ['Dwarf', 'Elf', 'Hobbit', 'Human'] as const;
type Species = (typeof speciesList)[number];
export function isSpecies(value: unknown): value is Species {
  return speciesList.includes(value as unknown as Species);
}

export interface Character {
  id: string;
  name: string;
  species: Species;
}

export default {
  components: { CharacterStats },
  data: () => ({
    favoriteCharacters: new Set(),
    characters: [
      {
        id: '00ad8330-f0a0-4957-9043-c0d47b67dd6d',
        name: 'Frodo Baggins',
        species: 'Hobbit'
      },
      {
        id: '0015ddd3-4a77-4404-8d0e-63574db977f5',
        name: 'Samwise Gamgee',
        species: 'Hobbit'
      },
      {
        id: 'ef2f907c-c19c-4d2c-a859-40eaf58bd892',
        name: 'Pippin Took',
        species: 'Hobbit'
      },
      {
        id: '806924b1-0a9f-41ca-afb4-8a4acfcfb51c',
        name: 'Merry Brandybuck',
        species: 'Hobbit'
      },
      {
        id: '959741c2-1e12-4ba4-8534-375d13ce3042',
        name: 'Gimli Son of Gloin',
        species: 'Dwarf'
      }
    ] as Character[]
  }),
  methods: {
    toggleCharacterLike(id: string) {
      if (this.favoriteCharacters.has(id)) {
        this.favoriteCharacters.delete(id);
      } else {
        this.favoriteCharacters.add(id);
      }
    },
    addCharacter(character: Character) {
      this.characters.push(character);
    }
  }
};
</script>

<template>
  <BaseLayout>
    <template v-slot:main>
        <NewCharacterForm @submit-character="addCharacter" />
        <p v-if="characters.length === 0">No characters are available.</p>
        <ul v-else>
          <li v-for="character in characters" :key="character.id">
            <CharacterCard
            :character="character"
            :isFavorite="favoriteCharacters.has(character.id)"
            @toggle-favorite="toggleCharacterLike"
            />
          </li>
        </ul>
    </template>
    
    <template v-slot:aside>
        <CharacterStats :characters="characters" />
    </template>
  </BaseLayout>
</template>

<style scoped>

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
