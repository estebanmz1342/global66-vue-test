import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { useGlobalStore } from '@/store/global.store'

describe('global store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts with onboarding unfinished and not loading', () => {
    const store = useGlobalStore()

    expect(store.isOnboardingFinished).toBe(false)
    expect(store.isLoading).toBe(false)
  })

  it('loads persisted onboarding state', () => {
    localStorage.setItem(
      'global66-vue-test:global-store',
      JSON.stringify({ isOnboardingFinished: true }),
    )

    const store = useGlobalStore()

    expect(store.isOnboardingFinished).toBe(true)
  })

  it('persists onboarding state changes', async () => {
    const store = useGlobalStore()

    store.setOnboardingFinished(true)
    await nextTick()

    expect(
      JSON.parse(
        localStorage.getItem('global66-vue-test:global-store') ?? '{}',
      ),
    ).toEqual({ isOnboardingFinished: true })
  })

  it('toggles loading state', () => {
    const store = useGlobalStore()

    store.setLoading(true)
    expect(store.isLoading).toBe(true)
  })
})
