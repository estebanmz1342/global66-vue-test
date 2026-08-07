import type {
  PokemonDetailApiResponse,
  PokemonListApiResponse,
} from '../types/api.types'
import type { Pokemon } from '../types/types'
import { isObject } from '../utils'

export const validatePokemonListApiResponse = (
  value: unknown,
): value is PokemonListApiResponse => {
  if (!isObject(value)) return false

  return (
    typeof value.count === 'number' &&
    Array.isArray(value.results) &&
    value.results.every((item) => {
      if (!isObject(item)) return false

      return typeof item.name === 'string' && typeof item.url === 'string'
    })
  )
}

export const validatePokemonDetailApiResponse = (
  value: unknown,
): value is PokemonDetailApiResponse => {
  if (!isObject(value)) return false

  return (
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    typeof value.height === 'number' &&
    typeof value.weight === 'number' &&
    Array.isArray(value.types) &&
    isObject(value.sprites)
  )
}

export const mapPokemonListResponse = (
  value: unknown,
): PokemonListApiResponse => {
  if (!validatePokemonListApiResponse(value)) {
    throw new Error('Invalid API response')
  }

  return value
}

export const mapPokemonDetailToPokemon = (value: unknown): Pokemon => {
  if (!validatePokemonDetailApiResponse(value)) {
    throw new Error('Invalid detail API response')
  }

  const image =
    value.sprites.other?.['official-artwork']?.front_default ||
    value.sprites.front_default ||
    ''

  return {
    id: value.id,
    number: `N°${String(value.id).padStart(3, '0')}`,
    name: value.name.charAt(0).toUpperCase() + value.name.slice(1),
    image,
    types: value.types.map((item) => item.type.name),
    height: value.height / 10,
    weight: value.weight / 10,
  }
}
