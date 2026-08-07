const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

type PokemonType = (typeof POKEMON_TYPES)[number]

type TypeEffectiveness = {
  strongAgainst: PokemonType[]
  resistedBy: PokemonType[]
  immuneBy?: PokemonType[]
}

const TYPE_EFFECTIVENESS: Record<PokemonType, TypeEffectiveness> = {
  normal: {
    strongAgainst: [],
    resistedBy: ['rock', 'steel'],
    immuneBy: ['ghost'],
  },
  fire: {
    strongAgainst: ['grass', 'ice', 'bug', 'steel'],
    resistedBy: ['fire', 'water', 'rock', 'dragon'],
  },
  water: {
    strongAgainst: ['fire', 'ground', 'rock'],
    resistedBy: ['water', 'grass', 'dragon'],
  },
  electric: {
    strongAgainst: ['water', 'flying'],
    resistedBy: ['electric', 'grass', 'dragon'],
    immuneBy: ['ground'],
  },
  grass: {
    strongAgainst: ['water', 'ground', 'rock'],
    resistedBy: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
  },
  ice: {
    strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
    resistedBy: ['fire', 'water', 'ice', 'steel'],
  },
  fighting: {
    strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'],
    resistedBy: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    immuneBy: ['ghost'],
  },
  poison: {
    strongAgainst: ['grass', 'fairy'],
    resistedBy: ['poison', 'ground', 'rock', 'ghost'],
    immuneBy: ['steel'],
  },
  ground: {
    strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
    resistedBy: ['grass', 'bug'],
    immuneBy: ['flying'],
  },
  flying: {
    strongAgainst: ['grass', 'fighting', 'bug'],
    resistedBy: ['electric', 'rock', 'steel'],
  },
  psychic: {
    strongAgainst: ['fighting', 'poison'],
    resistedBy: ['psychic', 'steel'],
    immuneBy: ['dark'],
  },
  bug: {
    strongAgainst: ['grass', 'psychic', 'dark'],
    resistedBy: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
  },
  rock: {
    strongAgainst: ['fire', 'ice', 'flying', 'bug'],
    resistedBy: ['fighting', 'ground', 'steel'],
  },
  ghost: {
    strongAgainst: ['psychic', 'ghost'],
    resistedBy: ['dark'],
    immuneBy: ['normal'],
  },
  dragon: {
    strongAgainst: ['dragon'],
    resistedBy: ['steel'],
    immuneBy: ['fairy'],
  },
  dark: {
    strongAgainst: ['psychic', 'ghost'],
    resistedBy: ['fighting', 'dark', 'fairy'],
  },
  steel: {
    strongAgainst: ['ice', 'rock', 'fairy'],
    resistedBy: ['fire', 'water', 'electric', 'steel'],
  },
  fairy: {
    strongAgainst: ['fighting', 'dragon', 'dark'],
    resistedBy: ['fire', 'poison', 'steel'],
  },
}

const getEffectivenessMultiplier = (
  attackType: PokemonType,
  defenseType: PokemonType,
) => {
  const effectiveness = TYPE_EFFECTIVENESS[attackType]

  if (effectiveness.immuneBy?.includes(defenseType)) {
    return 0
  }

  if (effectiveness.strongAgainst.includes(defenseType)) {
    return 2
  }

  if (effectiveness.resistedBy.includes(defenseType)) {
    return 0.5
  }

  return 1
}

export const calculatePokemonWeaknesses = (types: string[]) => {
  const normalizedTypes = types
    .map((type) => type.toLowerCase())
    .filter((type): type is PokemonType =>
      POKEMON_TYPES.includes(type as PokemonType),
    )

  return POKEMON_TYPES.filter((attackType) => {
    const multiplier = normalizedTypes.reduce(
      (result, defenseType) =>
        result * getEffectivenessMultiplier(attackType, defenseType),
      1,
    )

    return multiplier > 1
  })
}
