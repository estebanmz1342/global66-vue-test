import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useRoute: () => ({
    path: '/favorites',
  }),
}))

import Menu from '@/components/global/Menu.vue'

describe('Menu', () => {
  it('opens, highlights the active route and navigates on selection', async () => {
    Object.defineProperty(document.body, 'offsetWidth', {
      value: 1000,
      configurable: true,
    })

    const wrapper = mount(Menu, {
      attachTo: document.body,
    })

    await wrapper.get('button').trigger('click')
    await nextTick()

    expect(document.body.textContent).toContain('Pokedex')
    expect(document.body.querySelector('[aria-current="page"]')?.textContent).toContain(
      'Favoritos',
    )

    await document.body
      .querySelectorAll('.menu-list-item')[0]
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(pushMock).toHaveBeenCalledWith('/')
  })

  it('closes when clicking outside', async () => {
    const wrapper = mount(Menu, {
      attachTo: document.body,
    })

    await wrapper.get('button').trigger('click')
    await nextTick()

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await nextTick()

    expect(document.body.querySelector('.menu-elements--visible')).toBeNull()
  })
})
