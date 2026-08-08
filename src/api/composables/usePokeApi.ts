import {
  mapPokemonDetailToPokemon,
  mapPokemonListResponse,
} from '@/mappers/pokemon.mapper'
import type { Pokemon } from '@/types/types'

import { useServiceApi } from './useServiceApi'

type PokemonBatch = {
  pokemons: Pokemon[]
  hasMore: boolean
  nextOffset: number | null
}

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
    const batch = await getPokemonBatch(limit, offset)
    return batch.pokemons
  }

  const getPokemonBatch = async (
    limit = 10,
    offset = 0,
  ): Promise<PokemonBatch> => {
    const list = await getRawPokemonList(limit, offset)

    const pokemons = await Promise.all(
      list.results.map((pokemon) => getPokemonDetails(pokemon.name)),
    )

    const nextOffset = offset + pokemons.length
    const hasMore = nextOffset < list.count

    return {
      pokemons,
      hasMore,
      nextOffset: hasMore ? nextOffset : null,
    }
  }

  return {
    getRawPokemonList,
    getPokemonDetails,
    getPokemonBatch,
    getPokemons,
  }
}
