import {
  mapPokemonDetailToPokemon,
  mapPokemonListResponse,
} from '@/mappers/pokemon.mapper'
import type { Pokemon } from '@/types/types'
import { useServiceApi } from './useServiceApi'

export const usePokeApi = () => {
  const $serviceApi = useServiceApi()

  const getRawPokemonList = async (limit: number, offset: number) => {
    const url = `pokemon?limit=${limit}&offset=${offset}`
    const response = await $serviceApi.get(url)
    return mapPokemonListResponse(response)
  }

  const getPokemonDetails = async (name: string): Promise<Pokemon> => {
    if (!name) return Promise.reject(new Error('Pokemon name is required'))

    const url = `/pokemon/${name}`
    const response = await $serviceApi.get(url)

    return mapPokemonDetailToPokemon(response)
  }

  const getPokemons = async (limit = 10, offset = 0): Promise<Pokemon[]> => {
    const list = await getRawPokemonList(limit, offset)

    const details = await Promise.all(
      list.results.map((pokemon) => getPokemonDetails(pokemon.name)),
    )

    return details
  }

  return {
    getRawPokemonList,
    getPokemonDetails,
    getPokemons,
  }
}
