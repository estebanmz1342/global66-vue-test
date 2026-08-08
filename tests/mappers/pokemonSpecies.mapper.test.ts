import { describe, expect, it } from 'vitest'

import {
  mapPokemonSpeciesToDetails,
  validatePokemonSpeciesApiResponse,
} from '@/mappers/pokemonSpecies.mapper'

import { pokemonSpeciesApiResponse } from '../helpers/fixtures'

describe('pokemonSpecies.mapper', () => {
  it('validates a pokemon species response', () => {
    expect(validatePokemonSpeciesApiResponse(pokemonSpeciesApiResponse)).toBe(
      true,
    )
  })

  it('maps the spanish text and genus when available', () => {
    expect(mapPokemonSpeciesToDetails(pokemonSpeciesApiResponse)).toEqual({
      description: 'electrizante con espacios extra',
      category: 'RATÓN',
      femalePercentage: 50,
    })
  })

  it('falls back to english and respects genderless species', () => {
    expect(
      mapPokemonSpeciesToDetails({
        gender_rate: -1,
        flavor_text_entries: [
          {
            flavor_text: 'Pokémon con saltos\nextra',
            language: {
              name: 'en',
              url: 'https://pokeapi.co/api/v2/language/9/',
            },
          },
        ],
        genera: [
          {
            genus: 'Rabbit Pokémon',
            language: {
              name: 'en',
              url: 'https://pokeapi.co/api/v2/language/9/',
            },
          },
        ],
      }),
    ).toEqual({
      description: 'con saltos extra',
      category: 'RABBIT POKÉMON',
      femalePercentage: undefined,
    })
  })

  it('rejects invalid species payloads', () => {
    expect(validatePokemonSpeciesApiResponse({ gender_rate: 1 })).toBe(false)
    expect(() => mapPokemonSpeciesToDetails({ gender_rate: 1 })).toThrow(
      'Invalid species API response',
    )
  })
})
