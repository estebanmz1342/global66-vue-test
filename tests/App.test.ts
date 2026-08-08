import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import App from '@/App.vue'
import { useGlobalStore } from '@/store/global.store'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('only renders the router view before onboarding is finished', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          Menu: {
            template: '<div class="menu-stub" />',
          },
          Loader: {
            template: '<div class="loader-stub" />',
          },
          RouterView: {
            template: '<div class="router-view-stub" />',
          },
        },
      },
    })

    expect(wrapper.find('.menu-stub').exists()).toBe(false)
    expect(wrapper.find('.loader-stub').exists()).toBe(false)
    expect(wrapper.find('.router-view-stub').exists()).toBe(true)
  })

  it('renders the menu and loader when the store says so', () => {
    const store = useGlobalStore()
    store.setOnboardingFinished(true)
    store.setLoading(true)

    const wrapper = mount(App, {
      global: {
        stubs: {
          Menu: {
            template: '<div class="menu-stub" />',
          },
          Loader: {
            template: '<div class="loader-stub" />',
          },
          RouterView: {
            template: '<div class="router-view-stub" />',
          },
        },
      },
    })

    expect(wrapper.find('.menu-stub').exists()).toBe(true)
    expect(wrapper.find('.loader-stub').exists()).toBe(true)
    expect(wrapper.find('.router-view-stub').exists()).toBe(true)
  })
})
