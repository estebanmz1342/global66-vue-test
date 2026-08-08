import { afterEach, vi } from 'vitest'

afterEach(() => {
  document.body.innerHTML = ''
})

if (!globalThis.PointerEvent) {
  // jsdom in some environments still lacks PointerEvent.
  globalThis.PointerEvent = MouseEvent as typeof PointerEvent
}

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}
