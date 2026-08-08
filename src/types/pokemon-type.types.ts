export interface PokemonTypePokemonApi {
  slot: number
  pokemon: {
    name: string
    url: string
  }
}

export interface PokemonTypeApiResponse {
  id: number
  name: string
  pokemon: PokemonTypePokemonApi[]
}
