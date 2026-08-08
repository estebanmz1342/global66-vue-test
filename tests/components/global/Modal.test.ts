import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import Modal from '@/components/global/Modal.vue'

describe('Modal', () => {
  it('renders content and closes on overlay click', async () => {
    const Host = defineComponent({
      components: { Modal },
      setup() {
        const open = ref(true)
        return { open }
      },
      template: `
        <Modal v-model="open" title="Detalle" description="Información">
          <p>Body content</p>
          <template #footer>
            <button type="button">Footer</button>
          </template>
        </Modal>
      `,
    })

    mount(Host, {
      attachTo: document.body,
    })

    expect(document.body.textContent).toContain('Body content')

    await document.querySelector('.modal')?.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
      }),
    )
    await nextTick()

    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  it('respects the persistent flag', async () => {
    const Host = defineComponent({
      components: { Modal },
      setup() {
        const open = ref(true)
        return { open }
      },
      template: `
        <Modal v-model="open" title="Detalle" persistent>
          <p>Body content</p>
        </Modal>
      `,
    })

    mount(Host, {
      attachTo: document.body,
    })

    await document.querySelector('.modal')?.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
      }),
    )
    await nextTick()

    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
  })

  it('closes on Escape', async () => {
    const Host = defineComponent({
      components: { Modal },
      setup() {
        const open = ref(true)
        return { open }
      },
      template: `
        <Modal v-model="open" title="Detalle">
          <p>Body content</p>
        </Modal>
      `,
    })

    mount(Host, {
      attachTo: document.body,
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })
})
