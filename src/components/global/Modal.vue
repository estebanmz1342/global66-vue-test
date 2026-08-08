<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

const isOpen = defineModel<boolean>({ default: false })

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    persistent?: boolean
  }>(),
  {
    title: '',
    description: '',
    persistent: false,
  },
)

const close = () => {
  if (!props.persistent) {
    isOpen.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal" @click.self="close">
        <div class="modal__panel" role="dialog" aria-modal="true">
          <header v-if="title || $slots.header" class="modal__header">
            <slot name="header">
              <div class="modal__heading">
                <h2 class="modal__title">{{ title }}</h2>
                <p v-if="description" class="modal__description">
                  {{ description }}
                </p>
              </div>
            </slot>

            <button
              class="modal__close"
              type="button"
              aria-label="Close modal"
              @click="close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div class="modal__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1rem;
  box-sizing: border-box;
  background: rgba(12, 14, 20, 0.58);
  backdrop-filter: blur(10px);
}

.modal__panel {
  width: min(100%, 34rem);
  border-radius: 1.5rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(248, 249, 252, 0.98) 100%
  );
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.28),
    0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.75rem;
}

.modal__heading {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.modal__title {
  margin: 0;
  color: #121212;
  font-family: Poppins, sans-serif;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.15;
}

.modal__description {
  margin: 0;
  color: #6b7280;
  font-family: Poppins, sans-serif;
  font-size: 0.95rem;
  line-height: 1.45;
}

.modal__close {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.06);
  color: #111827;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

.modal__close:hover {
  background: rgba(17, 24, 39, 0.1);
}

.modal__body {
  padding: 0 1.25rem 1.25rem;
  color: #121212;
  font-family: Poppins, sans-serif;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0 1.25rem 1.25rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal__panel,
.modal-fade-leave-to .modal__panel {
  transform: translateY(12px) scale(0.98);
}

.modal-fade-enter-to .modal__panel,
.modal-fade-leave-from .modal__panel {
  transform: translateY(0) scale(1);
}
</style>
