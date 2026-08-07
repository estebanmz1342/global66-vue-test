<script lang="ts" setup>
import { ref } from 'vue'
import Title from '@/components/global/Title.vue'
import { useFavoritesStore } from '@/store/favorites.store'
import List from '@/components/pokedex/List.vue'
import EmptyState from '@/components/favorites/EmptyState.vue'
const favorites = ref([])
const { favoritePokemons } = useFavoritesStore()
</script>

<template>
  <div class="wrapper">
    <EmptyState v-if="favoritePokemons.length === 0" />
    <div v-else>
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
</style>
