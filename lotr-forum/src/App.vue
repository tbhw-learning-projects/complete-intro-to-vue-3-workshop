<script setup lang="ts">
import CharacterStats from './components/CharacterStats.vue';
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
    addCharacter(event: Event) {
      event.preventDefault();

      if (!event.target) {
        const error = new Error('SubmitEvent has a null target');
        error.name = 'EventError';
        throw error;
      }
      if (!(event.target instanceof HTMLFormElement)) {
        const error = new Error('SubmitEvent does not have a form target');
        error.name = 'SubmitError';
        throw error;
      }

      const data = new FormData(event.target);
      const name = data.get('new-character-name');
      const species = data.get('new-character-species');
      if (typeof name === 'string' && isSpecies(species)) {
        this.characters.push({ id: crypto.randomUUID(), name, species });
      }

      event.target.reset();
    }
  }
};
</script>

<template>
  <main>
    <section>
      <form @submit="addCharacter">
        <label for="new-character"
          >Name

          <input type="text" name="new-character-name" id="new-character-name" />
        </label>
        <label for="new-character"
          >Species

          <select name="new-character-species" id="new-character-species">
            <option v-for="species in speciesList" :key="species">{{ species }}</option>
          </select>
        </label>

        <input type="submit" value="Save" />
      </form>
      <p v-if="characters.length === 0">No characters are available.</p>
      <ul v-else>
        <li v-for="character in characters" :key="character.id">
          <div>
            <p>{{ character.name }}</p>
            <button
              v-if="favoriteCharacters.has(character.id)"
              @click="toggleCharacterLike(character.id)"
            >
              Unlike
            </button>
            <button v-else @click="toggleCharacterLike(character.id)">Like</button>
          </div>
        </li>
      </ul>
    </section>
    <section class="statistics">
      <CharacterStats :characters="characters" />
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 3rem;
}

form {
  margin: 1rem 0;

  outline: 1px solid mediumaquamarine;
  outline-offset: 0.5rem;
}

form label {
  display: flex;
  gap: 1rem;
  align-items: baseline;

  margin: 0.5rem 0;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li div {
  display: flex;
  gap: 1rem;

  padding: 0.5rem 0;
}
</style>
