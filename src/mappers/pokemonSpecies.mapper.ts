import type {
  PokemonSpeciesApiResponse,
} from '@/types/api.types'
import type { PokemonSpeciesDetails } from '@/types/pokemon-species.types'
import { isObject } from '@/utils'

const normalizeText = (value: string) =>
  value.replace(/\s+/g, ' ').replace(/^Pok[eé]mon\s+/i, '').trim()

export const validatePokemonSpeciesApiResponse = (
  value: unknown,
): value is PokemonSpeciesApiResponse => {
  if (!isObject(value)) return false

  return (
    typeof value.gender_rate === 'number' &&
    Array.isArray(value.flavor_text_entries) &&
    value.flavor_text_entries.every((item) => {
      if (!isObject(item) || !isObject(item.language)) return false

      return (
        typeof item.flavor_text === 'string' &&
        typeof item.language.name === 'string' &&
        typeof item.language.url === 'string'
      )
    }) &&
    Array.isArray(value.genera) &&
    value.genera.every((item) => {
      if (!isObject(item) || !isObject(item.language)) return false

      return (
        typeof item.genus === 'string' &&
        typeof item.language.name === 'string' &&
        typeof item.language.url === 'string'
      )
    })
  )
}

export const mapPokemonSpeciesToDetails = (
  value: unknown,
): PokemonSpeciesDetails => {
  if (!validatePokemonSpeciesApiResponse(value)) {
    throw new Error('Invalid species API response')
  }

  const spanishDescription =
    value.flavor_text_entries.find((entry) => entry.language.name === 'es')
      ?.flavor_text ??
    value.flavor_text_entries.find((entry) => entry.language.name === 'en')
      ?.flavor_text ??
    ''

  const genus =
    value.genera.find((entry) => entry.language.name === 'es')?.genus ??
    value.genera.find((entry) => entry.language.name === 'en')?.genus ??
    ''

  return {
    description: normalizeText(spanishDescription),
    category: normalizeText(genus).toLocaleUpperCase('es-ES'),
    femalePercentage:
      value.gender_rate === -1 ? undefined : value.gender_rate * 12.5,
  }
}
