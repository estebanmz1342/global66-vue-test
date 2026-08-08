import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { useFavoritesStore } from '@/store/favorites.store'

import { anotherPokemon, samplePokemon } from '../helpers/fixtures'

describe('favorites store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts empty and persists favorites', async () => {
    const store = useFavoritesStore()

    expect(store.favoriteCount).toBe(0)
    expect(store.favoritePokemons).toEqual([])

    store.addFavorite(samplePokemon)
    await nextTick()

    expect(store.favoriteCount).toBe(1)
    expect(store.isFavorite(samplePokemon.id)).toBe(true)
    expect(JSON.parse(localStorage.getItem('global66-vue-test:favorites-store') ?? '[]')).toHaveLength(1)
  })

  it('prevents duplicate favorites and can toggle/remove them', async () => {
    const store = useFavoritesStore()

    store.addFavorite(samplePokemon)
    store.addFavorite(samplePokemon)
    await nextTick()

    expect(store.favoriteCount).toBe(1)

    store.toggleFavorite(samplePokemon)
    await nextTick()

    expect(store.favoriteCount).toBe(0)
    expect(store.isFavorite(samplePokemon.id)).toBe(false)

    store.toggleFavorite(anotherPokemon)
    await nextTick()

    expect(store.favoriteCount).toBe(1)
    expect(store.isFavorite(anotherPokemon.id)).toBe(true)
  })

  it('loads persisted favorites and normalizes invalid abilities', () => {
    localStorage.setItem(
      'global66-vue-test:favorites-store',
      JSON.stringify([
        {
          ...samplePokemon,
          ability: 123,
        },
      ]),
    )

    const store = useFavoritesStore()

    expect(store.favoritePokemons).toEqual([
      {
        ...samplePokemon,
        ability: '-',
      },
    ])
  })

  it('clears all favorites', async () => {
    const store = useFavoritesStore()

    store.addFavorite(samplePokemon)
    store.addFavorite(anotherPokemon)
    await nextTick()

    store.clearFavorites()
    await nextTick()

    expect(store.favoriteCount).toBe(0)
    expect(store.favoritePokemons).toEqual([])
  })
})
