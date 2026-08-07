<script lang="ts" setup>
import wipImage from '@/assets/jigglypuff.svg'
import Title from '../global/Title.vue'
import Text from '../global/Text.vue'
</script>

<template>
  <div class="regions">
    <img :src="wipImage" alt="WIP page" class="w-1/2 mb-4" />
    <Title variant="error">¡Muy pronto disponible!</Title>
    <Text variant="description"
      >Estamos trabajando para traerte esta sección. Vuelve más adelante para
      descubrir todas las novedades.</Text
    >
  </div>
</template>

<style scoped>
.regions {
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
