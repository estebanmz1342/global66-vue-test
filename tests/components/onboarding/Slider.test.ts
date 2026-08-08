import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Slider from '@/components/onboarding/Slider.vue'

describe('Slider', () => {
  it('navigates between slides and emits finish on the last step', async () => {
    const wrapper = mount(Slider)

    expect(wrapper.text()).toContain('Continuar')

    await wrapper.findAll('.slider__dot')[1].trigger('click')
    expect(wrapper.text()).toContain('Empecemos')

    await wrapper.findAll('button').at(-1)?.trigger('click')
    expect(wrapper.emitted('finish')).toHaveLength(1)
  })
})
