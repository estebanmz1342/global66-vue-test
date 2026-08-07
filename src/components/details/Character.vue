<script lang="ts" setup>
import { useFavoritesStore } from '@/store/favorites.store'
import { computed } from 'vue'
import { getTypeInfo } from '../global/hook/TYPES'
import type { Pokemon } from '@/types/types'

const props = defineProps<{
  pokemon: Pokemon
}>()

const favoritesStore = useFavoritesStore()
const typeComputed = computed(() =>
  getTypeInfo(props.pokemon.types[0].toLowerCase()),
)
const isFavorite = computed(() => favoritesStore.isFavorite(props.pokemon.id))

const borderStyle = computed(() => ({
  borderBottomColor: typeComputed.value.backgroundColor,
}))

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.pokemon)
}
</script>

<template>
  <div class="character">
    <button
      class="favorite-button material-symbols-rounded"
      :class="{ 'is-favorite': isFavorite }"
      type="button"
      :aria-pressed="isFavorite"
      :aria-label="isFavorite ? 'Remove favorite' : 'Add favorite'"
      @click="toggleFavorite"
    >
      {{ isFavorite ? 'favorite' : 'favorite_border' }}
    </button>
    <section class="character-header">
      <img
        class="character-header__bg"
        :src="typeComputed.image"
        :alt="`${typeComputed.name} logo`"
      />
      <img
        class="character-header__image"
        :src="pokemon.image"
        :alt="`${pokemon.name} image`"
      />
    </section>
    <div class="divider" :style="borderStyle" />
  </div>
</template>

<style scoped>
.character {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.favorite-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.92);
  border: 0;
  cursor: pointer;
  font-size: 1.5rem;
  color: #a1a1a1;
  z-index: 3;
  border-radius: 50%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.character-header {
  display: flex;
  width: 100%;
}

.character-header__bg {
  width: min(40%, 450px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  position: absolute;
  inset: 0;
  margin: 0 auto;
  top: -70px;
  z-index: 2;
  object-fit: cover;
}

.character-header__image {
  width: min(30%, 280px);
  aspect-ratio: 1 / 1;
  padding-top: 135px;
  margin: 0 auto;
  position: relative;
  top: -50px;
  z-index: 3;
}

.favorite-button.is-favorite {
  color: #ef4444;
}

.material-symbols-rounded {
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.divider {
  width: 45%;
  height: 1px;
  border-bottom: 2.5px solid;
}
</style>
