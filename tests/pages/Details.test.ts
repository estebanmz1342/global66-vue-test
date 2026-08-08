import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import { samplePokemon } from '../helpers/fixtures'

const getPokemonByNameMock = vi.fn()
const backMock = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      name: 'pikachu',
    },
  }),
}))

vi.mock('@/components/pokedex/hooks/usePokedex', () => ({
  usePokedex: () => ({
    getPokemonByName: getPokemonByNameMock,
  }),
}))

import DetailsPage from '@/pages/[name]/Details.vue'

describe('Details page', () => {
  beforeEach(() => {
    getPokemonByNameMock.mockReset()
    backMock.mockReset()
  })

  it('loads the pokemon from the route param and shows the back button', async () => {
    getPokemonByNameMock.mockResolvedValueOnce(samplePokemon)

    const wrapper = mount(DetailsPage, {
      global: {
        mocks: {
          $router: {
            back: backMock,
          },
        },
        stubs: {
          Character: {
            template: '<div class="character-stub" />',
          },
          Information: {
            template: '<div class="information-stub" />',
          },
        },
      },
    })

    await nextTick()
    await Promise.resolve()
    await nextTick()

    expect(getPokemonByNameMock).toHaveBeenCalledWith('pikachu')
    expect(wrapper.find('.character-stub').exists()).toBe(true)
    expect(wrapper.find('.information-stub').exists()).toBe(true)

    await wrapper.get('button').trigger('click')
    expect(backMock).toHaveBeenCalled()
  })
})
