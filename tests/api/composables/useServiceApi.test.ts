import { beforeEach, describe, expect, it, vi } from 'vitest'

const { setLoading, getMock } = vi.hoisted(() => ({
  setLoading: vi.fn(),
  getMock: vi.fn(),
}))

vi.mock('@/store/global.store', () => ({
  useGlobalStore: () => ({
    setLoading,
  }),
}))

vi.mock('@/api/apiClient', () => ({
  default: {
    get: getMock,
  },
}))

import { useServiceApi } from '@/api/composables/useServiceApi'

describe('useServiceApi', () => {
  beforeEach(() => {
    setLoading.mockClear()
    getMock.mockReset()
  })

  it('wraps requests with the global loading flag', async () => {
    getMock.mockResolvedValueOnce({ data: { ok: true } })

    const serviceApi = useServiceApi()
    const response = await serviceApi.get('/pokemon/25')

    expect(response).toEqual({ ok: true })
    expect(getMock).toHaveBeenCalledWith('/pokemon/25', {})
    expect(setLoading).toHaveBeenNthCalledWith(1, true)
    expect(setLoading).toHaveBeenNthCalledWith(2, false)
  })

  it('clears loading after failures', async () => {
    getMock.mockRejectedValueOnce(new Error('network error'))

    const serviceApi = useServiceApi()

    await expect(serviceApi.get('/pokemon/25')).rejects.toThrow('network error')
    expect(setLoading).toHaveBeenNthCalledWith(1, true)
    expect(setLoading).toHaveBeenNthCalledWith(2, false)
  })
})
