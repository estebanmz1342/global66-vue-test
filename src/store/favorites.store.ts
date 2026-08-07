import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import type { Pokemon } from '@/types/types'

const STORAGE_KEY = 'global66-vue-test:favorites-store'

const readPersistedFavorites = (): Pokemon[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)

    if (!rawState) {
      return []
    }

    const parsedState = JSON.parse(rawState) as unknown

    if (!Array.isArray(parsedState)) {
      return []
    }

    return parsedState.filter((pokemon): pokemon is Pokemon => {
      return (
        typeof pokemon === 'object' &&
        pokemon !== null &&
        'id' in pokemon &&
        'name' in pokemon &&
        'image' in pokemon &&
        'number' in pokemon &&
        'types' in pokemon
      )
    })
  } catch {
    return []
  }
}

const persistFavorites = (favorites: Pokemon[]) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favoritePokemons = ref<Pokemon[]>(readPersistedFavorites())
  const favoriteCount = computed(() => favoritePokemons.value.length)

  const isFavorite = (pokemonId: number) =>
    favoritePokemons.value.some((pokemon) => pokemon.id === pokemonId)

  const addFavorite = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      return
    }

    favoritePokemons.value = [...favoritePokemons.value, pokemon]
  }

  const removeFavorite = (pokemonId: number) => {
    favoritePokemons.value = favoritePokemons.value.filter(
      (pokemon) => pokemon.id !== pokemonId,
    )
  }

  const toggleFavorite = (pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id)
      return
    }

    addFavorite(pokemon)
  }

  const clearFavorites = () => {
    favoritePokemons.value = []
  }

  watch(
    favoritePokemons,
    (favorites) => {
      persistFavorites(favorites)
    },
    {
      deep: true,
      immediate: true,
    },
  )

  return {
    favoriteCount,
    favoritePokemons,
    addFavorite,
    clearFavorites,
    isFavorite,
    removeFavorite,
    toggleFavorite,
  }
})
