import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  anotherPokemon,
  pokemonTypeApiResponse,
  samplePokemon,
} from '../../helpers/fixtures'

const getMock = vi.fn()
const getPokemonDetailsMock = vi.fn()

vi.mock('@/api/composables/useServiceApi', () => ({
  useServiceApi: () => ({
    get: getMock,
  }),
}))

vi.mock('@/api/composables/usePokeApi', () => ({
  usePokeApi: () => ({
    getPokemonDetails: getPokemonDetailsMock,
  }),
}))

import { usePokemonTypeApi } from '@/api/composables/usePokemonTypeApi'

describe('usePokemonTypeApi', () => {
  beforeEach(() => {
    getMock.mockReset()
    getPokemonDetailsMock.mockReset()
  })

  it('returns an empty array for blank types', async () => {
    const typeApi = usePokemonTypeApi()

    await expect(typeApi.getPokemonsByType('   ')).resolves.toEqual([])
  })

  it('loads all pokemons for a given type', async () => {
    getMock.mockResolvedValueOnce({
      ...pokemonTypeApiResponse,
      name: 'electric',
    })
    getPokemonDetailsMock.mockImplementation(async (name: string) =>
      name === 'pikachu' ? samplePokemon : anotherPokemon,
    )

    const typeApi = usePokemonTypeApi()
    const pokemons = await typeApi.getPokemonsByType(' Electric ')

    expect(getMock).toHaveBeenCalledWith('/type/electric')
    expect(getPokemonDetailsMock).toHaveBeenCalledTimes(2)
    expect(pokemons).toEqual([samplePokemon, anotherPokemon])
  })

  it('normalizes, deduplicates and sorts multiple types', async () => {
    getMock.mockImplementation(async (url: string) => {
      if (url === '/type/electric') {
        return {
          ...pokemonTypeApiResponse,
          pokemon: [
            { slot: 1, pokemon: { name: 'pikachu', url: '' } },
            { slot: 1, pokemon: { name: 'bulbasaur', url: '' } },
          ],
        }
      }

      return {
        ...pokemonTypeApiResponse,
        name: 'water',
        pokemon: [
          { slot: 1, pokemon: { name: 'bulbasaur', url: '' } },
          { slot: 1, pokemon: { name: 'pikachu', url: '' } },
        ],
      }
    })
    getPokemonDetailsMock.mockImplementation(async (name: string) =>
      name === 'pikachu' ? samplePokemon : anotherPokemon,
    )

    const typeApi = usePokemonTypeApi()
    const pokemons = await typeApi.getPokemonsByTypes([
      'electric',
      ' Electric ',
      '',
      'water',
    ])

    expect(getMock).toHaveBeenCalledTimes(2)
    expect(pokemons).toEqual([anotherPokemon, samplePokemon])
  })
})
