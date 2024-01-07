<script lang="ts">
import { isSpecies, speciesList } from '@/App.vue';

export default {
  emits: ['submit-character'],
  methods: {
    submitCharacter(event: Event) {
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
        this.$emit('submit-character', { id: crypto.randomUUID(), name, species });
        event.target.reset();
      }
    }
  },
  computed: {
    speciesList: () => speciesList
  }
};
</script>

<template>
  <form @submit="submitCharacter">
    <label for="new-character">
      Name
      <input type="text" name="new-character-name" id="new-character-name" />
    </label>
    <label for="new-character">
      Species
      <select name="new-character-species" id="new-character-species">
        <option v-for="species in speciesList" :key="species">{{ species }}</option>
      </select>
    </label>

    <input type="submit" value="Save" />
  </form>
</template>

<style scoped>
form {
  margin: 0 0 1rem 0;

  outline: 1px solid mediumaquamarine;
  outline-offset: 0.5rem;
}

form label {
  display: flex;
  gap: 1rem;
  align-items: baseline;

  margin: 0.5rem 0;
}
</style>
