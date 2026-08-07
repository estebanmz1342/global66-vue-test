<script lang="ts" setup>
import type { Pokemon } from '@/types/types.ts'
import Card from './Card.vue'
defineProps<{
  pokemons: Pokemon[]
}>()
</script>
<template>
  <div class="list">
    <Card
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.id ?? index"
      :pokemon="pokemon"
    />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 1rem auto;
}
</style>
