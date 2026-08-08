import { describe, expect, it, vi } from 'vitest'

const createMock = vi.fn()

vi.mock('axios', () => ({
  default: {
    create: createMock,
  },
}))

describe('apiClient', () => {
  it('creates an axios client with the pokeapi defaults', async () => {
    createMock.mockReturnValue({ get: vi.fn() })

    const { default: apiClient } = await import('@/api/apiClient')

    expect(createMock).toHaveBeenCalledWith({
      baseURL: 'https://pokeapi.co/api/v2/',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(apiClient).toEqual({ get: expect.any(Function) })
  })
})
