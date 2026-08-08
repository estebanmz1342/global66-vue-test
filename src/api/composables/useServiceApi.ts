import { useGlobalStore } from '@/store/global.store'

import apiClient from '../apiClient'

let activeRequests = 0

export function useServiceApi() {
  const globalStore = useGlobalStore()

  const runWithGlobalLoading = async <T>(
    operation: () => Promise<T>,
  ): Promise<T> => {
    activeRequests += 1
    if (activeRequests === 1) {
      globalStore.setLoading(true)
    }

    try {
      return await operation()
    } finally {
      activeRequests = Math.max(activeRequests - 1, 0)

      if (activeRequests === 0) {
        globalStore.setLoading(false)
      }
    }
  }

  const get = async (url: string, config = {}): Promise<unknown> => {
    return runWithGlobalLoading(async () => {
      const response = await apiClient.get(url, config)
      return response.data as unknown
    })
  }

  return {
    get,
  }
}
