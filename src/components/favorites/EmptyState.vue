<script lang="ts" setup>
import emptyStateImage from '@/assets/magikarp.svg'
import Title from '../global/Title.vue'
import Text from '../global/Text.vue'
</script>

<template>
  <div class="favorites-empty-state">
    <img :src="emptyStateImage" alt="Empty State" class="w-1/2 mb-4" />
    <Title variant="error">No has marcado ningún Pokémon como favorito</Title>
    <Text variant="description"
      >Haz clic en el ícono de corazón de tus Pokémon favoritos y aparecerán
      aquí.</Text
    >
  </div>
</template>

<style scoped>
.favorites-empty-state {
  width: min(100%, 22.5rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  gap: 2rem;
}
</style>
