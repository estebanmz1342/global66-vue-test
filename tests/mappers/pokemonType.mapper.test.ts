import { describe, expect, it } from 'vitest'

import {
  mapPokemonTypeResponse,
  validatePokemonTypeApiResponse,
} from '@/mappers/pokemonType.mapper'

import { pokemonTypeApiResponse } from '../helpers/fixtures'

describe('pokemonType.mapper', () => {
  it('validates and returns a pokemon type response', () => {
    expect(validatePokemonTypeApiResponse(pokemonTypeApiResponse)).toBe(true)
    expect(mapPokemonTypeResponse(pokemonTypeApiResponse)).toEqual(
      pokemonTypeApiResponse,
    )
  })

  it('rejects invalid type responses', () => {
    expect(validatePokemonTypeApiResponse({ id: 1 })).toBe(false)
    expect(() => mapPokemonTypeResponse({ id: 1 })).toThrow(
      'Invalid type API response',
    )
  })
})
