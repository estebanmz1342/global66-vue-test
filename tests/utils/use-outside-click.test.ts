import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'

import { useOutsideClick } from '@/utils/use-outside-click'

describe('useOutsideClick', () => {
  it('calls the callback when clicking outside the referenced element', async () => {
    const onClickOutside = vi.fn()

    const TestComponent = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null)

        useOutsideClick({
          ref: target,
          onClickOutside,
        })

        return {
          target,
        }
      },
      template: `
        <div>
          <div ref="target">
            <button id="inside">Inside</button>
          </div>
          <button id="outside">Outside</button>
        </div>
      `,
    })

    const wrapper = mount(TestComponent, {
      attachTo: document.body,
    })

    await wrapper.find('#outside').trigger('mousedown')
    expect(onClickOutside).toHaveBeenCalledTimes(1)

    await wrapper.find('#inside').trigger('mousedown')
    expect(onClickOutside).toHaveBeenCalledTimes(1)
  })
})
