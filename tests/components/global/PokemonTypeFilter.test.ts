import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PokemonTypeFilter from '@/components/global/PokemonTypeFilter.vue'

describe('PokemonTypeFilter', () => {
  it('syncs selected types and emits normalized filters', async () => {
    const wrapper = mount(PokemonTypeFilter, {
      props: {
        selectedTypes: [' Fire ', 'electric', 'fire'],
      },
    })

    expect(wrapper.text()).toContain('Fuego')
    expect(wrapper.text()).toContain('Eléctrico')
    expect(wrapper.findAll('.pokemon-type-filter__checkbox.checked')).toHaveLength(
      2,
    )

    await wrapper.get('.pokemon-type-filter__button.primary').trigger('click')
    expect(wrapper.emitted('apply')?.[0]).toEqual([['fire', 'electric']])
  })

  it('emits cancel when requested', async () => {
    const wrapper = mount(PokemonTypeFilter)

    await wrapper.get('.pokemon-type-filter__button.secondary').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
