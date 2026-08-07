import { mapPokemonSpeciesToDetails } from '@/mappers/pokemonSpecies.mapper'
import type { PokemonSpeciesDetails } from '@/types/pokemon-species.types'
import { useServiceApi } from './useServiceApi'

export const usePokemonSpeciesApi = () => {
  const $serviceApi = useServiceApi()

  const getPokemonSpecies = async (
    name: string,
  ): Promise<PokemonSpeciesDetails> => {
    if (!name) {
      return Promise.reject(new Error('Pokemon name is required'))
    }

    const url = `/pokemon-species/${name.toLowerCase()}`
    const response = await $serviceApi.get(url)

    return mapPokemonSpeciesToDetails(response)
  }

  return {
    getPokemonSpecies,
  }
}
