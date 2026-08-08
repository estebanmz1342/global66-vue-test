import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import { anotherPokemon, samplePokemon } from '../../../helpers/fixtures'

const getPokemonBatchMock = vi.fn()
const getPokemonDetailsMock = vi.fn()
const getPokemonsByTypesMock = vi.fn()
const setOnboardingFinishedMock = vi.fn()
const pushMock = vi.fn()

vi.mock('@/api/composables/usePokeApi', () => ({
  usePokeApi: () => ({
    getPokemonBatch: getPokemonBatchMock,
    getPokemonDetails: getPokemonDetailsMock,
  }),
}))

vi.mock('@/api/composables/usePokemonTypeApi', () => ({
  usePokemonTypeApi: () => ({
    getPokemonsByTypes: getPokemonsByTypesMock,
  }),
}))

vi.mock('@/store/global.store', () => ({
  useGlobalStore: () => ({
    isOnboardingFinished: ref(false),
    setOnboardingFinished: setOnboardingFinishedMock,
  }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

import { usePokedex } from '@/components/pokedex/hooks/usePokedex'

describe('usePokedex', () => {
  beforeEach(() => {
    getPokemonBatchMock.mockReset()
    getPokemonDetailsMock.mockReset()
    getPokemonsByTypesMock.mockReset()
    setOnboardingFinishedMock.mockReset()
    pushMock.mockReset()
    vi.useRealTimers()
  })

  it('fetches pokemons and exposes search state', async () => {
    getPokemonBatchMock.mockResolvedValueOnce({
      pokemons: [samplePokemon, anotherPokemon],
      hasMore: true,
      nextOffset: 2,
    })

    const pokedex = usePokedex()

    expect(pokedex.canSearch.value).toBe(false)

    await pokedex.fetchPokemons()

    console.log('pokedex-count:', pokedex.pokemons.value.length)
    expect(pokedex.pokemons.value).toEqual([samplePokemon, anotherPokemon])
    expect(pokedex.hasMorePokemons.value).toBe(true)
    expect(pokedex.isLoadingMore.value).toBe(false)

    pokedex.searchValue.value = 'pik'
    expect(pokedex.canSearch.value).toBe(true)
  })

  it('filters pokemon locally before hitting the API', async () => {
    getPokemonBatchMock.mockResolvedValueOnce({
      pokemons: [samplePokemon, anotherPokemon],
      hasMore: true,
      nextOffset: 2,
    })

    const pokedex = usePokedex()
    await pokedex.fetchPokemons()

    const match = await pokedex.getPokemonByName('pik')

    expect(match).toEqual(samplePokemon)
    expect(pokedex.pokemons.value).toEqual([samplePokemon])
    expect(getPokemonDetailsMock).not.toHaveBeenCalled()
  })

  it('fetches a remote pokemon when there is no local match', async () => {
    getPokemonBatchMock.mockResolvedValueOnce({
      pokemons: [anotherPokemon],
      hasMore: false,
      nextOffset: null,
    })
    getPokemonDetailsMock.mockResolvedValueOnce(samplePokemon)

    const pokedex = usePokedex()
    await pokedex.fetchPokemons()

    const match = await pokedex.getPokemonByName('pikachu')

    expect(getPokemonDetailsMock).toHaveBeenCalledWith('pikachu')
    expect(match).toEqual(samplePokemon)
    expect(pokedex.pokemons.value).toEqual([samplePokemon])
  })

  it('applies normalized type filters', async () => {
    getPokemonBatchMock.mockResolvedValueOnce({
      pokemons: [samplePokemon, anotherPokemon],
      hasMore: true,
      nextOffset: 2,
    })
    getPokemonsByTypesMock.mockResolvedValueOnce([anotherPokemon])

    const pokedex = usePokedex()
    await pokedex.fetchPokemons()
    await pokedex.applyTypeFilter([' Fire ', 'fire', 'water'])

    expect(getPokemonsByTypesMock).toHaveBeenCalledWith(['fire', 'water'])
    expect(pokedex.selectedTypes.value).toEqual(['fire', 'water'])
    expect(pokedex.pokemons.value).toEqual([anotherPokemon])
  })

  it('debounces search input changes', async () => {
    vi.useFakeTimers()
    getPokemonDetailsMock.mockResolvedValueOnce(samplePokemon)

    const pokedex = usePokedex()
    pokedex.searchValue.value = 'pikachu'

    await vi.advanceTimersByTimeAsync(1000)

    expect(getPokemonDetailsMock).toHaveBeenCalledWith('pikachu')
  })

  it('finishes onboarding through the global store', () => {
    const pokedex = usePokedex()

    pokedex.finishOnboarding()

    expect(setOnboardingFinishedMock).toHaveBeenCalledWith(true)
  })
})
