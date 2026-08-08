<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    class="button"
    :class="variant"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  width: 20.5rem;
  height: 3rem;
  font-family: var(--typography);
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: 0em;
  font-style: semi-bold;
  font-size: 1.125rem;
  text-align: center;
  border-radius: 6.25rem;
  border: 0;
}

.primary {
  background-color: #1e88e5;
  color: #fafafa;
}

.secondary {
  background-color: #eeeeee;
  color: #121212;
}

.button:hover {
  cursor: pointer;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
