<script lang="ts">
export default {
  emits: ['import-pokemon'],
  methods: {
    importPokemon(event: Event) {
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
      const name = data.get('new-pokemon-name');
      if (typeof name === 'string') {
        this.$emit('import-pokemon', { name });
        event.target.reset();
      }
    }
  },
};
</script>

<template>
  <form @submit="importPokemon">
    <label for="new-pokemon-name">
      Name
      <input type="text" name="new-pokemon-name" id="new-pokemon-name" />
    </label>

    <input type="submit" value="Import" />
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
