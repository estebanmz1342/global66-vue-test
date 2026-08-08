<script lang="ts" setup>
import { computed } from 'vue'
import { getTypeInfo } from './hook/TYPES'

const props = defineProps<{
  type: string
  size?: 'large'
}>()

const typeComputed = computed(() => props.type.toLowerCase())
const typeInfo = computed(() => getTypeInfo(typeComputed.value))
const boxStyle = computed(() => ({
  backgroundColor: typeInfo.value.backgroundColor,
}))
</script>

<template>
  <div class="pill" :style="boxStyle" :class="{ large: size }">
    <img :src="typeInfo.image" alt="image type" />
    <p class="type-name" :class="{ large: size }">{{ typeInfo.name }}</p>
  </div>
</template>

<style scoped>
.pill {
  display: flex;
  align-items: center;
  padding: 0.181rem 0.375rem;
  gap: 0.375rem;
  width: fit-content;
  border-radius: 100px;

  & img {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
  }

  &.large {
    padding: 0.35rem 0.75rem;
    gap: 0.625rem;

    & img {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
}

.type-name {
  font-family: var(--typography);
  font-weight: 500;
  font-size: 0.688rem;
  line-height: 100%;
  text-transform: capitalize;
  color: white;

  &.large {
    font-size: 0.813rem;
  }
}
</style>
