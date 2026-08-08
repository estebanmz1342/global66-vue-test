<script lang="ts" setup>
import Button from '@/components/global/Button.vue'
import type { Pokemon } from '@/types/types'

import Card from './Card.vue'

withDefaults(
  defineProps<{
    pokemons: Pokemon[]
    showLoadMore?: boolean
    hasMore?: boolean
    isLoadingMore?: boolean
  }>(),
  {
    showLoadMore: false,
    hasMore: false,
    isLoadingMore: false,
  },
)

defineEmits<{
  (e: 'load-more'): void
}>()
</script>
<template>
  <div class="list-wrapper">
    <div class="list">
      <Card
        v-for="(pokemon, index) in pokemons"
        :key="pokemon.id ?? index"
        :pokemon="pokemon"
      />
    </div>

    <div v-if="showLoadMore && hasMore" class="list__actions">
      <Button
        variant="secondary"
        :disabled="isLoadingMore"
        @click="$emit('load-more')"
      >
        {{ isLoadingMore ? 'Cargando...' : 'Cargar más Pokémon' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 1rem auto;
}

.list__actions {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1.5rem 0 0;
}
</style>
