import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import { samplePokemon } from '../../helpers/fixtures'

const getPokemonSpeciesMock = vi.fn()

vi.mock('@/api/composables/usePokemonSpeciesApi', () => ({
  usePokemonSpeciesApi: () => ({
    getPokemonSpecies: getPokemonSpeciesMock,
  }),
}))

import Information from '@/components/details/Information.vue'

describe('Information', () => {
  beforeEach(() => {
    getPokemonSpeciesMock.mockReset()
  })

  it('renders species data, attributes and weaknesses', async () => {
    getPokemonSpeciesMock.mockResolvedValueOnce({
      description: 'Pokémon electrizante',
      category: 'ROEDOR',
      femalePercentage: 50,
    })

    const wrapper = mount(Information, {
      props: {
        pokemon: samplePokemon,
      },
      global: {
        stubs: {
          GenderDistribution: true,
        },
      },
    })

    await nextTick()
    await Promise.resolve()
    await nextTick()

    console.log('information-html:', wrapper.html())
    expect(wrapper.text()).toContain('Pokémon electrizante')
    expect(wrapper.text()).toContain('ROEDOR')
    expect(wrapper.text()).toContain('6 kg')
    expect(wrapper.text()).toContain('0.4 m')
    expect(wrapper.text()).toContain('Tierra')
  })

  it('shows the fallback when species data is unavailable', async () => {
    getPokemonSpeciesMock.mockRejectedValueOnce(new Error('no species'))

    const wrapper = mount(Information, {
      props: {
        pokemon: samplePokemon,
      },
      global: {
        stubs: {
          GenderDistribution: true,
        },
      },
    })

    await nextTick()
    await Promise.resolve()
    await nextTick()

    expect(wrapper.text()).toContain('Descripción no disponible')
    expect(wrapper.text()).toContain('Información de género no disponible')
  })
})
