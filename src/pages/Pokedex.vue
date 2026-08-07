<script lang="ts" setup>
import List from '@/components/pokedex/List.vue'
import SearchAndFilter from '@/components/pokedex/SearchAndFilter.vue'
import Slider from '../components/onboarding/Slider.vue'
import { usePokedex } from '@/components/pokedex/hooks/usePokedex'

const {
  finishOnboarding,
  handleSearch,
  isOnboardingFinished,
  pokemons,
  searchValue,
} = usePokedex()
</script>

<template>
  <div class="pokedex">
    <SearchAndFilter v-model="searchValue" @search="handleSearch" />
    <List :pokemons="pokemons" />
    <Slider v-if="!isOnboardingFinished" @finish="finishOnboarding" />
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
