<script lang="ts" setup>
defineProps<{
  variant?: 'onboarding' | 'description'
}>()
</script>
<template>
  <p class="text" :class="variant">
    <slot />
  </p>
</template>

<style scoped>
.text {
  font: var(--typography);
  line-height: 100%;
  letter-spacing: 0em;
  font-style: regular;
  font-size: 0.875rem;
  text-align: center;
}
.onboarding {
  line-height: 150%;
}

.description {
  line-height: 145%;
  text-align: none;
}
</style>
