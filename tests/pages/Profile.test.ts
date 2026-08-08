import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProfilePage from '@/pages/Profile.vue'

describe('Profile page', () => {
  it('renders the WIP component', () => {
    const wrapper = mount(ProfilePage)

    expect(wrapper.text()).toContain('¡Muy pronto disponible!')
  })
})
