import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PillType from '@/components/global/PillType.vue'

describe('PillType', () => {
  it('renders the resolved type metadata', () => {
    const wrapper = mount(PillType, {
      props: {
        type: 'Fire',
      },
    })

    expect(wrapper.text()).toContain('Fuego')
    expect(wrapper.find('img').attributes('src')).toContain('data:image/svg+xml')
  })

  it('applies the large modifier', () => {
    const wrapper = mount(PillType, {
      props: {
        type: 'water',
        size: 'large',
      },
    })

    expect(wrapper.classes()).toContain('large')
    expect(wrapper.find('.type-name').classes()).toContain('large')
  })
})
