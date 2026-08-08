import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Slide from '@/components/onboarding/Slide.vue'

describe('Slide', () => {
  it('renders the onboarding image, title and text', () => {
    const wrapper = mount(Slide, {
      props: {
        image: 'https://example.com/slide.png',
        title: 'Slide title',
        text: 'Slide text',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe('https://example.com/slide.png')
    expect(wrapper.text()).toContain('Slide title')
    expect(wrapper.text()).toContain('Slide text')
  })
})
