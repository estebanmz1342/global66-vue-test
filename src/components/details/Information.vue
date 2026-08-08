<script lang="ts" setup>
import { computed, ref } from 'vue'

import Attribute from '../global/Attribute.vue'
import GenderDistribution from '../global/GenderDistribution.vue'
import PillType from '../global/PillType.vue'
import Title from '../global/Title.vue'
import type { Pokemon } from '@/types/types'
import { calculatePokemonWeaknesses } from '@/utils/pokemon-weaknesses'

const props = defineProps<{
  pokemon: Pokemon
}>()

const pokemon = computed(() => props.pokemon)
const description = ref<string>('')
const category = ref<string>('-')
const femalePercentage = ref<number | undefined>()
const weaknesses = computed(() =>
  calculatePokemonWeaknesses(pokemon.value.types),
)
</script>

<template>
  <div class="information">
    <section class="main info-section">
      <Title variant="name">{{ pokemon.name }}</Title>
      <p class="main__number">{{ pokemon.number }}</p>
      <p class="main__description">
        {{ description.length ? description : 'Descripción no disponible' }}
      </p>
      <div class="main__types">
        <PillType
          v-for="(type, index) in pokemon.types"
          :key="index"
          :type="type"
          size="large"
        />
      </div>
    </section>
    <hr />
    <section class="info-section details">
      <div class="attributes-wrapper">
        <Attribute icon="weight" label="Peso" :value="`${pokemon.weight} kg`" />
        <Attribute
          icon="align_self_stretch"
          label="Altura"
          :value="`${pokemon.height} m`"
        />
        <Attribute icon="category" label="Categoria" :value="category" />
        <Attribute
          icon="filter_tilt_shift"
          label="Habilidad"
          :value="pokemon.ability"
        />
      </div>

      <p v-if="femalePercentage === undefined">
        Información de género no disponible
      </p>
      <GenderDistribution v-else :female-percentage="femalePercentage" />
    </section>
    <hr />
    <section class="info-section weaknesses">
      <h3 class="weaknesses-title">Debilidades</h3>
      <p v-if="!weaknesses.length">Informacion no disponible</p>
      <div v-else class="deb__types">
        <PillType
          v-for="(type, index) in weaknesses"
          :key="index"
          :type="type"
          size="large"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.information {
  display: flex;
  width: 90%;
  height: 100%;
  justify-content: space-around;
  margin: 2rem auto;
}

.info-section {
  height: 100%;
  width: 30%;
  min-height: 33vh;
}

.main.info-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
}

.main__number {
  font-family: var(--typography);
  font-weight: 600;
  font-style: SemiBold;
  font-size: 1.125rem;
  line-height: 100%;
  letter-spacing: 0%;
  color: #424242;
}

.main__description {
  font-family: var(--typography);
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0%;
  color: #424242;
}

.main__types,
.deb__types {
  display: flex;
  gap: 0.425rem;
}

.details.info-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.attributes-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1.125rem;
}

.weaknesses.info-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 1rem;
}

.weaknesses .deb__types {
  gap: 1rem;
  flex-wrap: wrap;
}

.weaknesses-title {
  font-family: var(--typography);
  font-weight: 600;
  font-size: 1.125rem;
}
</style>
