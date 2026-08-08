import { describe, expect, it } from 'vitest'

import {
  mapPokemonDetailToPokemon,
  mapPokemonListResponse,
  validatePokemonDetailApiResponse,
  validatePokemonListApiResponse,
} from '@/mappers/pokemon.mapper'

import {
  pokemonDetailApiResponse,
  pokemonListApiResponse,
} from '../helpers/fixtures'

describe('pokemon.mapper', () => {
  it('validates and returns a pokemon list response', () => {
    expect(validatePokemonListApiResponse(pokemonListApiResponse)).toBe(true)
    expect(mapPokemonListResponse(pokemonListApiResponse)).toEqual(
      pokemonListApiResponse,
    )
  })

  it('rejects an invalid pokemon list response', () => {
    expect(validatePokemonListApiResponse({ count: '2' })).toBe(false)
    expect(() => mapPokemonListResponse({ count: 2 })).toThrow(
      'Invalid API response',
    )
  })

  it('validates and maps a pokemon detail response', () => {
    expect(validatePokemonDetailApiResponse(pokemonDetailApiResponse)).toBe(
      true,
    )

    expect(mapPokemonDetailToPokemon(pokemonDetailApiResponse)).toEqual({
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

  it('falls back to the first ability and the default image', () => {
    const mapped = mapPokemonDetailToPokemon({
      ...pokemonDetailApiResponse,
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
      sprites: {
        front_default: 'https://example.com/front.png',
        other: {
          'official-artwork': {
            front_default: null,
          },
        },
      },
    })

    expect(mapped.image).toBe('https://example.com/front.png')
    expect(mapped.ability).toBe('Static')
  })

  it('rejects invalid detail responses', () => {
    expect(validatePokemonDetailApiResponse({ id: 1 })).toBe(false)
    expect(() => mapPokemonDetailToPokemon({ id: 1 })).toThrow(
      'Invalid detail API response',
    )
  })
})
