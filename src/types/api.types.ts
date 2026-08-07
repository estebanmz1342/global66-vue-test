export interface PokemonListItemApi {
  name: string
  url: string
}

export interface PokemonListApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItemApi[]
}

export interface PokemonDetailApiResponse {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string | null
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
  }
  abilities: {
    is_hidden: boolean
    slot: number
    ability: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}
