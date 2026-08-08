import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  pokemonDetailApiResponse,
  pokemonListApiResponse,
} from '../../helpers/fixtures'

const getMock = vi.fn()

vi.mock('@/api/composables/useServiceApi', () => ({
  useServiceApi: () => ({
    get: getMock,
  }),
}))

import { usePokeApi } from '@/api/composables/usePokeApi'

describe('usePokeApi', () => {
  beforeEach(() => {
    getMock.mockReset()
  })

  it('loads and maps a raw pokemon list', async () => {
    getMock.mockResolvedValueOnce(pokemonListApiResponse)

    const pokeApi = usePokeApi()
    const response = await pokeApi.getRawPokemonList(10, 20)

    expect(getMock).toHaveBeenCalledWith('pokemon?limit=10&offset=20')
    expect(response).toEqual(pokemonListApiResponse)
  })

  it('rejects empty pokemon names', async () => {
    const pokeApi = usePokeApi()

    await expect(pokeApi.getPokemonDetails('')).rejects.toThrow(
      'Pokemon name is required',
    )
  })

  it('maps pokemon details from the API', async () => {
    getMock.mockResolvedValueOnce(pokemonDetailApiResponse)

    const pokeApi = usePokeApi()
    const response = await pokeApi.getPokemonDetails('pikachu')

    expect(getMock).toHaveBeenCalledWith('/pokemon/pikachu')
    expect(response).toEqual({
      id: 25,
      number: 'N°025',
      name: 'Pikachu',
      image: 'https://example.com/artwork.png',
      types: ['electric'],
      ability: 'Static',
      height: 0.4,
      weight: 6,
    })
  })

  it('builds a batch with pagination metadata', async () => {
    getMock
      .mockResolvedValueOnce(pokemonListApiResponse)
      .mockResolvedValueOnce(pokemonDetailApiResponse)
      .mockResolvedValueOnce({
        ...pokemonDetailApiResponse,
        id: 26,
        name: 'raichu',
        abilities: [
          {
            is_hidden: false,
            slot: 1,
            ability: {
              name: 'static',
              url: 'https://pokeapi.co/api/v2/ability/9/',
            },
          },
        ],
      })

    const pokeApi = usePokeApi()
    const batch = await pokeApi.getPokemonBatch(2, 0)

    expect(batch).toEqual({
      pokemons: [
        {
          id: 25,
          number: 'N°025',
          name: 'Pikachu',
          image: 'https://example.com/artwork.png',
          types: ['electric'],
          ability: 'Static',
          height: 0.4,
          weight: 6,
        },
        {
          id: 26,
          number: 'N°026',
          name: 'Raichu',
          image: 'https://example.com/artwork.png',
          types: ['electric'],
          ability: 'Static',
          height: 0.4,
          weight: 6,
        },
      ],
      hasMore: false,
      nextOffset: null,
    })
  })

  it('returns only the pokemon array in getPokemons', async () => {
    getMock
      .mockResolvedValueOnce(pokemonListApiResponse)
      .mockResolvedValueOnce(pokemonDetailApiResponse)
      .mockResolvedValueOnce(pokemonDetailApiResponse)

    const pokeApi = usePokeApi()
    const pokemons = await pokeApi.getPokemons(2, 0)

    expect(pokemons).toHaveLength(2)
  })
})
