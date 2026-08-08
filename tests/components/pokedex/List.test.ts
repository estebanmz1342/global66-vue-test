import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import List from '@/components/pokedex/List.vue'

import { anotherPokemon, samplePokemon } from '../../helpers/fixtures'

describe('List', () => {
  it('renders cards for each pokemon and loads more on request', async () => {
    const wrapper = mount(List, {
      props: {
        pokemons: [samplePokemon, anotherPokemon],
        showLoadMore: true,
        hasMore: true,
      },
      global: {
        stubs: {
          Card: true,
        },
      },
    })

    expect(wrapper.findAll('card-stub')).toHaveLength(2)

    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('load-more')).toHaveLength(1)
  })

  it('shows the loading state on the button', () => {
    const wrapper = mount(List, {
      props: {
        pokemons: [],
        showLoadMore: true,
        hasMore: true,
        isLoadingMore: true,
      },
      global: {
        stubs: {
          Card: true,
        },
      },
    })

    expect(wrapper.get('button').text()).toContain('Cargando...')
  })
})
