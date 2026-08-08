<script lang="ts" setup>
import List from '@/components/pokedex/List.vue'
import SearchAndFilter from '@/components/pokedex/SearchAndFilter.vue'
import Slider from '../components/onboarding/Slider.vue'
import { usePokedex } from '@/components/pokedex/hooks/usePokedex'
import { onBeforeUnmount, onMounted } from 'vue'

const {
  finishOnboarding,
  handleSearch,
  isOnboardingFinished,
  hasMorePokemons,
  isLoadingMore,
  loadMorePokemons,
  pokemons,
  searchValue,
  fetchPokemons,
  clearSearchTimer,
} = usePokedex()

onMounted(() => {
  void fetchPokemons()
})

onBeforeUnmount(() => {
  clearSearchTimer()
})
</script>

<template>
  <div v-if="!isOnboardingFinished" class="pokemon">
    <Slider @finish="finishOnboarding" />
  </div>
  <div v-else class="pokedex">
    <SearchAndFilter v-model="searchValue" @search="handleSearch" />
    <List
      :pokemons="pokemons"
      :show-load-more="true"
      :has-more="hasMorePokemons"
      :is-loading-more="isLoadingMore"
      @load-more="loadMorePokemons"
    />
  </div>
</template>

<style scoped>
.pokedex {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.75rem 0;
}
</style>
