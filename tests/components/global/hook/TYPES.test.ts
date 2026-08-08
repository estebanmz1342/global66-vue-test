import { describe, expect, it } from 'vitest'

import { getTypeInfo, TYPES } from '@/components/global/hook/TYPES'

describe('TYPES map', () => {
  it('contains the known pokemon type metadata', () => {
    const water = TYPES.get('water')

    expect(water).toMatchObject({
      name: 'Agua',
      backgroundColor: '#6493EB',
    })
    expect(water?.image).toContain('data:image/svg+xml')
  })

  it('returns a fallback for unknown types', () => {
    expect(getTypeInfo('unknown')).toEqual({
      name: 'unknown',
      backgroundColor: '#999999',
      image: '',
    })
  })

  it('normalizes case when resolving known types', () => {
    expect(getTypeInfo('FIRE')).toMatchObject({
      name: 'Fuego',
      backgroundColor: '#F57D31',
    })
  })
})
