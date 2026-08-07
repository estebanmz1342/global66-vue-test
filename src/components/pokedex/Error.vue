<script lang="ts" setup>
import errorImage from '@/assets/magikarp.svg'
import Title from '../global/Title.vue'
import Text from '../global/Text.vue'
import Button from '../global/Button.vue'
</script>

<template>
  <div class="pokedex-error">
    <img :src="errorImage" alt="Error page" class="w-1/2 mb-4" />
    <Title variant="error">Algo salió mal...</Title>
    <Text variant="description"
      >No pudimos cargar la información en este momento. Verifica tu conexión o
      intenta nuevamente más tarde.</Text
    >
    <Button variant="primary" @click="$router.push('/')">Reintentar</Button>
  </div>
</template>

<style scoped>
.pokedex-error {
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
