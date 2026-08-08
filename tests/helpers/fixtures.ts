import type {
  PokemonDetailApiResponse,
  PokemonListApiResponse,
  PokemonSpeciesApiResponse,
} from '@/types/api.types'
import type { PokemonTypeApiResponse } from '@/types/pokemon-type.types'
import type { Pokemon } from '@/types/types'

export const samplePokemon: Pokemon = {
  id: 25,
  number: 'N°025',
  name: 'Pikachu',
  image: 'https://example.com/pikachu.png',
  types: ['electric'],
  ability: 'Static',
  height: 0.4,
  weight: 6.0,
}

export const anotherPokemon: Pokemon = {
  id: 1,
  number: 'N°001',
  name: 'Bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  types: ['grass', 'poison'],
  ability: 'Overgrow',
  height: 0.7,
  weight: 6.9,
}

export const pokemonListApiResponse: PokemonListApiResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'eevee', url: 'https://pokeapi.co/api/v2/pokemon/133/' },
  ],
}

export const pokemonDetailApiResponse: PokemonDetailApiResponse = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://example.com/front.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/artwork.png',
      },
    },
  },
  abilities: [
    {
      is_hidden: true,
      slot: 3,
      ability: {
        name: 'lightning-rod',
        url: 'https://pokeapi.co/api/v2/ability/31/',
      },
    },
    {
      is_hidden: false,
      slot: 1,
      ability: {
        name: 'static',
        url: 'https://pokeapi.co/api/v2/ability/9/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
}

export const pokemonSpeciesApiResponse: PokemonSpeciesApiResponse = {
  gender_rate: 4,
  flavor_text_entries: [
    {
      flavor_text: 'Texto en inglés',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
    {
      flavor_text: 'Pokémon electrizante\ncon espacios extra',
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/8/',
      },
    },
  ],
  genera: [
    {
      genus: 'Mouse Pokémon',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
    {
      genus: 'Pokémon ratón',
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/8/',
      },
    },
  ],
}

export const pokemonTypeApiResponse: PokemonTypeApiResponse = {
  id: 13,
  name: 'electric',
  pokemon: [
    {
      slot: 1,
      pokemon: {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    },
    {
      slot: 1,
      pokemon: {
        name: 'raichu',
        url: 'https://pokeapi.co/api/v2/pokemon/26/',
      },
    },
  ],
}
