import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import FavoritesPage from '@/pages/Favorites.vue'
import { useFavoritesStore } from '@/store/favorites.store'

import { samplePokemon } from '../helpers/fixtures'

describe('Favorites page', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('renders the empty state when there are no favorites', () => {
    const wrapper = mount(FavoritesPage, {
      global: {
        stubs: {
          EmptyState: {
            template: '<div class="empty-state-stub" />',
          },
          Title: true,
          List: true,
        },
      },
    })

    expect(wrapper.find('.empty-state-stub').exists()).toBe(true)
  })

  it('renders the favorites list when there are items', async () => {
    const store = useFavoritesStore()
    store.addFavorite(samplePokemon)

    const wrapper = mount(FavoritesPage, {
      global: {
        stubs: {
          EmptyState: true,
          Title: {
            template: '<h1 class="title-stub">Favorites</h1>',
          },
          List: {
            template: '<div class="list-stub" />',
          },
        },
      },
    })

    expect(wrapper.find('.title-stub').exists()).toBe(true)
    expect(wrapper.find('.list-stub').exists()).toBe(true)
  })
})
