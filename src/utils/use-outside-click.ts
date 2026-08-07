import { onBeforeUnmount, onMounted, type Ref } from 'vue'

interface UseOutsideClickOptions {
  ref: Ref<HTMLElement | null>
  onClickOutside: () => void
}

export const useOutsideClick = ({
  ref,
  onClickOutside,
}: UseOutsideClickOptions): void => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.value && !ref.value.contains(event.target as Node)) {
      onClickOutside()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
}
