<script lang="ts" setup>
import { computed } from 'vue'
import type { Pokemon } from '../../types/types'
import { getTypeInfo } from '../global/hook/TYPES'
import PillType from '../global/PillType.vue'
import { useFavoritesStore } from '@/store/favorites.store'

const props = defineProps<{
  pokemon: Pokemon
}>()

const favoritesStore = useFavoritesStore()
const typeComputed = computed(() =>
  getTypeInfo(props.pokemon.types[0].toLowerCase()),
)
const isFavorite = computed(() => favoritesStore.isFavorite(props.pokemon.id))
const boxStyle = computed(() => ({
  backgroundColor: `${typeComputed.value.backgroundColor}66`,
}))
const headerStyle = computed(() => ({
  backgroundColor: typeComputed.value.backgroundColor,
}))

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.pokemon)
}
</script>

<template>
  <div class="card" :style="boxStyle">
    <button
      class="card-favorite-button material-symbols-rounded"
      :class="{ 'is-favorite': isFavorite }"
      type="button"
      :aria-pressed="isFavorite"
      :aria-label="isFavorite ? 'Remove favorite' : 'Add favorite'"
      @click="toggleFavorite"
    >
      {{ isFavorite ? 'favorite' : 'favorite_border' }}
    </button>
    <section class="card-header" :style="headerStyle">
      <img
        class="card-header__bg"
        :src="typeComputed.image"
        :alt="`${typeComputed.name} logo`"
      />
      <img
        class="card-header__image"
        :src="pokemon.image"
        :alt="`${pokemon.name} image`"
      />
    </section>
    <section class="card-body" :style="boxStyle">
      <p class="card-body__number">{{ pokemon.number }}</p>
      <h3 class="card-body__name">{{ pokemon.name }}</h3>
      <div class="card-body__types">
        <PillType
          v-for="(type, index) in pokemon.types"
          :key="index"
          :type="type"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 280px;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
  position: relative;
}

.card-header__bg {
  width: min(75%, 210px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  position: absolute;
  inset: 0;
  margin: auto;
  z-index: 2;
  object-fit: cover;
  opacity: 0.5;
}

.card-header__image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  position: relative;
  z-index: 3;
}

.card-header :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 0.875rem;
  padding: 1rem 0.75rem;
  width: 100%;
}
.card-body__name {
  font-family: Poppins;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 21px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #121212;
  margin: 0;
}

.card-body__number {
  font-family: Poppins;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #424242;
}

.card-body__types {
  display: flex;
  gap: 0.25rem;
}

.card-favorite-button {
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

.card-favorite-button.is-favorite {
  color: #ef4444;
}

.material-symbols-rounded {
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.card:hover {
  cursor: pointer;
}

.card:hover:after {
  content: '';
  top: 0;
  transform: translateX(100%);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  animation: slide 1s infinite;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  );
}

.card:hover .card-header__image {
  cursor: pointer;
  transform: scale(1.15);
  transition: transform 0.3s ease-in-out;
}
</style>
