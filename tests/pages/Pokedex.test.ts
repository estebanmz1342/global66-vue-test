import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const mockUsePokedex = vi.fn()
const fetchPokemonsMock = vi.fn()
const clearSearchTimerMock = vi.fn()
const handleSearchMock = vi.fn()
const finishOnboardingMock = vi.fn()
const applyTypeFilterMock = vi.fn()
const loadMorePokemonsMock = vi.fn()

vi.mock('@/components/pokedex/hooks/usePokedex', () => ({
  usePokedex: () => mockUsePokedex(),
}))

import PokedexPage from '@/pages/Pokedex.vue'

describe('Pokedex page', () => {
  beforeEach(() => {
    fetchPokemonsMock.mockReset()
    clearSearchTimerMock.mockReset()
    handleSearchMock.mockReset()
    finishOnboardingMock.mockReset()
    applyTypeFilterMock.mockReset()
    loadMorePokemonsMock.mockReset()
    mockUsePokedex.mockReset()
  })

  it('shows the onboarding slider until the user finishes it', async () => {
    mockUsePokedex.mockReturnValue({
      applyTypeFilter: applyTypeFilterMock,
      finishOnboarding: finishOnboardingMock,
      handleSearch: handleSearchMock,
      isOnboardingFinished: ref(false),
      hasMorePokemons: ref(true),
      isLoadingMore: ref(false),
      loadMorePokemons: loadMorePokemonsMock,
      pokemons: ref([]),
      selectedTypes: ref([]),
      searchValue: ref(''),
      fetchPokemons: fetchPokemonsMock,
      clearSearchTimer: clearSearchTimerMock,
    })

    const wrapper = mount(PokedexPage, {
      global: {
        stubs: {
          Slider: {
            template: '<div class="slider-stub">slider</div>',
          },
          SearchAndFilter: true,
          List: true,
        },
      },
    })

    expect(fetchPokemonsMock).toHaveBeenCalled()
    expect(wrapper.find('.slider-stub').exists()).toBe(true)
  })

  it('shows the pokedex search and list when onboarding is finished', () => {
    mockUsePokedex.mockReturnValue({
      applyTypeFilter: applyTypeFilterMock,
      finishOnboarding: finishOnboardingMock,
      handleSearch: handleSearchMock,
      isOnboardingFinished: ref(true),
      hasMorePokemons: ref(true),
      isLoadingMore: ref(false),
      loadMorePokemons: loadMorePokemonsMock,
      pokemons: ref([]),
      selectedTypes: ref([]),
      searchValue: ref(''),
      fetchPokemons: fetchPokemonsMock,
      clearSearchTimer: clearSearchTimerMock,
    })

    const wrapper = mount(PokedexPage, {
      global: {
        stubs: {
          Slider: true,
          SearchAndFilter: {
            template: '<div class="search-stub" />',
          },
          List: {
            template: '<div class="list-stub" />',
          },
        },
      },
    })

    expect(wrapper.find('.search-stub').exists()).toBe(true)
    expect(wrapper.find('.list-stub').exists()).toBe(true)
  })
})
