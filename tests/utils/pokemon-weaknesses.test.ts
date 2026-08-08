import { describe, expect, it } from 'vitest'

import { calculatePokemonWeaknesses } from '@/utils/pokemon-weaknesses'

describe('calculatePokemonWeaknesses', () => {
  it('returns the correct weaknesses for a single type', () => {
    expect(calculatePokemonWeaknesses(['electric'])).toEqual(['ground'])
  })

  it('combines multipliers for dual types', () => {
    expect(calculatePokemonWeaknesses(['water', 'ground'])).toEqual(['grass'])
  })

  it('ignores invalid or repeated values', () => {
    expect(
      calculatePokemonWeaknesses(['Electric', 'electric', 'not-a-type', '']),
    ).toEqual(['ground'])
  })

  it('returns an empty array when there are no weaknesses', () => {
    expect(calculatePokemonWeaknesses(['ghost', 'normal'])).toEqual(['dark'])
  })
})
