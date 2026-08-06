import apiClient from '../apiClient'

export function useServiceApi() {
  const get = async (url: string, config = {}): Promise<unknown> => {
    const response = await apiClient.get(url, config)
    return response.data as unknown
  }

  return {
    get,
  }
}
