import { reactive } from 'vue'

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

export const globalStore = reactive<
  GlobalStoreState & {
    setOnboardingFinished: (value: boolean) => void
    setLoading: (value: boolean) => void
  }
>({
  isOnboardingFinished: false,
  isLoading: false,
  ...readPersistedState(),
  setOnboardingFinished(value: boolean) {
    this.isOnboardingFinished = value
    persistState({
      isOnboardingFinished: this.isOnboardingFinished,
      isLoading: this.isLoading,
    })
  },
  setLoading(value: boolean) {
    this.isLoading = value
    persistState({
      isOnboardingFinished: this.isOnboardingFinished,
      isLoading: this.isLoading,
    })
  },
})
