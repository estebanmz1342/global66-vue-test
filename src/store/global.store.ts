import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type GlobalStoreState = {
  isOnboardingFinished: boolean
  isLoading: boolean
}

const STORAGE_KEY = 'global66-vue-test:global-store'

const readPersistedState = (): Partial<GlobalStoreState> => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)

    if (!rawState) {
      return {}
    }

    const parsedState = JSON.parse(rawState) as Partial<GlobalStoreState>

    return {
      isOnboardingFinished:
        typeof parsedState.isOnboardingFinished === 'boolean'
          ? parsedState.isOnboardingFinished
          : undefined,
      isLoading:
        typeof parsedState.isLoading === 'boolean'
          ? parsedState.isLoading
          : undefined,
    }
  } catch {
    return {}
  }
}

const persistState = (state: GlobalStoreState) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const useGlobalStore = defineStore('global', () => {
  const persistedState = readPersistedState()

  const isOnboardingFinished = ref(persistedState.isOnboardingFinished ?? false)
  const isLoading = ref(persistedState.isLoading ?? false)

  const setOnboardingFinished = (value: boolean) => {
    isOnboardingFinished.value = value
  }

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  watch(
    [isOnboardingFinished, isLoading],
    ([onboardingFinished, loading]) => {
      persistState({
        isOnboardingFinished: onboardingFinished,
        isLoading: loading,
      })
    },
    {
      immediate: true,
    },
  )

  return {
    isOnboardingFinished,
    isLoading,
    setOnboardingFinished,
    setLoading,
  }
})
