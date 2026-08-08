import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import EmptyState from '@/components/favorites/EmptyState.vue'

describe('EmptyState', () => {
  it('renders the empty favorites message', () => {
    const wrapper = mount(EmptyState)

    console.log('empty-state-text:', wrapper.text())

    expect(wrapper.text()).toContain(
      'No has marcado ningún Pokémon como favorito',
    )
  })
})
