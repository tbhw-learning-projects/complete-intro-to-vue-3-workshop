<script setup lang="ts">
</script>

<script lang="ts">
export default {
        data: () => ({
          favoriteCharacters: new Set(),
          characters: [
            {
              id: "00ad8330-f0a0-4957-9043-c0d47b67dd6d",
              name: "Frodo Baggins",
            },
            {
              id: "0015ddd3-4a77-4404-8d0e-63574db977f5",
              name: "Samwise Gamgee",
            },
            { 
              id: "ef2f907c-c19c-4d2c-a859-40eaf58bd892", 
              name: "Pippin Took" 
            },
            {
              id: "806924b1-0a9f-41ca-afb4-8a4acfcfb51c",
              name: "Merry Brandybuck",
            },
          ]
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
            event.preventDefault()

            if (!event.target) {
              const error = new Error("SubmitEvent has a null target");
              error.name = "EventError";
              throw error;
            }
            if (!(event.target instanceof HTMLFormElement)) {
              const error = new Error("SubmitEvent does not have a form target");
              error.name = "SubmitError";
              throw error;
            }

            const data = new FormData(event.target)
            const name = data.get("new-character")
            if (typeof name === "string") {
              this.characters.push({id: crypto.randomUUID(), name,});
            }
            
            event.target.reset()
          }
        },
      
}
</script>

<template>
    <form @submit="addCharacter" style="display: flex; gap: 1rem; align-items: baseline;">
        <label for="new-character">Name</label>
        <input type="text" name="new-character" id="new-character">
      </form>
      <p v-if="characters.length === 0">No characters are available.</p>
      <ul v-else>
        <li v-for="character in characters" :key="character.id">
          <p>{{character.name}}</p>
          <button v-if="favoriteCharacters.has(character.id)" @click="toggleCharacterLike(character.id)">
              Unlike
          </button>
          <button v-else @click="toggleCharacterLike(character.id)">
              Like
          </button>
        </li>
      </ul>
</template>

<style scoped>

</style>
