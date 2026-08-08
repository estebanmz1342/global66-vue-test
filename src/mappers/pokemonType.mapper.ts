import type { PokemonTypeApiResponse } from '@/types/pokemon-type.types'
import { isObject } from '@/utils'

export const validatePokemonTypeApiResponse = (
  value: unknown,
): value is PokemonTypeApiResponse => {
  if (!isObject(value)) return false

  return (
    typeof value.id === 'number' &&
    typeof value.name === 'string' &&
    Array.isArray(value.pokemon) &&
    value.pokemon.every((item) => {
      if (!isObject(item) || !isObject(item.pokemon)) return false

      return (
        typeof item.slot === 'number' &&
        typeof item.pokemon.name === 'string' &&
        typeof item.pokemon.url === 'string'
      )
    })
  )
}

export const mapPokemonTypeResponse = (
  value: unknown,
): PokemonTypeApiResponse => {
  if (!validatePokemonTypeApiResponse(value)) {
    throw new Error('Invalid type API response')
  }

  return value
}
