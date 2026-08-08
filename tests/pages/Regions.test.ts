import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import RegionsPage from '@/pages/Regions.vue'

describe('Regions page', () => {
  it('renders the WIP component', () => {
    const wrapper = mount(RegionsPage)

    expect(wrapper.text()).toContain('¡Muy pronto disponible!')
  })
})
