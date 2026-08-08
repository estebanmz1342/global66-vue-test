<script lang="ts" setup>
defineProps<{
  icon: string
  label: string
  value: string
}>()
</script>

<template>
  <div class="attribute">
    <div class="attribute-label">
      <span class="material-symbols-rounded">{{ icon }}</span>
      <p class="attribute-label__text">{{ label.toLocaleUpperCase() }}</p>
    </div>
    <div class="attribute-value">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
.attribute {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: min(40%, 350px);
}

.attribute-label {
  display: flex;
  gap: 0.625rem;
  align-items: center;
}

.attribute-label__text {
  font-family: var(--typography);
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 100%;
}

.attribute-value {
  background-color: white;
  padding: 0.75rem 1.125rem;
  border: 1px solid #a9a9a9;
  font-family: var(--typography);
  font-weight: 600;
  font-size: 0.875rem;
  color: #08060d;
  text-align: center;
  border-radius: 15px;
}
</style>
