import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import SearchAndFilter from '@/components/pokedex/SearchAndFilter.vue'

describe('SearchAndFilter', () => {
  it('updates the search value and emits search on submit', async () => {
    const wrapper = mount(SearchAndFilter)

    await wrapper.get('input').setValue('pikachu')
    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['pikachu'])
    expect(wrapper.emitted('search')).toHaveLength(1)
  })

  it('opens the filter modal and emits applied filters', async () => {
    const wrapper = mount(SearchAndFilter, {
      props: {
        selectedTypes: ['fire'],
      },
    })

    await wrapper.get('.search-button').trigger('click')
    await nextTick()

    console.log('search-filter-modal-open:', document.body.textContent?.length)
    expect(document.body.textContent).toContain('Filtra por tus preferencias')

    const firstTypeOption = document.body.querySelector(
      '.pokemon-type-filter__option',
    ) as HTMLElement

    await firstTypeOption.click()
    await document.body
      .querySelectorAll('.pokemon-type-filter__button.primary')[0]
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(wrapper.emitted('apply-filter')?.[0]?.[0]).toEqual(['fire', 'bug'])
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })
})
