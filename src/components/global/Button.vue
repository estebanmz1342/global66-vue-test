<script lang="ts" setup>
defineProps<{
  variant?: 'primary' | 'secondary'
}>()
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="button" :class="variant" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.button {
  width: 20.5rem;
  height: 3rem;
  font-family: Poppins;
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
</style>
