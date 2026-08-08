import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import ErrorPage from '@/components/pokedex/Error.vue'

const pushMock = vi.fn()

describe('Pokedex Error', () => {
  it('renders the error copy and retries navigation', async () => {
    const wrapper = mount(ErrorPage, {
      global: {
        mocks: {
          $router: {
            push: pushMock,
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Algo salió mal')

    await wrapper.get('button').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/')
  })
})
