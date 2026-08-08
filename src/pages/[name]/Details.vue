<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Character from '@/components/details/Character.vue'
import Information from '@/components/details/Information.vue'
import Button from '@/components/global/Button.vue'
import { usePokedex } from '@/components/pokedex/hooks/usePokedex'
import type { Pokemon } from '@/types/types'

const route = useRoute()
const { getPokemonByName } = usePokedex()
const name = computed(() => route.params.name)
const pokemon = ref<Pokemon | undefined>()

onMounted(async () => {
  const response = await getPokemonByName(name.value as string)
  pokemon.value = response
})
</script>

<template>
  <div class="details-wrapper">
    <Button class="go-back" variant="secondary" @click="$router.back()"
      >Ir atrás</Button
    >
    <Character v-if="pokemon" :pokemon="pokemon" />
    <Information v-if="pokemon" :pokemon="pokemon" />
  </div>
</template>

<style scoped>
.details-wrapper {
  position: relative;
  padding: 0 1rem;
}
.go-back {
  width: min(25%, 11.25rem);
  font-size: 1rem;
  color: #a9a9a9;
  position: absolute;
  top: 0.75rem;
  left: 4.375rem;
  z-index: 3;
}
</style>
