import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import Character from '@/components/details/Character.vue'

import { samplePokemon } from '../../helpers/fixtures'

describe('Character', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('renders the character artwork and toggles favorites', async () => {
    const wrapper = mount(Character, {
      props: {
        pokemon: samplePokemon,
      },
    })

    wrapper.html()

    expect(wrapper.find('img[alt="Eléctrico logo"]').exists()).toBe(true)
    expect(wrapper.get('.favorite-button').text()).toBe('favorite_border')

    await wrapper.get('.favorite-button').trigger('click')
    await nextTick()

    expect(wrapper.get('.favorite-button').text()).toBe('favorite')
  })
})
