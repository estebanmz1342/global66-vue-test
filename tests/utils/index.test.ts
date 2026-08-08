import { describe, expect, it } from 'vitest'

import { isObject } from '@/utils'

describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({ foo: 'bar' })).toBe(true)
  })

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('returns false for primitives', () => {
    expect(isObject('hello')).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})
