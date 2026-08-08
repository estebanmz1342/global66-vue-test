<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import EmptyState from '@/components/favorites/EmptyState.vue'
import Title from '@/components/global/Title.vue'
import List from '@/components/pokedex/List.vue'
import { useFavoritesStore } from '@/store/favorites.store'

const favoritesStore = useFavoritesStore()

// Use storeToRefs to rerender page when storage changes
const { favoritePokemons } = storeToRefs(favoritesStore)
</script>

<template>
  <div class="wrapper">
    <EmptyState v-if="favoritePokemons.length === 0" />
    <div v-else class="favorites">
      <Title variant="onboarding">Favorites</Title>
      <List :pokemons="favoritePokemons" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.favorites {
  padding: 0.75rem 0;
}
</style>
