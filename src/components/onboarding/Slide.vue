<script lang="ts" setup>
import Text from '../global/Text.vue'
import Title from '../global/Title.vue'

defineProps<{
  image: string
  title: string
  text: string
}>()
</script>
<template>
  <div class="slide">
    <img class="slide__img" :src="image" alt="Slide image" />
    <Title variant="onboarding">
      {{ title }}
    </Title>
    <Text variant="onboarding">
      {{ text }}
    </Text>
  </div>
</template>

<style scoped>
.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 28rem;
  justify-content: space-around;
}

.slide__img {
  width: min(100%, 18rem);
  height: auto;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

.slide :deep(.text),
.slide :deep(.title) {
  max-width: 20rem;
}
</style>
