<script lang="ts" setup>
defineProps<{
  variant: 'onboarding' | 'error' | 'name'
}>()
</script>
<template>
  <h1 class="title" :class="variant">
    <slot />
  </h1>
</template>

<style scoped>
.title {
  font: var(--typography);
  line-height: 100%;
  letter-spacing: 0em;
  text-align: center;
}
.onboarding {
  font-size: 1.625rem;
  font-style: medium;
  font-weight: 500;
}
.error {
  font-size: 1.25rem;
  font-style: semi-bold;
  font-weight: 600;
}
.name {
  font-size: 2rem;
  font-style: medium;
  font-weight: 500;
  text-align: none;
}
</style>
