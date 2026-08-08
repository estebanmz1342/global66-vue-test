<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    femalePercentage: number
    title?: string
  }>(),
  {
    title: 'GENERO',
  },
)

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value))

const femalePercentage = computed(() =>
  clampPercentage(Number(props.femalePercentage) || 0),
)

const malePercentage = computed(() => 100 - femalePercentage.value)

const barStyle = computed(() => ({
  background: `linear-gradient(90deg, #3b6ce7 0% ${malePercentage.value}%, #ff7c9d ${malePercentage.value}% 100%)`,
}))

const percentFormatter = new Intl.NumberFormat('es-ES', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
})

const formatPercent = (value: number) => percentFormatter.format(value)
</script>

<template>
  <section class="gender-distribution" :aria-label="`${title} distribution`">
    <h2 class="gender-distribution__title">
      {{ title }}
    </h2>

    <div
      class="gender-distribution__bar"
      :style="barStyle"
      role="presentation"
    />

    <div class="gender-distribution__stats">
      <p class="gender-distribution__stat gender-distribution__stat--male">
        <span class="material-symbols-rounded" aria-hidden="true">male</span>
        <span>{{ formatPercent(malePercentage) }}%</span>
      </p>

      <p class="gender-distribution__stat gender-distribution__stat--female">
        <span class="material-symbols-rounded" aria-hidden="true">female</span>
        <span>{{ formatPercent(femalePercentage) }}%</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.gender-distribution {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.gender-distribution__title {
  font-family: var(--typography);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
}

.gender-distribution__bar {
  width: 100%;
  height: 0.625rem;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(8, 6, 13, 0.06);
}

.gender-distribution__stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.gender-distribution__stat {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--typography);
  font-size: 1rem;
  font-weight: 500;
  color: #4a4a4a;
}

.gender-distribution__stat .material-symbols-rounded {
  font-size: 1.125rem;
  line-height: 1;
}

.gender-distribution__stat--male {
  color: #3b6ce7;
}

.gender-distribution__stat--female {
  color: #ff7c9d;
}
</style>
