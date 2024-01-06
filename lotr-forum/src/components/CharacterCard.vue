<template>
  <div>
    <p>{{ character.name }}</p>
    <button v-if="isFavorite" @click="toggleCharacterLike(character.id)">
      ❤️
    </button>
    <button v-else @click="toggleCharacterLike(character.id)">🤍</button>
  </div>
</template>

<script lang="ts">
import { isSpecies, type Character } from '@/App.vue';
import type { PropType } from 'vue';

export default {
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true,
      validator: (prop: unknown): prop is Character =>
        !!((prop as Character).id && (prop as Character).name && isSpecies((prop as Character).species))
    },
    isFavorite: {
        type: Boolean,
        required: true,
    }
  },
  "emits": ["toggle-favorite"],
  "methods": {
    toggleCharacterLike(id: string) {
        this.$emit("toggle-favorite", id);
    }
  }
};
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        margin: 0.5rem 0;
    }

    button {
        border: none;
        cursor: pointer;
        background-color: #00000050;
        border-radius: 100%;
        box-shadow: 1px 2px 5px -1px var(--color-border-hover);
        font-size: .75rem;
        width: 2.75em;
        height: 2.75em;
        text-align: center;
        padding-top: 0.25em;
        
        transition: box-shadow 300ms ease-in-out;
        will-change: box-shadow;
    }
    
    button:hover, button:focus-visible {
        outline: none;
        box-shadow: 2px 3px 10px -2px var(--color-border-hover);
        transition: box-shadow 100ms ease-in-out;
    }
</style>
