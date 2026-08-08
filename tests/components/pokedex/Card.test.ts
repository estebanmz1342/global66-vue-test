import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import Card from '@/components/pokedex/Card.vue'

import { samplePokemon } from '../../helpers/fixtures'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('Card', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    pushMock.mockReset()
  })

  it('toggles the pokemon favorite state', async () => {
    const wrapper = mount(Card, {
      props: {
        pokemon: samplePokemon,
      },
    })

    expect(wrapper.get('.card-favorite-button').text()).toBe('favorite_border')

    await wrapper.get('.card-favorite-button').trigger('click')
    await nextTick()

    expect(wrapper.get('.card-favorite-button').text()).toBe('favorite')
  })

  it('navigates to the detail page when clicking the header', async () => {
    const wrapper = mount(Card, {
      props: {
        pokemon: samplePokemon,
      },
    })

    await wrapper.get('.card-header').trigger('click')
    expect(pushMock).toHaveBeenCalledWith('pikachu/details')
  })
})
