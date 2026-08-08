import { mapPokemonTypeResponse } from '@/mappers/pokemonType.mapper'
import type { Pokemon } from '@/types/types'

import { usePokeApi } from './usePokeApi'
import { useServiceApi } from './useServiceApi'

export const usePokemonTypeApi = () => {
  const $serviceApi = useServiceApi()
  const pokeApi = usePokeApi()

  const getPokemonsByType = async (type: string): Promise<Pokemon[]> => {
    const normalizedType = type.trim().toLowerCase()

    if (!normalizedType) {
      return []
    }

    const url = `/type/${normalizedType}`
    const response = await $serviceApi.get(url)
    const typeResponse = mapPokemonTypeResponse(response)

    const pokemons = await Promise.all(
      typeResponse.pokemon.map((pokemon) =>
        pokeApi.getPokemonDetails(pokemon.pokemon.name),
      ),
    )

    return pokemons
  }

  const getPokemonsByTypes = async (types: string[]): Promise<Pokemon[]> => {
    const normalizedTypes = Array.from(
      new Set(
        types
          .map((type) => type.trim().toLowerCase())
          .filter((type) => type.length > 0),
      ),
    )

    if (normalizedTypes.length === 0) {
      return []
    }

    const pokemonGroups = await Promise.all(
      normalizedTypes.map((type) => getPokemonsByType(type)),
    )

    const uniquePokemons = new Map<number, Pokemon>()

    pokemonGroups.flat().forEach((pokemon) => {
      uniquePokemons.set(pokemon.id, pokemon)
    })

    return [...uniquePokemons.values()].sort((a, b) => a.id - b.id)
  }

  return {
    getPokemonsByType,
    getPokemonsByTypes,
  }
}
