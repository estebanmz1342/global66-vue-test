import { beforeEach, describe, expect, it, vi } from 'vitest'

import { pokemonSpeciesApiResponse } from '../../helpers/fixtures'

const getMock = vi.fn()

vi.mock('@/api/composables/useServiceApi', () => ({
  useServiceApi: () => ({
    get: getMock,
  }),
}))

import { usePokemonSpeciesApi } from '@/api/composables/usePokemonSpeciesApi'

describe('usePokemonSpeciesApi', () => {
  beforeEach(() => {
    getMock.mockReset()
  })

  it('rejects empty names', async () => {
    const speciesApi = usePokemonSpeciesApi()

    await expect(speciesApi.getPokemonSpecies('')).rejects.toThrow(
      'Pokemon name is required',
    )
  })

  it('loads and maps pokemon species details', async () => {
    getMock.mockResolvedValueOnce(pokemonSpeciesApiResponse)

    const speciesApi = usePokemonSpeciesApi()
    const response = await speciesApi.getPokemonSpecies('Pikachu')

    expect(getMock).toHaveBeenCalledWith('/pokemon-species/pikachu')
    expect(response).toEqual({
      description: 'electrizante con espacios extra',
      category: 'RATÓN',
      femalePercentage: 50,
    })
  })
})
