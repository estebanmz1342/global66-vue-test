import { mount, type MountingOptions } from '@vue/test-utils'
import { createPinia } from 'pinia'
import type { Component } from 'vue'

type MountArgs<T> = MountingOptions<T> & {
  routeMocks?: Record<string, unknown>
}

export const mountWithPinia = <T extends Component>(
  component: T,
  options: MountArgs<T> = {},
) => {
  const { routeMocks, global, ...rest } = options

  return mount(component, {
    ...rest,
    global: {
      plugins: [createPinia(), ...(global?.plugins ?? [])],
      stubs: {
        teleport: false,
        transition: false,
        ...(global?.stubs ?? {}),
      },
      mocks: {
        ...(routeMocks ?? {}),
        ...(global?.mocks ?? {}),
      },
      provide: global?.provide,
    },
  })
}
